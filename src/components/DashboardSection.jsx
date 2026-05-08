import StatsCard from './StatsCard';
import JobMatchCard from './JobMatchCard';
import ContractCard from './ContractCard';
import './DashboardSection.css';

function DashboardSection() {
    
    // === بيانات الـ Stats ===
    const statsData = [
        {
            id: 1,
            title: "AI Profile Score",
            value: "92%",
            subtitle: "Complete your portfolio to reach 100%",
            icon: "fas fa-chart-pie",
            extra: { type: "progress", value: 92 }
        },
        {
            id: 2,
            title: "Active Contracts",
            value: "2",
            subtitle: "📈 On Track",
            icon: "fas fa-file-contract"
        },
        {
            id: 3,
            title: "This Month",
            value: "$4,200",
            subtitle: "",
            icon: "fas fa-calendar-alt",
            trend: { direction: 'up', value: '+18%' }
        },
        {
            id: 4,
            title: "Total Earnings",
            value: "$28,450",
            subtitle: "From 24 completed projects",
            icon: "fas fa-wallet",
            trend: { direction: 'up', value: '+12%' }
        }
    ];

    // === بيانات الـ Jobs ===
    const jobsData = [
        {
            id: 1,
            title: "Full Stack Developer for SaaS Platform",
            description: "Looking for experienced developer to build scalable web application with modern tech stack.",
            recommended: true,
            score: 94,
            tags: ["React", "Node.js", "PostgreSQL"],
            meta: [
                { icon: "fas fa-dollar-sign", text: "$5,000 - $8,000" },
                { icon: "far fa-clock", text: "2 hours ago" }
            ]
        },
        {
            id: 2,
            title: "Senior React Developer Needed",
            description: "Build complex UI components for enterprise dashboard project with TypeScript.",
            recommended: true,
            score: 86,
            tags: ["React", "TypeScript", "Tailwind"],
            meta: [
                { icon: "fas fa-dollar-sign", text: "$3,500 - $6,000" },
                { icon: "far fa-clock", text: "5 hours ago" }
            ]
        },
        {
            id: 3,
            title: "E-commerce Platform Development",
            description: "Redesign and develop custom e-commerce solution with payment integration.",
            recommended: false,
            score: 90,
            tags: ["React", "Next.js", "Stripe"],
            meta: [
                { icon: "fas fa-dollar-sign", text: "$4,000 - $7,000" },
                { icon: "far fa-clock", text: "1 day ago" }
            ]
        }
    ];

    // === بيانات الـ Contracts ===
    const contractsData = [
        {
            id: 1,
            title: "Mobile App UI/UX",
            company: "TechCorp Inc",
            progress: 85,
            earnings: "$2,400",
            contractType: "Hourly"
        },
        {
            id: 2,
            title: "Dashboard Redesign",
            company: "StartupXYZ",
            progress: 45,
            earnings: "$1,800",
            contractType: "Fixed"
        }
    ];

    return (
        <section className="dashboardSection">
            <div className="container py-5">
                
                {/* Welcome Header */}
                <div className="dashboardHeader mb-5">
                    <h1 className="text-white fw-bold display-5 mb-1">
                        Welcome back, Alex! 👋
                    </h1>
                    <p className="text-secondary fs-5 opacity-75">
                        Here's what's happening with your freelance journey
                    </p>
                </div>

                {/* Top Stats Grid */}
                <div className="dashboardStatsGrid mb-5">
                    {statsData.map(stat => (
                        <StatsCard key={stat.id} {...stat} />
                    ))}
                </div>

                {/* Content Grid: Jobs + Contracts */}
                <div className="dashboardContentGrid">
                    
                    {/* Left Side: Recommended Jobs */}
                    <div className="dashboardJobsColumn">
                        <div className="sectionHeader d-flex justify-content-between align-items-center mb-4">
                            <h3 className="text-white fw-bold m-0">
                                <i className="fas fa-sparkles me-2 text-warning"></i>
                                AI Recommended Jobs
                            </h3>
                            <a href="#view-all" className="text-orange fw-bold text-decoration-none">
                                View All
                            </a>
                        </div>
                        
                        <div className="jobsList">
                            {jobsData.map(job => (
                                <JobMatchCard key={job.id} {...job} />
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Active Contracts */}
                    <div className="dashboardContractsColumn">
                        <div className="sectionHeader mb-4">
                            <h3 className="text-white fw-bold m-0">
                                <i className="fas fa-briefcase me-2 text-success"></i>
                                Active Contracts
                            </h3>
                        </div>
                        
                        <div className="contractsList">
                            {contractsData.map(contract => (
                                <ContractCard key={contract.id} {...contract} />
                            ))}
                        </div>
                        
                        <button className="viewAllBtn mt-4 w-100">
                            View All Contracts
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}

export default DashboardSection;