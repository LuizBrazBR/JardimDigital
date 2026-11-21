---
title: Efeito colateral (side effect)
---

> [!abstract] Definição
> **Uma mudança que uma ação deixa fora dela mesma, além do resultado que devolve.** Numa requisição HTTP, é o que muda no servidor por causa do pedido: um registro criado, um estoque que baixou, um usuário apagado.

`GET /produtos/42` só devolve o produto: não tem efeito colateral. `POST /pedidos` devolve o pedido criado **e** deixa uma mudança: o pedido gravado e o estoque menor. Na programação em geral é igual: uma [[glossario/funcao|função]] que só calcula e devolve um valor não tem efeito colateral; uma que muda uma variável de fora, ou um array, como o `compras.push(...)`, tem.

Gravar o pedido num [[glossario/log|log]] ou somar 1 num contador de visitas também é uma mudança, mas a especificação do HTTP não conta isso contra o `GET`: o cliente não pediu essa mudança e não responde por ela. Ver a aula [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|3.1 GET: o método para ler dados]].

## De onde vem a palavra

**Efeito** vem do latim *effectus*, "resultado", de *efficiō*, "realizar, produzir". **Colateral** vem do latim medieval *collaterālis*, de *con-*, "junto", e *latus*, "lado": o que fica ao lado. O efeito colateral é o que acontece **ao lado** do efeito principal, como no remédio. A expressão em inglês é *side effect*, "efeito do lado".

Fontes: MDN: [Side effect](https://developer.mozilla.org/en-US/docs/Glossary/Side_effect) · IETF: [RFC 9110, seção 9.2.1: Safe Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.1) · Wiktionary: [efeito](https://en.wiktionary.org/wiki/efeito), [colateral](https://en.wiktionary.org/wiki/colateral), [collateral](https://en.wiktionary.org/wiki/collateral)
