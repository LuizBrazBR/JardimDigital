---
title: Chamada (call)
---

> [!abstract] Definição
> **A instrução que manda uma [[glossario/funcao|função]] rodar: o nome dela seguido de parênteses.** Em inglês, *call*. Também se diz **invocar** a função.

```js
function saudar() {
  console.log("Bom dia!");
}

saudar();  // a chamada: mostra Bom dia!
saudar;    // sem parênteses, não chama: nada acontece
```

Na chamada, o programa sai da linha onde está, roda o corpo inteiro da função e volta para a linha seguinte. A mesma função pode ser chamada quantas vezes se quiser, e cada chamada roda o corpo do começo ao fim.

Esquecer os parênteses não dá erro, e por isso o engano é difícil de ver: a linha roda, mas a função, não. Já chamar um nome que não existe, ou escrito com outra maiúscula, dá `ReferenceError: ... is not defined`.

O `console.log("oi")` também é uma chamada. O que vai entre os parênteses é o argumento, a entrada da função.

Ver a aula [[programacao/logica-de-programacao/modulo-5/01-o-que-e-uma-funcao-e-como-criar-uma|O que é uma função e como criar uma]].

## De onde vem a palavra

*Chamar* vem do latim *clāmāre*, "gritar, clamar". No latim medieval, ganhou também o sentido de "chamar pelo nome". Chamar uma função é isso: dizer o nome dela para que ela venha fazer o seu trabalho. O espanhol *llamar* e o italiano *chiamare* vêm do mesmo *clāmāre*. Pelo caminho erudito, ele deu também **clamar**, e os parentes estão em **clamor**, **exclamar**, **proclamar** e **reclamar**.

O inglês *call* é de outra família: vem do inglês antigo *ċeallian* e do nórdico antigo *kalla*, "chamar, gritar". Em inglês, *call* também é **telefonar**, e a comparação ajuda: salvar um contato na agenda não faz o telefone tocar, só a ligação faz. Definir uma função não roda nada, só a chamada roda.

*Invocar* vem do latim *invocāre*, de *in-* + *vocāre*, "chamar", parente de *vōx*, "voz".

Fontes: MDN: [Calling functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#calling_functions) · Wiktionary: [chamar](https://en.wiktionary.org/wiki/chamar), [clāmō](https://en.wiktionary.org/wiki/clamo), [call](https://en.wiktionary.org/wiki/call), [invocar](https://en.wiktionary.org/wiki/invocar), [invocō](https://en.wiktionary.org/wiki/invoco)
