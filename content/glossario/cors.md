---
title: CORS
---

> [!abstract] Definição
> **Mecanismo pelo qual um servidor informa ao navegador quais outras origens podem acessar suas respostas.**

Em pedidos que exigem uma consulta prévia, o navegador usa [[glossario/preflight-cors|preflight de CORS]] para checar se a outra origem pode enviar o método e os cabeçalhos pretendidos. O cabeçalho `Access-Control-Allow-Origin` indica a origem autorizada. Ver a aula [[programacao/protocolos-da-web/modulo-3/04-delete-head-e-options-remover-e-consultar|3.4 DELETE, HEAD e OPTIONS: remover e consultar]].

## De onde vem a palavra

É a sigla inglesa de *Cross-Origin Resource Sharing*, «compartilhamento de recursos entre origens». O nome descreve o acesso autorizado entre sites de [[glossario/origem-web|origens]] diferentes.

Fontes: [WHATWG Fetch, protocolo CORS](https://fetch.spec.whatwg.org/#cors-protocol) · [RFC 6454, acesso entre origens](https://www.rfc-editor.org/rfc/rfc6454.html#section-3.4)
