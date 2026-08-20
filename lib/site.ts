export const SITE = {
  name: "Shiver Broker",
  tagline: "A Corretora dos Grandes Tubarões",
  url: "https://www.shiverbroker.com",
  email: "support@shiverbroker.com",
  description:
    "Shiver Broker (Shiver) é a corretora dos grandes tubarões: forex, crypto e opções com payout de até 97%. Abra conta ou teste a plataforma com $10.000 virtuais.",
  trade: {
    login: "https://trade.shiverbroker.com/pt/login",
    register: "https://trade.shiverbroker.com/pt/register",
    trial: "https://trade.shiverbroker.com/trial",
  },
  company: {
    legal:
      "Sun Wave LLC — registration number L 22402, registered address: Lighthouse Trust Nevis Ltd, Suite 1, A.L. Evelyn Ltd Building, Main Street, Charlestown, Nevis.",
    payments:
      "Payment transactions are managed by S.W. SUN WAVE CY LTD — registration number HE450991, registered address: Kyriakou Matsi & Anexartisias 3, ROUSSOS LIMASSOL TOWER, 4th Floor, 3040, Limassol, Cyprus.",
  },
} as const;

export const PDFS = [
  { id: "aml", label: "AML e KYC", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7fg/Shiver%20Broker%20AML%20and%20KYC%20Policy.pdf" },
  { id: "fees", label: "Taxas gerais", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7f0/Shiver%20Broker%20General%20Fees.pdf" },
  { id: "execution", label: "Execução de ordens", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7eg/Shiver%20Broker%20Order%20Execution%20Policy.pdf" },
  { id: "payment", label: "Pagamentos", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7cg/Shiver%20Broker%20Payment%20Policy.pdf" },
  { id: "cookies", label: "Cookies", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7dg/Shiver%20Broker%20Cookies%20Policy.pdf" },
  { id: "demo", label: "Contas demo", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7g0/Shiver%20Broker%20Demo%20Account.pdf" },
  { id: "risk", label: "Aviso de riscos", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3ursrq72d9165g/Shiver%20Broker%20Risk%20Disclosure.pdf" },
  { id: "withdrawal", label: "Política de saque", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7d0/Shiver%20Broker%20Withdrawal%20Policy.pdf" },
  { id: "margin", label: "Operação com margem", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3s2mcraq8an7gg/Shiver%20Broker%20Margin%20Trading.pdf" },
  { id: "refund", label: "Reembolso", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3ursrq72d91660/Shiver%20Broker%20Refund%20Policy.pdf" },
  { id: "promo", label: "Códigos promocionais", href: "https://fsms.trade.shiverbroker.com/storage/public/d6/jc/8a3ursrq72d91650/Shiver%20Broker%20Promo%20Code%20Policy.pdf" },
] as const;

export const NAV = [
  { label: "Plataforma", href: "/#plataforma" },
  { label: "Como funciona", href: "/#comofunciona" },
  { label: "Depósito", href: "/#liquidez" },
  { label: "Mercado", href: "/#mercado" },
  { label: "Tecnologia", href: "/#tecnologia" },
  { label: "Blog", href: "/blog" },
] as const;

export const ASSETS = [
  { name: "Tesla", ticker: "TSLA", payout: "+94.2%" },
  { name: "Apple", ticker: "AAPL", payout: "+93.6%" },
  { name: "Microsoft", ticker: "MSFT", payout: "+91.8%" },
  { name: "Amazon", ticker: "AMZN", payout: "+90.4%" },
  { name: "Netflix", ticker: "NFLX", payout: "+87.5%" },
  { name: "NVIDIA", ticker: "NVDA", payout: "+95.1%" },
  { name: "Alphabet", ticker: "GOOGL", payout: "+92.8%" },
  { name: "Meta", ticker: "META", payout: "+90.9%" },
  { name: "Alibaba", ticker: "BABA", payout: "+89.3%" },
  { name: "Spotify", ticker: "SPOT", payout: "+95.7%" },
  { name: "Disney", ticker: "DIS", payout: "+88.4%" },
  { name: "AMD", ticker: "AMD", payout: "+89.8%" },
] as const;

export type AssetTicker = (typeof ASSETS)[number]["ticker"];

export const PAY_METHODS = [
  { name: "Crypto", text: "Bitcoin, Ethereum e outros ativos digitais.", image: "/media/pay-crypto-mark.webp" },
  { name: "Cartão", text: "Depósito direto, sem espera teatral.", image: "/media/pay-card.webp" },
  { name: "Internacional", text: "Liquidez que não depende do fuso.", image: "/media/pay-globe.webp" },
] as const;

export const TESTIMONIALS_A = [
  { quote: "Faz um bom tempo q ja invisto aq na Shiver, já tô há uns 6 meses aqui e até agora só experiência boa, saque sempre caiu normal.", name: "Rafael Martins", date: "12 de Janeiro de 2026", photo: "/media/qgnnUuVZQQpRbBGUIBVGHYLsyas.jpg", stars: 5 },
  { quote: "Já investi em 3 outras corretoras antes dessa e sinceramente… essa aqui é a que menos me deu dor de cabeça, e o suporte é maravilhoso!", name: "Camila Rocha", date: "25 de Janeiro de 2026", photo: "/media/58MCOKeRmjAQCiiXVD66UdBdQfk.jpg", stars: 5 },
  { quote: "Curto bastante as promos deles, não é aquelas parada forçada que vc nunca consegue pegar", name: "Camila Rocha", date: "03 de Fevereiro de 2026", photo: "/media/hohIfWsos930yegOWb5yDhKUk.jpg", stars: 4.5 },
  { quote: "O que mais me ganhou foi a plataforma, roda lisa até no meu pc lerdo que eu tenho kkk", name: "Juliana Alves", date: "10 de Fevereiro de 2026", photo: "/media/H4gTgMwHssKpit5qErOWico68.jpg", stars: 5 },
  { quote: "Não sou trader avançado nem nada, mas achei bem fácil de usar comparado com outras, bem intuitivo.", name: "Felipe Gomes", date: "27 de Fevereiro de 2026", photo: "/media/eMuW4wXen0xzAsEljP2pBtuPlZQ.jpg", stars: 4 },
  { quote: "Suporte respondeu rápido quando precisei, coisa rara hoje em dia", name: "Bruno Teixeira", date: "05 de Março de 2026", photo: "/media/BRX1DBdbJGNJVJErjdjhApmqw4.jpg", stars: 4.5 },
  { quote: "Tô usando já faz uns meses e até agora nada pra reclamar, bem estável.", name: "Diego Nunes", date: "09 de Março de 2026", photo: "/media/2kOkmJfK2g77Bpc2tUb8dhsao.jpg", stars: 4.5 },
] as const;

export const TESTIMONIALS_B = [
  { quote: "Já passei por corretora que travava direto… aqui pelo menos dá pra operar tranquilo, e o layout é lindo!", name: "Ricardo Batista", date: "14 de Março de 2026", photo: "/media/bqwKdemIkUuIDyuPAEWuJYAiY.jpg", stars: 5 },
  { quote: "Achei que seria mais uma igual as outras, mas me surpreendeu real", name: "Gustavo Ribeiro", date: "18 de Março de 2026", photo: "/media/05UHNiVrTtnWBMkqoXRlJJ9UA.jpg", stars: 4.5 },
  { quote: "As campanhas deles até que são boas, dá uma animada pra continuar operando.", name: "Marcela Duarte", date: "22 de Março de 2026", photo: "/media/XMWqHfNFfPF1VvKjLrZ92bzMMGU.jpg", stars: 4 },
  { quote: "Saque foi o que me fez continuar, caiu certinho e rápido", name: "Eduardo Pires", date: "26 de Março de 2026", photo: "/media/F3ykpP62RzafpxNjtVWu15yyc.jpg", stars: 5 },
  { quote: "Plataforma bem organizada, não fica perdido igual em outras que já usei", name: "Vinícius Barros", date: "28 de Março de 2026", photo: "/media/IriJNzexVLncaKudw6dc7cqyDok.jpg", stars: 4.5 },
  { quote: "Comecei com pouco e fui pegando confiança aos poucos, até agora tá valendo a pena, sou vip e me dao bastante atenção", name: "Thiago Moreira", date: "30 de Março de 2026", photo: "/media/E85uzuXtgx9wBcSMXxmvAaOypA.jpg", stars: 5 },
  { quote: "No geral, comparando com outras que testei, essa aqui tá acima mesmo", name: "Renato Farias", date: "31 de Março de 2026", photo: "/media/rVs6IqpXtLLycDX6DcDKk8QHnk.jpg", stars: 4.5 },
] as const;
