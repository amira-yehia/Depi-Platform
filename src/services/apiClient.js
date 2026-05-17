import $ from "jquery";

const REFRESH_URL = "http://depiplatform.runasp.net/api/Auth/refresh";

const ACCESS_TOKEN_KEY = "accessToken";
const LEGACY_AUTH_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";

let refreshingPromise = null;

const EXCLUDE_PATHS = ["/api/Auth/login", "/api/Auth/refresh", "/api/Auth/logout"];

function isExcludedUrl(url) {
	if (!url) return false;
	try {
		const u = url.toString();
		return EXCLUDE_PATHS.some((p) => u.includes(p));
	} catch (e) {
		return EXCLUDE_PATHS.some((p) => String(url).includes(p));
	}
}

export function refreshAccessToken() {
	if (refreshingPromise) return refreshingPromise;

	refreshingPromise = new Promise((resolve, reject) => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

		if (!refreshToken) {
			cleanupAndRedirect();
			refreshingPromise = null;
			return reject(new Error("No refresh token available"));
		}

		$.ajax({
			url: REFRESH_URL,
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({ refreshToken }),
			dataType: "json",
		})
			.done((resp) => {
				if (!resp || !resp.accessToken) {
					cleanupAndRedirect();
					refreshingPromise = null;
					return reject(new Error("Invalid refresh response"));
				}

				localStorage.setItem(ACCESS_TOKEN_KEY, resp.accessToken);
				localStorage.setItem(LEGACY_AUTH_TOKEN_KEY, resp.accessToken);
				if (resp.refreshToken) {
					localStorage.setItem(REFRESH_TOKEN_KEY, resp.refreshToken);
				}

				const newAccess = resp.accessToken;
				refreshingPromise = null;
				resolve(newAccess);
			})
			.fail((jqXHR, textStatus, errorThrown) => {
				cleanupAndRedirect();
				refreshingPromise = null;
				reject(new Error(`Refresh failed: ${textStatus || errorThrown}`));
			});
	});

	return refreshingPromise;
}

export function apiRequest(options) {
	const original = Object.assign({}, options);

	function doRequestWithToken(token) {
		const opts = Object.assign({}, original);
		opts.headers = Object.assign({}, opts.headers || {});

		if (token) {
			opts.headers["Authorization"] = `Bearer ${token}`;
		}

		if (opts.data && typeof opts.data === "object" && !opts.contentType) {
			opts.contentType = "application/json";
			opts.data = JSON.stringify(opts.data);
		}

		return new Promise((resolve, reject) => {
			$.ajax(opts)
				.done((data, textStatus, jqXHR) => resolve({ data, textStatus, jqXHR }))
				.fail((jqXHR, textStatus, errorThrown) => reject({ jqXHR, textStatus, errorThrown }));
		});
	}

	return new Promise((resolve, reject) => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(LEGACY_AUTH_TOKEN_KEY);

		doRequestWithToken(accessToken)
			.then((res) => resolve(res))
			.catch((err) => {
				const { jqXHR } = err || {};
				const status = jqXHR && jqXHR.status;

				if (status === 401 && !isExcludedUrl(original.url)) {
					refreshAccessToken()
						.then((newAccessToken) => {
							doRequestWithToken(newAccessToken)
								.then((res2) => resolve(res2))
								.catch((err2) => {
									reject(err2);
								});
						})
						.catch((refreshErr) => {
							reject(refreshErr);
						});

					return;
				}

				reject(err);
			});
	});
}

function cleanupAndRedirect() {
	try {
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(LEGACY_AUTH_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
	} catch (e) {}

	window.location.href = "login.html";
}

/**
 * Log out the current user on the server and locally.
 * - Reads `refreshToken` and `accessToken` from localStorage.
 * - Sends a POST to the logout endpoint with the refresh token in the body
 *   and the current access token in the Authorization header.
 * - Regardless of success or failure, clears stored tokens and redirects
 *   to `login.html` so the user is signed out locally.
 * - Returns a Promise that resolves once logout/cleanup is complete.
 */
export function logout() {
	return new Promise((resolve) => {
		const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(LEGACY_AUTH_TOKEN_KEY);

		// If there is nothing to send, just clean up and redirect.
		if (!refreshToken && !accessToken) {
			try { localStorage.removeItem(ACCESS_TOKEN_KEY); localStorage.removeItem(LEGACY_AUTH_TOKEN_KEY); localStorage.removeItem(REFRESH_TOKEN_KEY); } catch (e) {}
			window.location.href = "login.html";
			resolve();
			return;
		}

		// Make best-effort server logout; even if the server is down we'll still
		// remove local tokens and redirect the user to the login page.
		$.ajax({
			url: "http://depiplatform.runasp.net/api/Auth/logout",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify({ refreshToken }),
			dataType: "json",
			headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
			timeout: 10000, // fail gracefully if server doesn't respond
		})
			.always(() => {
				// Always clear tokens locally and redirect
				try { localStorage.removeItem(ACCESS_TOKEN_KEY); localStorage.removeItem(LEGACY_AUTH_TOKEN_KEY); localStorage.removeItem(REFRESH_TOKEN_KEY); } catch (e) {}
				window.location.href = "login.html";
				resolve();
			});
	});
}

/**
 * Retrieve the current authenticated user's profile by calling /api/Auth/me.
 * - Uses the existing apiRequest wrapper so the access token is attached
 *   and the refresh flow is triggered automatically on 401.
 * - Returns a Promise that resolves with the parsed response body (user object)
 *   or rejects with the original error so callers can handle it.
 */
export function getCurrentUser() {
	return apiRequest({
		url: "http://depiplatform.runasp.net/api/Auth/me",
		method: "GET",
	}).then((res) => res.data);
}

export default { apiRequest, refreshAccessToken, logout, getCurrentUser };

// Install a global fetch wrapper to catch 401s and retry once after refresh
if (typeof window !== "undefined" && window.fetch) {
	const _origFetch = window.fetch.bind(window);

	window.fetch = async function (input, init = {}) {
		const url = typeof input === "string" ? input : input && input.url;

		const doFetch = async (token) => {
			const headers = new Headers((init && init.headers) || {});
			if (token) headers.set("Authorization", `Bearer ${token}`);

			const newInit = Object.assign({}, init, { headers });
			return _origFetch(input, newInit);
		};

		// Try with current token
		const currentToken = localStorage.getItem(ACCESS_TOKEN_KEY) || localStorage.getItem(LEGACY_AUTH_TOKEN_KEY);
		let resp = await doFetch(currentToken);

		if (resp.status !== 401) return resp;

		if (isExcludedUrl(url)) return resp;

		try {
			const newToken = await refreshAccessToken();
			resp = await doFetch(newToken);
			return resp;
		} catch (e) {
			// refresh failed - cleanupAndRedirect already called by refreshAccessToken
			return resp;
		}
	};
}

