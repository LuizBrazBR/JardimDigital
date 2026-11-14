---
title: API
---

> [!abstract] Definição
> **A lista de pedidos que um programa aceita de outros programas, com o que cada pedido precisa levar e o que volta.** Numa API da web, cada pedido é uma [[glossario/requisicao|requisição]] [[glossario/http|HTTP]], e as respostas costumam vir em [[glossario/json|JSON]].

Quem usa uma [[glossario/funcao|função]] precisa saber o nome dela, o que passar e o que ela devolve, e não como ela funciona por dentro. Uma API é isso para um programa inteiro. A diferença para um site: o site responde [[glossario/html|HTML]], para uma pessoa ver, e a API responde dados, para um programa usar.

Num [[glossario/back-end|back-end]], cada pedido da lista é um [[glossario/endpoint|endpoint]], como `POST /pedidos`, e a API é o conjunto deles, com o que cada um pede e devolve. Num restaurante, a API seria o que a cozinha aceita fazer, e cada prato, um endpoint. O cardápio é outra coisa: é a **documentação** da API, o texto que a descreve para quem vai pedir. Se o código muda e a documentação não, vale o código. Ver as aulas [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|1.5 O que é um back-end e o que ele faz]] e [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|1.1 Cliente e servidor: o modelo por trás da web]].

## De onde vem a palavra

Sigla do inglês *Application Programming Interface*, "interface de programação de aplicações". **Interface** junta o latim *inter*, "entre", e *face*, "face, forma": a face que fica entre duas coisas, por onde uma conversa com a outra. A expressão *application program interface* aparece pela primeira vez num artigo de 1968.

Fontes: MDN: [API](https://developer.mozilla.org/en-US/docs/Glossary/API) · Wikipedia: [API](https://en.wikipedia.org/wiki/API) · Wiktionary: [interface](https://en.wiktionary.org/wiki/interface)
