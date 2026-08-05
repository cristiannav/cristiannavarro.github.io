import { useState, type FormEvent } from "react";
import { Section } from "../components/Section";
import { sendContact } from "../lib/api";
import EarthCanvas from "../components/EarthCanvas";

type Status = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await sendContact(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Error inesperado");
    }
  }

  return (
    <Section id="contact">
      <div className="grid items-stretch gap-10 md:grid-cols-2">
        {/* Encabezado + formulario: debajo del globo en mobile, izquierda en desktop */}
        <div className="order-2 md:order-1">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-neon-cyan">
            Hablemos
          </p>
          <h2 className="mb-8 text-3xl font-bold text-white sm:text-4xl">
            Contacto
          </h2>
          <form
            onSubmit={handleSubmit}
            className="glass space-y-4 rounded-2xl p-6"
          >
          <div>
            <label htmlFor="contact-name" className="sr-only">
              Nombre
            </label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
              placeholder="Nombre"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-base-900 px-4 py-3 text-white outline-none focus:border-neon-cyan"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="sr-only">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              autoComplete="email"
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-base-900 px-4 py-3 text-white outline-none focus:border-neon-cyan"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="sr-only">
              Mensaje
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              minLength={10}
              rows={5}
              placeholder="Mensaje"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-base-900 px-4 py-3 text-white outline-none focus:border-neon-cyan"
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet px-6 py-3 font-medium text-base-950 transition hover:scale-[1.02] disabled:opacity-50"
          >
            {status === "loading" ? "Enviando…" : "Enviar mensaje"}
          </button>
          {status === "success" && (
            <p className="text-sm text-emerald-400">
              ¡Mensaje enviado! Te respondo pronto.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-400">{error}</p>
          )}
          </form>
        </div>
        {/* Globo: arriba en mobile, derecha en desktop */}
        <div className="order-1 min-h-[360px] md:order-2 md:min-h-0">
          <EarthCanvas />
        </div>
      </div>
    </Section>
  );
}
