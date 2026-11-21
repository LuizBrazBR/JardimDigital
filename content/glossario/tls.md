---
title: TLS
---

> [!abstract] Definição
> **O protocolo que protege a conversa entre cliente e servidor: embaralha as mensagens, detecta alterações e prova quem é o servidor.** A sigla é do inglês *Transport Layer Security*, "segurança da camada de transporte". É o "S" do [[glossario/https|HTTPS]].

O TLS fica entre o [[glossario/http|HTTP]] e o [[glossario/tcp|TCP]] e começa com um [[glossario/handshake|handshake]], antes de qualquer requisição. A versão atual é a 1.3. O nome SSL, o do protocolo que veio antes, ainda é usado por muita gente como sinônimo de TLS. Ver a aula [[programacao/protocolos-da-web/modulo-2/05-http-vs-https-por-que-o-tls-importa|2.5 HTTP vs HTTPS: por que o TLS importa]].

## De onde vem a palavra

*Transport* vem do latim *transportare*, "levar através" (*trans-*, "através", e *portare*, "carregar"). *Layer* é "camada". *Security* vem do latim *securitas*, de *securus*, "sem cuidado, tranquilo" (*se-*, "sem", e *cura*, "cuidado"): estar seguro é estar sem preocupação. O protocolo nasceu como **SSL**, *Secure Sockets Layer*, criado pela Netscape. O TLS 1.0 foi publicado em janeiro de 1999 e, segundo a RFC dele, é baseado no SSL 3.0.

Fontes: IETF: [RFC 8446, TLS 1.3](https://www.rfc-editor.org/rfc/rfc8446), [RFC 2246, TLS 1.0](https://www.rfc-editor.org/rfc/rfc2246) · Wiktionary: [transport](https://en.wiktionary.org/wiki/transport), [security](https://en.wiktionary.org/wiki/security), [secure](https://en.wiktionary.org/wiki/secure)
