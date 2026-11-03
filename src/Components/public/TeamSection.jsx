export default function TeamSection({ members = [], tone = "dark" }) {
  if (!members.length) return null;
  return (
    <section aria-labelledby="team-heading" className={tone === "light" ? "bg-[var(--rj-navy-900)]" : ""}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#F97316] mb-3">The people behind the work</p>
          <h2 id="team-heading" className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">Meet our team</h2>
          <p className="text-[#94A3B8] mt-3">The people bringing ideas to life through thoughtful design and technology.</p>
        </div>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {members.map((member) => (
            <li key={member._id || member.name} className="overflow-hidden rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <div className="aspect-[4/5] overflow-hidden bg-[#0A1730]">
                <img src={member.imageUrl} alt={member.name} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white">{member.name}</h3>
                <p className="text-sm text-[#F97316] mt-1">{member.role}</p>
                {member.bio && <p className="text-xs leading-relaxed text-[#94A3B8] mt-3">{member.bio}</p>}
                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`} className="inline-flex mt-3 text-[#94A3B8] hover:text-[#F97316]"><span className="text-xs font-semibold">in</span></a>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
