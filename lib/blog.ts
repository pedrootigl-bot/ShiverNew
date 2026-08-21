import { SITE } from "./site";

export const posts = [
  {
    slug: "opcoes-binarias",
    title: "O Que é Opções Binárias e Como Funciona Na Prática",
    navTitle: "Opções Binárias",
    teaser: "CALL, PUT, payout e expiração na prática",
    excerpt:
      "Se você está entrando no mundo dos investimentos e já ouviu falar em opções binárias, mas ainda não sabe exatamente o que são ou como funcionam, este artigo é para você. Vamos explicar tudo de forma clara, objetiva e sem enrolação.",
    image: "/media/blog/opcoes-binarias.webp",
    description:
      "Entenda o que são opções binárias, CALL, PUT, payout e expiração. Como investir em forex, crypto e commodities na Shiver Broker.",
    category: "Artigos",
    date: "2026-04-18",
    updated: "2026-08-21",
    displayDate: "18 de abr. de 2026",
    keywords: ["opções binárias", "CALL", "PUT", "payout", "forex"],
  },
  {
    slug: "confiavel",
    title: "Shiver Broker é Confiável? Análise Completa e Honesta",
    navTitle: "Shiver é confiável?",
    teaser: "Regulamentação, saques e o que conferir",
    excerpt:
      "Se você chegou até aqui, provavelmente está considerando abrir uma conta na Shiver Broker e quer ter certeza de que é uma plataforma segura antes de depositar seu dinheiro. Essa é a pergunta certa a se fazer — e vamos respondê-la com transparência total.",
    image: "/media/blog/confiavel.webp",
    description:
      "A Shiver Broker é confiável? Veja regulamentação, Sun Wave LLC, saques, suporte 24/7 e documentos legais da corretora Shiver Broker.",
    category: "Notícias",
    date: "2026-04-22",
    updated: "2026-08-21",
    displayDate: "22 de abr. de 2026",
    keywords: ["Shiver Broker", "Sun Wave LLC", "regulamentação", "CVM"],
  },
  {
    slug: "shiver-vip",
    title: "Shiver Broker VIP: Vale a Pena? Vantagens Exclusivas Explicadas",
    navTitle: "Programa VIP",
    teaser: "A.I Financial™, saque prioritário e fila preferencial",
    excerpt:
      "Você já ouviu falar no programa VIP da Shiver Broker e ficou curioso se realmente vale o investimento? Neste artigo, detalhamos todas as vantagens e quem realmente se beneficia desse nível premium.",
    image: "/media/blog/shiver-vip.webp",
    description:
      "Programa VIP da Shiver Broker: A.I Financial™, saques prioritários, cupons e premiações para grandes tubarões do mercado financeiro.",
    category: "Recursos",
    date: "2026-04-15",
    updated: "2026-08-21",
    displayDate: "15 de abr. de 2026",
    keywords: ["VIP", "A.I Financial", "saque prioritário"],
  },
  {
    slug: "jornada",
    title: "Da Conta Demo Ao Primeiro Saque: Jornada Completa Na Shiver Broker",
    navTitle: "Demo ao saque",
    teaser: "Do cadastro com $10.000 virtuais ao primeiro saque",
    excerpt:
      "Este é o guia definitivo para quem está começando do zero na Shiver Broker. Vamos cobrir cada etapa, do cadastro ao primeiro saque, com conselhos práticos para cada fase da jornada.",
    image: "/media/blog/jornada.webp",
    description:
      "Guia para investir na Shiver Broker: conta demo de $10.000, depósito, KYC e primeiro saque na corretora Shiver.",
    category: "Artigos",
    date: "2026-04-20",
    updated: "2026-08-21",
    displayDate: "20 de abr. de 2026",
    keywords: ["conta demo", "KYC", "saque", "depósito"],
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

export function morePosts(slug: string, limit = 3) {
  const current = getPost(slug);
  const rest = posts.filter((post) => post.slug !== slug);
  const same = rest.filter((post) => post.category === current?.category);
  const other = rest.filter((post) => post.category !== current?.category);
  return [...same, ...other].slice(0, limit);
}

export function adjacentPosts(slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}
