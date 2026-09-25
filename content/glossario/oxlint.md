---
title: Oxlint
---

[[glossario/linter|Linter]] para JavaScript/TypeScript escrito em Rust (parte do projeto Oxc). Passou a ser o linter padrão gerado pelo `npm create vite@latest` em templates React/TypeScript, no lugar do ESLint.

Vantagem principal: velocidade — roda ordens de magnitude mais rápido que ESLint por ser compilado, sem depender de plugins em JavaScript.
