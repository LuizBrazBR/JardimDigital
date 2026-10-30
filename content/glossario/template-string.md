---
title: Template string
---

> [!abstract] Definição
> **Texto escrito entre crases, com lacunas para encaixar valores.** Em JavaScript, `` `Olá, ${nome}!` `` vira `Olá, Ana!` se a variável `nome` guardar `"Ana"`.

O nome oficial é *template literal*. *Template string* é o apelido, e é o mais usado.

Dentro da lacuna `${ }` cabe qualquer conta, não só um nome: `` `Ano que vem: ${idade + 1}` ``. A lacuna só funciona com crase. Com aspas comuns, ela aparece como texto, letra por letra.

É a alternativa mais legível à [[glossario/string|concatenação]] com `+`.

## De onde vêm as palavras

- **Template**: em inglês, "molde, gabarito", um modelo com espaços para preencher.
- **Crase**: do grego *krâsis*, "mistura". Em português, crase é a fusão de duas vogais iguais numa só (*a* + *a* = *à*). O sinal que marca essa fusão ganhou o mesmo apelido, embora o nome dele seja *acento grave*. Em inglês, o sinal se chama *backtick*.

> [!tip] Onde fica a crase no teclado
> No teclado brasileiro (ABNT2), é **Shift + ´**, na tecla ao lado do P. Para sair só a crase, sem virar `à`, aperte a tecla e depois **espaço**.

Fontes: MDN: [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) · Wiktionary: [crase](https://pt.wiktionary.org/wiki/crase)
