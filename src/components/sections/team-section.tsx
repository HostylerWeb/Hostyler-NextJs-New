import { teamMembers } from "@/content/team";

export function TeamSection() {
  return (
    <section className="section wrap" id="team">
      <div className="head reveal">
        <span className="eyebrow-chip">
          <i />
          The people
        </span>
        <h2>Small team. Senior only.</h2>
        <p>The people who scope your project are the same people who build it.</p>
      </div>
      <div className="team-grid">
        {teamMembers.map((member) => (
          <div key={member.name} className="team-card reveal">
            <div className="team-avatar">
              <span className="team-initials" aria-hidden="true">
                {member.initials}
              </span>
            </div>
            <h5>{member.name}</h5>
            <span>{member.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
