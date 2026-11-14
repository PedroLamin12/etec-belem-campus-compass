import portaria from "@/assets/photos/portaria.jpg.asset.json";
import portariaEntrada from "@/assets/photos/portaria-entrada.jpg.asset.json";
import arco from "@/assets/photos/arco.jpg.asset.json";
import rampa from "@/assets/photos/rampa.jpg.asset.json";
import estacionamento from "@/assets/photos/estacionamento.jpg.asset.json";
import quadra1 from "@/assets/photos/quadra1.jpg.asset.json";
import quadras from "@/assets/photos/quadras.jpg.asset.json";
import patio from "@/assets/photos/patio.jpg.asset.json";
import refeitorio from "@/assets/photos/refeitorio.jpg.asset.json";
import pilotis from "@/assets/photos/pilotis.jpg.asset.json";
import fachada from "@/assets/photos/fachada.jpg.asset.json";
import labsAndar from "@/assets/photos/labs-andar.jpg.asset.json";
import salaAula from "@/assets/photos/sala-aula.jpg.asset.json";
import labInfo from "@/assets/photos/lab-info.jpg.asset.json";
import labInfo2 from "@/assets/photos/lab-info2.jpg.asset.json";
import nutricao from "@/assets/photos/nutricao.jpg.asset.json";
import auditorio from "@/assets/photos/auditorio.jpg.asset.json";
import bloco from "@/assets/photos/bloco.jpg.asset.json";
import principal from "@/assets/photos/principal.jpg.asset.json";
import areaAberta from "@/assets/photos/area-aberta.jpg.asset.json";

export const aerialPhoto = principal.url;
export const heroPhoto = arco.url;

export type Level = "externa" | "terreo" | "andar1";
export const levelLabel: Record<Level, string> = {
  externa: "Área Externa",
  terreo: "Térreo",
  andar1: "1º Andar",
};

/** Waypoints of the school plan. x/y live in the map's 360x520 viewBox. */
export type NodeId =
  | "portaria" | "rampa" | "alameda" | "caixa" | "quadra1" | "quadra2"
  | "patio" | "refeitorio" | "secretaria" | "coordenacao" | "escada"
  | "corredor" | "salas" | "passarela" | "nutricao" | "auditorio" | "lab1" | "lab2";

export const nodes: Record<NodeId, { x: number; y: number; level: Level; label: string; landmark: string }> = {
  portaria: { x: 236, y: 38, level: "externa", label: "Portaria principal", landmark: "Arco amarelo com a guarita vermelha ao lado." },
  rampa: { x: 226, y: 84, level: "externa", label: "Rampa de acesso", landmark: "Desça a rampa com corrimão logo após o arco." },
  alameda: { x: 240, y: 190, level: "externa", label: "Alameda / Estacionamento", landmark: "Piso intertravado com vagas amarelas e o prédio verde à direita." },
  caixa: { x: 288, y: 262, level: "externa", label: "Caixa d'água", landmark: "Torre cilíndrica de concreto — impossível não ver." },
  quadra1: { x: 312, y: 352, level: "externa", label: "Quadra Poliesportiva 1", landmark: "Quadra verde com alambrado, logo atrás da caixa d'água." },
  quadra2: { x: 312, y: 438, level: "externa", label: "Quadra Poliesportiva 2", landmark: "Segunda quadra verde, ao fundo do terreno." },
  patio: { x: 188, y: 318, level: "terreo", label: "Pátio coberto (pilotis)", landmark: "Área sob o prédio, entre as colunas de concreto." },
  refeitorio: { x: 140, y: 128, level: "terreo", label: "Refeitório e Cantina", landmark: "Mesas azuis e balcão amarelo da cantina." },
  secretaria: { x: 196, y: 372, level: "terreo", label: "Secretaria Acadêmica", landmark: "Primeira porta do bloco administrativo, no fim do pátio." },
  coordenacao: { x: 162, y: 396, level: "terreo", label: "Coordenação / Direção", landmark: "Ao lado da Secretaria, mesmo corredor administrativo." },
  escada: { x: 210, y: 286, level: "terreo", label: "Escadaria principal", landmark: "Escada de concreto que sobe do pátio para o 1º andar." },
  corredor: { x: 182, y: 230, level: "andar1", label: "Corredor panorâmico", landmark: "Corredor com paredes de vidro e portas coloridas." },
  salas: { x: 182, y: 150, level: "andar1", label: "Salas de aula", landmark: "Portas numeradas ao longo do corredor envidraçado." },
  passarela: { x: 128, y: 250, level: "andar1", label: "Passagem para o bloco anexo", landmark: "Ligação entre o prédio principal e o bloco dos laboratórios." },
  nutricao: { x: 80, y: 270, level: "andar1", label: "Laboratório de Nutrição", landmark: "Porta com visor — cozinha industrial em inox." },
  auditorio: { x: 80, y: 205, level: "andar1", label: "Auditório", landmark: "Porta dupla no início do bloco anexo." },
  lab1: { x: 80, y: 335, level: "andar1", label: "Lab. de Informática 1", landmark: "Sala com fileiras de computadores de mesa." },
  lab2: { x: 80, y: 395, level: "andar1", label: "Lab. de Informática 2", landmark: "Sala seguinte, com notebooks nas bancadas." },
};

/** Each node's path starting at the Portaria. Routes between any two nodes are derived from these. */
export const pathFromPortaria: Record<NodeId, NodeId[]> = {
  portaria: ["portaria"],
  rampa: ["portaria", "rampa"],
  alameda: ["portaria", "rampa", "alameda"],
  caixa: ["portaria", "rampa", "alameda", "caixa"],
  quadra1: ["portaria", "rampa", "alameda", "caixa", "quadra1"],
  quadra2: ["portaria", "rampa", "alameda", "caixa", "quadra1", "quadra2"],
  patio: ["portaria", "rampa", "alameda", "patio"],
  refeitorio: ["portaria", "rampa", "alameda", "patio", "refeitorio"],
  secretaria: ["portaria", "rampa", "alameda", "patio", "secretaria"],
  coordenacao: ["portaria", "rampa", "alameda", "patio", "secretaria", "coordenacao"],
  escada: ["portaria", "rampa", "alameda", "patio", "escada"],
  corredor: ["portaria", "rampa", "alameda", "patio", "escada", "corredor"],
  salas: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "salas"],
  passarela: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "passarela"],
  nutricao: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "passarela", "nutricao"],
  auditorio: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "passarela", "auditorio"],
  lab1: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "passarela", "lab1"],
  lab2: ["portaria", "rampa", "alameda", "patio", "escada", "corredor", "passarela", "lab1", "lab2"],
};

export function routeBetween(from: NodeId, to: NodeId): NodeId[] {
  const a = pathFromPortaria[from];
  const b = pathFromPortaria[to];
  let k = 0;
  while (k < a.length && k < b.length && a[k] === b[k]) k++;
  return [...a.slice(k - 1).reverse(), ...b.slice(k)];
}

export type Category = "Acesso" | "Administração" | "Ensino" | "Laboratórios" | "Convivência" | "Esportes" | "Eventos";

export type Place = {
  id: string;
  node: NodeId;
  name: string;
  category: Category;
  photo: string;
  gallery?: string[];
  description: string;
  services: string[];
  block: string;
  keywords: string[];
};

export const places: Place[] = [
  { id: "portaria", node: "portaria", name: "Portaria Principal", category: "Acesso", photo: portaria.url, gallery: [arco.url, portariaEntrada.url],
    description: "Entrada oficial da ETEC Parque Belém, marcada pelo arco amarelo e pela guarita vermelha. É o ponto de partida de todas as rotas do app.",
    services: ["Identificação de visitantes", "Informações gerais", "Entrada e saída de alunos"], block: "Área Externa · entrada da rua", keywords: ["entrada", "portão", "guarita", "arco"] },
  { id: "rampa", node: "rampa", name: "Rampa de Acesso", category: "Acesso", photo: rampa.url,
    description: "Rampa e escadaria com corrimão que ligam a portaria ao nível da alameda, garantindo acessibilidade a cadeirantes e pessoas com mobilidade reduzida.",
    services: ["Acesso acessível", "Ligação portaria ↔ alameda"], block: "Área Externa · logo após o arco", keywords: ["acessibilidade", "escada", "cadeirante"] },
  { id: "estacionamento", node: "alameda", name: "Estacionamento e Alameda", category: "Acesso", photo: estacionamento.url,
    description: "Via interna com piso intertravado e vagas demarcadas em amarelo, paralela ao prédio principal. Liga a entrada ao pátio e às quadras.",
    services: ["Vagas para servidores", "Embarque e desembarque"], block: "Área Externa · lateral do prédio principal", keywords: ["carro", "vaga", "alameda"] },
  { id: "patio", node: "patio", name: "Pátio Coberto (Pilotis)", category: "Convivência", photo: pilotis.url, gallery: [patio.url],
    description: "Grande área coberta sob o prédio suspenso por pilotis. É o coração da escola: ponto de encontro, intervalo e acesso às escadas.",
    services: ["Convivência e intervalo", "Acesso às escadas", "Avisos e murais"], block: "Prédio principal · Térreo", keywords: ["intervalo", "pilotis", "encontro"] },
  { id: "refeitorio", node: "refeitorio", name: "Refeitório e Cantina", category: "Convivência", photo: refeitorio.url, gallery: [patio.url],
    description: "Espaço com as mesas azuis onde é servida a merenda, e a cantina com balcão amarelo para lanches no intervalo.",
    services: ["Merenda escolar", "Venda de lanches", "Mesas para refeição"], block: "Térreo · entre o prédio principal e o anexo", keywords: ["almoço", "lanche", "comida", "merenda", "cantina"] },
  { id: "secretaria", node: "secretaria", name: "Secretaria Acadêmica", category: "Administração", photo: fachada.url,
    description: "Onde se faz a matrícula, rematrícula, trancamento e se solicitam documentos. É o primeiro lugar que todo calouro deve conhecer.",
    services: ["Matrícula e rematrícula", "Declarações e históricos", "Atualização de cadastro", "Carteirinha estudantil"], block: "Prédio principal · Térreo · bloco administrativo", keywords: ["matrícula", "documento", "declaração", "histórico", "inscrição"] },
  { id: "coordenacao", node: "coordenacao", name: "Coordenação e Direção", category: "Administração", photo: bloco.url,
    description: "Setor da coordenação pedagógica, coordenação de curso e direção. Atende alunos e responsáveis sobre questões acadêmicas.",
    services: ["Atendimento a responsáveis", "Dúvidas sobre o curso", "Justificativa de faltas"], block: "Prédio principal · Térreo · ao lado da Secretaria", keywords: ["coordenador", "diretor", "administração", "falta"] },
  { id: "corredor", node: "corredor", name: "Corredor Panorâmico", category: "Ensino", photo: labsAndar.url,
    description: "Corredor do 1º andar com paredes envidraçadas e portas coloridas, que dá vista para toda a área externa e conecta as salas ao bloco anexo.",
    services: ["Acesso às salas", "Ligação com o bloco dos laboratórios"], block: "Prédio principal · 1º Andar", keywords: ["vidro", "andar", "corredor"] },
  { id: "salas", node: "salas", name: "Salas de Aula", category: "Ensino", photo: salaAula.url,
    description: "Salas teóricas dos cursos técnicos e do ensino médio, distribuídas ao longo do corredor panorâmico, com lousa, projetor e carteiras.",
    services: ["Aulas teóricas", "Provas e avaliações"], block: "Prédio principal · 1º Andar", keywords: ["aula", "sala", "turma", "classe"] },
  { id: "lab1", node: "lab1", name: "Laboratório de Informática 1", category: "Laboratórios", photo: labInfo.url,
    description: "Laboratório com computadores de mesa usado nas aulas de programação, redes e desenvolvimento de sistemas.",
    services: ["Aulas de programação", "Pesquisa e trabalhos", "PCs com internet"], block: "Bloco anexo · 1º Andar", keywords: ["computador", "pc", "informática", "programação", "ds"] },
  { id: "lab2", node: "lab2", name: "Laboratório de Informática 2", category: "Laboratórios", photo: labInfo2.url,
    description: "Laboratório equipado com notebooks, ideal para aulas práticas, projetos em grupo e desenvolvimento mobile.",
    services: ["Notebooks", "Projetos em grupo", "Aulas de mobile"], block: "Bloco anexo · 1º Andar · ao lado do Lab 1", keywords: ["notebook", "informática", "mobile"] },
  { id: "nutricao", node: "nutricao", name: "Laboratório de Nutrição", category: "Laboratórios", photo: nutricao.url,
    description: "Cozinha industrial em inox usada pelos cursos de Nutrição e Gastronomia para aulas práticas de preparo e técnica dietética.",
    services: ["Aulas práticas de cozinha", "Técnica dietética", "Análise de alimentos"], block: "Bloco anexo · 1º Andar", keywords: ["cozinha", "nutrição", "gastronomia"] },
  { id: "auditorio", node: "auditorio", name: "Auditório", category: "Eventos", photo: auditorio.url,
    description: "Espaço para palestras, apresentações de TCC, reuniões de pais e eventos culturais da escola.",
    services: ["Palestras", "Apresentações de TCC", "Reuniões de pais"], block: "Bloco anexo · 1º Andar · início do bloco", keywords: ["evento", "palestra", "tcc", "reunião"] },
  { id: "quadra1", node: "quadra1", name: "Quadra Poliesportiva 1", category: "Esportes", photo: quadra1.url, gallery: [quadras.url],
    description: "Quadra externa com alambrado para futsal, vôlei e basquete nas aulas de Educação Física.",
    services: ["Educação Física", "Interclasse", "Recreação"], block: "Área Externa · atrás da caixa d'água", keywords: ["educação física", "futebol", "esporte", "quadra"] },
  { id: "quadra2", node: "quadra2", name: "Quadra Poliesportiva 2", category: "Esportes", photo: quadras.url, gallery: [areaAberta.url],
    description: "Segunda quadra externa, ao fundo do terreno, usada em aulas simultâneas e campeonatos.",
    services: ["Educação Física", "Campeonatos"], block: "Área Externa · fundo do terreno", keywords: ["educação física", "esporte", "quadra"] },
];

export const placeById = (id: string) => places.find((p) => p.id === id);
export const placeByNode = (n: NodeId) => places.find((p) => p.node === n);

export const quickActions = [
  { label: "Fazer Matrícula", sub: "Secretaria", place: "secretaria", emoji: "📝" },
  { label: "Assistir Aula", sub: "Salas", place: "salas", emoji: "📚" },
  { label: "Laboratórios", sub: "Informática / Nutrição", place: "lab1", emoji: "💻" },
  { label: "Almoço e Lanche", sub: "Refeitório e Cantina", place: "refeitorio", emoji: "🍽️" },
  { label: "Educação Física", sub: "Quadras", place: "quadra1", emoji: "🏀" },
  { label: "Eventos", sub: "Auditório", place: "auditorio", emoji: "🎤" },
];

export const missions = [
  { id: "m-portaria", place: "portaria", title: "O primeiro passo", goal: "Faça check-in na Portaria", xp: 50 },
  { id: "m-secretaria", place: "secretaria", title: "Encontre a Secretaria", goal: "Descubra onde se faz a matrícula", xp: 150 },
  { id: "m-refeitorio", place: "refeitorio", title: "Hora do lanche", goal: "Visite o Refeitório e a Cantina", xp: 100 },
  { id: "m-salas", place: "salas", title: "Rumo à sala", goal: "Chegue ao corredor das salas de aula", xp: 100 },
  { id: "m-lab1", place: "lab1", title: "Hacker iniciante", goal: "Conheça o Laboratório de Informática", xp: 150 },
  { id: "m-nutricao", place: "nutricao", title: "Chef em formação", goal: "Visite o Laboratório de Nutrição", xp: 100 },
  { id: "m-auditorio", place: "auditorio", title: "Palco aberto", goal: "Encontre o Auditório", xp: 100 },
  { id: "m-quadra", place: "quadra1", title: "Aquecimento", goal: "Vá até a Quadra Poliesportiva 1", xp: 100 },
];

export const team = [
  { name: "Integrante 1", role: "Mapeamento", desc: "Levantamento dos ambientes, fotos e planta da escola." },
  { name: "Integrante 2", role: "Modelagem e Conteúdo Visual", desc: "Mapa interativo, identidade visual e tratamento das imagens." },
  { name: "Integrante 3", role: "Programação Mobile", desc: "Desenvolvimento das telas, rotas e empacotamento do APK." },
  { name: "Integrante 4", role: "Dados e Testes", desc: "Catálogo dos ambientes, descrições e testes em dispositivos." },
];
