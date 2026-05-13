import "./ProfilePage.css";

import ProfileHeader from "../components/ProfileHeader";
import ProfileTabs from "../components/ProfileTabs";
import ProfileSidebar from "../components/ProfileSidebar";

import ProfileAboutCard from "../components/ProfileAboutCard";
import ProfileSkillsCard from "../components/ProfileSkillsCard";
import ProfileFeaturedWorkCard from "../components/ProfileFeaturedWorkCard";

import ProfileBottomCta from "../components/ProfileBottomCta";

export default function ProfilePage() {

  // Mock لحد ما الـ API يبقى جاهز
  const profile = {
    avatarUrl: "/images/avatar.png",
    name: "Sarah Chen",
    verified: true,
    roleTitle: "Senior Full-Stack Engineer & UI Specialist",
    availableText: "Available now",
    metaRow: [
      { icon: "far fa-clock", text: "San Francisco, CA" },
      { icon: "fas fa-globe", text: "English (Native)" },
      { icon: "fas fa-language", text: "Mandarin (Fluent)" },
    ],
    actions: {
      hireText: "Hire Now",
    },

    tabs: [
      { label: "Overview" },
      { label: "Portfolio" },
      { label: "Experience" },
      { label: "Reviews (3)" },
    ],
    activeTab: "Overview",

    scoreCard: {
      headerText: "AI PROFILE SCORE",
      percent: 94,
      label: "EXCEPTIONAL",
      topText: "Top 3% of freelancers on the platform",
      bars: [
        { icon: "fas fa-desktop", title: "Skills Match", value: 97 },
        { icon: "fas fa-briefcase", title: "Experience", value: 93 },
        { icon: "fas fa-star", title: "Reviews & Rating", value: 92 },
      ],
    },

    stats: [
      { icon: "fas fa-star", value: "4.96", title: "RATING", sub: "3 reviews" },
      { icon: "fas fa-file", value: "38", title: "PROJECTS", sub: "completed" },
      { icon: "fas fa-dollar-sign", value: "$142K", title: "EARNED", sub: "total lifetime" },
      { icon: "fas fa-undo", value: "74%", title: "REPEAT", sub: "return rate" },
    ],

    hourlyRate: {
      rate: "95",
      responseTime: "< 2 hours",
      memberSince: "Jan 2019",
      languages: "English (Native), Mandarin (Fluent)",
    },
    sendMessageLabel: "Send Message",

    about: {
      title: "About",
      description:
        "I turn complex problems into clean, scalable products — from architecture to pixel-perfect UI.",
      description2:
        "With 7 years of professional experience spanning product startups and engineering teams at Stripe and Figma, I specialize in building React + Node.js SaaS products that scale. I care deeply about code quality, developer experience, and shipping fast without cutting corners.",
    },

    skills: {
      title: "Skills & Expertise",
      subtitle: "Proficiency levels rated by completed project history",
      chips: [
        "React EXPERT",
        "TypeScript EXPERT",
        "Node.js EXPERT",
        "PostgreSQL ADVANCED",
        "GraphQL ADVANCED",
        "GraphQL ADVANCED",
        "Next.js EXPERT",
        "Tailwind CSS EXPERT",
        "Docker ADVANCED",
        "AWS INTERMEDIATE",
        "Figma ADVANCED",
      ],
    },

    featuredWork: {
      title: "Featured Work",
      subtitle: "Recent projects and case studies",
      rightLinkText: "All projects >",
      items: [
        {
          pillLabel: "Web App",
          imageUrl: "/images/work1.jpg",
          title: "NovaPay — FinTech Dashboard",
          description:
            "Real-time analytics platform for B2B payments, handling $2M+ monthly transactions with interactive charts and role-based access.",
          tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
        },
        {
          pillLabel: "SaaS",
          imageUrl: "/images/work2.jpg",
          title: "Orbyt — SaaS Platform",
          description:
            "End-to-end project management SaaS with real-time collaboration, Kanban boards, and deep third-party integrations.",
          tags: ["Next.js", "TypeScript", "GraphQL", "AWS"],
        },
      ],
    },

    bottomCta: {
      title: "Ready to work with Sarah?",
      subtitle: "She’s available now and responds within < 2 hours.",
      buttonText: "Hire Now",
    },
  };

  return (
    <div className="profilePage">
      <ProfileHeader profile={profile} />

      <div className="profilePage__contentWrap">
        <div className="profilePage__layout">
          <aside className="profilePage__sidebar">
            <ProfileSidebar profile={profile} />
          </aside>

          <main className="profilePage__main">
            <ProfileTabs tabs={profile.tabs} active={profile.activeTab} />

            <div className="profilePage__cards">
              <ProfileAboutCard about={profile.about} />
              <ProfileSkillsCard skills={profile.skills} />
              <ProfileFeaturedWorkCard work={profile.featuredWork} />
            </div>
          </main>
        </div>
      </div>

      <ProfileBottomCta cta={profile.bottomCta} />
    </div>
  );
}