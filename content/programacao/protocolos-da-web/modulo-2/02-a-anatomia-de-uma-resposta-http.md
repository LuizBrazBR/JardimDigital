---
title: "2.2 A anatomia de uma resposta HTTP"
tags:
  - protocolos-da-web
  - http
---

Na [[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|aula 2.1]], abrimos a requisição: o que o cliente manda, linha por linha. Agora vem a volta. Se a requisição é a pergunta, a [[glossario/resposta|resposta]] é o que o servidor devolve: o produto pedido, a confirmação de uma operação ou a explicação de que alguma coisa deu errado.

## As três partes

> [!abstract] Definição
> **Uma resposta HTTP/1.1 tem uma linha de status, cabeçalhos e, quando permitido e necessário, um corpo.** A linha de status informa o resultado. Os [[glossario/cabecalho|cabeçalhos]] dão informações sobre a resposta. O [[glossario/corpo|corpo]] leva o conteúdo.

O cliente pediu `GET /produtos/42`. O servidor encontrou o produto e devolveu:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 55
Date: Fri, 10 Jul 2026 14:32:10 GMT
Server: nginx/1.25

{"id": 42, "nome": "Teclado mecânico", "preco": 350.0}
```

| Parte | No exemplo | Para que serve |
|---|---|---|
| **linha de status** | `HTTP/1.1 200 OK` | informa a versão e o resultado do pedido |
| **cabeçalhos** | de `Content-Type` até `Server` | descrevem o conteúdo e trazem informações sobre a resposta |
| **linha em branco** | depois de `Server` | separa os cabeçalhos do corpo |
| **corpo** | o JSON com o produto | leva os dados pedidos |

É quase o espelho da requisição. Onde antes estava `GET /produtos/42 HTTP/1.1`, agora está `HTTP/1.1 200 OK`. O cliente disse **o que queria**; o servidor diz **como foi**.

A linha em branco continua indispensável. No HTTP/1.1, a primeira linha e cada cabeçalho terminam com [[glossario/crlf|CRLF]], `\r\n`. O fim dos cabeçalhos aparece como `\r\n\r\n`, como na aula anterior. O corpo pode ser texto, uma imagem ou outros bytes.

## Lendo a linha de status

```http
HTTP/1.1 200 OK
```

| Pedaço | O que significa |
|---|---|
| `HTTP/1.1` | a versão do protocolo usada nesta resposta |
| `200` | o **código de status**: o resultado, expresso por três algarismos |
| `OK` | a **reason phrase**: uma frase curta para leitura humana |

O [[glossario/codigo-de-status|código de status]] orienta o cliente. `200` indica sucesso; `404`, que o recurso não foi encontrado. O módulo 4 vai tratar dos códigos e das suas famílias. Aqui, o objetivo é reconhecer onde eles ficam.

### Por que o número importa mais que a frase

*Reason phrase* significa "frase de motivo". `Not Found` ajuda uma pessoa a ler um `404`, mas o programa deve interpretar **o número**. A frase pode variar, e no HTTP/1.1 pode até estar vazia. Uma frase diferente não muda o significado do código.

> [!example] O número e a legenda
> Pense num painel de senhas: o número `42` identifica a sua vez. A legenda pode dizer "pode entrar" ou "dirija-se ao balcão". O texto ajuda a pessoa; é o número que o sistema usa para identificar a senha.

Também não confunda a frase curta com o corpo. Nesta resposta, `Not Found` é a frase da linha de status; o JSON é o corpo, com uma explicação específica:

```http
HTTP/1.1 404 Not Found
Content-Type: application/json
Content-Length: 38
Date: Fri, 10 Jul 2026 14:33:02 GMT

{"erro": "Produto 42 não encontrado"}
```

**Um erro também é uma resposta HTTP.** Receber `404` significa que houve uma resposta dizendo que o recurso não foi encontrado. Se a conexão nem chegou a ser estabelecida, pode não haver resposta HTTP nem código de status.

> [!info] E no HTTP/2 e no HTTP/3?
> A linha escrita como `HTTP/1.1 200 OK` é do HTTP/1.x. Nas versões 2 e 3, o código vai no pseudocabeçalho `:status`, por exemplo `:status: 200`, e não existe *reason phrase*. O DevTools organiza essas informações para a gente ler. O significado do `200` continua o mesmo; a forma de transmitir mudou. A aula 2.4 vai abrir essa diferença.

## O corpo e os cabeçalhos que o descrevem

No primeiro exemplo, o corpo é [[glossario/json|JSON]]. Poderia ser [[glossario/html|HTML]], uma imagem ou outro conteúdo. Os dois cabeçalhos já conhecidos continuam trabalhando juntos:

- **`Content-Type`** informa o formato. `application/json` quer dizer que o corpo deve ser interpretado como JSON.
- **`Content-Length`**, quando usado para delimitar esse corpo, informa quantos **bytes** ele tem. Não conta a linha de status, os cabeçalhos nem a linha em branco.

O cabeçalho descreve o corpo, mas não o transforma. Escrever `Content-Type: application/json` e mandar um HTML não converte HTML em JSON; cria uma resposta com uma descrição errada.

### Conferindo os bytes

Um **caractere** é algo que lemos, como `A` ou `â`. Um **byte** é uma unidade usada para guardar e transmitir dados. Para enviar texto, o computador precisa de uma regra que transforme caracteres em bytes e permita reconstruí-los depois. Essa regra se chama **codificação de caracteres**.

Nem sempre houve uma regra única. O ASCII, uma codificação antiga, representava letras básicas do inglês, números e sinais, mas não incluía `â` nem `ã`. Outras codificações surgiram para atender a diferentes idiomas; quando quem enviava e quem lia usavam regras diferentes, os acentos podiam aparecer como símbolos estranhos. O **UTF-8** é uma codificação que representa esses caracteres e muitos outros. No começo do curso, você já viu `charset=utf-8` em um `Content-Type`: ali, `charset` indica ao leitor qual codificação usar para interpretar o texto.

No UTF-8, o número de bytes depende do caractere: `A` ocupa um byte; `â` e `ã` ocupam dois bytes cada. Por isso, contar letras não basta para preencher `Content-Length`. Os exemplos acima contam o texto exatamente como está, com espaços, em UTF-8 e **sem uma quebra de linha no fim do corpo**.

Para conferir os números com Node.js, crie um arquivo chamado `tamanhos.cjs`, salve em UTF-8 e rode `node tamanhos.cjs`. A extensão `.cjs` será explicada no exercício do servidor, mais adiante; por enquanto, ela indica ao Node como executar este arquivo JavaScript.

```js
const produto = '{"id": 42, "nome": "Teclado mecânico", "preco": 350.0}';
const erro = '{"erro": "Produto 42 não encontrado"}';

console.log(Buffer.byteLength(produto, "utf8")); // 55
console.log(Buffer.byteLength(erro, "utf8"));    // 38
```

`Buffer.byteLength` conta os bytes que o texto ocupa na codificação escolhida. Se você tirar espaços, acrescentar uma quebra de linha ou mudar o texto, precisa calcular de novo.

> [!info]- Toda resposta com corpo precisa trazer Content-Length?
> Não. No HTTP/1.1, existe também o `Transfer-Encoding: chunked`, visto na aula 2.1: o corpo chega em blocos, cada um com seu tamanho, e um bloco de tamanho zero encerra os dados. Em alguns casos, o fechamento da conexão delimita o fim. Portanto, a ausência de `Content-Length` não prova que o corpo está vazio. Um emissor não deve mandar `Content-Length` junto de `Transfer-Encoding`.

## Uma resposta de sucesso sem corpo

O servidor pode concluir uma operação e responder sem devolver conteúdo. Um exemplo é o **`204 No Content`**, "sem conteúdo":

```http
HTTP/1.1 204 No Content
Date: Fri, 10 Jul 2026 14:34:00 GMT

```

Imagine que o cliente pediu para remover um item. O servidor removeu e devolveu `204`: a operação deu certo, e a resposta termina no fim dos cabeçalhos. Não existe um JSON escondido depois.

**O `204` não pode ter corpo nem cabeçalho `Content-Length`**, nem mesmo `Content-Length: 0`. O próprio código já determina que não há corpo. Existem outras respostas sem corpo, como as respostas ao método `HEAD`; os detalhes aparecem nas aulas de métodos e status.

> [!warning] Não tente ler JSON de onde não veio JSON
> Se o seu código tentar interpretar o corpo de um `204` como JSON, vai tentar interpretar um texto vazio. Isso pode gerar um erro no cliente mesmo que a operação no servidor tenha dado certo. Primeiro olhe o status e o tipo de conteúdo esperado; depois decida como ler a resposta.

## Outros cabeçalhos de resposta

| Cabeçalho | Para que serve |
|---|---|
| `Content-Type` | informa o formato do corpo, como `application/json`, `text/html` ou `image/png` |
| `Content-Length` | nos exemplos com corpo desta aula, informa o tamanho em bytes |
| `Date` | informa a data e a hora de origem da mensagem |
| `Server` | pode identificar o software do servidor, como nginx ou Apache |
| `Cache-Control` | dá instruções de cache para clientes e caches intermediários |
| `Set-Cookie` | envia ao navegador uma instrução para guardar ou atualizar um cookie |

Esses cabeçalhos são [[glossario/metadados|metadados]]: falam sobre a resposta e como tratá-la. `Date` não é a data em que o produto foi cadastrado, nem a última alteração dele. É uma informação sobre **a mensagem**. No exemplo, `GMT` indica a referência de horário usada no cabeçalho, e não o horário local do seu computador.

`Server: nginx/1.25` é uma identificação declarada pelo servidor. Esse campo pode ser omitido e não revela, por si só, toda a tecnologia que processou o pedido.

[[glossario/cache|Cache]] e [[glossario/cookie|cookie]] serão estudados no módulo 5. Por enquanto, reconheça o sentido da conversa: o servidor manda `Set-Cookie`; em pedidos posteriores que atendam às regras desse cookie, o navegador pode mandá-lo de volta no cabeçalho `Cookie`.

## Veja com os próprios olhos

Vamos montar um servidor pequeno com três resultados: **produto encontrado**, **produto não encontrado** e **sucesso sem corpo**. Use uma pasta de exercícios e crie `respostas.cjs`.

Antes do código, entenda o nome do arquivo. Em Node.js, um **módulo** é um arquivo de código que pode usar recursos de outros arquivos. Há duas formas comuns de fazer isso: **CommonJS**, que usa `require(...)`, e **módulos ECMAScript (ESM)**, que usam `import`. CommonJS veio primeiro no Node; ESM foi padronizado para JavaScript e também passou a ser aceito pelo Node. A extensão **`.cjs`** quer dizer *CommonJS JavaScript*: avisa ao Node que este arquivo usa a forma com `require`. A extensão `.mjs` indica ESM; um arquivo `.js` pode seguir uma ou outra forma conforme a configuração do projeto no `package.json`. Assim, `.cjs` mantém o exercício funcionando mesmo se a pasta tiver um `package.json` com `"type": "module"`. Aqui, `require("node:http")` carrega o módulo de HTTP que já vem com o Node.

```js
const http = require("node:http");

const servidor = http.createServer((requisicao, resposta) => {
  if (requisicao.method === "DELETE" && requisicao.url === "/carrinho/42") {
    // Apenas simula a remoção: este exemplo não tem banco de dados.
    resposta.statusCode = 204;
    resposta.end();
    return;
  }

  let corpo;

  if (requisicao.method === "GET" && requisicao.url === "/produtos/42") {
    resposta.statusCode = 200;
    corpo = '{"id": 42, "nome": "Teclado mecânico", "preco": 350.0}';
  } else {
    resposta.statusCode = 404;
    corpo = '{"erro": "Recurso não encontrado"}';
  }

  resposta.setHeader("Content-Type", "application/json");
  resposta.setHeader("Content-Length", Buffer.byteLength(corpo, "utf8"));
  resposta.end(corpo);
});

servidor.listen(3000, "127.0.0.1", () => {
  console.log("Servidor em http://127.0.0.1:3000");
});
```

Rode `node respostas.cjs`. Se outro exercício estiver usando a porta 3000, encerre aquele servidor com **Ctrl+C** antes.

- **`resposta.statusCode`** escolhe o código da linha de status. O Node fornece a frase usual, como `OK` ou `Not Found`.
- **`resposta.setHeader(nome, valor)`** define um cabeçalho antes do envio.
- **`resposta.end(corpo)`** envia o corpo e termina a resposta. No caso do `204`, chamamos `end()` sem conteúdo e saímos da função com `return`.
- O **`Date`** é acrescentado automaticamente pelo Node. Outros cabeçalhos de conexão também podem aparecer.

Em outro terminal do PowerShell, rode um comando por vez:

```powershell
curl.exe -i http://127.0.0.1:3000/produtos/42
curl.exe -i http://127.0.0.1:3000/produtos/99
curl.exe -i -X DELETE http://127.0.0.1:3000/carrinho/42
```

O **`-i`** mostra os cabeçalhos da resposta junto do corpo. Compare:

| Pedido | Status esperado | Corpo |
|---|---|---|
| `GET /produtos/42` | `200 OK` | JSON com o produto |
| `GET /produtos/99` | `404 Not Found` | JSON com a mensagem de erro |
| `DELETE /carrinho/42` | `204 No Content` | nenhum |

Na primeira resposta, procure `Content-Length: 55`. Na terceira, observe que a resposta termina após os cabeçalhos.

Para ver a conversa nos dois sentidos, use:

```powershell
curl.exe -v http://127.0.0.1:3000/produtos/42
```

Na saída detalhada, **`>`** marca as linhas da requisição e **`<`** marca a linha de status e os cabeçalhos recebidos. Esses sinais são anotações do curl; não fazem parte da mensagem HTTP. O corpo aparece depois.

### Pelo navegador

1. Abra `http://127.0.0.1:3000/produtos/42` no Chrome.
2. Aperte **F12**, abra **Network / Rede** e recarregue a página.
3. Selecione a requisição `42`.
4. Em **Headers / Cabeçalhos**, encontre o status, os **Response Headers** e os **Request Headers**. São os cabeçalhos da volta e da ida, separados pela ferramenta.
5. Em **Response / Resposta**, leia o corpo. A aba **Preview / Prévia** pode apresentar o JSON de forma organizada.
6. Abra `/produtos/99` e compare o `404` e seu corpo com o resultado anterior.

Pare o servidor com **Ctrl+C** quando terminar.

## Treine

Tente responder antes de abrir cada resposta.

> [!question] 1. Separe a resposta
> Em `HTTP/1.1 404 Not Found`, o que é versão, código e frase? A mensagem `{"erro": "Produto 42 não encontrado"}` faz parte dessa linha?
>
> > [!success]- Resposta
> > Versão: `HTTP/1.1`. Código: `404`. Frase: `Not Found`. O JSON é o corpo e vem depois dos cabeçalhos e da linha em branco.

> [!question] 2. A frase mudou
> Uma resposta HTTP/1.1 veio com código `200`, mas a frase curta mudou. Um programa deve concluir que deu erro porque o texto não é exatamente `OK`?
>
> > [!success]- Resposta
> > Não. O código continua indicando sucesso. A frase serve para leitura humana e não deve decidir o comportamento do programa.

> [!question] 3. Deu erro, então não houve resposta?
> O curl mostrou `404 Not Found` e um JSON de erro. Houve uma resposta HTTP? Como isso difere de não conseguir conectar à porta do servidor?
>
> > [!success]- Resposta
> > Houve: a resposta informa que o recurso não foi encontrado. Se a conexão falhar antes de qualquer resposta, não haverá linha de status nem corpo HTTP para interpretar.

> [!question] 4. Um JSON depois do 204
> Você quer responder `204 No Content` e mandar `{"ok": true}` no corpo. Isso combina? E acrescentar `Content-Length: 0`?
>
> > [!success]- Resposta
> > Nenhum dos dois. O `204` não permite corpo nem `Content-Length`. Para devolver um JSON confirmando a operação, escolha um status que permita conteúdo e seja adequado à operação, como `200` nesse caso.

> [!question] 5. Os mesmos dados, outro tamanho
> Você tirou os espaços do JSON do produto, mantendo os mesmos valores. Pode copiar o `Content-Length: 55` do exemplo?
>
> > [!success]- Resposta
> > Não. O tamanho é do texto transmitido, em bytes. Tirar espaços muda esse tamanho, mesmo que o JSON represente os mesmos dados. Calcule com `Buffer.byteLength` depois de montar o texto final.

> [!question] 6. De quem é essa data?
> O `Date` da resposta informa quando o produto foi criado? O `Server` permite descobrir toda a tecnologia do back-end?
>
> > [!success]- Resposta
> > Não. `Date` se refere à origem da mensagem. `Server` é uma identificação declarada, pode ser omitido e não descreve necessariamente todos os programas envolvidos.

> [!question] 7. Ida e volta
> No `curl -v`, o que significam `> GET /produtos/42 HTTP/1.1` e `< HTTP/1.1 200 OK`? Os sinais `>` e `<` viajam pela conexão?
>
> > [!success]- Resposta
> > A primeira é a linha da requisição enviada; a segunda é a linha de status recebida. Os sinais são marcas do curl para ajudar a ler, não fazem parte do HTTP.

> [!tip] Para guardar
> - No HTTP/1.1, a resposta começa com **versão, código de status e uma frase curta opcional**.
> - O **número** informa o resultado; a frase ajuda a pessoa a ler.
> - Depois vêm os **cabeçalhos**, a **linha em branco** e, quando houver, o **corpo**.
> - `Content-Type` descreve o formato; `Content-Length`, quando usado nos exemplos com corpo, conta seus **bytes**.
> - **`204 No Content`** é sucesso sem corpo e não leva `Content-Length`.
> - `curl -i` mostra cabeçalhos e corpo; `curl -v` ajuda a acompanhar a ida e a volta.

Fontes: MDN: [HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages), [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) · IETF: [RFC 9112, linha de status](https://www.rfc-editor.org/rfc/rfc9112.html#section-4), [comprimento do corpo](https://www.rfc-editor.org/rfc/rfc9112.html#section-6.3), [RFC 9110, Content-Length](https://www.rfc-editor.org/rfc/rfc9110.html#section-8.6), [Date](https://www.rfc-editor.org/rfc/rfc9110.html#section-6.6.1), [Server](https://www.rfc-editor.org/rfc/rfc9110.html#section-10.2.4) · Node.js: [HTTP](https://nodejs.org/api/http.html), [Buffer.byteLength](https://nodejs.org/api/buffer.html#static-method-bufferbytelengthstring-encoding).
