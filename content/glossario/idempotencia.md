---
title: Idempotência
---

> [!abstract] Definição
> **Propriedade pela qual fazer o mesmo pedido uma vez ou várias vezes tem o mesmo efeito pretendido no servidor.**

Definir o estoque como 12 deixa o estoque em 12 ao repetir. Adicionar duas unidades a cada pedido acumula. Os códigos de resposta podem variar mesmo quando o efeito pretendido é igual: um `DELETE` repetido responde `204` e depois `404`, e o estado final é o mesmo. É a propriedade que permite ao cliente fazer um [[glossario/retry|retry]] sem medo. Todo [[glossario/metodo-seguro|método seguro]] é idempotente, mas o `PUT` e o `DELETE` também são, sem serem seguros. Ver as aulas [[programacao/protocolos-da-web/modulo-3/03-put-e-patch-atualizacao-total-e-parcial|3.3 PUT e PATCH: atualização total e parcial]] e [[programacao/protocolos-da-web/modulo-3/05-metodos-seguros-idempotentes-e-erros-comuns-de-semantica|3.5 Métodos seguros, idempotentes e erros comuns de semântica]].

## De onde vem a palavra

O termo vem da matemática e reúne as raízes latinas *idem*, «o mesmo», e *potens*, «que tem poder». No HTTP, descreve o efeito de reaplicar uma operação.

Fontes: [RFC 9110, métodos idempotentes](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) · [Wiktionary, idempotent](https://en.wiktionary.org/wiki/idempotent#English)
