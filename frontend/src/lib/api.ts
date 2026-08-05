const API_URL = import.meta.env.VITE_API_URL ?? 'https://cristiannavarro-github-io.vercel.app:3000/api';

export interface ContactInput {
  name: string;
  email: string;
  message: string;
}

export async function sendContact(input: ContactInput): Promise<void> {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? 'No se pudo enviar el mensaje');
  }
}
