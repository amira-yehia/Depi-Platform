import "./ProposalsView.css";

export default function ProposalsView({
  header,
  stats,
  tabs,
  proposals,
  onViewDetails,
  onWithdraw,
}) {
  return (
    <div className="pv">
      <div className="pv__container">
        <Header title={header.title} subtitle={header.subtitle} />

        <StatsRow items={stats} />

        <section className="pvShell">
          <Tabs items={tabs.items} active={tabs.active} onChange={tabs.onChange} />

          <div className="pvList">
            {proposals.map((p) => (
              <ProposalCard
                key={p.id}
                item={p}
                onViewDetails={() => onViewDetails(p.id)}
                onWithdraw={() => onWithdraw(p.id)}
              />
            ))}

            {proposals.length === 0 && (
              <div className="pvEmpty">No proposals in this status.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ---------------- sub components ---------------- */

function Header({ title, subtitle }) {
  return (
    <header className="pvHeader">
      <h1 className="pvHeader__title">{title}</h1>
      <div className="pvHeader__sub">{subtitle}</div>
    </header>
  );
}

function StatsRow({ items }) {
  return (
    <section className="pvStats">
      {items.map((s) => (
        <div className="pvStatCard" key={s.label}>
          <div className="pvStatCard__label">{s.label}</div>
          <div className="pvStatCard__value">{s.value}</div>
        </div>
      ))}
    </section>
  );
}

function Tabs({ items, active, onChange }) {
  return (
    <nav className="pvTabs">
      {items.map((t) => (
        <button
          key={t}
          type="button"
          className={`pvTab ${active === t ? "is-active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
    </nav>
  );
}

function ProposalCard({ item, onViewDetails, onWithdraw }) {
  const noteClass =
    item.noteType === "warn"
      ? "is-warn"
      : item.noteType === "info"
      ? "is-info"
      : item.noteType === "success"
      ? "is-success"
      : item.noteType === "danger"
      ? "is-danger"
      : "is-muted";

  return (
    <article className="pvCard">
      <div className="pvCard__left">
        <div className="pvCard__title">{item.title}</div>

        <div className="pvCard__meta">
          <span className="pvCard__metaItem">
            <i className="fa-solid fa-dollar-sign" aria-hidden="true" />
            {item.budget}
          </span>
          <span className="pvCard__metaItem">
            <i className="fa-regular fa-clock" aria-hidden="true" />
            {item.submittedAgo}
          </span>
        </div>

        <div className={`pvCard__note ${noteClass}`}>
          <i className="fa-solid fa-circle-info" aria-hidden="true" />
          {item.noteText}
        </div>
      </div>

      <div className="pvCard__right">
        <div className="pvCard__match">
          <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
          <span className="pvCard__matchNum">{item.matchScore}%</span>
          <span className="pvCard__matchLbl">match</span>
        </div>

        <div className="pvCard__btnRow">
          <button className="pvBtn pvBtn--ghost" type="button" onClick={onViewDetails}>
            View Details
          </button>

          <button
            className={`pvBtn ${item.canWithdraw ? "pvBtn--disabled" : "pvBtn--disabled"} ${
              item.canWithdraw ? "is-enabled" : ""
            }`}
            type="button"
            disabled={!item.canWithdraw}
            onClick={onWithdraw}
          >
            Withdraw
          </button>
        </div>
      </div>
    </article>
  );
}