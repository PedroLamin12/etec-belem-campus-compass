# Etec Belem Campus Compass

Criar o aplicativo mobile "Tour ETEC Belém" para a ETEC Parque Belém com base na atividade prática de Programação Mobile do Prof. Juliano Ratusznei.

O aplicativo deve resolver com excelência o desafio citado pelo professor: "Se uma pessoa quer saber onde fazer a matrícula, como ela vai saber onde é a secretaria?".

Requisitos principais:
1. Tela inicial moderna com busca inteligente e atalhos rápidos ("O que você precisa fazer hoje?": Fazer Matrícula / Secretaria, Assistir Aula / Salas, Acessar Laboratórios de Informática / Nutrição, Almoço e Lanche / Refeitório e Cantina, Educação Física / Quadras, Eventos / Auditório).
2. Mapa interativo da escola representando fielmente a planta dos anexos fornecidos (Foto Principal com anotações em vermelho):
   - Área Externa: Portaria com arco amarelo e guarita vermelha, rampa de acesso, estacionamento/alameda, caixa d'água cilíndrica e Quadras Poliesportivas 1 e 2.
   - Nível Térreo: Pátio coberto sob pilotis com mesas azuis do refeitório/cantina, setor de Coordenação/Secretaria/Administração e acessos às escadas.
   - Nível 1º Andar: Corredor panorâmico com paredes envidraçadas e portas coloridas, salas de aula e bloco anexo com Laboratórios (Lab de Informática 1 com PCs, Lab de Informática 2 com notebooks, Laboratório de Nutrição com cozinha industrial e Auditório).
3. Catálogo dos 15 ambientes reais com ficha detalhada de cada um:
   - Nome oficial e categoria
   - Foto real (utilizando as imagens anexadas: Portaria, Rampa, Refeitório, Quadras, Labs de Info, Sala de Nutrição, Salas de aula, Auditório, etc.)
   - Descrição detalhada do ambiente e serviços realizados
   - Localização precisa (bloco, andar e ponto de referência)
   - Botão "Como Chegar" com rota visual passo a passo partindo da Portaria principal.
4. Rota passo a passo interativa: o usuário seleciona de onde está (ex: Portaria) e para onde quer ir (ex: Secretaria Acadêmica / Fazer Matrícula) e o app mostra a sequência exata de passos e marcos visuais para chegar lá.
5. Exploração e conquistas: registre visitas aos ambientes, acompanhe seu progresso e obtenha o selo ETEC Conhecedor.
6. Tela de Créditos da Equipe: apresentação dos 4 alunos do grupo de Técnico em Desenvolvimento de Sistemas com suas funções (Mapeamento, Modelagem e Conteúdo Visual, Programação Mobile, Dados e Testes).
7. Suporte a PWA instalável offline e estrutura limpa com Capacitor configurado para compilação do APK Android nativo.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://etec-belem-campus-compass.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/334acee2-08e2-4327-bb35-f2db202a5a1d).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
