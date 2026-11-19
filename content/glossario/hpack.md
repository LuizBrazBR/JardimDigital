---
title: HPACK
---

> [!abstract] Definição
> **O formato que o HTTP/2 usa para comprimir os cabeçalhos**, para não repetir os mesmos dados a cada requisição.

Cabeçalhos como `User-Agent` e `Cookie` quase não mudam entre pedidos, e o HPACK aproveita isso. Ver a aula [[programacao/protocolos-da-web/modulo-2/04-as-versoes-do-http-1-1-2-e-3|2.4 As versões do HTTP: 1.1, 2 e 3]].

## De onde vem a palavra

Da expressão inglesa *Header Compression for HTTP/2*, "compressão de cabeçalhos para HTTP/2". É o título da RFC 7541: *H* de *header* e *HTTP/2*, mais *pack*, "empacotar".

Fontes: IETF: [RFC 7541, HPACK](https://www.rfc-editor.org/rfc/rfc7541)
