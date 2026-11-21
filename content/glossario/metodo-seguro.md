---
title: Método seguro (safe method)
---

> [!abstract] Definição
> **Um [[glossario/metodo-http|método HTTP]] que só lê: o cliente que o usa não pede nenhuma mudança no servidor.** Os seguros são `GET`, `HEAD`, `OPTIONS` e `TRACE`.

Como o método promete não mudar nada, navegadores, [[glossario/proxy|proxies]], [[glossario/cache|caches]] e [[glossario/crawler|crawlers]] mandam esses pedidos sozinhos, quantas vezes quiserem: pré-carregam links, repetem um pedido que falhou, guardam a resposta. Cumprir a promessa é trabalho do back-end: se uma ação que muda dados puder ser disparada por um `GET`, a especificação manda o dono do servidor tirá-la dali.

"Seguro" aqui não tem nada a ver com segurança contra ataques, nem com HTTPS. Quer dizer só "não muda nada". Registros em [[glossario/log|log]] e contadores de visita não contam: o cliente não os pediu. A aula 3.5 trata dos métodos seguros com precisão, junto com os idempotentes. Ver a aula [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|3.1 GET: o método para ler dados]].

## De onde vem a palavra

**Seguro** vem do latim *sēcūrus*, de *sē-*, "sem", e *cūra*, "cuidado, preocupação": **sem preocupação**. É bem o sentido do HTTP: um pedido que se pode mandar e repetir sem se preocupar.
Fontes: IETF: [RFC 9110, seção 9.2.1: Safe Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.1) · MDN: [Safe (HTTP Methods)](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP) · Wiktionary: [seguro](https://en.wiktionary.org/wiki/seguro), [securus](https://en.wiktionary.org/wiki/securus)
