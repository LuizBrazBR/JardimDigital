---
title: Código de status
aliases:
  - status code
---

> [!abstract] Definição
> **Um número de três algarismos que informa o resultado de uma [[glossario/requisicao|requisição]] HTTP.** É enviado pelo servidor na [[glossario/resposta|resposta]]. Em inglês, *status code*.

`200` indica sucesso; `404`, que o recurso não foi encontrado; `204`, sucesso sem corpo. No HTTP/1.1, o código fica na primeira linha, como em `HTTP/1.1 200 OK`. O texto `OK` é uma explicação curta para a pessoa; o programa interpreta o número.

Ver a aula [[programacao/protocolos-da-web/modulo-2/02-a-anatomia-de-uma-resposta-http|2.2 A anatomia de uma resposta HTTP]].

Fonte: MDN: [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status).
