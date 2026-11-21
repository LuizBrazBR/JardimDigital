---
title: Parâmetro de caminho (path param)
aliases:
  - path param
  - path parameter
---

> [!abstract] Definição
> **Um pedaço do [[glossario/caminho|caminho]] da URL que muda de pedido para pedido e diz qual recurso se quer.** Em `/produtos/42`, o `42` é o parâmetro de caminho: é ele que aponta o produto 42.

O mesmo endpoint atende `/produtos/42`, `/produtos/58` e `/produtos/71`: só o parâmetro muda. Por isso a documentação de uma API costuma escrevê-lo com um nome no lugar do valor, como `/produtos/:id` ou `/produtos/{id}`. O outro jeito de mandar dados numa URL é a [[glossario/query-string|query string]], depois do `?`, que diz **como** buscar, e não **qual** recurso. Como tudo na URL, o parâmetro chega como texto: o `42` chega como `"42"`, e o back-end converte com `Number(...)`.

O nome parece com o [[glossario/parametro|parâmetro]] de uma função, e a ideia é parecida: é um espaço que recebe um valor diferente em cada chamada. Mas um fica na URL, e o outro, entre os parênteses da função. Ver a aula [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|3.1 GET: o método para ler dados]].

## De onde vem a palavra

**Parâmetro** vem do grego *para-*, "ao lado", e *métron*, "medida", pelo latim moderno *parametrum*. **Caminho** vem do latim tardio *cammīnus*, "via, estrada", que os romanos pegaram do gaulês, a língua celta falada onde hoje é a França. Em inglês, *path*, "trilha".

Fontes: MDN: [What is a URL?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL) · Wiktionary: [parameter](https://en.wiktionary.org/wiki/parameter), [caminho](https://en.wiktionary.org/wiki/caminho)
