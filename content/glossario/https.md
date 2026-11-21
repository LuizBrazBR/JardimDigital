---
title: HTTPS
---

> [!abstract] Definição
> **O [[glossario/http|HTTP]] rodando por dentro do [[glossario/tls|TLS]].** A sigla é do inglês *Hypertext Transfer Protocol Secure*, "protocolo de transferência de hipertexto seguro". A mensagem é a mesma do HTTP; muda o caminho, que passa a ser protegido.

Usa a porta 443 por padrão, e o endereço começa com `https://`. O servidor precisa de um [[glossario/certificado|certificado]]. Ver a aula [[programacao/protocolos-da-web/modulo-2/05-http-vs-https-por-que-o-tls-importa|2.5 HTTP vs HTTPS: por que o TLS importa]].

## De onde vem a palavra

O "S" final é de *secure*, do latim *securus*, "sem cuidado, tranquilo" (*se-*, "sem", e *cura*, "cuidado"). A forma de usar o HTTP sobre o TLS foi descrita na RFC 2818, de maio de 2000, chamada *HTTP Over TLS*.

Fontes: IETF: [RFC 2818, HTTP Over TLS](https://www.rfc-editor.org/rfc/rfc2818) · Wiktionary: [secure](https://en.wiktionary.org/wiki/secure)
