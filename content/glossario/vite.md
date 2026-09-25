---
title: Vite
---

Ferramenta que serve como [[glossario/bundler|bundler]] e [[glossario/dev-server|dev server]] para projetos front-end. Nome vem do francês "rápido".

Diferencial: em desenvolvimento, não empacota o projeto inteiro de uma vez — serve os arquivos praticamente sem transformação, usando os módulos ES nativos do navegador, e só transforma cada arquivo sob demanda quando ele é pedido. Isso torna o [[glossario/dev-server|dev server]] quase instantâneo mesmo em projetos grandes. Para produção (`npm run build`), aí sim empacota tudo de forma otimizada.

Criado por Evan You (mesmo criador do Vue), hoje é o padrão de facto para iniciar projetos React, Vue, Svelte etc.
