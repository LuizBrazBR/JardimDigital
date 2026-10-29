---
title: camelCase
---

> [!abstract] Definição
> **Jeito de escrever nomes compostos sem espaço: as palavras vão coladas, e cada uma, a partir da segunda, começa com maiúscula.** `nomeDoAluno`, `precoTotal`, `dataDeNascimento`. É o padrão para nomes de variáveis em JavaScript.

Nomes de variáveis não podem ter espaço, então cada linguagem tem o seu costume para juntar palavras:

| Estilo | Exemplo | Onde aparece |
|---|---|---|
| camelCase | `nomeDoAluno` | variáveis em JavaScript |
| PascalCase | `NomeDoAluno` | componentes de [[glossario/react\|React]] e classes |
| snake_case | `nome_do_aluno` | variáveis em Python |
| maiúsculas com `_` | `DIAS_DA_SEMANA` | constantes fixas |
| kebab-case | `nome-do-aluno` | nomes de arquivos e endereços de sites, como os deste jardim |

Os apelidos são todos visuais: *snake* (cobra) rasteja pelo chão do `_`, e *kebab* tem as palavras espetadas no traço, como num espetinho. O kebab-case não serve para variáveis em JavaScript, porque o `-` seria lido como sinal de menos.

## De onde vem o nome

As maiúsculas no meio do nome lembram as **corcovas de um camelo**. O nome *CamelCase* aparece pela primeira vez em 1995, num post de Newton Love na Usenet. Em 1990 já se falava do mesmo estilo como *InterCaps*.

Fontes: Wikipedia: [Camel case](https://en.wikipedia.org/wiki/Camel_case) · MDN: [guia de estilo de JavaScript](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript)
