---
title: Esquema
---

> [!abstract] Definição
> **A primeira parte de uma [[glossario/url|URL]], antes dos dois-pontos. Diz que tipo de endereço é aquele e como ler o resto.** Em `https://www.loja.com.br`, o esquema é `https`.

Nos endereços da web, o esquema é o nome do [[glossario/protocolo|protocolo]] da conversa: `http` ou `https`. Por isso muita gente chama essa parte de protocolo, e o JavaScript também: o objeto `URL` guarda o esquema na propriedade `protocol`. Mas nem todo esquema é um protocolo. O `mailto:` abre o programa de e-mail, e o `file:` abre um arquivo do próprio computador. Em inglês, *scheme*. Ver a aula [[programacao/protocolos-da-web/modulo-1/02-o-que-acontece-quando-voce-digita-uma-url-e-aperta-enter|1.2 O que acontece quando você digita uma URL e aperta Enter]].

## De onde vem a palavra

Do latim *schēma*, do grego *skhêma*, "forma, figura, postura", que vem de *ékhō*, "ter, segurar": o jeito como uma coisa se mantém. Em inglês, *scheme* também é "plano, sistema". Numa URL, o esquema diz em que sistema o endereço foi escrito.

Fontes: Wiktionary: [scheme](https://en.wiktionary.org/wiki/scheme), [esquema](https://en.wiktionary.org/wiki/esquema), [σχῆμα](https://en.wiktionary.org/wiki/%CF%83%CF%87%E1%BF%86%CE%BC%CE%B1) · IETF: [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986)
