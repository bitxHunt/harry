import { culture, profile } from "@/data";

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 pb-10 md:px-10">
      <div className="holo-panel flex flex-wrap items-center justify-between gap-4 px-5 py-4 font-mono text-[11px] text-dim">
        <p>
          © {year} {profile.name} · built on Arch, btw{culture.myanmar && <> · ကျေးဇူးတင်ပါတယ် <span className="text-dim">(thank you)</span></>}
        </p>
        <ul className="flex flex-wrap gap-4">
          {profile.socials.map((s) => (
            <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-block py-2 transition hover:text-holo md:py-0">{s.label.toLowerCase()}</a></li>
          ))}
          <li><a href={`mailto:${profile.email}`} className="inline-block py-2 transition hover:text-holo md:py-0">email</a></li>
        </ul>
      </div>
    </footer>
  );
}
