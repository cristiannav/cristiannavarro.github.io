import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { skills } from '../data/content';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Stack técnico" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((cat, i) => (
          <Reveal key={cat.category} delay={i * 0.05}>
            <div className="glass h-full rounded-2xl p-6 transition hover:shadow-glow">
              <h3 className="mb-4 text-lg font-semibold text-white">{cat.category}</h3>
              <ul className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
