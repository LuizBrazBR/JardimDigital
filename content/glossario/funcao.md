---
title: Função (function)
---

> [!abstract] Definição
> **Um trecho de código com nome, escrito uma vez e usado quantas vezes for preciso.** Em JavaScript, se cria com a palavra `function`, um nome, parênteses (com os [[glossario/parametro|parâmetros]], as entradas, se houver) e o corpo da função, um [[glossario/bloco|bloco]] entre chaves.

```js
function saudar() {        // define: guarda o trecho com o nome saudar
  console.log("Bom dia!");
}

saudar(); // chama: Bom dia!
saudar(); // chama de novo: Bom dia!
```

Definir a função não roda o corpo. Ele só roda na [[glossario/chamada|chamada]], o nome seguido de parênteses. Uma função que nunca é chamada nunca roda. Com [[glossario/retorno|return]], ela devolve um valor para quem a chamou.

Serve para não copiar e colar o mesmo trecho em vários lugares do programa. Com o trecho num lugar só, para mudar o que ele faz basta mexer ali, e todas as chamadas mudam juntas. É o jeito de transformar um [[glossario/padrao|padrão]] em código: a lógica que se repete ganha um nome.

O nome segue as regras de nome de [[glossario/variavel|variável]], em [[glossario/camel-case|camelCase]], e costuma ser um verbo, porque a função faz alguma coisa: `saudar`, `mostrarLinha`. O `function` é uma [[glossario/palavra-reservada|palavra reservada]]. O `console.log` também é uma função, uma que já vem pronta.

Uma função pode chamar outra. Quebrar um problema grande em funções pequenas, cada uma com uma tarefa, é o [[glossario/dividir-para-conquistar|dividir para conquistar]].

Ver a aula [[programacao/logica-de-programacao/modulo-5/01-o-que-e-uma-funcao-e-como-criar-uma|O que é uma função e como criar uma]].

## De onde vem a palavra

Do latim *functiō*, "cumprimento, execução" de uma tarefa, formado a partir de *fungor*, "cumprir, executar, desempenhar". Uma função é o que **cumpre uma tarefa**, como em "a função do goleiro". A raiz indo-europeia é *\*bʰewg-*, "aproveitar, ser útil".

Do *fungor* vem também *dēfungor*, "terminar de cumprir", que passou a querer dizer "morrer". *Vītā dēfūnctus*, "aquele que terminou a vida", deu o nosso **defunto**: quem já cumpriu sua função.

Na matemática, a palavra entrou com Leibniz, numa carta de 1673, para falar de quantidades ligadas aos pontos de uma curva. Da matemática, chegou à programação.

Fontes: MDN: [Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions) · Wikipedia: [History of the function concept](https://en.wikipedia.org/wiki/History_of_the_function_concept) · Wiktionary: [função](https://en.wiktionary.org/wiki/fun%C3%A7%C3%A3o), [functiō](https://en.wiktionary.org/wiki/functio), [fungor](https://en.wiktionary.org/wiki/fungor), [dēfungor](https://en.wiktionary.org/wiki/defungor), [defunto](https://en.wiktionary.org/wiki/defunto)
