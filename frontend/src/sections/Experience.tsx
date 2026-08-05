import { Section } from "../components/Section";
import { Reveal } from "../components/Reveal";
import { experience } from "../data/content";

export function Experience() {
  return (
    <Section id="experience" eyebrow="Trayectoria" title="Experiencia">
      <div className="relative space-y-10 border-l border-white/10 pl-8">
        {experience.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.05}>
            <div className="relative">
              <span className="absolute -left-[2.55rem] top-1 h-3 w-3 rounded-full bg-neon-cyan shadow-glow" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-xl font-semibold text-white">
                  {exp.company}
                </h3>
              </div>
              <p className="text-neon-cyan">
                {exp.role} · {exp.location}
              </p>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-300">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 px-2.5 py-0.5 text-xs text-slate-400"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
