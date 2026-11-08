---
title: "7.5 Mini-projeto: uma lista de tarefas (e o próximo passo)"
tags:
  - logica-de-programacao
  - javascript
  - projeto
---

Quinta e última aula do módulo 7, e do curso. Ela junta as peças de todos os módulos num programa só: uma lista de tarefas em que dá para pôr uma tarefa nova, ver a lista, marcar uma tarefa como feita e contar quantas faltam.

O curso mostra o programa já escrito. Aqui, cada parte vira um desafio, para você escrever antes de abrir a resposta. Ler um código pronto parece fácil, porque cada linha faz sentido depois que alguém já a escreveu. O que treina mesmo é começar do arquivo vazio.

## Uma palavra que faltou: coleção

A aula diz que você aprendeu "coleções (arrays e objetos)", e o módulo 6 se chamava "Coleções", mas a palavra nunca foi explicada.

**[[glossario/colecao|Coleção]]** é o nome que serve para qualquer valor que guarda outros valores dentro dele. Não é um comando novo, nem uma terceira coisa além do array e do objeto. É um nome que junta os dois, como "veículo" serve para carro e para moto. O curso mostrou duas coleções:

| Coleção | O que guarda | Como se acha cada valor | Exemplo |
|---|---|---|---|
| array | uma lista, em ordem | pela posição, o índice | `notas[0]` |
| objeto | várias informações sobre uma coisa | pelo nome, a chave | `aluno.nome` |

Então, quando alguém fala em "percorrer uma coleção" ou "uma coleção de dados", está falando de um array, de um objeto ou de outro valor que faz o mesmo trabalho. Em Python, as duas coleções do curso se chamam lista e dicionário. Existem outras, que ficaram fora do curso, como o `Set` e o `Map` do JavaScript.

## O que o programa vai ter

- um array `tarefas`, com todas as tarefas. Cada tarefa é um objeto com dois campos: `titulo`, um texto, e `concluida`, um booleano que começa `false`;
- `adicionarTarefa(titulo)`: põe uma tarefa nova no fim da lista;
- `listarTarefas()`: mostra uma linha por tarefa, com `[x]` na frente das feitas e `[ ]` na frente das que faltam;
- `concluirTarefa(titulo)`: acha a tarefa pelo título e marca como feita;
- `contarPendentes()`: devolve quantas tarefas ainda faltam.

Tudo fica na memória do programa. Quando ele termina, a lista some, e a próxima vez que você rodar o arquivo ela começa vazia de novo. Guardar de verdade pede um arquivo ou um banco de dados, assuntos de depois do curso. Aqui, o que interessa é a lógica.

### As peças e de onde elas vêm

| Peça | Para que serve aqui | Aula |
|---|---|---|
| array e `push` | guardar as tarefas e pôr uma nova no fim | 6.1 e 6.2 |
| objeto | descrever uma tarefa: o título e se está feita | 6.4 |
| `for...of` | passar por todas as tarefas | 6.3 |
| `if`/`else` | escolher entre `[x]` e `[ ]` | 3.2 |
| busca linear | achar a tarefa pelo título | 7.2 |
| contador | contar as que faltam | 4.4 |
| funções e `return` | uma função para cada ação, e devolver a contagem | 5.1 e 5.3 |
| escopo | as funções enxergam o `tarefas`, criado fora delas | 5.4 |

## Monte você mesmo

Crie um arquivo `tarefas.js` no VS Code e rode com `node tarefas.js` no terminal, como na [[programacao/logica-de-programacao/modulo-1/05-seu-primeiro-codigo-console-log|aula 1.5]]. Cada passo acrescenta código no mesmo arquivo. Se der erro, o roteiro da [[programacao/logica-de-programacao/modulo-7/04-quando-da-errado-depurando-seu-codigo|aula 7.4]] serve para isso.

Tente cada passo antes de abrir a resposta, logo abaixo dele.

> [!question] Passo 1. O array e o `adicionarTarefa`
> Crie um array vazio chamado `tarefas`. Depois, escreva a função `adicionarTarefa(titulo)`: ela monta um objeto com o `titulo` recebido e `concluida` valendo `false`, e põe esse objeto no fim do array. Teste com:
>
> ```js
> adicionarTarefa("Estudar laços");
> adicionarTarefa("Fazer o exercício de funções");
> adicionarTarefa("Revisar arrays e objetos");
>
> console.log(tarefas);
> ```
>
> A saída deve ser:
>
> ```
> [
>   { titulo: 'Estudar laços', concluida: false },
>   { titulo: 'Fazer o exercício de funções', concluida: false },
>   { titulo: 'Revisar arrays e objetos', concluida: false }
> ]
> ```
>
> > [!success]- Resposta
> > ```js
> > const tarefas = [];
> >
> > function adicionarTarefa(titulo) {
> >   const novaTarefa = {
> >     titulo: titulo,
> >     concluida: false,
> >   };
> >   tarefas.push(novaTarefa);
> > }
> > ```
> >
> > - **`titulo: titulo` não é repetição à toa.** O da esquerda é o nome da chave, que vai ficar no objeto. O da direita é o parâmetro, o texto que chegou na chamada. Na primeira chamada, a linha vale `titulo: "Estudar laços"`.
> > - **O `const` não impede o `push`**, como na [[programacao/logica-de-programacao/modulo-6/02-mexendo-no-array-adicionar-remover-e-o-tamanho|aula 6.2]]. Ele só impede que `tarefas` passe a guardar outro array. Pôr elementos no mesmo array é permitido.
> > - **A função usa o `tarefas` sem recebê-lo como parâmetro.** Ele foi criado fora de qualquer função, então é global, e toda função o enxerga ([[programacao/logica-de-programacao/modulo-5/04-escopo-variaveis-locais-e-globais|aula 5.4]]). É por isso que as quatro funções do projeto mexem na mesma lista.
> > - **A vírgula depois do `false`** é permitida e não muda nada. Muita gente a deixa para facilitar quando for pôr mais um campo embaixo.

> [!question] Passo 2. Listar as tarefas
> Escreva `listarTarefas()`, que mostra uma linha para cada tarefa do array `tarefas`: `[x]` na frente, se ela estiver concluída, e `[ ]`, se não estiver. Com as três tarefas do passo 1, nenhuma feita ainda, a saída deve ser:
>
> ```
> [ ] Estudar laços
> [ ] Fazer o exercício de funções
> [ ] Revisar arrays e objetos
> ```
>
> Dica: um laço que passe por cada tarefa e, dentro dele, um `if`/`else`.
>
> > [!success]- Resposta
> > ```js
> > function listarTarefas() {
> >   for (const tarefa of tarefas) {
> >     if (tarefa.concluida) {
> >       console.log("[x] " + tarefa.titulo);
> >     } else {
> >       console.log("[ ] " + tarefa.titulo);
> >     }
> >   }
> > }
> > ```
> >
> > - O nome segue o costume da [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|aula 6.3]]: o singular do array, `tarefa` para `tarefas`.
> > - O `if (tarefa.concluida)` não precisa de `=== true`. O `if` espera um `true` ou um `false`, e a `concluida` já é um deles.
> > - A função só mostra e não devolve nada, então não precisa de `return`. É a diferença entre mostrar e devolver da [[programacao/logica-de-programacao/modulo-5/03-return-devolvendo-um-resultado|aula 5.3]].

> [!question] Passo 3. Concluir uma tarefa
> Escreva `concluirTarefa(titulo)`: ela procura no array `tarefas` a tarefa com esse título e muda o `concluida` dela para `true`. Teste:
>
> ```js
> concluirTarefa("Estudar laços");
> listarTarefas();
> ```
>
> A saída deve ser:
>
> ```
> [x] Estudar laços
> [ ] Fazer o exercício de funções
> [ ] Revisar arrays e objetos
> ```
>
> Dica: é a busca linear da aula 7.2. E o `return` da aula 5.3 serve para parar assim que achar.
>
> > [!success]- Resposta
> > ```js
> > function concluirTarefa(titulo) {
> >   for (const tarefa of tarefas) {
> >     if (tarefa.titulo === titulo) {
> >       tarefa.concluida = true;
> >       return;
> >     }
> >   }
> > }
> > ```
> >
> > - O `return;` sozinho, sem valor, encerra a função ali mesmo (aula 5.3). Achou, marcou, acabou: não precisa olhar o resto da lista. É o papel que o `break` fazia na busca da [[programacao/logica-de-programacao/modulo-6/05-array-de-objetos-uma-lista-de-registros|aula 6.5]].
> > - O `tarefa.concluida = true` muda a tarefa que está **dentro do array**, e não uma cópia dela. Isso merece uma seção só, logo depois dos passos.

> [!question] Passo 4. Contar as pendentes
> Escreva `contarPendentes()`, que **devolve**, e não mostra, quantas tarefas do array `tarefas` têm `concluida` igual a `false`. Com "Estudar laços" já concluída:
>
> ```js
> console.log(contarPendentes()); // 2
> ```
>
> > [!success]- Resposta
> > ```js
> > function contarPendentes() {
> >   let pendentes = 0;
> >   for (const tarefa of tarefas) {
> >     if (tarefa.concluida === false) {
> >       pendentes = pendentes + 1;
> >     }
> >   }
> >   return pendentes;
> > }
> > ```
> >
> > - É o contador da [[programacao/logica-de-programacao/modulo-4/04-contador-e-acumulador-somando-e-contando|aula 4.4]], dentro de uma função. O `let pendentes = 0` fica dentro dela, então a contagem recomeça do zero a cada chamada.
> > - `tarefa.concluida === false` e `!tarefa.concluida` dizem a mesma coisa. O `!` é o "não" da aula 2.5.
> > - Devolver, em vez de mostrar, deixa usar o número em outra conta, como em `if (contarPendentes() === 0)`. O exercício 6 do Treine usa isso.

> [!example]- O arquivo inteiro, com os quatro passos (clique para abrir)
> ```js
> const tarefas = [];
>
> function adicionarTarefa(titulo) {
>   const novaTarefa = {
>     titulo: titulo,
>     concluida: false,
>   };
>   tarefas.push(novaTarefa);
> }
>
> function listarTarefas() {
>   for (const tarefa of tarefas) {
>     if (tarefa.concluida) {
>       console.log("[x] " + tarefa.titulo);
>     } else {
>       console.log("[ ] " + tarefa.titulo);
>     }
>   }
> }
>
> function concluirTarefa(titulo) {
>   for (const tarefa of tarefas) {
>     if (tarefa.titulo === titulo) {
>       tarefa.concluida = true;
>       return;
>     }
>   }
> }
>
> function contarPendentes() {
>   let pendentes = 0;
>   for (const tarefa of tarefas) {
>     if (tarefa.concluida === false) {
>       pendentes = pendentes + 1;
>     }
>   }
>   return pendentes;
> }
>
> adicionarTarefa("Estudar laços");
> adicionarTarefa("Fazer o exercício de funções");
> adicionarTarefa("Revisar arrays e objetos");
>
> concluirTarefa("Estudar laços");
> listarTarefas();
> console.log(contarPendentes());
> // [x] Estudar laços
> // [ ] Fazer o exercício de funções
> // [ ] Revisar arrays e objetos
> // 2
> ```

## Por que o `for...of` conseguiu mudar a tarefa?

Na [[programacao/logica-de-programacao/modulo-6/03-percorrendo-arrays-for-e-for-of|aula 6.3]], este laço não mudava nada no array:

```js
let notas = [5, 7, 9];

for (let nota of notas) {
  nota = nota + 1;
}

console.log(notas); // [ 5, 7, 9 ]
```

E no passo 3, o `concluirTarefa` mudou a tarefa do array, também com `for...of`. Parece contradição, mas a diferença está no que a variável do laço recebe a cada volta:

- **Com números**, e também com textos e booleanos, a variável recebe uma **cópia** do valor. A `nota` vale 5, mas é um 5 à parte, separado do array. É o preço copiado num papel, da aula 6.3: corrigir o papel não muda a etiqueta da prateleira.
- **Com objetos**, e também com arrays, a variável recebe **o mesmo objeto** que está no array, e não uma cópia. A `tarefa` passa a ser um segundo nome para ele, como um apelido. Se a Bia pinta o cabelo, a Beatriz também está de cabelo pintado, porque é a mesma pessoa.

```
notas   →  [ 5, 7, 9 ]
nota    =    5               ← um 5 copiado, separado do array

tarefas →  [ tarefa 1, tarefa 2, tarefa 3 ]
tarefa  →    tarefa 1        ← a mesma tarefa 1, não uma cópia
```

Você já viu essa regra em duas aulas. Na 6.3, no "Array como argumento": a função recebe o mesmo array, e não uma cópia, e por isso um `push` feito dentro dela aparece fora. Na 6.5, na seção "Aqui, o `for...of` consegue mudar". É a mesma regra nos dois casos, e agora no projeto.

### O jeito de não se confundir: olhe o lado esquerdo do `=`

| Do lado esquerdo do `=` | O que muda | Exemplos |
|---|---|---|
| só um nome | só a variável. O array fica como estava | `nota = nota + 1` e `tarefa = { titulo: "outra" }` |
| um nome com ponto | a propriedade do objeto, que é o mesmo objeto do array | `tarefa.concluida = true` |
| um nome com colchetes | a posição do array | `notas[i] = notas[i] + 1` |

Um nome sozinho do lado esquerdo só troca o que aquela variável guarda. Para mexer no que está dentro do array, o lado esquerdo precisa entrar nele: com o ponto, numa propriedade, ou com os colchetes, numa posição.

### A pista do `const`

O laço do projeto é `for (const tarefa of tarefas)`, e mesmo assim a tarefa muda. Se a variável `tarefa` estivesse sendo trocada, o `const` não deixaria:

```js
for (const tarefa of tarefas) {
  tarefa = { titulo: "outra", concluida: true };
}
// TypeError: Assignment to constant variable.
```

O `const` deixa o `tarefa.concluida = true` porque a variável continua sendo o mesmo objeto do começo ao fim da volta. O que mudou foi o que tem **dentro** do objeto. É a mesma coisa do `const` com `push`, da aula 6.2.

## `return` ou `break` para parar a busca?

A busca da aula 6.5 parava com `break`. A do passo 3 para com `return;`. Os dois param o laço, mas não param a mesma coisa:

- o **`break`** encerra só o laço. O programa continua na linha depois do `}` do laço;
- o **`return`** encerra a função inteira. O laço para junto, e nenhuma linha depois dele roda.

Nenhum dos dois é o certo sempre. Depende do que precisa acontecer depois de achar:

| Situação | Use | Por quê |
|---|---|---|
| a busca está numa função, e achar já é o fim do trabalho | `return` | para tudo de uma vez, e a linha depois do laço fica para o "não achou", sem precisar da variável `achou` (aula 7.2) |
| a busca está numa função, mas alguma coisa depois do laço precisa rodar, achando ou não | `break` | o `return` pularia essa parte |
| o laço não está dentro de uma função | `break` | não há função para encerrar |

Um exemplo do segundo caso: concluir a tarefa e, de qualquer jeito, mostrar a lista no fim.

```js
function concluirEListar(titulo) {
  for (const tarefa of tarefas) {
    if (tarefa.titulo === titulo) {
      tarefa.concluida = true;
      break; // sai só do laço
    }
  }
  listarTarefas(); // roda tendo achado ou não
}
```

Com `return` no lugar do `break`, a lista só apareceria quando o título **não** existisse, o contrário do que se quer.

Nas buscas, o `return` aparece mais, porque quase toda busca acaba virando uma função, como o `concluirTarefa`. O `break` continua sendo o jeito de parar só o laço, sem sair da função, ou de parar um laço que nem está numa função. E, em [[programacao/logica-de-programacao/modulo-4/05-break-continue-e-lacos-aninhados|laços aninhados]], o `break` sai só do laço de dentro, enquanto o `return` sai de todos de uma vez.

E o `return` com ou sem valor? Sem valor, `return;`, quando a função só faz alguma coisa e quem chamou não espera resposta, como o `concluirTarefa`. Com valor, como `return true`, quando quem chamou precisa da resposta, como o `existeTarefa` do exercício 4.

E o `continue`, da aula 4.5? Ele não para nada. Pula só **o resto da volta atual**, ou seja, o elemento da vez, e o laço segue para o próximo. Por isso não serve para encerrar uma busca: o laço continua até o último elemento do mesmo jeito. Ele serve para deixar de lado alguns elementos, como as tarefas já feitas. Com "Estudar laços" concluída, como depois do passo 3:

```js
for (const tarefa of tarefas) {
  if (tarefa.concluida) {
    continue; // pula esta tarefa, e o laço vai para a próxima
  }
  console.log("[ ] " + tarefa.titulo);
}
// [ ] Fazer o exercício de funções
// [ ] Revisar arrays e objetos
```

| Comando | O que para | Onde o programa segue |
|---|---|---|
| `continue` | só a volta da vez | na próxima volta do laço |
| `break` | o laço inteiro | na linha depois do `}` do laço |
| `return` | a função inteira, e o laço junto | em quem chamou a função |

## Treine: deixando a lista melhor

Os exercícios partem do arquivo dos quatro passos. Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Avisar quando a tarefa não existe
> Com esta função, `concluirTarefa("Passear")` não faz nada e não avisa nada. Mude a função para ela mostrar `Tarefa não encontrada: Passear` quando o título não estiver na lista.
>
> ```js
> function concluirTarefa(titulo) {
>   for (const tarefa of tarefas) {
>     if (tarefa.titulo === titulo) {
>       tarefa.concluida = true;
>       return;
>     }
>   }
> }
> ```
>
> > [!success]- Resposta
> > Basta uma linha depois do laço:
> >
> > ```js
> > function concluirTarefa(titulo) {
> >   for (const tarefa of tarefas) {
> >     if (tarefa.titulo === titulo) {
> >       tarefa.concluida = true;
> >       return;
> >     }
> >   }
> >   console.log("Tarefa não encontrada: " + titulo);
> > }
> > ```
> >
> > Se a tarefa existe, o `return` encerra a função antes de chegar a essa linha. Se não existe, o laço termina sem ter achado, e a linha roda. É o que a aula 6.5 disse do `return`: ele faz o papel do `break` e da variável `achou` de uma vez. O aviso não pode ficar num `else` dentro do laço, porque aí ele apareceria a cada tarefa com outro título, e não uma vez só, no fim.

> [!question] 2. Numerar a lista
> Mude a listagem para numerar as tarefas, a partir do 1:
>
> ```
> 1. [x] Estudar laços
> 2. [ ] Fazer o exercício de funções
> 3. [ ] Revisar arrays e objetos
> ```
>
> A função de hoje é esta:
>
> ```js
> function listarTarefas() {
>   for (const tarefa of tarefas) {
>     if (tarefa.concluida) {
>       console.log("[x] " + tarefa.titulo);
>     } else {
>       console.log("[ ] " + tarefa.titulo);
>     }
>   }
> }
> ```
>
> > [!success]- Resposta
> > O `for...of` não dá a posição. Para numerar, volta o `for` pelo índice, da aula 6.3:
> >
> > ```js
> > function listarTarefas() {
> >   for (let i = 0; i < tarefas.length; i++) {
> >     const tarefa = tarefas[i];
> >     let marca = "[ ] ";
> >     if (tarefa.concluida) {
> >       marca = "[x] ";
> >     }
> >     console.log((i + 1) + ". " + marca + tarefa.titulo);
> >   }
> > }
> > ```
> >
> > O `i + 1` existe porque as pessoas contam a partir do 1, e os índices começam no 0. Os parênteses deixam claro que a soma acontece antes de juntar com o texto. Aqui, até daria certo sem eles, porque o `+` vai da esquerda para a direita e o `i + 1` vem primeiro. Mas, com um texto antes, como em `"Tarefa " + i + 1`, o JavaScript juntaria `"Tarefa 0"` com `1` e daria `Tarefa 01`. A variável `marca` evita escrever o `console.log` duas vezes, uma no `if` e outra no `else`.

> [!question] 3. Desfazer o "feito"
> Escreva `alternarTarefa(titulo)`: se a tarefa estiver feita, ela volta a ficar pendente, e se estiver pendente, fica feita. Dá para fazer sem `if` para decidir entre `true` e `false`. Cada tarefa é um objeto como `{ titulo: "Estudar laços", concluida: false }`, guardado no array `tarefas`.
>
> > [!success]- Resposta
> > ```js
> > function alternarTarefa(titulo) {
> >   for (const tarefa of tarefas) {
> >     if (tarefa.titulo === titulo) {
> >       tarefa.concluida = !tarefa.concluida;
> >       return;
> >     }
> >   }
> > }
> > ```
> >
> > O `!` troca o booleano pelo contrário: `!true` é `false`, e `!false` é `true`. Então a linha guarda na `concluida` o contrário do que ela tinha. O lado direito do `=` roda primeiro, com o valor antigo, e o resultado vai para o lado esquerdo, como no `pendentes = pendentes + 1`.

> [!question] 4. Não deixar repetir
> Com esta função, `adicionarTarefa("Estudar laços")` duas vezes cria duas tarefas iguais. Escreva uma função `existeTarefa(titulo)`, que devolve `true` ou `false`, e use-a no `adicionarTarefa` para recusar o título repetido com o aviso `Já existe uma tarefa com esse título: Estudar laços`.
>
> ```js
> function adicionarTarefa(titulo) {
>   const novaTarefa = {
>     titulo: titulo,
>     concluida: false,
>   };
>   tarefas.push(novaTarefa);
> }
> ```
>
> > [!success]- Resposta
> > ```js
> > function existeTarefa(titulo) {
> >   for (const tarefa of tarefas) {
> >     if (tarefa.titulo === titulo) {
> >       return true;
> >     }
> >   }
> >   return false;
> > }
> >
> > function adicionarTarefa(titulo) {
> >   if (existeTarefa(titulo)) {
> >     console.log("Já existe uma tarefa com esse título: " + titulo);
> >     return;
> >   }
> >   const novaTarefa = {
> >     titulo: titulo,
> >     concluida: false,
> >   };
> >   tarefas.push(novaTarefa);
> > }
> > ```
> >
> > É o dividir para conquistar da [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|aula 5.5]]: a busca vira uma função com nome, e o `adicionarTarefa` lê quase como uma frase, "se existe a tarefa, avisa e para". O `return false` fica depois do laço, pela mesma razão do exercício 1: só chega lá quem olhou a lista inteira sem achar. O `return;` do `adicionarTarefa` impede o `push` quando o título já existe.

> [!question] 5. Só o que falta fazer
> Escreva `listarPendentes()`, que mostra só as tarefas do array `tarefas` que ainda não foram feitas, com `[ ]` na frente. Cada tarefa é um objeto como `{ titulo: "Estudar laços", concluida: false }`.
>
> > [!success]- Resposta
> > ```js
> > function listarPendentes() {
> >   for (const tarefa of tarefas) {
> >     if (!tarefa.concluida) {
> >       console.log("[ ] " + tarefa.titulo);
> >     }
> >   }
> > }
> > ```
> >
> > É o `listarTarefas` sem o `else`: as tarefas feitas não caem em nenhum caminho, e nada aparece para elas.

> [!question] 6. Um resumo
> Escreva `mostrarResumo()`, que mostra `2 de 3 tarefas pendentes`, ou `Tudo feito!` quando não faltar nenhuma. Use a função `contarPendentes()`, que já existe e devolve o número de pendentes:
>
> ```js
> function contarPendentes() {
>   let pendentes = 0;
>   for (const tarefa of tarefas) {
>     if (tarefa.concluida === false) {
>       pendentes = pendentes + 1;
>     }
>   }
>   return pendentes;
> }
> ```
>
> > [!success]- Resposta
> > ```js
> > function mostrarResumo() {
> >   const pendentes = contarPendentes();
> >   if (pendentes === 0) {
> >     console.log("Tudo feito!");
> >   } else {
> >     console.log(pendentes + " de " + tarefas.length + " tarefas pendentes");
> >   }
> > }
> > ```
> >
> > Só funciona porque o `contarPendentes` **devolve** o número. Se ele só mostrasse, com `console.log`, o `mostrarResumo` não teria como comparar com 0. O total vem do `length`, da aula 6.2.

> [!question] 7. O que aparece no console?
> ```js
> const tarefas = [{ titulo: "A", concluida: false }];
>
> for (let tarefa of tarefas) {
>   tarefa = { titulo: "B", concluida: true };
> }
>
> console.log(tarefas[0].titulo);
> ```
>
> > [!success]- Resposta
> > `A`. Do lado esquerdo do `=` está só um nome, `tarefa`. A linha faz a variável guardar um objeto novo, e o objeto do array fica como estava. Com `const` no lugar do `let`, essa linha daria `TypeError: Assignment to constant variable.`

> [!question] 8. E agora, o que aparece?
> ```js
> const tarefas = [{ titulo: "A", concluida: false }];
>
> const primeira = tarefas[0];
> primeira.concluida = true;
>
> console.log(tarefas[0].concluida);
> ```
>
> > [!success]- Resposta
> > `true`. A `primeira` não recebeu uma cópia do objeto: recebeu o mesmo objeto que está no array. Com o ponto do lado esquerdo do `=`, a linha mexe dentro desse objeto, e o array enxerga a mudança. Não precisou de laço nenhum: a regra é a do `=`, e o `for...of` só segue a mesma regra.

> [!question] 9. Desafio: tirar as feitas da lista
> Escreva `removerConcluidas()`, que deixa no array `tarefas` só as tarefas pendentes. Cada tarefa é um objeto como `{ titulo: "Estudar laços", concluida: false }`. Dica: monte um array novo com as pendentes, como no "Separar num array novo" da aula 6.5, e faça o `tarefas` passar a guardar esse array. Para isso, uma linha do arquivo também precisa mudar. Qual?
>
> > [!success]- Resposta
> > ```js
> > let tarefas = []; // era const
> >
> > function removerConcluidas() {
> >   const pendentes = [];
> >   for (const tarefa of tarefas) {
> >     if (!tarefa.concluida) {
> >       pendentes.push(tarefa);
> >     }
> >   }
> >   tarefas = pendentes;
> > }
> > ```
> >
> > A última linha tem só um nome do lado esquerdo do `=`, então ela troca o array que a variável `tarefas` guarda. Desta vez é isso mesmo que se quer: o `tarefas` passa a ser o array novo, só com as pendentes. Como a variável é trocada, ela precisa ser `let`. Com `const`, essa linha daria `TypeError: Assignment to constant variable.` As outras funções continuam funcionando, porque cada uma procura o `tarefas` na hora em que roda e já encontra o array novo.
> >
> > Repare que o `pendentes.push(tarefa)` guarda o objeto inteiro, e não só o título como na aula 6.5. Senão, o array novo teria só textos, e as outras funções procurariam `tarefa.titulo` num texto.

## Lógica ou JavaScript?

O mesmo projeto em Python:

```python
tarefas = []

def adicionar_tarefa(titulo):
    nova_tarefa = {"titulo": titulo, "concluida": False}
    tarefas.append(nova_tarefa)

def listar_tarefas():
    for tarefa in tarefas:
        if tarefa["concluida"]:
            print("[x] " + tarefa["titulo"])
        else:
            print("[ ] " + tarefa["titulo"])

def concluir_tarefa(titulo):
    for tarefa in tarefas:
        if tarefa["titulo"] == titulo:
            tarefa["concluida"] = True
            return

def contar_pendentes():
    pendentes = 0
    for tarefa in tarefas:
        if not tarefa["concluida"]:
            pendentes = pendentes + 1
    return pendentes
```

| | JavaScript | Python |
|---|---|---|
| a tarefa | objeto: `{ titulo: titulo, concluida: false }` | dicionário: `{"titulo": titulo, "concluida": False}` |
| ler um campo | `tarefa.titulo` | `tarefa["titulo"]`, com colchetes e aspas |
| pôr no fim | `tarefas.push(...)` | `tarefas.append(...)` |
| verdadeiro e falso | `true`, `false` | `True`, `False` |
| igual | `===` | `==` |
| não | `!` | `not` |
| nomes com duas palavras | `contarPendentes` | `contar_pendentes` |

A regra da cópia é a mesma: o `for tarefa in tarefas` entrega o mesmo dicionário que está na lista, e `tarefa["concluida"] = True` muda a lista.

## E depois do curso?

O fim da aula diz para seguir o seu *roadmap* e fala que essa base serve para qualquer linguagem ou *framework*. São duas palavras que o curso não tinha apresentado.

### Roadmap

**[[glossario/roadmap|Roadmap]]** é o inglês para "mapa de estrada", de *road*, "estrada", e *map*, "mapa". No trabalho, é um plano em etapas, na ordem: primeiro isto, depois aquilo.

Nas plataformas de curso, o roadmap costuma ser a lista de trilhas montada para um objetivo, um curso depois do outro. "Siga o seu roadmap" quer dizer só: abra a próxima trilha dessa lista. Se a sua plataforma não mostra uma lista assim, as sugestões abaixo servem de roadmap. Também existe um site só de roadmaps de carreira, o [roadmap.sh](https://roadmap.sh), em inglês.

### Framework

**[[glossario/framework|Framework]]** é um programa pela metade, pronto para você completar. Ele já traz o que todo programa daquele tipo tem: num site, por exemplo, mostrar telas, reagir a cliques e trocar de página. Você escreve só a parte que é sua, e ele decide quando cada parte sua roda.

Você já viu essa ideia em tamanho pequeno. Na [[programacao/logica-de-programacao/modulo-7/03-colocando-em-ordem-a-ideia-de-ordenacao|aula 7.3]], você escreveu só a regra de comparação, `(a, b) => a - b`, e o `sort()` fez o resto: decidiu quando chamar a sua função e quantas vezes. Num framework, o programa inteiro funciona assim. Você escreve as funções, e o framework chama cada uma na hora certa.

Junto com framework aparece outra palavra, **biblioteca** (em inglês, *library*): um conjunto de funções prontas que você chama quando quer, como você chama o `Math.max` quando precisa do maior. A diferença costuma ser resumida assim: **você chama a biblioteca, e o framework chama você.**

| Nome | Para quê | Linguagem |
|---|---|---|
| React, Angular, Vue | telas de sites e aplicativos | JavaScript |
| Express | servidores | JavaScript (Node.js) |
| Django, Flask | servidores | Python |
| pandas | analisar tabelas de dados (é uma biblioteca) | Python |

O React se apresenta como biblioteca, mas muita gente o chama de framework, porque no dia a dia ele organiza o projeto inteiro.

Por que o curso diz que a lógica sustenta qualquer framework? Porque o framework é escrito numa linguagem, e a parte que você escreve dentro dele é feita dos mesmos `if`, laços, funções, arrays e objetos. Quem pula a lógica decora o framework e trava no primeiro problema que não estava no tutorial.

### Sugestões do que fazer agora

Estas sugestões não fazem parte do curso. Os passos 1 e 2 valem para qualquer caminho. Os passos 3 e 4 são para quem ainda não tem a próxima trilha definida: se o seu roadmap já aponta uma, eles já estão decididos, e é só seguir a trilha.

**1. Termine o mini-projeto sem olhar.** Faça os exercícios do Treine. Depois, apague o arquivo e escreva tudo de novo, do zero, sem consultar nada. Se travar numa parte, a tabela "As peças e de onde elas vêm" diz qual aula rever.

**2. Faça mais dois ou três projetos do mesmo tamanho**, só com o que o curso ensinou. É assim que se passa de "entendo quando leio" para "consigo escrever". Algumas ideias:

- **Controle de gastos.** Cada gasto é um objeto como `{ descricao: "mercado", valor: 120, categoria: "comida" }`. Calcule o total, o maior gasto, o total de uma categoria e a lista dos gastos acima de um valor.
- **Boletim.** Cada aluno é `{ nome: "Ana", notas: [7, 8, 6] }`. Calcule a média de cada um, diga quem passou e quem teve a maior média, e mostre a turma em ordem de média.
- **Agenda de contatos.** Adicionar um contato, buscar pelo nome, avisar quando não achar e não deixar repetir.

Não precisa fazer os três antes de seguir. Um ou dois bastam, e dá para fazê-los nos primeiros dias da trilha seguinte. A trilha nova traz muita coisa de uma vez. Com a lógica treinada, fica mais fácil saber de onde vem cada erro: da lógica ou da ferramenta que você acabou de conhecer.

Se a próxima trilha for de **back-end**, esses projetos são o treino mais direto. Boa parte do trabalho de um back-end é guardar listas de objetos e pôr, buscar, mudar e tirar itens delas. Esse conjunto tem até nome: **CRUD**, as iniciais, em inglês, de criar, ler, atualizar e apagar (*Create, Read, Update, Delete*). A própria lista de tarefas costuma voltar como um dos primeiros projetos de back-end. Os pedidos passam a chegar pela internet, e os dados ficam num banco de dados em vez de sumir quando o programa termina, mas a lógica de adicionar, listar, concluir e buscar é a mesma.

**3. Escolha uma direção.** O curso citou back-end, ciência de dados e engenharia de dados. A outra direção comum é o front-end:

| Direção | O que se faz | Por onde começar | O que vem depois |
|---|---|---|---|
| front-end | as telas: o que aparece no navegador e responde aos cliques | HTML, CSS e o JavaScript no navegador | um framework como o React |
| back-end | o servidor: guarda os dados, faz o login, responde às telas | JavaScript com Node.js, ou Python | bancos de dados, SQL e um framework como Express ou Django |
| ciência de dados | analisar dados para responder perguntas, com gráficos e previsões | Python | pandas, estatística e SQL |
| engenharia de dados | montar os caminhos que levam os dados de um lugar para outro e os deixam prontos para análise | Python e SQL | bancos de dados e automação |

Duas coisas servem para qualquer direção: o **Git**, que guarda o histórico do código, cada versão num *commit* (este site é publicado assim), e o **SQL**, a linguagem dos bancos de dados, que aparece no back-end e nas duas direções de dados.

**4. Se ainda não sabe qual escolher:**

- **Se você trabalha perto de quem programa**, pergunte que linguagem e que frameworks a empresa usa. Estudar o que aparece no trabalho rende mais: há código de verdade para olhar e alguém para perguntar.
- **Se não houver motivo para outra escolha**, continue no JavaScript e vá para HTML, CSS e o JavaScript no navegador. Você não recomeça numa linguagem nova e vê o resultado na tela. O primeiro projeto pode ser esta mesma lista de tarefas, agora com uma caixa de texto e botões.
- **Se a vontade for trabalhar com dados**, vá para o Python. As seções "Lógica ou JavaScript?" do curso já mostraram como a mesma lógica fica nele.

Para estudar: a MDN, com guias em português de [HTML, CSS e JavaScript](https://developer.mozilla.org/pt-BR/docs/Learn_web_development), e o [tutorial oficial do Python](https://docs.python.org/pt-br/3/tutorial/), também em português.

## De onde vêm as palavras

- **Projeto**: do latim *prōiectus*, "lançado para a frente", particípio de *prōiciō*, "lançar adiante", que junta *prō-*, "para a frente", e *iaciō*, "lançar, atirar". Um projeto é uma ideia lançada à frente, que ainda vai virar coisa. Do mesmo *iaciō* vêm **objeto**, "o que é lançado diante" de nós, e **sujeito**.
- **Tarefa**: do árabe *ṭarīḥa*, "empreitada, trabalho", que antes queria dizer "algo lançado". A palavra vem do verbo *ṭaraḥa*, "lançar, atirar". O espanhol tem a mesma palavra, *tarea*. Por acaso, tarefa e projeto nasceram da mesma imagem, em línguas diferentes: algo lançado.
- **[[glossario/colecao|Coleção]]**: do latim *collēctiō*, "ajuntamento", de *colligō*, "recolher, juntar", que junta *con-*, "junto", e *legō*, "juntar, escolher, ler". Uma coleção é o que foi recolhido e posto junto. É o mesmo *legō* da **seleção**, da aula 7.3, e de **ler** e **eleger**.
- **[[glossario/roadmap|Roadmap]]**: do inglês *road*, "estrada", e *map*, "mapa". O *road* vem do inglês antigo *rād*, "cavalgada, viagem", e é parente de *ride*, "cavalgar". O sentido de "estrada" veio depois. O *map* é um encurtamento do latim medieval *mappa mundī*, o mapa-múndi. O latim *mappa* queria dizer "guardanapo, toalha", então o mapa-múndi era, ao pé da letra, a "toalha do mundo". Segundo o romano Quintiliano, *mappa* veio do púnico, a língua de Cartago.
- **[[glossario/framework|Framework]]**: do inglês *frame*, "armação, estrutura", e *work*, "trabalho". Um framework é a armação, como o esqueleto de madeira de uma casa, em que o resto do trabalho se apoia. O *frame* está ligado ao verbo do inglês medieval *framen*, "construir", que no inglês antigo, *framian*, queria dizer "avançar, ser útil".

> [!tip] Para guardar
> - **Coleção** é o nome que junta todo valor que guarda outros dentro dele. No curso, foram duas: o array, pela posição, e o objeto, pelo nome.
> - O projeto usa todas as peças do curso: array e objeto para os dados, `for...of` para passar por eles, `if` para decidir, busca linear para achar, contador para contar, e uma função para cada ação.
> - Com números, textos e booleanos, a variável do `for...of` recebe uma **cópia**. Com objetos e arrays, recebe **o mesmo objeto** do array.
> - Olhe o lado esquerdo do `=`: só um nome troca a variável e não mexe no array. Com ponto ou colchetes, a linha mexe dentro do objeto ou do array.
> - O `return` dentro do laço encerra a função inteira: a busca para ao achar, e a linha depois do laço só roda se não achou. O `break` encerra só o laço, e o que vem depois dele roda nos dois casos. Numa função cuja busca é o trabalho todo, use o `return`. Para parar só o laço, use o `break`.
> - **Roadmap** é um plano em etapas. "Siga o seu roadmap" é abrir a próxima trilha da lista.
> - **Framework** é um programa pela metade, que chama as funções que você escreve. **Biblioteca** é um conjunto de funções que você chama. Os dois são feitos da mesma lógica do curso.

Fontes: MDN: [Working with objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects), [Indexed collections](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Indexed_collections), [for...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const), [Learn web development (pt-BR)](https://developer.mozilla.org/pt-BR/docs/Learn_web_development) · React: [react.dev](https://react.dev) · Python: [Tutorial (pt-BR)](https://docs.python.org/pt-br/3/tutorial/), [Dictionaries](https://docs.python.org/3/tutorial/datastructures.html#dictionaries) · [roadmap.sh](https://roadmap.sh) · Wiktionary: [projeto](https://en.wiktionary.org/wiki/projeto), [prōiciō](https://en.wiktionary.org/wiki/proicio), [tarefa](https://en.wiktionary.org/wiki/tarefa), [coleção](https://en.wiktionary.org/wiki/cole%C3%A7%C3%A3o), [collēctiō](https://en.wiktionary.org/wiki/collectio), [roadmap](https://en.wiktionary.org/wiki/roadmap), [road](https://en.wiktionary.org/wiki/road), [map](https://en.wiktionary.org/wiki/map), [mappa](https://en.wiktionary.org/wiki/mappa), [framework](https://en.wiktionary.org/wiki/framework), [frame](https://en.wiktionary.org/wiki/frame)
