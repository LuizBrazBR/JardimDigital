---
title: Método HTTP (verbo)
aliases:
  - verbo HTTP
---

> [!abstract] Definição
> **A palavra no começo da [[glossario/requisicao|requisição]] que diz qual ação o cliente quer fazer com o [[glossario/recurso|recurso]]: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD` ou `OPTIONS`.** Em `GET /produtos/42 HTTP/1.1`, o método é `GET`, "me mande o produto 42".

Também se chama **verbo**, porque faz na requisição o papel do verbo numa frase: "**buscar** o produto 42". O método é a ação, e o [[glossario/caminho|caminho]] é a coisa sobre a qual ela age. O nome oficial, na especificação do [[glossario/http|HTTP]], é *method*.

Não confunda com o [[glossario/metodo|método]] do JavaScript, como `compras.push(...)`: lá, método é uma função que vem dentro de um valor. As duas coisas só dividem o nome. O método HTTP é uma palavra escrita em maiúsculas no texto do pedido, e diferencia maiúsculas de minúsculas: `get` dá erro 400. Ver as aulas [[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|2.1 A anatomia de uma requisição HTTP]] e [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|3.1 GET: o método para ler dados]].

## De onde vem a palavra

**Método** vem do latim *methodus*, do grego *méthodos*, de *metá* e *hodós*, "caminho": o caminho que se segue para fazer alguma coisa. **Verbo** vem do latim *verbum*, "palavra", da mesma raiz indo-europeia do inglês *word*. O sentido gramatical de "palavra que indica ação" veio do grego *rhêma*, que os romanos traduziram por *verbum*.

Fontes: IETF: [RFC 9110, seção 9: Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9) · MDN: [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) · Wiktionary: [method](https://en.wiktionary.org/wiki/method), [verbo](https://en.wiktionary.org/wiki/verbo), [verbum](https://en.wiktionary.org/wiki/verbum)
