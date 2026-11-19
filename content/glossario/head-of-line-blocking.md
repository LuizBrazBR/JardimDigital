---
title: Head-of-line blocking
---

> [!abstract] Definição
> **Quando o item da frente da fila atrasa todos os que estão atrás dele**, mesmo que eles já pudessem ser entregues.

No HTTP/1.1, a resposta lenta segura as seguintes na mesma conexão. No HTTP/2, o TCP pode repetir o problema na camada de transporte, quando um pacote se perde. O HTTP/3 resolve isso com os fluxos independentes do [[glossario/quic|QUIC]]. Ver a aula [[programacao/protocolos-da-web/modulo-2/04-as-versoes-do-http-1-1-2-e-3|2.4 As versões do HTTP: 1.1, 2 e 3]].

## De onde vem a palavra

Do inglês, "bloqueio da cabeça da fila": *head*, "cabeça, frente", *line*, "fila", *blocking*, "bloqueio". A expressão fala de uma fila em que quem está na frente não anda e ninguém passa.

Fontes: IETF: [RFC 9113, HTTP/2](https://www.rfc-editor.org/rfc/rfc9113) · [RFC 9114, HTTP/3](https://www.rfc-editor.org/rfc/rfc9114)
