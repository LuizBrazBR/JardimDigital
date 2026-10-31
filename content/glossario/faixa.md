---
title: Faixa (de valores)
---

> [!abstract] Definição
> **Um trecho de números, de um limite até outro, com tudo o que fica no meio deles.** "De 20 até antes de 30" é uma faixa: vale para 20, 25, 29,9 e para todos os números entre eles.

Imagine os números enfileirados numa régua. Uma faixa é uma tira dessa régua:

```text
   0          10          20          30
   ├──────────┼───────────┼───────────┼──────→
    muito frio    frio      agradável   calor
```

O contrário é o **valor exato**: um valor solto, como o dia 3 da semana, a opção 2 de um menu ou a cor "verde". Valores exatos dá para listar, um por um. Faixas, não, porque entre dois números sempre cabe outro.

Em código, a diferença aparece no sinal:

| Tipo | Pergunta | Em JavaScript |
|---|---|---|
| valor exato | "é igual a 3?" | `dia === 3` |
| faixa | "está de 20 até antes de 30?" | `temperatura >= 20 && temperatura < 30` |

Para escolher entre várias faixas, usa-se a escada de [[glossario/senao-se|senão se]] (`else if`). Para escolher entre vários valores exatos, também se pode usar a [[glossario/escolha|escolha]] (`switch`), que não funciona com faixas.

Exemplos do dia a dia: faixa etária (de 13 a 17 anos), faixa de preço, faixa de notas, faixa de velocidade.

Ver as aulas [[programacao/logica-de-programacao/modulo-3/03-else-if-varias-condicoes-em-cadeia|else if: várias condições em cadeia]] e [[programacao/logica-de-programacao/modulo-3/05-switch-escolhendo-entre-muitos-casos|switch: escolhendo entre muitos casos]].

## De onde vem a palavra

Do latim *fascia*, "tira, fita, faixa". Antes dos números, uma faixa era uma tira de pano. Depois, uma tira pintada no chão, como a faixa de pedestres. E, por fim, uma tira da régua dos números.

Fontes: Wiktionary: [faixa](https://en.wiktionary.org/wiki/faixa), [fascia](https://en.wiktionary.org/wiki/fascia)
