---
title: "5.3 return: devolvendo um resultado (x só imprimir)"
tags:
  - logica-de-programacao
  - javascript
  - funcoes
---

Terceira aula do módulo 5. As funções das aulas 5.1 e 5.2 terminavam todas do mesmo jeito: com um `console.log` lá dentro. O resultado aparecia na tela, e acabava ali. Só que, muitas vezes, o programa precisa **usar** esse resultado: guardar numa variável, somar com outro número, comparar num `if`.

Para isso existe o **[[glossario/retorno|return]]**: ele faz a função **devolver** um valor para quem a chamou.

## Mostrar não é devolver

Pense no caixa de uma loja na hora do troco. Ele pode fazer duas coisas bem diferentes:

- **Mostrar** o valor do troco no visor. Você vê o número, mas continua de mão vazia.
- **Devolver** o troco, as moedas na sua mão. Agora ele é seu: dá para guardar na carteira, gastar em outra compra ou passar para outra pessoa.

Numa função, o `console.log` é o visor, e o `return` é o troco na mão.

O console é uma tela, e quem lê a tela é você, a pessoa. O programa não lê o que aparece ali. O que foi mostrado no console não fica guardado em lugar nenhum do programa, e não dá para usar depois. Na programação, mostrar um texto no console se chama **[[glossario/imprimir|imprimir]]**, mesmo que nada saia no papel.

## Tentando guardar o que foi mostrado

Esta função só mostra a soma:

```js
function somarMostrando(a, b) {
  console.log(a + b);
}

let resultado = somarMostrando(2, 3);
console.log(resultado);

// saída:
// 5
// undefined
```

O 5 aparece, mas a variável `resultado` fica com `undefined`. Passo a passo:

| Passo | O que acontece |
|---|---|
| 1 | A chamada `somarMostrando(2, 3)` roda o corpo. O `console.log` lá dentro mostra `5` na tela |
| 2 | O corpo acaba sem `return`. A função não devolve nada, e a chamada vale `undefined` |
| 3 | O `resultado` recebe o que a chamada valeu: `undefined` |
| 4 | O `console.log(resultado)` mostra `undefined` |

O 5 foi para a tela, e não para a variável.

> [!info] O `undefined` da aula 1.5
> Na [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]], aparecia um `undefined` embaixo de cada `console.log` digitado no console do navegador. Agora dá para entender por quê. O navegador mostra o valor que cada comando devolve, e o `console.log` é uma função que só mostra: ela não tem `return`, então devolve `undefined`.

## `return`: devolver o valor

Com `return`, a função entrega o resultado em vez de mostrá-lo:

```js
function somar(a, b) {
  return a + b;
}

let total = somar(2, 3);
console.log(total); // 5
```

O `return a + b` faz a conta e entrega o resultado para quem chamou a função. Agora o `total` vale 5.

Repare que o `somar` não mostra nada. Se você escrever só `somar(2, 3);`, numa linha sozinha, nada aparece no console. O 5 é devolvido, mas ninguém o guarda nem o mostra, e ele se perde. É o troco que o caixa entregou e ninguém pegou. (No console do navegador, o 5 aparece, porque o navegador mostra o valor de cada linha digitada. Num arquivo rodado com o Node, não aparece nada.)

### A chamada vira o valor

Um jeito de ler o código: quando o programa roda, a chamada é trocada pelo valor que ela devolve.

```js
let dobro = somar(2, 3) * 2;

// somar(2, 3) devolve 5, então a linha vira:
// let dobro = 5 * 2;
// e o dobro vale 10
```

Como a chamada vira um valor, ela pode ir a qualquer lugar onde caberia um valor:

```js
let guardado = somar(2, 3);          // guardar numa variável: 5
console.log(somar(2, 3) * 2);        // usar numa conta: 10
console.log(somar(2, 3));            // mostrar: 5
console.log(somar(somar(1, 2), 10)); // ser argumento de outra chamada: 13

if (somar(4, 4) > 7) {               // comparar num if
  console.log("passou de 7");
}
```

No `somar(somar(1, 2), 10)`, a chamada de dentro roda primeiro e devolve 3. Aí a linha vira `somar(3, 10)`, que devolve 13. É como a conta dentro do argumento, da [[programacao/logica-de-programacao/modulo-5/02-parametros-e-argumentos-entradas-da-funcao|aula 5.2]]: primeiro se calcula o que está dentro, e só o valor entra na função.

Repare também no `console.log(somar(2, 3))`. Mostrar continua possível, só que agora quem mostra é quem chamou, e não a função.

### Quem chamou decide

Por isso, uma função que devolve costuma ser mais útil do que uma que mostra. O `somar` só faz a conta. Quem o chamou decide o que fazer com o resultado: mostrar, guardar, somar com outra coisa, comparar. Já o `somarMostrando` decide sozinho que o resultado vai para a tela, e mais nada se pode fazer com ele.

Isso não quer dizer que toda função precisa de `return`. O `mostrarLinha` da aula 5.1 existe para mostrar uma linha na tela, e não tem nada para devolver. A pergunta é: o resultado vai ser **usado** depois? Se vai, use `return`.

## `console.log` x `return`

| | `console.log` dentro da função | `return` dentro da função |
|---|---|---|
| O que faz | mostra o valor no console | devolve o valor para quem chamou |
| É para quem | a pessoa que olha a tela | o resto do programa |
| Dá para guardar numa variável? | não: a variável recebe `undefined` | sim |
| Dá para usar numa conta? | não: a conta usa `undefined`, e costuma dar `NaN` | sim |
| No caixa da loja | o troco no visor | o troco na mão |

Confundir os dois é um dos enganos mais comuns de quem está começando. O sinal costuma ser um `undefined` ou um `NaN` aparecendo onde se esperava um número: a função mostrou o resultado, mas não o devolveu.

## O `return` encerra a função

Quando o `return` roda, a função acaba **na hora**. O que estiver escrito depois dele, dentro da função, não roda:

```js
function teste() {
  console.log("antes do return");
  return 1;
  console.log("depois do return"); // nunca roda
}

console.log(teste());

// saída:
// antes do return
// 1
```

É parecido com o `break` da [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|aula 4.5]], que encerra o laço no meio. O `return` encerra a função inteira, e ainda entrega um valor. Muitos editores, como o VS Code, deixam as linhas depois de um `return` mais apagadas, para avisar que elas nunca vão rodar.

### Um `return` dentro do `if`

Isso fica útil com um `if`. Cada caminho pode ter o seu `return`:

```js
function situacao(nota) {
  if (nota >= 7) {
    return "aprovado";
  }
  console.log("a nota ficou abaixo de 7");
  return "reprovado";
}

console.log(situacao(8));
console.log(situacao(5));

// saída:
// aprovado
// a nota ficou abaixo de 7
// reprovado
```

| Chamada | O `if` dá | O que acontece |
|---|---|---|
| `situacao(8)` | `true` | o `return "aprovado"` encerra a função. O `console.log` do meio e o `return "reprovado"` nem chegam a rodar |
| `situacao(5)` | `false` | o bloco do `if` é pulado. O `console.log` do meio roda, e depois o `return "reprovado"` encerra a função |

Repare que não foi preciso um `else`. Se a nota for 7 ou mais, a função já terminou no primeiro `return`. Então, se o programa chegou à linha de baixo do `if`, é porque a nota é menor que 7.

### Um `return` dentro de um laço

Dentro de um laço, o `return` encerra o laço **e** a função de uma vez:

```js
function primeiroDivisivel(divisor) {
  for (let i = 1; i <= 20; i++) {
    if (i % divisor === 0) {
      return i;
    }
  }
  return 0;
}

console.log(primeiroDivisivel(7));  // 7
console.log(primeiroDivisivel(30)); // 0
```

É a busca do `break` da aula 4.5, agora numa função. Quando acha o primeiro divisível, o `return i` para o laço e já entrega o número. Se o laço terminar sem achar nada, como no caso do 30, a função chega à última linha e devolve 0.

Na aula 4.5, ficou dito que, para sair de dois laços de uma vez, o código muitas vezes fica mais claro com funções. O motivo é este: um `return` sai de todos os laços da função ao mesmo tempo.

## Sem `return`, a função devolve `undefined`

Toda chamada de função vale alguma coisa. Se a função termina sem passar por um `return`, ela devolve `undefined`. Isso vale mesmo quando ela mostrou alguma coisa pelo caminho:

```js
function mostrarLinha() {
  console.log("====");
}

let x = mostrarLinha(); // mostra ====
console.log(x);         // undefined
```

Um `return;` sozinho, sem valor, também encerra a função e devolve `undefined`.

> [!warning] O valor vai na mesma linha do `return`
> Este código parece certo, mas devolve `undefined`:
>
> ```js
> function somar(a, b) {
>   return
>     a + b;
> }
>
> console.log(somar(2, 3)); // undefined
> ```
>
> Quando o `return` termina a linha, o JavaScript entende que ele acabou ali, como se houvesse um ponto e vírgula logo depois. A função devolve `undefined`, e o `a + b` da linha de baixo nunca roda. Para não cair nessa, comece o valor na mesma linha do `return`.

## Lógica ou JavaScript?

| | JavaScript | Python |
|---|---|---|
| devolver um valor | `return a + b;` | `return a + b` |
| sem `return`, a função devolve | `undefined` | `None` |
| mostrar na tela | `console.log(...)` | `print(...)` |

```python
def somar_mostrando(a, b):
    print(a + b)

def somar(a, b):
    return a + b

resultado = somar_mostrando(2, 3)  # mostra 5
print(resultado)                   # None

print(somar(2, 3) * 2)             # 10
```

O `return` se escreve igual nas duas linguagens e funciona do mesmo jeito. O "nada" é que muda de nome: no Python, ele se chama `None`. E o nome do comando de mostrar, `print`, quer dizer justamente "imprimir".

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. O que aparece no console?
> ```js
> function triplo(n) {
>   return n * 3;
> }
>
> console.log(triplo(4));
> ```
>
> > [!success]- Resposta
> > `12`. A chamada `triplo(4)` devolve 12, e o `console.log` mostra esse valor.

> [!question] 2. O que aparece no console?
> ```js
> function triplo(n) {
>   console.log(n * 3);
> }
>
> let r = triplo(4);
> console.log(r);
> ```
>
> > [!success]- Resposta
> > `12` e depois `undefined`. O `12` vem do `console.log` de dentro da função, durante a chamada. Como a função não tem `return`, ela devolve `undefined`, e é isso que o `r` guarda.

> [!question] 3. Quanto vale o `x`?
> ```js
> function somar(a, b) {
>   return a + b;
> }
>
> let x = somar(2, 3) + somar(10, 10);
> ```
>
> > [!success]- Resposta
> > `25`. A primeira chamada devolve 5, e a segunda, 20. A linha vira `let x = 5 + 20;`.

> [!question] 4. O que aparece no console?
> ```js
> function teste() {
>   console.log("A");
>   return "B";
>   console.log("C");
> }
>
> console.log(teste());
> ```
>
> > [!success]- Resposta
> > `A` e depois `B`. Durante a chamada, a função mostra `A` e devolve `"B"`, que o `console.log` de fora mostra. O `C` nunca aparece, porque o `return` encerrou a função antes dele.

> [!question] 5. O que aparece no console?
> ```js
> function parOuImpar(n) {
>   if (n % 2 === 0) {
>     return "par";
>   }
>   return "ímpar";
> }
>
> console.log(parOuImpar(7));
> console.log(parOuImpar(10));
> ```
>
> > [!success]- Resposta
> > `ímpar` e depois `par`. Para o 7, o resto da divisão por 2 é 1, o `if` dá `false`, e a função chega ao `return "ímpar"`. Para o 10, o `if` dá `true`, e o `return "par"` encerra a função.

> [!question] 6. Rodando este arquivo no Node, o que aparece?
> ```js
> function somar(a, b) {
>   return a + b;
> }
>
> somar(2, 3);
> ```
>
> > [!success]- Resposta
> > Nada. A função devolve 5, mas ninguém guarda nem mostra esse valor. Para ver o 5, seria preciso `console.log(somar(2, 3));`.

> [!question] 7. O que aparece no console?
> ```js
> function dobro(n) {
>   return n * 2;
> }
>
> console.log(dobro(dobro(3)));
> ```
>
> > [!success]- Resposta
> > `12`. A chamada de dentro roda primeiro: `dobro(3)` devolve 6. A linha vira `dobro(6)`, que devolve 12.

> [!question] 8. O que aparece no console?
> ```js
> function somarMostrando(a, b) {
>   console.log(a + b);
> }
>
> console.log(somarMostrando(1, 1) * 2);
> ```
>
> > [!success]- Resposta
> > `2` e depois `NaN`. Durante a chamada, a função mostra `2`. Mas ela não tem `return` e devolve `undefined`. A conta fica `undefined * 2`, que dá `NaN`.

> [!question] 9. Por que aparece `undefined`?
> ```js
> function somar(a, b) {
>   return
>     a + b;
> }
>
> console.log(somar(2, 3));
> ```
>
> > [!success]- Resposta
> > Porque o `return` está sozinho na linha. O JavaScript entende que ele termina ali e devolve `undefined`, sem chegar ao `a + b`. Para corrigir, escreva `return a + b;` numa linha só.

> [!question] 10. Escreva o código.
> Escreva uma função `media(a, b)` que **devolva** a média de duas notas. Depois, use essa função para guardar a média de 6 e 9 numa variável e mostrar `Aprovado` se ela for 7 ou mais.
>
> > [!success]- Resposta
> > ```js
> > function media(a, b) {
> >   return (a + b) / 2;
> > }
> >
> > let m = media(6, 9);
> > console.log(m); // 7.5
> >
> > if (m >= 7) {
> >   console.log("Aprovado");
> > }
> > ```
> >
> > Os parênteses em `(a + b) / 2` são necessários: sem eles, a divisão viria antes da soma, como se viu na [[glossario/precedencia|precedência]] da aula 2.3. E como a função devolve a média em vez de mostrá-la, dá para guardá-la no `m` e usá-la no `if`.

## De onde vêm as palavras

- **[[glossario/retorno|return]]**: pelo francês antigo *retorner*, do latim medieval *retornare*, "virar de volta", de *re-* ("de volta") + *tornare* ("virar, girar"). Em português, **retornar** e **retorno**. O `return` faz o programa **voltar** para a linha que chamou a função, levando o valor junto. O *tornare* vem de *tornus*, o **torno**, a máquina que gira a madeira para arredondá-la, e este do grego *tórnos*. No português, *tornar* ainda tem o sentido de "voltar" em frases como "ele tornou a ligar", isto é, ligou de novo.
- **Devolver**: do latim *dēvolvere*, "rolar para baixo", de *dē-* + *volvere*, "rolar". Em português, ganhou o sentido de **dar de volta**, como o troco. Do mesmo *volvere* vêm **revolver**, **envolver**, **evoluir** e **volume**: o *volūmen* era o rolo de papiro, o livro antigo, que se lia desenrolando. E o **troco** vem de *trocar*: é o que volta para você na troca.
- **[[glossario/imprimir|Imprimir]]**: do latim *imprimere*, "apertar sobre, marcar", de *in-* + *premere*, "apertar". Imprimir era **marcar apertando**, como faz um carimbo ou uma prensa. Do mesmo *premere* vêm **impressão**, **comprimir**, **deprimir**, **oprimir** e **reprimir**. Na programação, imprimir é mostrar texto no console ou no terminal. O nome vem dos computadores antigos, em que a saída muitas vezes saía mesmo em papel.

> [!tip] Para guardar
> - O `console.log` mostra um valor na tela, para a pessoa ler. O programa não consegue usar o que foi mostrado.
> - O `return` devolve um valor para quem chamou a função. Esse valor pode ser guardado, usado numa conta, comparado ou passado para outra função.
> - Quando o programa roda, a chamada é trocada pelo valor que ela devolve: `somar(2, 3) * 2` vira `5 * 2`.
> - O `return` encerra a função na hora. O que vem depois dele não roda, nem o resto de um laço.
> - Sem `return`, a função devolve `undefined`, mesmo que tenha mostrado algo no caminho.
> - O valor do `return` começa na mesma linha que ele.
> - Se o resultado vai ser usado depois, devolva com `return`. Quem chamou decide se mostra.

Fontes: MDN: [return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return), [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions), [Automatic semicolon insertion](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#automatic_semicolon_insertion) · Wiktionary: [return](https://en.wiktionary.org/wiki/return), [retornar](https://en.wiktionary.org/wiki/retornar), [tornar](https://en.wiktionary.org/wiki/tornar), [torno](https://en.wiktionary.org/wiki/torno), [tornus](https://en.wiktionary.org/wiki/tornus), [devolver](https://en.wiktionary.org/wiki/devolver), [dēvolvō](https://en.wiktionary.org/wiki/devolvo), [volvō](https://en.wiktionary.org/wiki/volvo), [volūmen](https://en.wiktionary.org/wiki/volumen), [troco](https://en.wiktionary.org/wiki/troco), [imprimir](https://en.wiktionary.org/wiki/imprimir), [imprimō](https://en.wiktionary.org/wiki/imprimo), [premō](https://en.wiktionary.org/wiki/premo), [print](https://en.wiktionary.org/wiki/print)
