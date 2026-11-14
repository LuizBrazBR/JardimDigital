---
title: Cabeçalho
aliases:
  - header
---

> [!abstract] Definição
> **Uma linha `Nome: valor` numa mensagem [[glossario/http|HTTP]] que dá uma informação sobre a mensagem, e não é a mensagem em si.** Em inglês, *header*. A [[glossario/requisicao|requisição]] tem os cabeçalhos dela, e a [[glossario/resposta|resposta]], os dela.

Os cabeçalhos são [[glossario/metadados|metadados]]: `Host: api.loja.com` diz para qual site é o pedido, `Content-Type: application/json` diz que o [[glossario/corpo|corpo]] está em [[glossario/json|JSON]], `Content-Length: 34` diz que ele tem 34 bytes. Vêm depois da primeira linha, um por linha, e terminam numa linha em branco. No nome, tanto faz maiúscula ou minúscula. Ver as aulas [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|1.1 Cliente e servidor]] e [[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|2.1 A anatomia de uma requisição HTTP]].

## De onde vem a palavra

De **cabeça** com o sufixo *-alho*. Cabeça vem do latim vulgar *capitia*, de *capitium*, de *caput*, "cabeça": o cabeçalho é o que vem no alto, antes do conteúdo. O inglês *header* vem de *head*, "cabeça", com o sufixo *-er*.

Fontes: MDN: [HTTP headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers) · Wiktionary: [cabeçalho](https://en.wiktionary.org/wiki/cabe%C3%A7alho), [cabeça](https://en.wiktionary.org/wiki/cabe%C3%A7a), [header](https://en.wiktionary.org/wiki/header)
