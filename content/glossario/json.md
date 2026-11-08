---
title: JSON
---

> [!abstract] Definição
> **Um formato de texto para mandar dados, com a mesma cara dos [[glossario/array|arrays]] e [[glossario/objeto|objetos]] do JavaScript.** É o formato mais usado nas [[glossario/api|APIs]].

```json
[
  { "titulo": "Estudar laços", "concluida": true },
  { "titulo": "Comprar pão", "concluida": false }
]
```

No JSON, os nomes dos campos vão sempre entre aspas duplas. Um array guardado na memória de um programa não tem como ir assim para outro computador: ele vira texto em JSON, viaja, e do outro lado vira array de novo. Ver a aula [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|1.1 Cliente e servidor: o modelo por trás da web]].

## De onde vem a palavra

Sigla do inglês *JavaScript Object Notation*, "notação de objetos do JavaScript". Quem descreveu e espalhou o formato foi o americano Douglas Crockford, em 2001. Na empresa dele, os sócios chegaram a votar entre dois nomes: JSML, de *JavaScript Markup Language*, e JSON. Ganhou o JSON.

Apesar do nome, o JSON não é só do JavaScript. Python e praticamente todas as outras linguagens leem e escrevem JSON.

Fontes: MDN: [Working with JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) · Wikipedia: [JSON](https://en.wikipedia.org/wiki/JSON)
