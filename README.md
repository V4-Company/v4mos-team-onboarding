# V4MOS Team Onboarding

Repositorio de onboarding para novos membros do time V4MOS (V4 Marketing Operating System).

## Repositorios do time

| Repo | Stack | Descricao |
|------|-------|-----------|
| [v4-marketing-backend](https://github.com/V4-Company/v4-marketing-backend) | TypeScript, Fastify, LangChain, Kysely, Prisma | Monorepo principal: core service, integration-hub, chat (AI), authorizer, web-client (Next.js 15) |
| [v4-marketing-api](https://github.com/V4-Company/v4-marketing-api) | TypeScript, NestJS, Kysely, Prisma | API de dados de marketing: Facebook Ads, Google Ads, TikTok, LinkedIn, analytics, etc. |
| [v4-marketing-data](https://github.com/V4-Company/v4-marketing-data) | Python, SST v3, AWS Lambda, ECS | Plataforma de dados: pipelines serverless, ETL, infra-as-code (IaC) |

## Quick Start

```bash
# 1. Clone este repo
git clone git@github.com:V4-Company/v4mos-team-onboarding.git
cd v4mos-team-onboarding

# 2. Rode o bootstrap (clona repos, instala deps, configura env)
./scripts/bootstrap.sh

# 3. Abra o workspace no VS Code
code v4mos.code-workspace
```

## Documentacao

- [Arquitetura Geral](docs/architecture.md) - Visao macro do sistema, como os servicos se conectam
- [Setup Local](docs/local-setup.md) - Passo a passo detalhado para rodar tudo localmente
- [Primeira Semana](docs/first-week.md) - Checklist de onboarding e tarefas guiadas

## Onboarding Checklist

Usamos uma issue template para acompanhar o progresso de cada novo membro. Ao onboardar alguem, crie uma issue usando o template **"Onboarding - Novo Membro"** em `.github/ISSUE_TEMPLATE/onboarding.md`.
