import AdminDialog from "./admin-dialog";

const footerNav = [
  { label: "Кейсы", href: "#cases" },
  { label: "Проекты", href: "#projects" },
  { label: "Обо мне", href: "#about" },
  { label: "Технологии", href: "#tech" },
  { label: "Этапы", href: "#process" },
  { label: "Цены", href: "#prices" },
  { label: "FAQ", href: "#faq" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <a
            href="#top"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 text-sm">
              <span aria-hidden="true">🦆</span>
            </span>
            <span className="font-display text-base font-bold">Erriour</span>
          </a>

          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Erriour. От логотипа до логики.
          </p>

          <div className="flex items-center gap-3">
            <p className="text-sm text-zinc-500">
              Сделано с{" "}
              <span className="text-fuchsia-400" aria-hidden="true">
                ♥
              </span>{" "}
              на Next.js
            </p>
            <AdminDialog />
          </div>
        </div>

        <nav
          aria-label="Навигация в футере"
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/5 pt-5 text-sm"
        >
          {footerNav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="link-underline text-zinc-500 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
