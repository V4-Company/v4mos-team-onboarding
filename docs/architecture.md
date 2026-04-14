# Arquitetura Geral — V4MOS

## Visao Macro

O V4MOS (V4 Marketing Operating System) e composto por 3 repositorios que juntos formam a plataforma de marketing da V4 Company:

```
                    +--------------------------+
                    |      web-client          |
                    |  (Next.js 15 / React 19) |
                    +-----+----------+---------+
                          |          |
                  REST/SSE|          | REST
                          v          v
              +-----------+--+  +----+-----------+
              | v4-marketing |  | v4-marketing   |
              |   -backend   |  |     -api       |
              | (Fastify     |  | (NestJS)       |
              |  monorepo)   |  |                |
              +------+-------+  +-------+--------+
                     |                  |
                     v                  v
              +------+------------------+--------+
              |          PostgreSQL               |
              +------+---------------------------+
                     |
                     v
              +------+-----------+
              | v4-marketing     |
              |     -data        |
              | (SST / Lambda /  |
              |  ECS pipelines)  |
              +------------------+
```

## Repositorios

### v4-marketing-backend (monorepo)

Monorepo principal com **5 packages** dentro de `packages/`:

| Package | Porta | O que faz |
|---------|-------|-----------|
| **lib** | — | Biblioteca compartilhada: base classes, eventos, auth, server builder |
| **v4-marketing** | 3012 | Core: usuarios, orgs, workspaces, diagnosticos, planos, pagamentos |
| **integration-hub** | 3001 | Integracoes com plataformas de ads (Facebook, Google, 100+ conectores) |
| **chat** | 3013 | Assistente AI: LangChain + OpenAI + Bedrock + Gemini |
| **authorizer** | Lambda | Autorizador AWS para API Gateway |
| **web-client** | 3000 | Frontend Next.js 15 com Clerk auth, Tailwind, Radix |

**Arquitetura interna**: Clean Architecture com DDD (domain -> app -> infra). Excecao: `chat` usa 2 camadas (app + infra) por nao ter entidades complexas.

**Stack**: TypeScript, Fastify 5, Inversify 6 (DI), Kysely (queries) + Prisma (migrations), SQS + RabbitMQ (eventos).

### v4-marketing-api (NestJS)

API de dados de marketing — consome dados de plataformas de ads e analytics:

- **Modulos**: Facebook Ads, Google Ads, Google Analytics, TikTok, LinkedIn, Instagram Insights, Shopify, VTEX, Pipedrive, RD Station, Kommo, e mais
- **Stack**: NestJS, TypeORM + Kysely, PostgreSQL
- **Comandos**: `npm run start:dev`, `npm test`

### v4-marketing-data (Python + SST)

Plataforma de dados / ETL serverless na AWS:

- **Infra**: SST v3 (IaC), Lambda functions, ECS services, SQS, S3, Aurora
- **Stack**: Python 3.11+, SST (TypeScript config), uv (package manager)
- **Estrutura**: `functions/` (Lambdas), `services/` (ECS containers), `infra/` (IaC modules)

## Como se conectam

1. **web-client** faz requests para **v4-marketing** (core) e **integration-hub** via REST
2. **chat** recebe mensagens via SSE streaming e usa LangChain para orquestrar o AI
3. **v4-marketing** publica eventos via SQS/RabbitMQ que outros servicos consomem
4. **v4-marketing-api** e consumida pelo frontend e pelo backend para dados de ads/analytics
5. **v4-marketing-data** roda pipelines de ETL que alimentam o banco de dados compartilhado
6. **authorizer** valida tokens JWT em requests que passam pelo API Gateway da AWS

## Banco de Dados

- Cada servico backend tem seu proprio schema PostgreSQL
- Migrations sao gerenciadas via **Prisma** (`pnpm migrate`)
- Queries de runtime usam **Kysely** (type-safe query builder)
- Tipos Kysely sao gerados automaticamente via `prisma-kysely`

## Autenticacao

- **Frontend**: Clerk (login, signup, session management)
- **Backend**: Identity service customizado que valida tokens Clerk e gerencia permissoes internas
- **API Gateway**: Lambda authorizer valida token + workspace ID
