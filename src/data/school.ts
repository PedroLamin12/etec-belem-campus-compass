import portaria from "@/assets/photos/portaria-arco-real.jpg.asset.json";
import portariaEntrada from "@/assets/photos/portaria-entrada.jpg.asset.json";
import aerial from "@/assets/photos/campus-aerial-v2.jpg.asset.json";
import estacionamento from "@/assets/photos/estacionamento-entrada-real.jpg.asset.json";
import quadra1 from "@/assets/photos/quadra1.jpg.asset.json";
import quadras from "@/assets/photos/quadras.jpg.asset.json";
import refeitorio from "@/assets/photos/refeitorio-mesas-azuis-real.jpg.asset.json";
import pilotis from "@/assets/photos/patio-pilotis-real.jpg.asset.json";
import fachada from "@/assets/photos/predio-principal-exterior-real.jpg.asset.json";
import salaAula from "@/assets/photos/sala-aula.jpg.asset.json";
import labInfo from "@/assets/photos/lab-info.jpg.asset.json";
import labInfo2 from "@/assets/photos/lab-info2.jpg.asset.json";
import nutricao from "@/assets/photos/nutricao.jpg.asset.json";
import auditorio from "@/assets/photos/auditorio.jpg.asset.json";
import areaAberta from "@/assets/photos/area-aberta.jpg.asset.json";
import alameda from "@/assets/photos/alameda.jpg.asset.json";

export const mainBuildingPhoto = fachada.url;
export const annexPhoto = aerial.url;
export const aerialPhoto = aerial.url;
export const heroPhoto = fachada.url;

export type Level = "externa" | "subsolo" | "terreo" | "andar1" | "andar2";
export const levelLabel: Record<Level, string> = {
  externa: "Área Externa",
  subsolo: "Subsolo",
  terreo: "Térreo",
  andar1: "1º Andar",
  andar2: "2º Andar",
};

export type Building = "externa" | "principal" | "anexo";
export const buildingLabel: Record<Building, string> = {
  externa: "Área Externa",
  principal: "Prédio Principal",
  anexo: "Bloco Anexo",
};

/** Waypoints of the school plan. x/y live in the map's 360x520 viewBox. */
export type NodeId =
  | "portaria" | "rampa" | "alameda" | "caixa" | "quadra1" | "quadra2"
  | "patio" | "caminhoQuadras" | "cantina" | "secretaria" | "coordenacao" | "escada"
  | "corredor" | "salas" | "acessoAnexo" | "escadaAnexo" | "nutricao" | "auditorio" | "lab1" | "lab2"
  | "banheiros" | "finalPrincipal" | "escada2" | "corredor2" | "convivencia";

export const nodes: Record<NodeId, { x: number; y: number; level: Level; building: Building; label: string; landmark: string; accessOnly?: boolean }> = {
  portaria: { x: 236, y: 38, level: "externa", building: "externa", label: "Portaria principal", landmark: "Arco amarelo e guarita vermelha na entrada da escola." },
  rampa: { x: 232, y: 76, level: "externa", building: "externa", label: "Rampa de acesso", landmark: "Rampa com corrimão logo após o arco da portaria." },
  alameda: { x: 260, y: 116, level: "externa", building: "externa", label: "Estacionamento e Alameda", landmark: "Vagas de estacionamento próximas à portaria. Siga pela alameda até o pátio sob o Prédio Principal." },
  caminhoQuadras: { x: 238, y: 170, level: "externa", building: "externa", label: "Caminho externo para as quadras", landmark: "Siga pela área externa ao lado do Prédio Principal, contornando o estacionamento." },
  caixa: { x: 288, y: 262, level: "externa", building: "externa", label: "Caixa d'água", landmark: "Torre cilíndrica de concreto junto às quadras." },
  quadra1: { x: 312, y: 352, level: "externa", building: "externa", label: "Quadra Poliesportiva 1", landmark: "Quadra verde com alambrado, atrás da caixa d'água." },
  quadra2: { x: 312, y: 438, level: "externa", building: "externa", label: "Quadra Poliesportiva 2", landmark: "Segunda quadra verde, ao fundo do terreno." },
  patio: { x: 182, y: 286, level: "terreo", building: "principal", label: "Pátio coberto (pilotis)", landmark: "Área coberta sob o Prédio Principal, entre as colunas de concreto." },
  acessoAnexo: { x: 110, y: 286, level: "terreo", building: "anexo", label: "Entrada do Bloco Anexo pelo pátio", landmark: "Atravesse o pátio no nível do térreo até o bloco vizinho independente. Não há passarela suspensa." },
  escadaAnexo: { x: 86, y: 296, level: "terreo", building: "anexo", label: "Acesso ao subsolo do anexo", landmark: "No Bloco Anexo, localize a escada de acesso ao subsolo, onde fica a Secretaria." },
  secretaria: { x: 70, y: 332, level: "subsolo", building: "anexo", label: "Secretaria Acadêmica", landmark: "No subsolo do Bloco Anexo: setor de matrícula e atendimento acadêmico." },
  cantina: { x: 70, y: 214, level: "terreo", building: "anexo", accessOnly: true, label: "Cantina", landmark: "No Bloco Anexo, onde se compram lanches. Acesso ao bloco pelo pátio, no térreo." },
  nutricao: { x: 70, y: 382, level: "terreo", building: "anexo", accessOnly: true, label: "Laboratório de Nutrição", landmark: "Cozinha com bancadas e equipamentos em inox no Bloco Anexo. Acesso ao bloco pelo pátio, no térreo." },
  escada: { x: 160, y: 274, level: "terreo", building: "principal", label: "Escadaria principal", landmark: "Escadaria à esquerda no pátio coberto do Prédio Principal, com acesso aos andares superiores." },
  corredor: { x: 182, y: 250, level: "andar1", building: "principal", label: "Corredor do 1º andar", landmark: "Corredor envidraçado do Prédio Principal, onde ficam os laboratórios de Informática." },
  convivencia: { x: 182, y: 312, level: "terreo", building: "principal", label: "Refeição e convivência nos pilotis", landmark: "Mesas azuis para refeição e convivência sob os pilotis do Prédio Principal, no térreo." },
  salas: { x: 182, y: 128, level: "andar2", building: "principal", label: "Salas de aula · 2º andar", landmark: "As salas ocupam quase todo o corredor do 2º andar, desde o início até perto da Coordenação e da Direção." },
  lab1: { x: 182, y: 182, level: "andar1", building: "principal", label: "Lab. de Informática 1", landmark: "No 1º andar do Prédio Principal, acessado pelo corredor envidraçado." },
  lab2: { x: 182, y: 216, level: "andar1", building: "principal", label: "Lab. de Informática 2", landmark: "No mesmo 1º andar do Prédio Principal; procure a identificação do laboratório." },
  finalPrincipal: { x: 182, y: 380, level: "terreo", building: "principal", label: "Final do Prédio Principal", landmark: "Siga pelo térreo até a parte mais larga no final do prédio. Na visão de quem entra: Banheiros à esquerda e Auditório à direita." },
  auditorio: { x: 212, y: 426, level: "terreo", building: "principal", label: "Auditório", landmark: "No final do Prédio Principal, no térreo, à direita de quem entra; um pouco maior que os Banheiros." },
  banheiros: { x: 151, y: 426, level: "terreo", building: "principal", label: "Banheiros / Sanitários", landmark: "No final do Prédio Principal, no térreo, à esquerda de quem entra." },
  escada2: { x: 204, y: 310, level: "andar1", building: "principal", label: "Escada para o 2º andar", landmark: "Continue pela escadaria do Prédio Principal entre o 1º e o 2º andar." },
  corredor2: { x: 182, y: 360, level: "andar2", building: "principal", label: "Corredor do 2º andar", landmark: "No piso superior, siga até o final do Prédio Principal." },
  coordenacao: { x: 182, y: 452, level: "andar2", building: "principal", label: "Coordenação / Direção", landmark: "No final do Prédio Principal, no 2º andar (piso superior)." },
};

/** Each node's path starting at the Portaria. Routes between any two nodes are derived from these. */
export const pathFromPortaria: Record<NodeId, NodeId[]> = {
  portaria: ["portaria"],
  rampa: ["portaria", "rampa"],
  alameda: ["portaria", "rampa", "alameda"],
  caminhoQuadras: ["portaria", "rampa", "caminhoQuadras"],
  caixa: ["portaria", "rampa", "caminhoQuadras", "caixa"],
  quadra1: ["portaria", "rampa", "caminhoQuadras", "caixa", "quadra1"],
  quadra2: ["portaria", "rampa", "caminhoQuadras", "caixa", "quadra1", "quadra2"],
  patio: ["portaria", "rampa", "alameda", "patio"],
  acessoAnexo: ["portaria", "rampa", "alameda", "patio", "acessoAnexo"],
  escadaAnexo: ["portaria", "rampa", "alameda", "patio", "acessoAnexo", "escadaAnexo"],
  cantina: ["portaria", "rampa", "alameda", "patio", "acessoAnexo", "cantina"],
  secretaria: ["portaria", "rampa", "alameda", "patio", "acessoAnexo", "escadaAnexo", "secretaria"],
  coordenacao: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "escada2", "corredor2", "coordenacao"],
  escada: ["portaria", "rampa", "alameda", "patio", "escada"],
  corredor: ["portaria", "rampa", "alameda", "patio", "escada", "corredor"],
  convivencia: ["portaria", "rampa", "alameda", "patio", "convivencia"],
  salas: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "escada2", "corredor2", "salas"],
  nutricao: ["portaria", "rampa", "alameda", "patio", "acessoAnexo", "nutricao"],
  finalPrincipal: ["portaria", "rampa", "alameda", "patio", "finalPrincipal"],
  auditorio: ["portaria", "rampa", "alameda", "patio", "finalPrincipal", "auditorio"],
  banheiros: ["portaria", "rampa", "alameda", "patio", "finalPrincipal", "banheiros"],
  lab1: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "lab1"],
  lab2: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "lab2"],
  escada2: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "escada2"],
  corredor2: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "escada2", "corredor2"],
};

export function routeBetween(from: NodeId, to: NodeId): NodeId[] {
  const a = pathFromPortaria[from];
  const b = pathFromPortaria[to];
  let k = 0;
  while (k < a.length && k < b.length && a[k] === b[k]) k++;
  return [...a.slice(k - 1).reverse(), ...b.slice(k)];
}

const floorHeight: Record<Level, number> = { externa: 0, subsolo: -1, terreo: 0, andar1: 1, andar2: 2 };

export function floorTransition(from: NodeId, to: NodeId): "up" | "down" | null {
  const delta = floorHeight[nodes[to].level] - floorHeight[nodes[from].level];
  return delta > 0 ? "up" : delta < 0 ? "down" : null;
}

export function nodeLocation(id: NodeId): string {
  const n = nodes[id];
  return n.building === "externa" ? levelLabel[n.level] : `${buildingLabel[n.building]} · ${n.accessOnly ? "Acesso pelo térreo" : levelLabel[n.level]}`;
}

export type Category = "Acesso" | "Administração" | "Ensino" | "Laboratórios" | "Convivência" | "Esportes" | "Eventos";

export type Place = {
  id: string;
  node: NodeId;
  name: string;
  category: Category;
  /** Only real photos of this exact place. Leave empty when the team has not photographed it yet. */
  photo?: string;
  photoCaption?: string;
  gallery?: string[];
  description: string;
  services: string[];
  block: string;
  keywords: string[];
};

export const NO_PHOTO_NOTE = "Ainda não temos foto deste lugar. A equipe vai fotografar em breve.";

export const places: Place[] = [
  { id: "portaria", node: "portaria", name: "Portaria Principal", category: "Acesso", photo: portaria.url, gallery: [portariaEntrada.url],
    description: "Entrada oficial da ETEC Parque Belém, marcada pelo arco amarelo e pela guarita vermelha. É o ponto de partida de todas as rotas do app.",
    services: ["Identificação de visitantes", "Informações gerais", "Entrada e saída de alunos"], block: "Área Externa · entrada da rua", keywords: ["entrada", "portão", "guarita", "arco", "visitante"] },
  { id: "rampa", node: "rampa", name: "Rampa de Acesso", category: "Acesso", photo: portariaEntrada.url,
    description: "Rampa com corrimão logo após a portaria, que leva ao nível da alameda com acessibilidade para cadeirantes e pessoas com mobilidade reduzida.",
    services: ["Acesso acessível", "Ligação portaria ↔ alameda"], block: "Área Externa · logo após o arco", keywords: ["acessibilidade", "cadeirante", "rampa"] },
  { id: "estacionamento", node: "alameda", name: "Estacionamento e Alameda", category: "Acesso", photo: estacionamento.url, gallery: [alameda.url],
    description: "Estacionamento próximo à entrada e à portaria. A alameda segue ao lado do Prédio Principal e leva ao pátio; para as quadras, siga pelo caminho externo sem atravessar o estacionamento.",
    services: ["Estacionamento", "Embarque e desembarque"], block: "Área Externa · próximo à portaria", keywords: ["carro", "vaga", "alameda", "estacionar"] },
  { id: "salas", node: "salas", name: "Salas de Aula", category: "Ensino", photo: salaAula.url,
    description: "As salas de aula ocupam quase todo o corredor do 2º andar do Prédio Principal, desde o início até perto da Coordenação e da Direção. O acesso é pela escadaria do pátio, passando pelo 1º andar e subindo ao 2º.",
    services: ["Aulas teóricas", "Provas e avaliações"], block: "Prédio Principal · 2º Andar", keywords: ["aula", "sala", "turma", "classe"] },
  { id: "auditorio", node: "auditorio", name: "Auditório", category: "Eventos", photo: auditorio.url,
    description: "Auditório no final do Prédio Principal, no térreo, à direita na visão de quem entra; um pouco maior que os Banheiros à esquerda. Espaço para palestras, apresentações e eventos da escola.",
    services: ["Palestras", "Apresentações de TCC", "Reuniões de pais"], block: "Prédio Principal · final do térreo · direita", keywords: ["evento", "palestra", "tcc", "reunião"] },
  { id: "banheiros", node: "banheiros", name: "Banheiros / Sanitários", category: "Convivência",
    description: "Banheiros e sanitários no final do Prédio Principal, na parte mais larga do prédio, no térreo, à esquerda na visão de quem entra.",
    services: ["Sanitários", "Higiene pessoal"], block: "Prédio Principal · final do térreo · esquerda", keywords: ["banheiro", "sanitário", "toalete", "wc"] },
  { id: "secretaria", node: "secretaria", name: "Secretaria Acadêmica", category: "Administração",
    description: "A matrícula é feita na Secretaria Acadêmica, no subsolo do Bloco Anexo. Saindo da Portaria, siga até o pátio, entre no bloco vizinho pelo térreo e desça ao subsolo.",
    services: ["Matrícula e rematrícula", "Declarações e históricos", "Atualização de cadastro", "Carteirinha estudantil"], block: "Bloco Anexo · Subsolo", keywords: ["matrícula", "documento", "declaração", "histórico", "inscrição", "subsolo"] },
  { id: "cantina", node: "cantina", name: "Cantina", category: "Convivência",
    description: "Cantina para comprar lanches no Bloco Anexo. O bloco é independente e o acesso é feito pelo pátio, no térreo. Para sentar e comer, use as mesas azuis da área de convivência.",
    services: ["Venda de lanches", "Bebidas"], block: "Bloco Anexo · entrada pelo pátio", keywords: ["lanche", "comida", "cantina", "salgado", "bebida"] },
  { id: "nutricao", node: "nutricao", name: "Laboratório de Nutrição", category: "Laboratórios", photo: nutricao.url,
    description: "Cozinha com bancadas e equipamentos em inox no Bloco Anexo, usada nas aulas práticas de Nutrição. Para chegar ao bloco, atravesse o pátio no térreo.",
    services: ["Aulas práticas de cozinha", "Técnica dietética", "Análise de alimentos"], block: "Bloco Anexo · entrada pelo pátio", keywords: ["cozinha", "nutrição", "gastronomia"] },
  { id: "lab1", node: "lab1", name: "Laboratório de Informática 1", category: "Laboratórios", photo: labInfo.url,
    description: "Laboratório com computadores no 1º andar do Prédio Principal, usado nas aulas de programação, redes e desenvolvimento de sistemas. Suba a escadaria do pátio e siga pelo corredor envidraçado.",
    services: ["Aulas de programação", "Pesquisa e trabalhos", "PCs com internet"], block: "Prédio Principal · 1º Andar", keywords: ["computador", "pc", "informática", "programação", "ds"] },
  { id: "lab2", node: "lab2", name: "Laboratório de Informática 2", category: "Laboratórios", photo: labInfo2.url,
    description: "Segundo laboratório de Informática, com notebooks, também no 1º andar do Prédio Principal, para aulas práticas e projetos de desenvolvimento de sistemas.",
    services: ["Notebooks", "Projetos em grupo", "Aulas de mobile"], block: "Prédio Principal · 1º Andar", keywords: ["notebook", "informática", "mobile"] },
  { id: "convivencia", node: "convivencia", name: "Refeição e Convivência", category: "Convivência", photo: refeitorio.url, gallery: [pilotis.url],
    description: "Área com as mesas azuis para comer, sentar e conversar, no pátio coberto sob os pilotis do Prédio Principal, no térreo. É o ponto de encontro dos intervalos.",
    services: ["Mesas para refeição", "Intervalo", "Convivência"], block: "Prédio Principal · Térreo · sob pilotis", keywords: ["comida", "mesas", "sentar", "pátio", "pilotis", "refeição", "refeitório", "almoço", "intervalo"] },
  { id: "coordenacao", node: "coordenacao", name: "Coordenação e Direção", category: "Administração",
    description: "Coordenação pedagógica, coordenação de curso e direção no final do Prédio Principal, no 2º andar, o piso superior. O acesso é pela escadaria do pátio coberto.",
    services: ["Atendimento a responsáveis", "Dúvidas sobre o curso", "Justificativa de faltas"], block: "Prédio Principal · final do prédio · 2º Andar", keywords: ["coordenador", "diretor", "direção", "administração", "falta"] },
  { id: "quadra1", node: "quadra1", name: "Quadra Poliesportiva 1", category: "Esportes", photo: quadra1.url, gallery: [quadras.url],
    description: "Quadra externa com alambrado para futsal, vôlei e basquete nas aulas de Educação Física, ao lado da caixa d'água.",
    services: ["Educação Física", "Interclasse", "Recreação"], block: "Área Externa · atrás da caixa d'água", keywords: ["educação física", "futebol", "esporte", "quadra"] },
  { id: "quadra2", node: "quadra2", name: "Quadra Poliesportiva 2", category: "Esportes", photo: quadras.url, gallery: [areaAberta.url], photoCaption: "Vista de cima das duas quadras; a Quadra 2 é a do fundo.",
    description: "Segunda quadra externa, ao fundo do terreno, usada em aulas simultâneas e campeonatos.",
    services: ["Educação Física", "Campeonatos"], block: "Área Externa · fundo do terreno", keywords: ["educação física", "esporte", "quadra"] },
];

export const placeById = (id: string) => places.find((p) => p.id === id);
export const placeByNode = (n: NodeId) => places.find((p) => p.node === n);
export const placeNumber = (p: Place) => places.indexOf(p) + 1;

/** Tour trail, Duolingo-style: each unit is a stretch of the real walk from the Portaria. */
export const units = [
  { id: "chegada", title: "Chegando na ETEC", subtitle: "Portaria, rampa e estacionamento", places: ["portaria", "rampa", "estacionamento"] },
  { id: "terreo", title: "Térreo do Prédio Principal", subtitle: "Pilotis, auditório e banheiros", places: ["convivencia", "auditorio", "banheiros"] },
  { id: "anexo", title: "Bloco Anexo", subtitle: "Matrícula, lanche e Nutrição", places: ["secretaria", "cantina", "nutricao"] },
  { id: "andares", title: "Lá em cima", subtitle: "Labs no 1º andar, salas e Coordenação no 2º", places: ["lab1", "lab2", "salas", "coordenacao"] },
  { id: "esportes", title: "Hora do esporte", subtitle: "As duas quadras", places: ["quadra1", "quadra2"] },
] as const;

export const quickActions = [
  { label: "Fazer Matrícula", sub: "Secretaria · Subsolo do Bloco Anexo", place: "secretaria" },
  { label: "Assistir Aula", sub: "Salas · 2º andar", place: "salas" },
  { label: "Laboratórios", sub: "Informática · 1º andar", place: "lab1" },
  { label: "Comer e Lanchar", sub: "Mesas azuis · pilotis", place: "convivencia" },
  { label: "Educação Física", sub: "Quadras", place: "quadra1" },
  { label: "Eventos", sub: "Auditório", place: "auditorio" },
];

export const missions = [
  { id: "m-portaria", place: "portaria", title: "O primeiro passo", goal: "Faça check-in na Portaria, embaixo do arco amarelo", xp: 50 },
  { id: "m-rampa", place: "rampa", title: "Sobe que é fácil", goal: "Passe pela rampa de acesso com corrimão", xp: 50 },
  { id: "m-estacionamento", place: "estacionamento", title: "Vaga garantida", goal: "Encontre o estacionamento perto da entrada", xp: 50 },
  { id: "m-convivencia", place: "convivencia", title: "Hora do intervalo", goal: "Ache as mesas azuis sob os pilotis", xp: 100 },
  { id: "m-auditorio", place: "auditorio", title: "Palco aberto", goal: "Encontre o Auditório à direita, no final do térreo", xp: 100 },
  { id: "m-banheiros", place: "banheiros", title: "Saber é poder", goal: "Localize os Banheiros à esquerda, no final do térreo", xp: 50 },
  { id: "m-secretaria", place: "secretaria", title: "Encontre a Secretaria", goal: "Chegue ao subsolo do Bloco Anexo, onde se faz matrícula", xp: 150 },
  { id: "m-cantina", place: "cantina", title: "Bateu a fome", goal: "Encontre a Cantina no Bloco Anexo", xp: 100 },
  { id: "m-nutricao", place: "nutricao", title: "Chef em formação", goal: "Visite a cozinha de Nutrição no Bloco Anexo", xp: 100 },
  { id: "m-lab1", place: "lab1", title: "Hacker iniciante", goal: "Conheça o Lab 1 no 1º andar do Prédio Principal", xp: 150 },
  { id: "m-lab2", place: "lab2", title: "Modo notebook", goal: "Ache o Lab 2, também no 1º andar", xp: 100 },
  { id: "m-salas", place: "salas", title: "Rumo à sala", goal: "Explore as salas nos corredores do 2º andar", xp: 100 },
  { id: "m-coordenacao", place: "coordenacao", title: "Fala com a coordenação", goal: "Chegue ao final do 2º andar", xp: 100 },
  { id: "m-quadra", place: "quadra1", title: "Aquecimento", goal: "Vá até a Quadra Poliesportiva 1", xp: 100 },
  { id: "m-quadra2", place: "quadra2", title: "Prorrogação", goal: "Descubra a Quadra 2, ao fundo do terreno", xp: 100 },
];

export const team = [
  { name: "Pedro Henrique Lamin Barbosa Ciriaco", role: "Líder da Equipe", desc: "Concepção do projeto e arquitetura de software.", initials: "PH", lead: true },
  { name: "Luigi Paulo", role: "Desenvolvimento front-end", desc: "Lógica de rotas e navegação.", initials: "LP", lead: false },
  { name: "Odira", role: "Design de interface (UI/UX)", desc: "Paleta visual e experiência do usuário.", initials: "OD", lead: false },
  { name: "Kauan Ribeiro", role: "Mapeamento de campo", desc: "Mapeamento dos ambientes, curadoria de fotos e dados do campus.", initials: "KR", lead: false },
];

/** Ground-floor footprint, not a claim of precise indoor positioning in the aerial image. */
export function satellitePoint(id: NodeId): { x: number; y: number } {
  const n = nodes[id];
  const fixed: Partial<Record<NodeId, { x: number; y: number }>> = {
    portaria: { x: 382, y: 30 }, rampa: { x: 392, y: 76 }, alameda: { x: 490, y: 132 },
    caixa: { x: 525, y: 578 }, quadra1: { x: 643, y: 585 }, quadra2: { x: 643, y: 677 },
    acessoAnexo: { x: 170, y: 434 }, escadaAnexo: { x: 145, y: 453 },
  };
  return fixed[id] ?? (n.building === "anexo"
    ? { x: 122, y: 280 + (n.y - 182) * 1.45 }
    : { x: 240 + (n.x - 150) * 1.7, y: 115 + (n.y - 78) * 1.5 });
}

export const rearRooms = { bathrooms: { left: 128, right: 180 }, auditorium: { left: 180, right: 236 } };
