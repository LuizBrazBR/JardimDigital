---
title: Back-end
---

> [!abstract] Definição
> **O código que roda no [[glossario/servidor|servidor]] e cuida das regras de negócio, dos dados e da segurança da aplicação.** É o oposto do [[glossario/front-end|front-end]], que roda no navegador.

O back-end expõe [[glossario/endpoint|endpoints]], recebe e valida os dados, aplica as regras, lê e grava no [[glossario/banco-de-dados|banco de dados]], faz a [[glossario/autenticacao|autenticação]] e devolve a [[glossario/resposta|resposta]], quase sempre em [[glossario/json|JSON]]. O código dele nunca sai do servidor, e por isso é o lugar dos segredos, como a senha do banco, e das regras que não podem ser burladas. Para o front-end, ele é servidor; para o banco de dados e outros serviços, é [[glossario/cliente|cliente]]. Ver as aulas [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|1.1 Cliente e servidor: o modelo por trás da web]] e [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|1.5 O que é um back-end e o que ele faz]].

## De onde vem a palavra

Do inglês *back*, "de trás", e *end*, "ponta, extremidade": a ponta de trás do sistema, a que o usuário não vê. É como a cozinha de um restaurante, que em inglês se chama *back of house*. Em inglês, o substantivo costuma vir separado, *the back end*, e com hífen antes de outro nome, *a back-end developer*. Em português, ficou com hífen.

Fontes: MDN: [Introduction to the server side](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction) · Wiktionary: [back end](https://en.wiktionary.org/wiki/back_end)
