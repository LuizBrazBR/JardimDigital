---
title: JSON Merge Patch
---

> [!abstract] Definição
> **Formato que descreve em JSON mudanças a aplicar a dados existentes.** Em um objeto, campos omitidos conservam o valor atual e `null` pede a remoção do campo.

O método [[glossario/patch|PATCH]] pede a alteração. O cabeçalho `Content-Type: application/merge-patch+json` informa que o corpo segue este formato. Em um cadastro `{"nome":"Caneta","desconto":5}`, aplicar `{"desconto":null}` produz `{"nome":"Caneta"}`. Aplicar `{"desconto":0}` grava zero e mantém o campo presente. Ver a aula [[programacao/protocolos-da-web/modulo-3/03-put-e-patch-atualizacao-total-e-parcial|3.3 PUT e PATCH: atualização total e parcial]].

## De onde vem a palavra

No nome em inglês, JSON identifica a forma de escrever os dados, *merge* significa «mesclar» e *patch* significa «remendo». O nome descreve a aplicação de um conjunto de mudanças em JSON sobre os dados atuais.

Fontes: [RFC 7396, JSON Merge Patch](https://www.rfc-editor.org/rfc/rfc7396.html#section-2) · [Wiktionary, merge](https://en.wiktionary.org/wiki/merge#English) · [Wiktionary, patch](https://en.wiktionary.org/wiki/patch#English)
