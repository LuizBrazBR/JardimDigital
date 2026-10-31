---
title: Acumulador
---

> [!abstract] Definição
> **Uma variável que junta valores a cada volta de um [[glossario/laco|laço]], guardando um total.** É ela que responde "quanto dá no total?".

```js
let soma = 0;                  // antes do laço: começa no neutro

for (let i = 1; i <= 5; i++) {
  soma = soma + i;             // dentro: junta o i
}

console.log(soma);             // depois: 15
```

A receita tem três passos: criar a variável **antes** do laço, atualizar **dentro** dele e usar o resultado **depois**. Criada dentro do laço, ela voltaria ao valor inicial a cada volta.

O valor inicial é o [[glossario/elemento-neutro|elemento neutro]] da conta: 0 para somar, 1 para multiplicar, `""` para juntar texto. Sem valor inicial, a variável vale `undefined`, e a conta dá `NaN`.

O [[glossario/contador|contador]] é um acumulador mais simples, que soma sempre 1.

Ver a aula [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|Contador e acumulador: somando e contando]].

## De onde vem a palavra

Do latim *accumulāre*, *ad-* ("a, para") + *cumulāre*, "empilhar", de *cumulus*, "monte, pilha". Acumular é **amontoar**, pôr uma coisa em cima da outra. O acumulador é a pilha que vai crescendo a cada volta.

De *cumulus* vêm também o **cúmulo** ("é o cúmulo!", o topo da pilha) e o nome das nuvens **cúmulos**, as que parecem montes de algodão.

Fontes: Wiktionary: [accumulō](https://en.wiktionary.org/wiki/accumulo), [cumulus](https://en.wiktionary.org/wiki/cumulus)
