import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { education } from '../data/content';

export function Education() {
  return (
    <Section id="education" eyebrow="Formación" title="Educación">
      <div className="grid gap-6 sm:grid-cols-2">
        {education.map((e, i) => (
          <Reveal key={`${e.institution}-${e.title}`} delay={i * 0.05}>
            <div className="glass rounded-2xl p-6">
              <p className="text-sm text-slate-400">{e.period}</p>
              <h3 className="mt-1 font-semibold text-white">{e.title}</h3>
              <p className="text-neon-cyan">{e.institution}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
