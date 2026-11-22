---
title: JSON Merge Patch
---

> [!abstract] Definição
> **Formato que descreve em JSON mudanças a aplicar a dados existentes.** Em um objeto, campos omitidos conservam o valor atual e `null` pede a remoção do campo.

Se a API aceitar esse formato, envie `{"ativo":false}` no corpo de um [[glossario/patch|PATCH]] para desativar uma conta e preservar o restante do cadastro. O cabeçalho `Content-Type: application/merge-patch+json` identifica o formato. Ver a aula [[programacao/protocolos-da-web/modulo-3/03-put-e-patch-atualizacao-total-e-parcial|3.3 PUT e PATCH: atualização total e parcial]].

## De onde vem a palavra

No nome em inglês, JSON identifica a forma de escrever os dados, *merge* significa «mesclar» e *patch* significa «remendo». O nome descreve a aplicação de um conjunto de mudanças em JSON sobre os dados atuais.

Fontes: [RFC 7396, JSON Merge Patch](https://www.rfc-editor.org/rfc/rfc7396.html#section-2) · [Wiktionary, merge](https://en.wiktionary.org/wiki/merge#English) · [Wiktionary, patch](https://en.wiktionary.org/wiki/patch#English)
