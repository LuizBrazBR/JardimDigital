---
title: SNI
---

> [!abstract] Definição
> **O campo no começo do aperto de mão do [[glossario/tls|TLS]] em que o cliente diz o nome do site que quer acessar.** A sigla é do inglês *Server Name Indication*, "indicação do nome do servidor".

Serve para um mesmo IP atender muitos sites: o servidor lê o nome e escolhe o [[glossario/certificado|certificado]] certo. É também o motivo de o nome do site aparecer a quem escuta a rede, mesmo em HTTPS. Ver a aula [[programacao/protocolos-da-web/modulo-2/05-http-vs-https-por-que-o-tls-importa|2.5 HTTP vs HTTPS: por que o TLS importa]].

## De onde vem a palavra

*Indication* vem do latim *indicatio*, "ato de mostrar, apontar", de *indicare*. O campo se chama *server_name* na RFC 6066, que define a extensão do TLS, e o título da seção é *Server Name Indication*.

Fontes: IETF: [RFC 6066](https://www.rfc-editor.org/rfc/rfc6066) · Wiktionary: [indication](https://en.wiktionary.org/wiki/indication)
