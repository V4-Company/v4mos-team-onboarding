#!/usr/bin/env bash
set -euo pipefail

# V4MOS Team Bootstrap Script
# Clona os repos do time, instala dependencias e configura o ambiente local.

REPOS=(
  "git@github.com:V4-Company/v4-marketing-backend.git"
  "git@github.com:V4-Company/v4-marketing-api.git"
  "git@github.com:V4-Company/v4-marketing-data.git"
)

WORKSPACE_DIR="${WORKSPACE_DIR:-$(cd "$(dirname "$0")/.." && pwd)/..}"

echo "==> V4MOS Team Bootstrap"
echo "    Workspace: $WORKSPACE_DIR"
echo ""

# ------------------------------------------------------------------
# 1. Pre-requisitos
# ------------------------------------------------------------------
check_command() {
  if ! command -v "$1" &>/dev/null; then
    echo "ERRO: '$1' nao encontrado. Instale antes de continuar."
    echo "  $2"
    exit 1
  fi
}

check_command git      "https://git-scm.com/downloads"
check_command node     "https://nodejs.org/ (v20+)"
check_command pnpm     "npm install -g pnpm"
check_command docker   "https://docs.docker.com/get-docker/"
check_command python3  "https://www.python.org/downloads/ (v3.11+)"

echo "[ok] Pre-requisitos verificados"
echo ""

# ------------------------------------------------------------------
# 2. Clonar repos
# ------------------------------------------------------------------
for repo_url in "${REPOS[@]}"; do
  repo_name=$(basename "$repo_url" .git)
  target="$WORKSPACE_DIR/$repo_name"

  if [ -d "$target" ]; then
    echo "[skip] $repo_name ja existe em $target"
  else
    echo "[clone] $repo_name -> $target"
    git clone "$repo_url" "$target"
  fi
done

echo ""

# ------------------------------------------------------------------
# 3. v4-marketing-backend (monorepo principal)
# ------------------------------------------------------------------
echo "==> Configurando v4-marketing-backend"
cd "$WORKSPACE_DIR/v4-marketing-backend"

if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "    [env] .env criado a partir de .env.example (preencha as variaveis!)"
  else
    echo "    [warn] .env.example nao encontrado — peca o .env para alguem do time"
  fi
else
  echo "    [skip] .env ja existe"
fi

echo "    [deps] pnpm install..."
pnpm install

echo "    [build] pnpm build:lib..."
pnpm build:lib

echo "    [ok] v4-marketing-backend pronto"
echo ""

# ------------------------------------------------------------------
# 4. v4-marketing-api (NestJS)
# ------------------------------------------------------------------
echo "==> Configurando v4-marketing-api"
cd "$WORKSPACE_DIR/v4-marketing-api"

if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
    echo "    [env] .env criado a partir de .env.example"
  else
    echo "    [warn] .env.example nao encontrado — peca o .env para alguem do time"
  fi
else
  echo "    [skip] .env ja existe"
fi

echo "    [deps] npm install..."
npm install

echo "    [ok] v4-marketing-api pronto"
echo ""

# ------------------------------------------------------------------
# 5. v4-marketing-data (Python + SST)
# ------------------------------------------------------------------
echo "==> Configurando v4-marketing-data"
cd "$WORKSPACE_DIR/v4-marketing-data"

if command -v uv &>/dev/null; then
  echo "    [deps] uv sync..."
  uv sync
elif command -v pip3 &>/dev/null; then
  echo "    [deps] pip install..."
  python3 -m venv .venv
  source .venv/bin/activate
  pip3 install -e .
else
  echo "    [warn] nem uv nem pip3 encontrados — instale as deps Python manualmente"
fi

if command -v yarn &>/dev/null; then
  echo "    [deps] yarn install (SST/Node deps)..."
  yarn install
fi

echo "    [ok] v4-marketing-data pronto"
echo ""

# ------------------------------------------------------------------
# Done
# ------------------------------------------------------------------
echo "========================================="
echo " Bootstrap completo!"
echo ""
echo " Proximos passos:"
echo "   1. Preencha os arquivos .env de cada repo"
echo "   2. Suba a infra local: cd v4-marketing-backend && pnpm dev:prepare"
echo "   3. Leia: docs/architecture.md e docs/first-week.md"
echo "========================================="
