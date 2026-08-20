import { PDFS, SITE } from "./site";
import type { PostSlug } from "./blog";

const trial = SITE.trade.trial;
const home = "/";
const aml = PDFS.find((item) => item.id === "aml")?.href ?? "/";
const fees = PDFS.find((item) => item.id === "fees")?.href ?? "/";
const execution = PDFS.find((item) => item.id === "execution")?.href ?? "/";
const payment = PDFS.find((item) => item.id === "payment")?.href ?? "/";
const withdrawal = PDFS.find((item) => item.id === "withdrawal")?.href ?? "/";
const risk = PDFS.find((item) => item.id === "risk")?.href ?? "/";

export const postBodies: Record<PostSlug, string> = {
  "opcoes-binarias": `
<p>Se você está entrando no mundo dos <strong>investimentos</strong> e já ouviu falar em <strong>opções binárias</strong>, mas ainda não sabe exatamente o que são ou como funcionam, este artigo é para você. Vamos explicar tudo de forma clara, objetiva e sem enrolação.</p>
<h2>O que são opções binárias?</h2>
<p>Opções binárias são um instrumento financeiro em que você prevê se o preço de um ativo vai <strong>subir ou cair</strong> em um período determinado. O resultado é binário: acertou, recebe um lucro pré-definido; errou, perde o valor daquela operação.</p>
<p>O nome “binário” vem exatamente disso — dois resultados possíveis. É uma forma de operar direta, com payout visível antes de entrar, o que atrai quem quer decisão rápida sem a complexidade de um book de ofertas.</p>
<h2>Como funciona na prática?</h2>
<p>Imagine que você acredita que o preço do ouro vai subir nos próximos 5 minutos. Você entra com R$ 100 em uma operação de <em>CALL</em>. Se o preço subir, com payout de 85% você recebe R$ 185 de volta — lucro de R$ 85. Se cair, perde os R$ 100 daquela operação.</p>
<aside class="post-note">
  <strong>Termos essenciais</strong>
  <p><strong>CALL:</strong> você opera a alta. <strong>PUT:</strong> você opera a queda. <strong>Payout:</strong> percentual de retorno sobre o valor investido em caso de acerto. <strong>Expiração:</strong> tempo até o resultado da operação.</p>
</aside>
<h2>Quais ativos posso operar?</h2>
<p>Na <a href="${home}">Shiver Broker</a> você opera mais de 392 ativos, incluindo:</p>
<ul>
  <li>Pares de moedas (Forex) — EUR/USD, GBP/BRL e outros</li>
  <li>Criptomoedas — Bitcoin, Ethereum, Solana</li>
  <li>Ações globais — Tesla, Apple, Amazon</li>
  <li>Commodities — ouro, petróleo, prata</li>
  <li>Índices — S&amp;P 500, Nasdaq, Ibovespa</li>
</ul>
<h2>Quais são os tipos de opções?</h2>
<ul>
  <li><strong>Opções clássicas:</strong> expiração de minutos a horas</li>
  <li><strong>Blitz / Turbo:</strong> 30 segundos a 3 minutos — para quem disputa o milissegundo</li>
  <li><strong>Forex:</strong> variação cambial com maior liquidez</li>
</ul>
<aside class="post-note">
  <strong>Dica Shiver</strong>
  <p>Antes de operar com dinheiro real, use a <a href="${trial}">conta demo da Shiver Broker</a> com $10.000 virtuais. É o caminho mais seguro para aprender a plataforma sem risco de capital.</p>
</aside>
<h2>Opções binárias são legais no Brasil?</h2>
<p>No Brasil, opções binárias não são reguladas pela CVM. Operar em corretoras internacionais como a Shiver Broker é uma decisão do usuário, que deve declarar ganhos no Imposto de Renda quando aplicável. A Shiver não é autorizada pela CVM a ofertar valores mobiliários publicamente no Brasil.</p>
<h2>Vantagens de operar opções binárias</h2>
<ul>
  <li>Resultado claro e imediato</li>
  <li>Capital inicial relativamente baixo para começar</li>
  <li>Payout conhecido antes da ordem</li>
  <li>Flexibilidade de horário — crypto opera 24h</li>
</ul>
<h2>Riscos que você precisa conhecer</h2>
<p>Opções binárias envolvem risco real. A cada operação você pode perder 100% do valor investido. Por isso, gestão de banca vem antes da próxima ordem. Nunca invista dinheiro que você não pode perder.</p>
`,
  confiavel: `
<p>Se você chegou até aqui, provavelmente está considerando abrir uma conta na <strong>Shiver Broker</strong> e quer ter certeza de que é uma plataforma segura antes de depositar. Essa é a pergunta certa — e a resposta precisa ser transparente.</p>
<h2>O que é a Shiver Broker?</h2>
<p>A Shiver Broker é uma corretora internacional de opções binárias, forex e ativos digitais, feita para traders que exigem performance, tecnologia e clareza. A empresa é registrada como Sun Wave LLC, número L 22402. As transações financeiras são processadas pela S.W. SUN WAVE CY LTD (HE450991), em Limassol, Chipre.</p>
<h2>Regulamentação e legalidade</h2>
<p>A Shiver Broker não é autorizada pela CVM brasileira para oferta pública de valores mobiliários no Brasil — o que é comum neste segmento internacional. Brasileiros que operam devem declarar ganhos no exterior no Imposto de Renda, quando houver.</p>
<aside class="post-note">
  <strong>Documentos legais públicos</strong>
  <p>A Shiver publica as políticas de <a href="${aml}">AML/KYC</a>, <a href="${fees}">taxas</a>, <a href="${execution}">execução de ordens</a>, <a href="${payment}">pagamento</a>, <a href="${withdrawal}">saque</a> e <a href="${risk}">risco</a>. Leia antes de depositar.</p>
</aside>
<h2>O que clientes relatam</h2>
<ul>
  <li><strong>Saques:</strong> “Saque foi o que me fez continuar, caiu certinho e rápido” — Eduardo P.</li>
  <li><strong>Suporte:</strong> “Suporte respondeu rápido quando precisei, coisa rara hoje em dia” — Bruno T.</li>
  <li><strong>Plataforma:</strong> “Roda lisa até no meu PC lerdo” — Juliana A.</li>
  <li><strong>Estabilidade:</strong> “Tô usando há uns 6 meses, até agora só experiência boa” — Rafael M.</li>
</ul>
<h2>Pontos públicos verificáveis</h2>
<table class="post-table">
  <thead>
    <tr><th>Ponto</th><th>O que aparece</th></tr>
  </thead>
  <tbody>
    <tr><td>Payout máximo</td><td>Até 97% em crypto</td></tr>
    <tr><td>Ativos</td><td>392+ globais</td></tr>
    <tr><td>Conta demo</td><td>$10.000 virtuais</td></tr>
    <tr><td>Métodos de pagamento</td><td>Mais de 9 opções</td></tr>
    <tr><td>Suporte</td><td>24/7</td></tr>
    <tr><td>Documentação</td><td>Pública e acessível</td></tr>
  </tbody>
</table>
<h2>Conclusão</h2>
<p>Com base na documentação pública, no funcionamento da plataforma e no que os usuários relatam, a <a href="${home}">Shiver Broker</a> apresenta infraestrutura, payout competitivo e suporte que responde. Como toda operação neste mercado, o risco é real e pede gestão de banca — e leitura das políticas — antes do primeiro depósito.</p>
`,
  "shiver-vip": `
<p>Você já ouviu falar no <strong>programa VIP da Shiver Broker</strong> e ficou curioso se realmente vale? Aqui estão as vantagens — e para quem esse nível faz diferença.</p>
<h2>O que é o programa VIP da Shiver?</h2>
<p>O VIP da <a href="${home}">Shiver Broker</a> não é um selo. É um nível de conta com funcionalidades, suporte e condições que a conta padrão ainda não vê. Foi feito para quem já saiu da média e quer operar na frente.</p>
<h2>Vantagens exclusivas</h2>
<h3>1. A.I Financial™ na operação</h3>
<p>Traders VIP acessam a tecnologia <strong>A.I Financial™</strong> integrada à plataforma: leitura de padrões e insights em tempo real para quem não quer decidir no escuro.</p>
<h3>2. Suporte gerenciado, sem fila geral</h3>
<p>Enquanto a conta comum entra no suporte padrão, o VIP tem gerente com prioridade 24/7. Sem teatro de ticket, sem espera teatral.</p>
<h3>3. Saques com prioridade</h3>
<p>Limites e ritmo diferenciados, com processamento na frente de quem ainda está na fila geral.</p>
<h3>4. Cupons e condições que não aparecem no cadastro padrão</h3>
<p>Campanhas, cupons e condições liberadas só para quem já performa nesse nível.</p>
<h3>5. Premiações presenciais</h3>
<p>Eventos para quem já saiu da média: networking, premiações e o que o restante da plataforma ainda não mostra.</p>
<h3>6. Ativos e modalidades liberados</h3>
<p>Mais instrumentos e modalidades para quem opera pesado — o que a conta comum ainda não destrava.</p>
<aside class="post-note">
  <strong>O que dizem os VIPs</strong>
  <p>“Comecei com pouco e fui pegando confiança aos poucos, até agora tá valendo a pena, sou VIP e me dão bastante atenção.” — Thiago M.</p>
</aside>
<h2>Vale a pena ser VIP?</h2>
<p>Para quem opera com volume e consistência, sim: A.I Financial™, gerente dedicado e saque prioritário mudam o ritmo da operação. A demanda sobe. As vantagens não são iguais para todo mundo.</p>
<p>Quer sentir a plataforma antes? Abra a <a href="${trial}">conta demo com $10.000 virtuais</a> e veja o que a conta padrão já entrega — o VIP é o próximo degrau.</p>
`,
  jornada: `
<p>Este é o guia para quem está começando do zero na <a href="${home}">Shiver Broker</a>: do cadastro ao primeiro saque, com o que fazer em cada fase.</p>
<h2>Fase 1: Abertura de conta (dia 1)</h2>
<p>Acesse shiverbroker.com, clique em <strong>Criar conta</strong> e preencha os dados. O processo leva poucos minutos. Confirme o e-mail, entre na plataforma e ative a demo com $10.000 virtuais.</p>
<aside class="post-note">
  <strong>Checklist do dia 1</strong>
  <p>Cadastro feito · e-mail confirmado · primeiro acesso · demo com $10.000 virtuais ativa.</p>
</aside>
<h2>Fase 2: Aprendizado na demo (semanas 1 a 4)</h2>
<p>Antes de depositar, passe pelo menos duas a quatro semanas só na demo. Nesse período:</p>
<ul>
  <li>Teste ativos e modalidades (clássica, blitz, forex, crypto)</li>
  <li>Aprenda os indicadores da plataforma</li>
  <li>Defina entrada, saída e gestão de banca (regra dos 2%)</li>
  <li>Registre as operações — o diário mostra o que a memória esconde</li>
</ul>
<h2>Fase 3: Primeiro depósito (semana 4+)</h2>
<p>Quando a demo mostrar consistência por pelo menos duas semanas, o depósito inicial faz sentido. Comece com um valor que não comprometa o orçamento. A Shiver oferece mais de 9 métodos, incluindo crypto e cartão.</p>
<h2>Fase 4: Primeiras semanas na conta real (mês 1 e 2)</h2>
<p>Repita a disciplina da demo. Com dinheiro real a emoção sobe — o plano não pode cair. Mantenha:</p>
<ul>
  <li>Stop diário rigoroso</li>
  <li>Meta de lucro do dia</li>
  <li>No máximo 2% de risco por operação</li>
</ul>
<h2>Fase 5: KYC (antes do primeiro saque)</h2>
<p>Para sacar, complete a verificação: documento com foto e comprovante de residência. O processo costuma levar 24 a 48 horas. Não deixe o KYC para o dia em que você quiser o dinheiro na conta.</p>
<h2>Fase 6: Primeiro saque</h2>
<p>Na área financeira, escolha o método, informe o valor e confirme. Pix e criptomoedas tendem a ser os caminhos mais ágeis. Se o saque caiu, você fechou o ciclo que a maioria só comenta.</p>
<aside class="post-note">
  <strong>Daqui para frente</strong>
  <p>Reinvista parte do lucro, mantenha o diário e, quando o volume subir, avalie o programa VIP. A conta demo continua disponível para testar o que ainda não entrou na real.</p>
</aside>
<h2>Linha do tempo</h2>
<table class="post-table">
  <thead>
    <tr><th>Fase</th><th>Quando</th><th>Objetivo</th></tr>
  </thead>
  <tbody>
    <tr><td>Cadastro</td><td>Dia 1</td><td>Conta e demo ativas</td></tr>
    <tr><td>Demo</td><td>Semanas 1–4</td><td>Estratégia testada</td></tr>
    <tr><td>Depósito</td><td>Semana 4+</td><td>Conta real</td></tr>
    <tr><td>Operação</td><td>Meses 1–2</td><td>Disciplina com banca real</td></tr>
    <tr><td>KYC</td><td>Em paralelo</td><td>Verificação concluída</td></tr>
    <tr><td>Primeiro saque</td><td>Mês 1–2</td><td>Ciclo completo</td></tr>
  </tbody>
</table>
`,
};

export function hasPostBody(slug: string): slug is PostSlug {
  return Object.prototype.hasOwnProperty.call(postBodies, slug);
}

export function warmBlogCache() {
  return Object.keys(postBodies).length;
}
