import AdminDialog from "./admin-dialog";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
        <a href="#top" className="flex items-center gap-2 transition-opacity hover:opacity-80">
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
            Сделано с <span className="text-fuchsia-400" aria-hidden="true">♥</span> на Next.js
          </p>
          <AdminDialog />
        </div>
      </div>
    </footer>
  );
}
