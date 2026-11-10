---
title: Parse
---

> [!abstract] Definição
> **Ler um texto, separar as partes dele e dizer o que cada uma é.** O navegador faz o parse de uma [[glossario/url|URL]] cortando nos sinais `://`, `:`, `/`, `?` e `#`, e assim acha o esquema, o host, a porta, o caminho, a query string e o fragmento.

Em português, se diz "fazer o parse" ou "parsear", e se lê "párs". A parte do programa que faz o parse se chama *parser*, ou analisador sintático. Ele não executa nada: transforma a estrutura escrita no texto numa estrutura que o programa usa na memória. O navegador também faz o parse do HTML antes de desenhar a página, e um programa faz o parse de um [[glossario/json|JSON]] antes de usar os dados. Ver a aula [[programacao/protocolos-da-web/modulo-1/02-o-que-acontece-quando-voce-digita-uma-url-e-aperta-enter|1.2 O que acontece quando você digita uma URL e aperta Enter]].

## De onde vem a palavra

Do latim *pars*, "parte", provavelmente pelo inglês medieval *pars*, "as partes do discurso", ou seja, a gramática. Fazer o parse de uma frase era dizer o que cada palavra é, como na análise sintática da escola.

Fontes: Wiktionary: [parse](https://en.wiktionary.org/wiki/parse)
