---
title: Objeto (object)
---

> [!abstract] Definição
> **Um valor que descreve uma coisa só com várias informações, cada uma identificada por um nome.** Cada informação é um par de [[glossario/chave|chave]] e valor, chamado [[glossario/propriedade|propriedade]]. Cria-se com `{ }`.

```js
let pessoa = {
  nome: "Ana",
  idade: 20,
  cidade: "São Paulo"
};

console.log(pessoa.nome);     // Ana: lido com ponto
console.log(pessoa["idade"]); // 20: lido com colchetes e aspas
pessoa.idade = 21;            // muda uma propriedade
pessoa.email = "ana@ex.com";  // cria uma propriedade nova
```

O [[glossario/array|array]] guarda uma lista de coisas parecidas, cada uma numa posição. O objeto guarda informações diferentes sobre uma coisa, cada uma com o seu nome. Assim, não é preciso lembrar que "a posição 1 é a idade": basta escrever `pessoa.idade`.

O ponto usa o nome da chave escrito no código. Os colchetes usam um valor: a chave pode vir de uma variável, como em `pessoa[campo]`, e pode ter espaço, como em `cadastro["nome completo"]`. As duas formas servem para ler, mudar e criar. Pedir uma chave que não existe dá `undefined`.

Objetos não são [[glossario/iteravel|iteráveis]]: o `for...of` dá erro com eles. Para passar pelas chaves, existe o `for...in`. No Python, o objeto se chama dicionário (`dict`).

Ver a aula [[programacao/logica-de-programacao/modulo-6/04-objetos-descrevendo-uma-coisa-com-chave-e-valor|Objetos: descrevendo uma coisa com chave e valor]].

## De onde vem a palavra

Do latim *obiectus*, particípio de *obicere*, "lançar diante, pôr na frente", formado por *ob-*, "diante, contra", e *iacere*, "lançar". Objeto é o que foi posto diante de nós, uma coisa que se pode ver, apontar e descrever. Na programação, é o valor que descreve uma coisa.

No latim, *obiectum* também queria dizer "acusação", o que se lança contra alguém.

Fontes: MDN: [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects) · Wiktionary: [objeto](https://en.wiktionary.org/wiki/objeto), [obiectum](https://en.wiktionary.org/wiki/obiectum), [obiciō](https://en.wiktionary.org/wiki/obicio)
