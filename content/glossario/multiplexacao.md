---
title: Multiplexação
---

> [!abstract] Definição
> **Fazer vários fluxos de dados dividirem uma mesma conexão**, com as partes intercaladas.

No HTTP/2, uma resposta lenta não impede que outra, pedida depois, termine antes, porque as duas viajam em pedaços (os [[glossario/frame|frames]]) pela mesma conexão. Ver a aula [[programacao/protocolos-da-web/modulo-2/04-as-versoes-do-http-1-1-2-e-3|2.4 As versões do HTTP: 1.1, 2 e 3]].

## De onde vem a palavra

Do latim *multiplex*, "de muitas dobras ou partes": *multus*, "muito", mais *-plex*, "dobra". Em telefonia e redes, é o nome de fazer muitas conversas passarem por um só fio.

Fontes: Wiktionary: [multiplex](https://en.wiktionary.org/wiki/multiplex) · IETF: [RFC 9113, HTTP/2](https://www.rfc-editor.org/rfc/rfc9113)
