import { SITE } from "./site";
import type { PostSlug } from "./blog";

export const postBodies: Record<PostSlug, string> = {
  "opcoes-binarias": `
<p>Se você está entrando no mundo dos <strong>investimentos</strong> e já ouviu falar em <strong>opções binárias</strong>, mas ainda não sabe exatamente o que são ou como funcionam, este artigo é para você.</p>
<h2>O que são opções binárias?</h2>
<p>Opções binárias são um tipo de instrumento financeiro onde você prevê se o preço de um ativo vai <strong>subir ou cair</strong> em um determinado período de tempo. O resultado é binário: ou você acerta e recebe um lucro pré-determinado, ou erra e perde o valor investido naquela operação.</p>
<h2>Como funciona na prática?</h2>
<p>Imagine que você acredita que o preço do ouro vai subir nos próximos 5 minutos. Você entra com R$ 100 em uma operação de CALL (compra). Se o preço subir, você recebe um payout pré-definido. Se cair, você perde o valor investido naquela operação.</p>
<p><strong>CALL:</strong> o preço vai subir. <strong>PUT:</strong> o preço vai cair. <strong>Payout:</strong> percentual de retorno. <strong>Expiração:</strong> tempo até o resultado.</p>
<h2>Quais ativos posso operar?</h2>
<p>Na <a href="/">Shiver Broker</a> você pode operar em mais de 392 ativos, incluindo pares de moedas (Forex), criptomoedas, ações globais, commodities e índices.</p>
<h2>Tipos de opções</h2>
<ul><li>Opções clássicas: minutos a horas</li><li>Blitz/Turbo: 30 segundos a 3 minutos</li><li>Forex: variação cambial com maior liquidez</li></ul>
<p>Antes de operar com dinheiro real, utilize a <a href="${SITE.trade.trial}">conta demo da Shiver Broker</a> com $10.000 virtuais.</p>
<h2>Opções binárias são legais no Brasil?</h2>
<p>No Brasil, opções binárias não são reguladas pela CVM. Operar em corretoras internacionais como a Shiver Broker é uma decisão do usuário, que deve declarar ganhos no Imposto de Renda quando aplicável. A Shiver não é autorizada pela CVM a ofertar valores mobiliários publicamente no Brasil.</p>
<h2>Riscos</h2>
<p>Opções binárias envolvem risco real. A cada operação você pode perder 100% do valor investido. Nunca invista dinheiro que você não pode perder.</p>
`,
  confiavel: `
<p>Se você está considerando abrir uma conta na <strong>Shiver Broker</strong> e quer entender se a plataforma é segura antes de depositar, esta análise reúne os pontos públicos da operação.</p>
<h2>O que é a Shiver Broker?</h2>
<p>A Shiver Broker é uma corretora internacional de opções binárias, forex e ativos digitais. A empresa é registrada como Sun Wave LLC, número L 22402. Transações financeiras são processadas pela S.W. SUN WAVE CY LTD (HE450991), em Limassol, Chipre.</p>
<h2>Regulamentação</h2>
<p>A Shiver Broker não é autorizada pela CVM brasileira para oferta pública de valores mobiliários no Brasil — o que é comum para corretoras internacionais deste segmento.</p>
<h2>Pontos públicos</h2>
<ul>
<li>Payout máximo até 97% em crypto</li>
<li>392+ ativos globais</li>
<li>Conta demo com $10.000 virtuais</li>
<li>9+ métodos de pagamento</li>
<li>Suporte 24/7</li>
<li>Documentação legal pública (AML, taxas, execução, saque e risco)</li>
</ul>
<p>Como toda operação neste mercado, há risco. Gestão de banca e leitura das políticas legais são obrigatórias antes de investir.</p>
`,
  "shiver-vip": `
<p>O programa VIP da <a href="/">Shiver Broker</a> oferece acesso a funcionalidades, suporte e condições de trading exclusivas para traders que querem outro nível de operação.</p>
<h2>Vantagens</h2>
<h3>1. A.I Financial™ integrada</h3>
<p>Traders VIP têm acesso à tecnologia A.I Financial™, integrada à operação para análise de padrões e insights em tempo real.</p>
<h3>2. Suporte gerenciado</h3>
<p>Clientes VIP têm gerente de investimentos com prioridade 24/7.</p>
<h3>3. Saques personalizados</h3>
<p>Limites diferenciados e processamento prioritário.</p>
<h3>4. Cupons e condições exclusivas</h3>
<p>Campanhas e promoções que não estão na conta padrão.</p>
<h3>5. Premiações presenciais</h3>
<p>Eventos para traders VIP de alto nível.</p>
<h3>6. Ativos tecnológicos</h3>
<p>Modalidades adicionais liberadas para mais performance.</p>
`,
  jornada: `
<p>Guia para quem está começando do zero na <a href="/">Shiver Broker</a>: do cadastro ao primeiro saque.</p>
<h2>Fase 1: Abertura de conta (Dia 1)</h2>
<p>Acesse shiverbroker.com, clique em Criar conta e preencha seus dados. Confirme o e-mail e ative a conta demo com $10.000 virtuais.</p>
<h2>Fase 2: Aprendizado na demo (Semanas 1–4)</h2>
<p>Conheça ativos, indicadores, estratégia e gestão de banca (regra dos 2%) antes de depositar.</p>
<h2>Fase 3: Primeiro depósito</h2>
<p>A Shiver oferece mais de 9 métodos de pagamento. Comece com um valor que não comprometa seu orçamento.</p>
<h2>Fase 4: Conta real</h2>
<p>Mantenha stop diário, meta de lucro e máximo 2% de risco por operação.</p>
<h2>Fase 5: KYC</h2>
<p>Antes do primeiro saque, envie documento com foto e comprovante de residência. O processo leva 24–48 horas.</p>
<h2>Fase 6: Primeiro saque</h2>
<p>Na área financeira, escolha o método, informe o valor e confirme. Pix e criptomoedas tendem a ser os mais ágeis.</p>
`,
};

export function hasPostBody(slug: string): slug is PostSlug {
  return Object.prototype.hasOwnProperty.call(postBodies, slug);
}

export function warmBlogCache() {
  return Object.keys(postBodies).length;
}
