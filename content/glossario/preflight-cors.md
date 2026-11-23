---
title: Preflight de CORS
---

> [!abstract] Definição
> **Consulta prévia com OPTIONS que o navegador envia em certos pedidos entre origens para verificar as permissões de CORS.**

Por exemplo, antes de enviar um `DELETE` de outra origem, o navegador informa sua origem no cabeçalho `Origin` e o método pretendido em `Access-Control-Request-Method`. A resposta pode anunciar a origem em `Access-Control-Allow-Origin` e o método em `Access-Control-Allow-Methods`. Ver a aula [[programacao/protocolos-da-web/modulo-3/04-delete-head-e-options-remover-e-consultar|3.4 DELETE, HEAD e OPTIONS: remover e consultar]].

## De onde vem a palavra

Do inglês *preflight*, formado por *pre-* («antes») e *flight* («voo»). Na aviação, nomeia a inspeção antes de decolar. Na Web, nomeia a checagem que pode ocorrer antes da requisição que a motivou.

Fontes: [WHATWG Fetch, CORS-preflight request](https://fetch.spec.whatwg.org/#cors-preflight-request) · [Wiktionary, preflight](https://en.wiktionary.org/wiki/preflight#English)
