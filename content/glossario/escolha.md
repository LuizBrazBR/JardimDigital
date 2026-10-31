---
title: Escolha (switch)
---

> [!abstract] Definição
> **Uma forma de comparar uma variável com vários valores exatos e rodar o trecho do valor que bater.** Em JavaScript, se escreve com `switch`, `case`, `break` e `default`.

```js
switch (opcao) {
  case 1:
    console.log("Financeiro");
    break;
  case 2:
    console.log("Suporte técnico");
    break;
  default:
    console.log("Opção inválida");
}
```

| Peça | O que faz |
|---|---|
| `switch (opcao)` | pega o valor que vai ser comparado |
| `case 1:` | marca onde entrar quando o valor é igual a 1 |
| `break;` | sai do `switch` |
| `default:` | roda quando nenhum `case` bateu, como o [[glossario/senao|senão]] (`else`) |

Cuidados:

- O `case` é só uma porta de **entrada**. Sem `break`, a execução continua nos casos de baixo, mesmo que eles não batam. Isso se chama *fall-through*, "cair através".
- A comparação é feita com `===`: o texto `"2"` não bate com o número `2`, e `"Verde"` não bate com `"verde"`.
- O `switch` não serve para [[glossario/faixa|faixas]]. Para "é maior que?" e "é menor que?", use o [[glossario/senao-se|senão se]] (`else if`).

Ver a aula [[programacao/logica-de-programacao/modulo-3/05-switch-escolhendo-entre-muitos-casos|switch: escolhendo entre muitos casos]].

## De onde vem a palavra

Em inglês, *switch* quer dizer chave, interruptor ou desvio. A origem provável é o holandês médio *swijch*, "galho fino". Por volta de 1797, a palavra passou a nomear os trilhos móveis das ferrovias das minas, que mandavam o carrinho para um caminho ou para outro. Hoje, *switch* é tanto a agulha do trem quanto o interruptor de luz.

O `switch` faz o mesmo papel: manda a execução para o trilho certo. Em pseudocódigo, costuma se chamar **escolha**.

O *case* é o nosso **caso**, do latim *cāsus*, de *cadere*, "cair": primeiro uma queda, depois o que acontece. E o *default*, do francês antigo *defaute*, "falta", é o que vale na falta de outra escolha.

Fontes: Wiktionary: [switch](https://en.wiktionary.org/wiki/switch), [casus](https://en.wiktionary.org/wiki/casus), [default](https://en.wiktionary.org/wiki/default) · MDN: [switch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch)
