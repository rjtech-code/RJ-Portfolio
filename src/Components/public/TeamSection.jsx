import { useState } from "react";

export default function TeamSection({ members = [], tone = "dark" }) {
  const [selectedMember, setSelectedMember] = useState(null);

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
            <li key={member._id || member.name} className="h-[340px] sm:h-[400px] overflow-hidden rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)]">
              <div className="h-3/4 p-2">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  loading="lazy"
                  className="w-full h-full rounded-xl object-cover"
                />
              </div>
              <div className="h-1/4 min-h-0 px-3 pb-3 pt-1 sm:px-4 flex flex-col justify-center">
                <h3 className="font-bold text-white text-sm sm:text-base truncate">{member.name}</h3>
                <p className="text-xs sm:text-sm text-[#F97316] mt-1 truncate">{member.role}</p>
                <button
                  type="button"
                  onClick={() => setSelectedMember(member)}
                  className="w-fit text-xs font-semibold text-[#94A3B8] hover:text-[#F97316] mt-2 transition-colors"
                  aria-label={`View details for ${member.name}`}
                >
                  View more
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedMember && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedMember(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="team-member-name"
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--rj-panel-border)] bg-[var(--rj-panel)] shadow-2xl"
          >
            <button
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Close team member details"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white text-2xl leading-none hover:bg-[#F97316] transition-colors"
            >
              ×
            </button>
            <div className="h-64 sm:h-72 p-3">
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-[#0A1730]">
                <img
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  className="h-full w-full rounded-xl object-contain"
                />
              </div>
            </div>
            <div className="px-5 pb-6 sm:px-6">
              <h3 id="team-member-name" className="text-xl sm:text-2xl font-bold text-white">{selectedMember.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[#F97316]">{selectedMember.role}</p>
              {selectedMember.bio && (
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-[#CBD5E1]">{selectedMember.bio}</p>
              )}
              {selectedMember.linkedin && (
                <a
                  href={selectedMember.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[var(--rj-panel-border)] px-3 py-2 text-sm font-semibold text-[#CBD5E1] hover:border-[#F97316] hover:text-[#F97316] transition-colors"
                >
                  <span className="text-xs font-bold">in</span>
                  View LinkedIn profile
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
