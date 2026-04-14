# Primeira Semana — Guia de Onboarding

## Dia 1: Setup e contexto

- [ ] Rodar o `bootstrap.sh` e ter o ambiente local funcionando
- [ ] Ler o [architecture.md](architecture.md) para entender a visao macro
- [ ] Conseguir acessar `http://localhost:3000` (frontend) e ver a tela de login
- [ ] Pedir acesso ao time: GitHub org, Clerk dashboard, AWS console, Datadog

## Dia 2: Explorar o monorepo principal

- [ ] Ler o `CLAUDE.md` na raiz do `v4-marketing-backend` (doc tecnica completa)
- [ ] Navegar pela estrutura de pastas do `packages/v4-marketing` (domain, app, infra)
- [ ] Entender o fluxo de um request: Controller -> UseCase -> Repository -> DB
- [ ] Rodar `pnpm test` e ver os testes passando
- [ ] Encontrar e ler um UseCase simples (ex: buscar workspace por ID)

## Dia 3: Entender o DDD e convencoes

- [ ] Ler sobre a separacao domain/app/infra e por que existe
- [ ] Olhar como o DI container funciona (`infra/di/containers.ts`)
- [ ] Entender o padrao: Prisma (migrations) + Kysely (queries) + prisma-kysely (tipos)
- [ ] Olhar o `eslint-ddd-plugin.mjs` que garante as regras de dependencia entre camadas
- [ ] Criar uma branch e fazer uma mudanca trivial (ex: ajustar um DTO, adicionar um campo)

## Dia 4: Conhecer os outros repos

- [ ] Explorar `v4-marketing-api`: ver os modulos de integracao (Facebook Ads, Google Ads, etc.)
- [ ] Explorar `v4-marketing-data`: entender a infra SST e os pipelines de dados
- [ ] Entender como os repos se conectam (ver diagrama em architecture.md)

## Dia 5: Primeiro PR

- [ ] Pegar uma task pequena do backlog (bug simples ou melhoria de doc)
- [ ] Abrir um PR seguindo as convencoes do time
- [ ] Pedir code review para alguem do time
- [ ] Pair programming com um membro senior em algo do dia a dia

## Dicas

- **Pergunte sem medo** — ninguem espera que voce saiba tudo na primeira semana
- **Rode o lint antes de commitar**: `pnpm lint` (backend) / `npm run lint` (api)
- **Sempre build a lib primeiro**: `pnpm build:lib` antes de qualquer coisa no monorepo
- **Testes**: co-localizados com o source (`*.spec.ts` backend, `*.test.ts` frontend)
- **Commits**: mensagens descritivas em ingles, prefixadas com `feat:`, `fix:`, `chore:`, etc.
