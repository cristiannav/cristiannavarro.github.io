import { Section } from "../components/Section";
import { profile } from "../data/content";

export function About() {
  return (
    <Section id="about" eyebrow="Quién soy" title="Sobre mí">
      <div className="grid gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          <p className="text-lg leading-relaxed text-slate-300">
            {profile.summary}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="text-neon-cyan hover:underline"
            >
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-neon-cyan hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="glass rounded-2xl p-6">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="text-slate-400">Experiencia</dt>
              <dd className="text-white">+6 años en ingeniería de software</dd>
            </div>
            <div>
              <dt className="text-slate-400">En TI</dt>
              <dd className="text-white">+10 años</dd>
            </div>
            <div>
              <dt className="text-slate-400">Ubicación</dt>
              <dd className="text-white">{profile.location}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>
  );
}
