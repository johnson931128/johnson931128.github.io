/* eslint-disable @next/next/no-img-element */

import type { LearningNoteSubjectSlug } from "@/data/learning-notes";

export default function LearningSubjectArt({ subject }: { subject: LearningNoteSubjectSlug }) {
  if (subject === "amr") {
    return <img src="/projects/amr-software-stack.jpg" alt="" className="h-full w-full object-cover object-center" />;
  }

  if (subject === "computer-organization") {
    return (
      <svg viewBox="0 0 1200 260" className="h-full w-full" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M80 130h150M360 130h130M650 130h150M930 130h180" />
          <path d="M295 80v-38h430v38M725 180v38H295v-38" strokeDasharray="7 9" />
          <rect x="230" y="75" width="130" height="110" rx="4" />
          <rect x="490" y="75" width="160" height="110" rx="4" />
          <rect x="800" y="75" width="130" height="110" rx="4" />
        </g>
        <g fill="currentColor" fontFamily="monospace" fontSize="16" letterSpacing="3">
          <text x="267" y="126">FETCH</text><text x="272" y="150">PC + 4</text>
          <text x="538" y="126">DECODE</text><text x="533" y="150">REG FILE</text>
          <text x="842" y="126">EXEC</text><text x="840" y="150">ALU</text>
        </g>
      </svg>
    );
  }

  if (subject === "operating-systems") {
    return (
      <div className="flex h-full w-full items-center justify-end gap-8 p-8 font-mono text-xs sm:p-12">
        <div className="hidden w-72 space-y-3 border border-current/35 p-5 sm:block">
          <p>$ ps --all</p><p>PID&nbsp;&nbsp;STATE&nbsp;&nbsp;QUEUE</p><p>01&nbsp;&nbsp;&nbsp;run&nbsp;&nbsp;&nbsp;&nbsp;ready</p><p>02&nbsp;&nbsp;&nbsp;wait&nbsp;&nbsp;&nbsp;blocked</p>
        </div>
        <div className="grid h-32 w-48 grid-cols-4 gap-1" aria-hidden>
          {Array.from({ length: 20 }).map((_, index) => (
            <span key={index} className={index % 5 === 0 || index === 13 ? "bg-current/45" : "border border-current/25"} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <svg viewBox="0 0 1200 260" className="h-full w-full" aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M170 130h190M510 130h180M840 130h190" />
        <path d="M435 82L360 130l75 48M765 82l75 48-75 48" strokeDasharray="6 8" />
        <circle cx="120" cy="130" r="50" /><circle cx="435" cy="130" r="75" />
        <circle cx="765" cy="130" r="75" /><circle cx="1080" cy="130" r="50" />
      </g>
      <g fill="currentColor" fontFamily="monospace" fontSize="16" letterSpacing="3" textAnchor="middle">
        <text x="120" y="136">LIDAR</text><text x="435" y="136">/TF</text>
        <text x="765" y="136">NAV2</text><text x="1080" y="136">CMD</text>
      </g>
    </svg>
  );
}
