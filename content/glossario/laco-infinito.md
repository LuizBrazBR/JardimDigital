---
title: Laço infinito
---

> [!abstract] Definição
> **Um [[glossario/laco|laço]] cuja condição nunca fica falsa, e que por isso repete para sempre.** Em inglês, *infinite loop*.

```js
// NÃO RODE: este laço nunca termina
let contador = 1;

while (contador <= 5) {
  console.log(contador);
  // nada aqui dentro muda o contador
}
```

Causas comuns:

1. **Esquecer a mudança.** Nada no bloco mexe na variável da condição, como no exemplo acima.
2. **Mudar para o lado errado.** `i = i - 1` num laço com `i <= 5`: o `i` se afasta do fim em vez de chegar perto.
3. **Mudar fora das chaves.** A linha da mudança fica depois do `}` e só rodaria quando o laço acabasse, o que nunca acontece.
4. **Pular o alvo com `!==`.** Com `n !== 10` e `n = n + 2` começando em 1, o `n` passa por 9 e 11 e nunca é exatamente 10. Com `n < 10`, o laço para.

O que acontece: no navegador, a aba congela, e depois de um tempo o navegador oferece fechá-la. No terminal, o programa não termina, e **Ctrl+C** o interrompe.

Alguns programas repetem para sempre de propósito, como um jogo ou um servidor, com `while (true)`. Esses têm uma saída planejada lá dentro, o [[glossario/interromper|break]].

Ver a aula [[programacao/logica-de-programacao/modulo-4/02-while-repetindo-enquanto-for-verdade|while: repetindo enquanto for verdade]].

## De onde vem a palavra

*Infinito* vem do latim *īnfīnītus*, de *in-* ("não") + *fīnītus* ("limitado, terminado"), de *fīnis*, "fim, limite, fronteira". O infinito é o que não tem fim.

A mesma palavra latina chegou ao português também pela fala do povo, e virou **infindo**, o que não finda. *Fīnis* está ainda em **fim**, **final**, **definir** e **confins**.

Fontes: Wiktionary: [infinito](https://en.wiktionary.org/wiki/infinito), [īnfīnītus](https://en.wiktionary.org/wiki/infinitus), [fīnis](https://en.wiktionary.org/wiki/finis)
