import { createFileRoute, Link } from "@tanstack/react-router";
import { sites } from "@/lab/sites";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laboratório de Sites ODS — Aprenda Explorando" },
      {
        name: "description",
        content:
          "Explore sites-modelo sobre as ODS, clique nos elementos e aprenda HTML e CSS na prática.",
      },
      { property: "og:title", content: "Laboratório de Sites ODS — Aprenda Explorando" },
      {
        property: "og:description",
        content: "Explore exemplos, descubra como foram construídos e aprenda criando.",
      },
    ],
  }),
  component: Index,
});

const passos = [
  ["1", "Escolha um site", "Abra um dos seis sites-modelo sobre as ODS."],
  ["2", "Clique em qualquer elemento", "Títulos, imagens, botões, cards… tudo é clicável."],
  [
    "3",
    "Leia, copie e experimente",
    "Veja o HTML e o CSS e altere cores e tamanhos em tempo real.",
  ],
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <span className="font-display text-lg font-bold text-primary">{"</>"} Lab ODS</span>
        <span className="text-sm text-muted-foreground">HTML + CSS para iniciantes</span>
      </header>
      <main id="conteudo-principal">
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-10">
          <p className="mb-4 inline-block rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-secondary-foreground">
            Aprenda explorando
          </p>
          <h1 className="max-w-3xl font-display text-5xl font-bold leading-tight text-foreground md:text-6xl">
            Laboratório de Sites ODS
          </h1>
          <p className="mt-5 max-w-2xl text-xl text-muted-foreground">
            Explore exemplos, descubra como foram construídos e aprenda criando.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {passos.map(([n, t, d]) => (
              <div key={n} className="rounded-xl border bg-card p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-display font-bold text-accent-foreground">
                  {n}
                </span>
                <h2 className="mt-3 font-semibold text-foreground">{t}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="mb-6 font-display text-3xl font-bold text-foreground">
            Galeria de sites-modelo
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sites.map((s) => (
              <article
                key={s.slug}
                className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={s.thumb}
                    alt={`Imagem de apresentação da ODS ${s.num} — ${s.nome}`}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                    loading="lazy"
                  />
                  <span
                    className="absolute left-3 top-3 rounded-md px-2 py-1 font-display text-sm font-bold text-primary-foreground"
                    style={{ backgroundColor: s.cor }}
                  >
                    ODS {s.num}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-card-foreground">{s.nome}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.resumo}</p>
                  <Link
                    to="/site/$slug"
                    params={{ slug: s.slug }}
                    className="mt-4 inline-flex rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    Explorar site →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <footer className="border-t py-6 text-center text-sm text-muted-foreground">
        Laboratório de Sites ODS — Aprenda Explorando
      </footer>
    </div>
  );
}
