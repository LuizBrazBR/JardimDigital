---
title: QUIC
---

> [!abstract] Definição
> **Protocolo de transporte que funciona sobre [[glossario/udp|UDP]] e é a base do HTTP/3.** Entrega fluxos independentes e já traz o TLS embutido.

Se um pacote de um fluxo se perde, só esse fluxo espera; os outros seguem. O TCP não faz isso. Ver a aula [[programacao/protocolos-da-web/modulo-2/04-as-versoes-do-http-1-1-2-e-3|2.4 As versões do HTTP: 1.1, 2 e 3]].

## De onde vem a palavra

Começou como sigla informal do Google, *Quick UDP Internet Connections*, "conexões rápidas de internet sobre UDP". Quando foi padronizado, a IETF decidiu que não é sigla: a RFC 9000 diz que "QUIC é um nome, não uma sigla". Pronuncia-se como "quick", "rápido" em inglês.

Fontes: IETF: [RFC 9000, QUIC](https://www.rfc-editor.org/rfc/rfc9000)
