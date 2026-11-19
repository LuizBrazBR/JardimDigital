---
title: Conexão persistente
---

> [!abstract] Definição
> **Conexão de rede que permanece aberta para ser reutilizada em mais de uma troca de dados.**

No HTTP/1.1, manter a conexão TCP aberta evita estabelecer outra conexão para cada requisição. Isso é diferente de enviar um corpo em partes (*chunked transfer encoding*): persistência fala sobre reutilizar a conexão; chunks, sobre como delimitar o corpo de uma mensagem. Ver a aula [[programacao/protocolos-da-web/modulo-2/03-http-nao-tem-memoria-stateless|2.3 HTTP não tem memória: o que significa ser stateless]].

## De onde vem a palavra

Persistente vem do latim *persistens*, de *persistere*, "manter-se firme" (*per-*, "através", mais *sistere*, "ficar de pé"). Persistir é continuar de pé; a conexão persiste porque continua aberta. Em inglês, o termo do protocolo é *persistent connection*, também chamado *keep-alive*, "mantenha vivo".

Fontes: Wiktionary: [persistent](https://en.wiktionary.org/wiki/persistent) · IETF: [RFC 9112, HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112)
