import { Section } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { projects } from '../data/content';

export function Projects() {
  return (
    <Section id="projects" eyebrow="Casos reales" title="Proyectos">
      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <article className="group glass h-full overflow-hidden rounded-2xl transition hover:shadow-glow-violet">
              <div className="h-48 overflow-hidden">
                <img src={p.image} alt={p.title} loading="lazy"
                  className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-slate-300">{p.description}</p>
                <p className="mt-3 text-sm text-neon-cyan">Impacto: <span className="text-slate-300">{p.impact}</span></p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-slate-300">{s}</span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
