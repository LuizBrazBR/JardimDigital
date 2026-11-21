---
title: Handshake
---

> [!abstract] Definição
> **Uma troca de mensagens no começo de uma conexão, em que os dois lados combinam as regras da conversa.** Cada protocolo tem o seu: o do [[glossario/tcp|TCP]] confirma a conexão, e o do [[glossario/tls|TLS]] combina a proteção.

No TLS 1.3, o cliente se apresenta, o servidor manda o [[glossario/certificado|certificado]] e uma assinatura, e os dois calculam a mesma [[glossario/chave-de-sessao|chave de sessão]]. Ver a aula [[programacao/protocolos-da-web/modulo-2/05-http-vs-https-por-que-o-tls-importa|2.5 HTTP vs HTTPS: por que o TLS importa]].

## De onde vem a palavra

Do inglês *handshake*, "aperto de mão", de *hand*, "mão", e *shake*, "sacudir, apertar". Como dois desconhecidos que se cumprimentam antes de conversar.

Fontes: Wiktionary: [handshake](https://en.wiktionary.org/wiki/handshake)
