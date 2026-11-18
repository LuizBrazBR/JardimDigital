---
title: JWT
---

> [!abstract] Definição
> **Formato de token que transporta informações chamadas *claims* e pode ter uma assinatura para permitir que o servidor detecte alterações.** A sigla vem do inglês *JSON Web Token*.

Num JWT assinado, o conteúdo costuma ser codificado para transporte, não escondido por criptografia. O servidor lê as informações e verifica a assinatura; se alguém alterar o conteúdo, a verificação falha. O JWT pode permitir identificar o usuário sem consultar uma tabela de sessões, mas a aplicação ainda pode consultar o banco para buscar dados ou permissões. Ver a aula [[programacao/protocolos-da-web/modulo-2/03-http-nao-tem-memoria-stateless|2.3 HTTP não tem memória: o que significa ser stateless]].
