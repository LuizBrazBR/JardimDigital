---
title: "3.2 POST: o método para criar recursos"
tags:
  - protocolos-da-web
  - http
---

Na [[programacao/protocolos-da-web/modulo-3/01-get-o-metodo-para-ler-dados|aula 3.1]], vimos que `GET` pede uma leitura e não deve solicitar mudanças nos dados do recurso. Agora vem o `POST`: ele envia dados ao servidor para criar algo ou executar uma ação.

## O que o POST pede

> [!abstract] Definição
> **O `POST` envia dados ao servidor para que ele processe o pedido, muitas vezes criando um recurso ou executando uma ação.** Ao contrário do `GET`, esses dados podem ir no corpo da requisição.

Um exemplo: o cliente quer criar uma conta. Envia os dados para o endereço da coleção de usuários; o servidor valida os dados, cria a conta e escolhe seu identificador.

```http
POST /api/usuarios HTTP/1.1
Host: api.exemplo.com
Content-Type: application/json

{"nome":"Marina Silva","email":"marina@exemplo.com"}
```

O caminho `/api/usuarios` aponta para a coleção, isto é, o conjunto de usuários. O corpo contém os dados da nova pessoa, em [[glossario/json|JSON]]. `Content-Type: application/json` informa ao servidor o formato desse corpo.

Uma possível resposta:

```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/usuarios/107

{"id":107,"nome":"Marina Silva","email":"marina@exemplo.com"}
```

O status `201 Created` informa que algo novo foi criado. O cabeçalho `Location` informa o endereço escolhido pelo servidor para o novo usuário. O `107` é um identificador que o servidor gerou; o cliente não precisou escolher esse endereço antes de enviar os dados.

> [!example] Abrir uma ficha no balcão
> Imagine entregar no balcão um formulário com o nome e o e-mail de alguém. O atendente confere, cria uma ficha e informa o número dela. No exemplo HTTP, o formulário são os dados no corpo, o balcão é o servidor e o número da ficha aparece no endereço da resposta.
>
> A analogia termina aí: um servidor segue regras de validação e responde com mensagens HTTP; um atendente pode conversar e resolver exceções de outras formas.

## Corpo da requisição e JSON

O corpo é a parte da mensagem que leva os dados. No exemplo, o corpo começa depois da linha em branco que separa os cabeçalhos do conteúdo. O `Content-Type` descreve o formato do corpo para que o servidor saiba como interpretá-lo.

O [[glossario/json|JSON]] é um formato de texto usado para organizar dados. As chaves `"nome"` e `"email"` identificam os valores `"Marina Silva"` e `"marina@exemplo.com"`. As chaves e os textos ficam entre aspas duplas.

Com `curl.exe` no PowerShell, o mesmo pedido pode ser enviado assim:

```powershell
curl.exe -X POST https://api.exemplo.com/api/usuarios `
  -H "Content-Type: application/json" `
  -d '{"nome":"Marina Silva","email":"marina@exemplo.com"}'
```

- `-X POST` escolhe o método `POST`.
- `-H` acrescenta um cabeçalho; aqui, diz que o corpo está em JSON.
- `-d` envia o texto entre aspas como corpo do pedido.

O domínio `api.exemplo.com` é ilustrativo; esse comando não cria uma conta real.

## POST também executa ações

O `POST` também serve para pedidos que fazem algo no servidor, mesmo quando não criam um recurso com endereço próprio: enviar um e-mail, iniciar um pagamento, entrar numa conta ou fazer uma busca com muitos filtros no corpo. A escolha depende do que o pedido solicita.

Por exemplo, enviar `POST /notificacoes` com os dados da mensagem pode pedir que o servidor envie um e-mail. Repetir esse pedido pode enviar outra mensagem. Já um pedido para pesquisar com muitos filtros pode usar `POST /busca` e levar os filtros em JSON; como vimos na aula 3.1, isso é útil quando os dados não cabem bem na URL.

> [!info] POST e a mudança de dados
> Uma escrita no banco não significa automaticamente que o cliente pediu uma mudança de negócio. Um servidor pode registrar em banco “quem acessou e quando” como histórico informativo, até durante um `GET`. O método descreve a intenção do pedido: se ele pede para criar uma conta, enviar uma mensagem ou registrar uma exportação como ação realizada, há uma mudança solicitada e `POST` combina com esse pedido. Isso ajuda a distinguir uma simples anotação de acesso de uma ação do sistema.

## POST e outros métodos

No `POST` de criação, o cliente envia os dados para uma coleção e o servidor escolhe o endereço do novo recurso. Na próxima aula veremos `PUT` e `PATCH`, usados quando o cliente aponta um recurso específico para substituí-lo ou alterar parte dele.

| Aspecto | `GET` | `POST` |
|---|---|---|
| O que pede | Ler um recurso | Processar dados, criar ou executar uma ação |
| Onde pode levar dados | URL e cabeçalhos | Corpo e cabeçalhos |
| Resposta comum | `200 OK` | `201 Created` quando cria algo |
| Seguro | Sim: não solicita mudança no recurso | Em geral, não |
| Repetir o pedido | A leitura pode ser repetida sem pedir mudança | Pode criar outro resultado ou repetir a ação |

Os status da resposta serão estudados com mais detalhe no módulo 4. `201 Created` é comum quando o `POST` cria um recurso; outros pedidos `POST` podem responder com outros status, conforme o resultado.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. De onde vem o endereço do usuário novo?
> O cliente envia `POST /api/usuarios` com nome e e-mail. Quem escolhe o endereço individual, como `/api/usuarios/107`?
>
> > [!success]- Resposta
> > O servidor. O cliente envia os dados à coleção `/api/usuarios`; depois de criar o usuário, o servidor informa o endereço individual na resposta, geralmente no cabeçalho `Location`.

> [!question] 2. Qual método combina com cada pedido?
> a) Ler os dados do usuário 107. b) Criar um comentário novo enviando seu texto.
>
> > [!success]- Resposta
> > a) `GET`, pois o pedido é para ler. b) `POST`, pois o pedido envia dados para criar um comentário.

> [!question] 3. Um serviço salva no banco quem acessou uma página e o horário, mas não muda a página nem os dados da conta. Essa gravação, sozinha, exige trocar o `GET` por `POST`?
>
> > [!success]- Resposta
> > Não. O registro pode ser apenas histórico informativo do acesso. O método depende da mudança que o pedido solicita ao sistema, não simplesmente de o servidor gravar alguma informação.

## De onde vêm as palavras

- **POST** é abreviação de *post* em inglês, palavra usada para envio ou publicação de dados. No HTTP, nomeia o método que envia uma representação ao servidor para processamento.
- **JSON** vem de *JavaScript Object Notation*, “notação de objetos JavaScript”. Apesar do nome, é um formato de texto usado por diferentes linguagens.
- **Coleção** vem do latim *collectio*, “ato de reunir”; aqui, é um conjunto de recursos do mesmo tipo, como todos os usuários.

Fontes: IETF: [RFC 9110, seção 9.3.3: POST](https://www.rfc-editor.org/rfc/rfc9110#section-9.3.3), [seção 15.3.2: 201 Created](https://www.rfc-editor.org/rfc/rfc9110#section-15.3.2) · MDN: [Métodos de requisição HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), [JSON](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/JSON) · Wiktionary: [post](https://en.wiktionary.org/wiki/post), [collectio](https://en.wiktionary.org/wiki/collectio)

> [!tip] Para guardar
> `POST` envia dados no corpo para o servidor processar. Para criar um recurso, o cliente normalmente envia os dados à coleção; o servidor cria o recurso, escolhe seu endereço e costuma responder `201 Created` com `Location`. `POST` também serve para ações como enviar uma notificação. Um registro informativo de acesso, por si só, não significa que o GET pediu uma mudança de negócio.
