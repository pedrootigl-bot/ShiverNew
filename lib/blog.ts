import { SITE } from "./site";

export const posts = [
  {
    slug: "opcoes-binarias",
    title: "O Que é Opções Binárias e Como Funciona Na Prática",
    navTitle: "Opções Binárias",
    teaser: "O mecanismo que o mercado não explica",
    description:
      "Entenda o que são opções binárias, CALL, PUT, payout e expiração. Como investir em forex, crypto e commodities na Shiver Broker.",
    category: "Artigos",
    date: "2026-04-18",
    displayDate: "18 de abr. de 2026",
    keywords: [
      "opções binárias",
      "Shiver",
      "Shiver Broker",
      "investir Shiver",
      "forex",
      "blitz",
    ],
  },
  {
    slug: "confiavel",
    title: "Shiver Broker é Confiável? Análise Completa e Honesta",
    navTitle: "Shiver é confiável?",
    teaser: "O que aparece — e o que conferir",
    description:
      "A Shiver Broker é confiável? Veja regulamentação, Sun Wave LLC, saques, suporte 24/7 e documentos legais da corretora Shiver Broker.",
    category: "Notícias",
    date: "2026-04-22",
    displayDate: "22 de abr. de 2026",
    keywords: [
      "shiver broker",
      "corretora shiver broker",
      "shiverbroker",
      "shiver investimento",
    ],
  },
  {
    slug: "shiver-vip",
    title: "Shiver Broker VIP: Vale a Pena? Vantagens Exclusivas Explicadas",
    navTitle: "Programa VIP",
    teaser: "O que só o próximo nível destrava",
    description:
      "Programa VIP da Shiver Broker: A.I Financial™, saques prioritários, cupons e premiações para grandes tubarões do mercado financeiro.",
    category: "Recursos",
    date: "2026-04-15",
    displayDate: "15 de abr. de 2026",
    keywords: ["grandes tubarões", "shiver broker vip", "mercado financeiro"],
  },
  {
    slug: "jornada",
    title: "Da Conta Demo Ao Primeiro Saque: Jornada Completa Na Shiver Broker",
    navTitle: "Da demo ao saque",
    teaser: "O caminho de quem realmente opera",
    description:
      "Guia para investir na Shiver Broker: conta demo de $10.000, depósito, KYC e primeiro saque na corretora Shiver.",
    category: "Artigos",
    date: "2026-04-20",
    displayDate: "20 de abr. de 2026",
    keywords: ["shiver investimento", "shiver investir", "conta demo"],
  },
] as const;

export type Post = (typeof posts)[number];
export type PostSlug = Post["slug"];

export function postUrl(slug: string) {
  return `${SITE.url}/blog/${slug}`;
}

export function postsByDate() {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

export function morePosts(slug: string, limit = 2) {
  const current = getPost(slug);
  const rest = postsByDate().filter((post) => post.slug !== slug);
  const same = rest.filter((post) => post.category === current?.category);
  const other = rest.filter((post) => post.category !== current?.category);
  return [...same, ...other].slice(0, limit);
}
