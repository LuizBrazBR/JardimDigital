---
title: Literal
---

> [!abstract] Definição
> **Um valor escrito direto no código, do jeito que ele é.** `20` é um número literal, `"Ana"` é um texto literal, `[10, 25]` é um [[glossario/array|array]] literal, e `{ nome: "Ana" }` é um [[glossario/objeto|objeto]] literal.

```js
let idade = 20;                        // 20: número literal
console.log("oi");                     // "oi": texto literal
somar([10, 25, 8]);                    // array literal, direto na chamada
descrever({ nome: "Ana", idade: 20 }); // objeto literal, direto na chamada
```

O literal não precisa ser guardado numa [[glossario/variavel|variável]]: pode ir direto como [[glossario/argumento|argumento]], dentro de um array ou depois de um `return`. E nenhum valor tem nome. Quem tem nome é a variável que guarda o valor, e duas variáveis podem apontar para o mesmo array ou objeto.

Ver a aula [[programacao/logica-de-programacao/modulo-6/04-objetos-descrevendo-uma-coisa-com-chave-e-valor|Objetos: descrevendo uma coisa com chave e valor]].

## De onde vem a palavra

Do latim tardio *litterālis*, "das letras", formado por *littera*, "letra", e o final *-ālis*. O valor literal é o que está escrito, letra por letra, no código. É o mesmo sentido de "ao pé da letra": tomar uma frase literalmente é tomá-la exatamente como está escrita.

Fontes: MDN: [Grammar and types: literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#literals) · Wiktionary: [literal](https://en.wiktionary.org/wiki/literal), [litterālis](https://en.wiktionary.org/wiki/litteralis)
