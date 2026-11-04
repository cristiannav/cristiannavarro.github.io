import { motion } from "framer-motion";
import { HeroCanvas } from "../three/HeroCanvas";
import { useT } from "../i18n";

export function Hero() {
  const { t, profile } = useT();
  return (
    <section
      id="hero"
      className="relative flex min-h-screen min-h-svh items-center justify-center overflow-hidden"
    >
      <HeroCanvas />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm uppercase tracking-[0.3em] text-neon-cyan"
        >
          {profile.role}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-bold leading-tight text-white sm:text-6xl md:text-7xl"
        >
          {profile.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-lg text-slate-300"
        >
          {t.hero.tagline}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-6 py-3 font-medium text-base-950 shadow-glow transition hover:scale-105"
          >
            {t.hero.seeProjects}
          </a>
          <a
            href="#contact"
            className="rounded-full glass px-6 py-3 font-medium text-white transition hover:border-neon-cyan/50"
          >
            {t.hero.contactMe}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
