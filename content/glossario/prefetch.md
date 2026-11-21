---
title: Prefetch (pré-carregamento)
aliases:
  - pré-carregamento
  - pré-carregar
---

> [!abstract] Definição
> **Buscar um recurso antes de alguém pedir, para ele já estar pronto quando for pedido.** O navegador pode baixar a página de um link antes do clique: se o clique vier, a página abre na hora.

A página pode pedir isso ao navegador, com `<link rel="prefetch" href="/proxima">` no HTML, e o próprio navegador pode decidir pré-carregar os links que acha que você vai abrir. Cada pré-carregamento é uma requisição `GET` que ninguém clicou. Por isso um link que muda alguma coisa no servidor pode disparar sem querer. Ver a aula [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|3.1 GET: o método para ler dados]].

## De onde vem a palavra

Do inglês *pre-*, "antes", do latim *prae-*, e *fetch*, "ir buscar, trazer". *Fetch* vem do inglês antigo *feċċan*, "buscar, trazer". É também o nome da função `fetch` do JavaScript, que faz requisições: "buscar antes".

Fontes: MDN: [Prefetch](https://developer.mozilla.org/en-US/docs/Glossary/Prefetch), [rel=prefetch](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/prefetch) · Wiktionary: [prefetch](https://en.wiktionary.org/wiki/prefetch), [fetch](https://en.wiktionary.org/wiki/fetch)
