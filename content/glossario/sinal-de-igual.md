---
title: "Sinal de igual (=, == e ===)"
---

> [!abstract] Definição
> **Em JavaScript, o sinal de igual aparece de três jeitos, e cada um faz uma coisa.**
> - `=` é a [[glossario/atribuicao|atribuição]]: guarda um valor. `idade = 18` lê-se "idade recebe 18".
> - `===` é a igualdade estrita: pergunta se os dois lados são iguais, em valor e em tipo. `"5" === 5` dá `false`.
> - `==` é a igualdade solta: converte os tipos antes de comparar. `"5" == 5` dá `true`. As regras da conversão são cheias de surpresas, por isso se prefere o `===`.

Trocar `===` por `=` é um erro clássico, e perigoso porque muitas vezes não dá erro nenhum: em vez de perguntar se a variável vale 18, o programa passa a guardar 18 nela. Ver a aula [[programacao/logica-de-programacao/08-comparacoes|Comparações]].

## De onde vem a palavra

*Igual* vem do latim *aequālis*, de *aequus*, "igual, plano, nivelado". Da mesma família vêm **equação**, **equilíbrio**, **equidade** e **equinócio** (de *aequus* + *nox*, "noite": a data em que a noite dura quase o mesmo que o dia).

## De onde vem o sinal

O `=` foi inventado em 1557 pelo galês **Robert Recorde**, num livro de álgebra chamado *The Whetstone of Witte*. Cansado de escrever "é igual a", ele desenhou duas linhas paralelas do mesmo comprimento, porque, nas palavras dele, nenhuma coisa pode ser mais igual do que duas linhas assim.

Na programação, o sinal ganhou outro trabalho:

| Quando | Linguagem | O que fez com o `=` |
|---|---|---|
| 1957 | FORTRAN | usou o `=` para atribuir: `X = X + 2` |
| 1958 a 1960 | ALGOL | manteve o `=` para comparar e criou o `:=` para atribuir |
| fim dos anos 1960 | B | ficou com o `=` para atribuir e criou o `==` para comparar |
| depois | C, e daí o [[glossario/javascript\|JavaScript]] | herdaram o `=` e o `==` do B. O JavaScript ainda acrescentou o `===` |

Muitos livros de lógica fogem da confusão escrevendo a atribuição com uma seta, `idade <- 18`, e deixando o `=` só para comparar, como na matemática.

Fontes: Wikipedia: [Equals sign](https://en.wikipedia.org/wiki/Equals_sign) · Wiktionary: [igual](https://en.wiktionary.org/wiki/igual), [aequus](https://en.wiktionary.org/wiki/aequus) · MDN: [Strict equality (===)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Strict_equality)
