---
title: Corpo
aliases:
  - body
---

> [!abstract] Definição
> **A parte de uma mensagem [[glossario/http|HTTP]] que leva os dados em si, depois dos [[glossario/cabecalho|cabeçalhos]] e da linha em branco.** Em inglês, *body*. Pode não existir.

Numa [[glossario/requisicao|requisição]] `POST`, o corpo leva o que o cliente manda, como `{"produtoId": 42, "quantidade": 2}`. Um `GET` normalmente não tem corpo. Numa [[glossario/resposta|resposta]], o corpo é a página, o JSON ou a imagem. Dois cabeçalhos descrevem o corpo: o `Content-Type`, com o formato, e o `Content-Length`, com o tamanho em bytes. Ver a aula [[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|2.1 A anatomia de uma requisição HTTP]].

## De onde vem a palavra

Do latim *corpus*, "corpo". É a parte principal, a substância da mensagem, abaixo da cabeça, como o corpo de uma carta.

Fontes: MDN: [HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages) · Wiktionary: [corpo](https://en.wiktionary.org/wiki/corpo)
