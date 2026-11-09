---
title: Query string
---

> [!abstract] Definição
> **A parte da [[glossario/url|URL]] depois do `?`, com detalhes do pedido em pares `nome=valor`, separados por `&`.** Em `/produtos/tenis?cor=preto&tamanho=42`, a query string é `cor=preto&tamanho=42`.

Cada par se chama **parâmetro**. O [[glossario/caminho|caminho]] diz o que você quer, e a query string diz com que detalhes. Lembra a chamada de uma [[glossario/funcao|função]], só que cada valor vai junto com o nome, e por isso a ordem não importa. Tudo nela chega ao servidor como texto: o `42` chega como a [[glossario/string|string]] `"42"`. Ver a aula [[programacao/protocolos-da-web/modulo-1/02-o-que-acontece-quando-voce-digita-uma-url-e-aperta-enter|1.2 O que acontece quando você digita uma URL e aperta Enter]].

## De onde vem a palavra

*Query* é "consulta, pergunta", em inglês. Vem do latim *quaere*, "pergunte!", de *quaerō*, "buscar, perguntar", o mesmo de [[glossario/requisicao|requisição]], de **querer** e de **questão**. *String* é texto, no jargão de programação. A query string é o pedaço de texto com a consulta.

Fontes: Wiktionary: [query](https://en.wiktionary.org/wiki/query), [quaere](https://en.wiktionary.org/wiki/quaere)
