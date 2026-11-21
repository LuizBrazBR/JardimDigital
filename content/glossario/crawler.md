---
title: Crawler
aliases:
  - robô de busca
  - spider
---

> [!abstract] Definição
> **Um programa que visita páginas sozinho: baixa uma página, acha os links dela e segue cada um, sem nenhuma pessoa clicando.** O mais conhecido é o Googlebot, que lê a web para o Google montar a busca.

Cada link que o crawler segue vira uma requisição `GET`. Ele não sabe o que o link faz, e não pergunta: se um link apaga alguma coisa, o crawler apaga. Também é chamado de robô de busca ou *spider*, "aranha", porque anda pela teia (*web*) de links. Ver a aula [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|3.1 GET: o método para ler dados]].

## De onde vem a palavra

Do inglês *crawl*, "rastejar, andar devagar", com o sufixo *-er*, de quem faz a ação: "o que rasteja". *Crawl* vem do inglês médio *crawlen*, do nórdico antigo *krafla*, "rastejar", parente do alemão *krabbeln*. O crawler percorre a web devagar, página por página.

Fontes: MDN: [Crawler](https://developer.mozilla.org/en-US/docs/Glossary/Crawler) · Wiktionary: [crawler](https://en.wiktionary.org/wiki/crawler), [crawl](https://en.wiktionary.org/wiki/crawl)
