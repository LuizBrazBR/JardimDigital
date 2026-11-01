---
title: Decomposição
---

> [!abstract] Definição
> **Dividir um problema grande em partes menores, que dá para entender e resolver uma de cada vez.** É um dos pilares do pensamento computacional.

Se uma parte ainda parecer grande, decompõe-se de novo, até cada pedaço ficar simples. Depois, as soluções das partes são juntadas.

No código, cada parte costuma virar uma [[glossario/funcao|função]], e uma função pode chamar outra para montar a solução inteira. É o [[glossario/dividir-para-conquistar|dividir para conquistar]], da [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|aula 5.5]].

## De onde vem a palavra

| Parte | Latim | Sentido |
|---|---|---|
| *de-* | *dē-* | desfazer, separar |
| *com-* | *con-* | junto |
| *-por* | *pōnere* | pôr, colocar |

*Compor* é **pôr junto**. *Decompor* é **desfazer o que foi posto junto**: separar uma coisa nas partes que a formam.

> [!example] A mesma raiz na programação
> **Componente** também vem de *compōnere*: é a peça que se põe junto com outras. No [[glossario/react|React]], a tela é dividida em componentes. A página inteira vira peças pequenas, e cada uma cuida de uma parte. É decomposição aplicada.

Fontes: Wiktionary: [compōnō](https://en.wiktionary.org/wiki/compono)
