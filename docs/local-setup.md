# Setup Local

Guia passo a passo para rodar o ambiente de desenvolvimento do V4MOS.

## Pre-requisitos

| Ferramenta | Versao minima | Como instalar |
|------------|---------------|---------------|
| Node.js | 20.x | [nodejs.org](https://nodejs.org/) ou `nvm install 20` |
| pnpm | 9.15+ | `npm install -g pnpm` |
| Docker | 24+ | [docker.com](https://docs.docker.com/get-docker/) |
| Python | 3.11+ | [python.org](https://www.python.org/downloads/) |
| uv | latest | `curl -LsSf https://astral.sh/uv/install.sh \| sh` |
| Git | 2.x | [git-scm.com](https://git-scm.com/) |
| AWS CLI | 2.x | [aws.amazon.com/cli](https://aws.amazon.com/cli/) (para v4-marketing-data) |

## Opcao 1: Bootstrap automatico

```bash
cd v4mos-team-onboarding
./scripts/bootstrap.sh
```

O script clona os 3 repos, instala dependencias e cria `.env` a partir dos `.env.example`.

## Opcao 2: Setup manual

### 1. v4-marketing-backend (monorepo principal)

```bash
git clone git@github.com:V4-Company/v4-marketing-backend.git
cd v4-marketing-backend

# Copie o .env (peca as variaveis para alguem do time)
cp .env.example .env

# Instale deps e build da lib compartilhada
pnpm install
pnpm build:lib

# Suba infra local (Postgres, LocalStack, RabbitMQ via Docker)
pnpm dev:prepare

# Rode todos os servicos + frontend
pnpm dev:all

# Ou apenas o backend
pnpm dev:backend
```

**Portas**:
- web-client: `http://localhost:3000`
- v4-marketing (core): `http://localhost:3012`
- integration-hub: `http://localhost:3001`
- chat: `http://localhost:3013`

**Comandos uteis**:
- `pnpm test` — roda testes (Vitest)
- `pnpm lint` — linting
- `pnpm typecheck` — type checking
- `cd packages/<service> && pnpm migrate` — rodar migrations

### 2. v4-marketing-api (NestJS)

```bash
git clone git@github.com:V4-Company/v4-marketing-api.git
cd v4-marketing-api

cp .env.example .env
npm install
npm run start:dev
```

**Comandos uteis**:
- `npm test` — testes unitarios
- `npm run test:e2e` — testes e2e
- `npm run lint` — linting

### 3. v4-marketing-data (Python + SST)

```bash
git clone git@github.com:V4-Company/v4-marketing-data.git
cd v4-marketing-data

# Deps Node (SST config)
yarn install

# Deps Python
uv sync
# ou manualmente:
# python3 -m venv .venv && source .venv/bin/activate && pip install -e .
```

> **Nota**: Para deploy e dev com SST, voce precisa de credenciais AWS configuradas. Fale com o tech lead.

## Variaveis de ambiente

Cada repo tem seu proprio `.env`. As variaveis sensiveis (API keys, DB passwords) **nao** estao no `.env.example`. Peca para alguem do time compartilhar via canal seguro (1Password, DM, etc).

Variaveis comuns entre repos:
- `DATABASE_URL` — connection string do PostgreSQL
- `AWS_*` — credenciais AWS (para integ com S3, SQS, etc)
- `CLERK_*` — chaves do Clerk (auth)

## Troubleshooting

| Problema | Solucao |
|----------|---------|
| `pnpm build:lib` falha | Verifique se esta na versao correta do Node (`node -v`, precisa ser 20+) |
| Docker containers nao sobem | `docker ps` para ver se tem algo rodando na mesma porta. `docker system prune` se tiver problemas de disco |
| Migrations falham | Verifique se o Postgres esta rodando (`docker ps`) e o `DATABASE_URL` esta correto no `.env` |
| `Module not found: @v4-company/lib` | Rode `pnpm build:lib` antes de buildar qualquer servico |
| Portas em uso | Mate o processo: `lsof -i :3012` e `kill <PID>` |
