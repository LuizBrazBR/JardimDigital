---
title: Conexão persistente
---

> [!abstract] Definição
> **Conexão de rede que permanece aberta para ser reutilizada em mais de uma troca de dados.**

No HTTP/1.1, manter a conexão TCP aberta evita estabelecer outra conexão para cada requisição. Isso é diferente de enviar um corpo em partes (*chunked transfer encoding*): persistência fala sobre reutilizar a conexão; chunks, sobre como delimitar o corpo de uma mensagem. Ver a aula [[programacao/protocolos-da-web/modulo-2/03-http-nao-tem-memoria-stateless|2.3 HTTP não tem memória: o que significa ser stateless]].
