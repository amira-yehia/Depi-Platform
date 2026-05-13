import "./ProfileSkillsCard.css";

export default function ProfileSkillsCard({ skills }) {
  return (
    <section className="pscills">
      <h2 className="pscills__title">{skills.title}</h2>
      <div className="pscills__sub">{skills.subtitle}</div>

      <div className="pscills__chips">
        {skills.chips.map((c) => (
          <span key={c} className="pscills__chip">{c}</span>
        ))}
      </div>
    </section>
  );
}