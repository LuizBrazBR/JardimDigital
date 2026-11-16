---
title: "2.1 A anatomia de uma requisição HTTP"
tags:
  - protocolos-da-web
  - http
---

Primeira aula do módulo 2. O módulo 1 olhou a conversa de fora: o cliente pede, o servidor responde, a página aparece. A aula 1.1 até deu [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|uma espiada numa mensagem HTTP]], só para ver a cara dela. Agora a requisição é aberta peça por peça: como se chama cada parte, o que cada linha quer dizer e por que o formato não aceita nenhum deslize. No fim, você vai ver no seu computador o texto exato que chega a um servidor, e vai escrever uma requisição à mão.

## As três partes

> [!abstract] Definição
> **Uma [[glossario/requisicao|requisição]] [[glossario/http|HTTP]] é um texto, num formato fixo, que o cliente monta e manda pela conexão. Tem três partes, sempre nesta ordem: a linha de requisição, os [[glossario/cabecalho|cabeçalhos]] e, quando há dados para mandar, o [[glossario/corpo|corpo]].**

Não importa quem pede: o Chrome, o curl, o aplicativo da loja ou o back-end chamando outro serviço. Todos montam o mesmo texto, com as mesmas três partes.

```http
POST /carrinho HTTP/1.1
Host: api.loja.com
Content-Type: application/json
Content-Length: 34

{"produtoId": 42, "quantidade": 2}
```

| Parte | No exemplo | Para que serve |
|---|---|---|
| **linha de requisição** | `POST /carrinho HTTP/1.1` | o que fazer, com o quê, e em qual versão do HTTP |
| **cabeçalhos** (*headers*) | as linhas `Nome: valor`, do `Host` ao `Content-Length` | avisos **sobre** o pedido: para qual site é, em que formato está o corpo, qual é o tamanho dele |
| **linha em branco** | a linha vazia | marca o fim dos cabeçalhos |
| **corpo** (*body*) | `{"produtoId": 42, "quantidade": 2}` | os dados que o cliente está mandando. Pode não existir |

> [!example] Uma caixa pelo correio
> Pense numa caixa que você manda pelo correio. Na etiqueta de cima está o principal: o que fazer com ela e para onde vai. Colados na caixa, uns adesivos: "frágil", "pesa 2 kg", "conteúdo: livros". E dentro, a coisa em si.
>
> A etiqueta é a linha de requisição. Os adesivos são os cabeçalhos: falam **da** caixa, sem ser o que vai dentro. O "pesa 2 kg" é o `Content-Length`, e o "conteúdo: livros" é o `Content-Type`. O que vai dentro é o corpo. E nem toda caixa leva alguma coisa: um pedido de "venha buscar" pode ir só com a etiqueta.

### Metadados: dados sobre os dados

O curso chama os cabeçalhos de **[[glossario/metadados|metadados]]**. Metadado é um dado que descreve outro dado. Uma foto no celular é o dado; a data, o lugar e o modelo do celular que tirou a foto, guardados junto com ela, são metadados. Uma música é o dado; o nome do artista e a duração são metadados.

Nos cabeçalhos é igual. `Content-Length: 34` não é o pedido; é uma informação **sobre** o corpo do pedido: ele tem 34 bytes.

## A linha em branco e o CRLF

As linhas da requisição não acabam com um "Enter" qualquer. No HTTP/1.1, cada linha termina com dois caracteres invisíveis, um atrás do outro: o **CR** e o **LF**. Juntos, o **[[glossario/crlf|CRLF]]**.

Os nomes vêm da máquina de escrever. No fim de uma linha, dois movimentos levavam ao começo da próxima: o carro, a peça que segura o papel, **voltava** para a esquerda, e o rolo **subia** o papel uma linha. Em inglês, *carriage return*, "retorno do carro", e *line feed*, "avanço de linha". Os computadores herdaram os dois como caracteres:

| Caractere | Nome | Como se escreve num texto do JavaScript | O movimento na máquina de escrever |
|---|---|---|---|
| CR | *carriage return* | `\r` | o carro volta para o começo da linha |
| LF | *line feed* | `\n` | o papel sobe uma linha |

Dentro das aspas de um texto do JavaScript, a barra invertida avisa que a letra seguinte é especial. `"\n"` não são duas letras, a barra e o `n`: é um caractere só, a quebra de linha. Com `\r\n`, você escreve esses caracteres invisíveis num texto.

> [!info] O CRLF que já aparece no seu VS Code
> No canto de baixo, à direita, o VS Code mostra `CRLF` ou `LF`. É o jeito como o arquivo aberto termina as linhas. O Windows costuma usar CRLF nos arquivos de texto; o Linux e o Mac usam só LF. Para um arquivo seu, tanto faz. Para o HTTP/1.1, não: as regras pedem CRLF, em qualquer sistema.

Agora a linha em branco fica fácil de ver. Ela é só um CRLF logo depois de outro:

```
...Content-Length: 34\r\n\r\n{"produtoId": 42, "quantidade": 2}
```

O primeiro `\r\n` termina a linha do `Content-Length`. O segundo vem numa linha sem nada: é a linha em branco. Quando o parser que a [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|aula 1.3]] mostrou acha esse `\r\n\r\n`, ele sabe que os cabeçalhos acabaram, e que o que vem depois é corpo.

Os exemplos do curso, e os desta página, mostram uma quebra de linha comum para ficar mais fácil de ler. Na seção "Veja com os próprios olhos", você vai ver os `\r\n` de verdade.

## A linha de requisição

A primeira linha tem três partes, separadas por um espaço:

```http
GET /produtos/42 HTTP/1.1
```

| Parte | No exemplo | O que diz |
|---|---|---|
| **método** | `GET` | a ação: buscar, criar, mudar, apagar. `GET` é "me manda". O módulo 3 é todo sobre isso |
| **caminho** | `/produtos/42` | o **[[glossario/recurso]]** que o pedido quer, dentro daquele servidor |
| **versão** | `HTTP/1.1` | a versão do HTTP que o cliente está falando. As versões são a aula 2.4 |

**Recurso** é a palavra do HTTP para "a coisa pedida". Pode ser um produto, uma lista de pedidos, uma página, uma imagem. É o R de URL, *Uniform Resource Locator*, "localizador uniforme de recursos": a URL diz onde o recurso está, e o caminho aponta para ele dentro do servidor. `/produtos/42` é o recurso "produto 42"; `/produtos` é o recurso "a lista de produtos".

Se a URL tem [[glossario/query-string|query string]], ela vai junto do caminho, nessa mesma linha, como a [[programacao/protocolos-da-web/modulo-1/02-o-que-acontece-quando-voce-digita-uma-url-e-aperta-enter|aula 1.2]] mostrou: `GET /produtos?cor=preto HTTP/1.1`. O fragmento, o `#` em diante, não vai: fica no navegador.

### E o domínio?

Repare no que **não** está na primeira linha: o domínio, `api.loja.com`. Ele vai num cabeçalho só dele, o `Host`.

A razão é a da [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]]: quando o pedido chega, o DNS já trocou o nome por um IP, e no mesmo IP, na mesma porta, podem morar muitos sites. O `sites.js` daquela aula respondia um site ou outro só de olhar o `Host`. Sem ele, o servidor não saberia qual dos sites você quer.

Na versão anterior, o HTTP/1.0, o `Host` não era obrigatório, e era comum ter um site por IP. A versão 1.1 tornou o `Host` obrigatório, para que muitos sites pudessem dividir um IP. Hoje, uma requisição HTTP/1.1 sem `Host` recebe **400**, "requisição mal formada". Você vai provocar esse erro mais abaixo.

## Os cabeçalhos

Cada cabeçalho é uma linha `Nome: valor`: o nome, dois-pontos, um espaço e o valor. A [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|aula 1.3]] já mostrou que, no nome, tanto faz maiúscula ou minúscula: `Host` e `host` são o mesmo cabeçalho.

O exemplo do curso para um `GET`:

```http
GET /produtos/42 HTTP/1.1
Host: api.loja.com
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: application/json
Connection: keep-alive
```

| Cabeçalho | O que diz |
|---|---|
| `Host: api.loja.com` | para qual site é o pedido |
| `User-Agent: Mozilla/5.0 (...)` | qual programa está pedindo, e em qual sistema. `Windows NT 10.0` é o Windows 10, e o Windows 11 também aparece assim. O curl manda `User-Agent: curl/8.9.0` |
| `Accept: application/json` | em que formato o cliente quer a resposta: aqui, JSON. O curl manda `Accept: */*`, "qualquer formato serve": o `*` quer dizer "qualquer um". É a aula 5.2 |
| `Connection: keep-alive` | "não feche a conexão depois de responder": o cliente vai mandar mais pedidos pela mesma conexão |

Dois deles pedem uma explicação a mais.

> [!info]- Por que todo navegador diz que é "Mozilla"? (clique para abrir)
> O Chrome, o Edge, o Safari e o Firefox mandam um `User-Agent` que começa com `Mozilla/5.0`. Só o Firefox é da Mozilla. É uma herança dos anos 1990: o navegador mais avançado da época, o Netscape, se apresentava como "Mozilla", e muitos sites só mandavam as páginas com os recursos novos para quem dizia ser Mozilla. Os outros navegadores recebiam uma versão pobre da página. Para não ficar de fora, todos passaram a começar o `User-Agent` com "Mozilla", e o costume ficou até hoje. O nome do navegador de verdade vem mais para o fim, como `Chrome/157.0.0.0`.

**O `keep-alive`, "mantenha vivo".** A [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]] mostrou que, antes do primeiro pedido, o navegador abre uma conexão TCP, e no HTTPS ainda faz o TLS. Isso leva tempo. Uma página pede dezenas de arquivos. Se cada um precisasse de uma conexão nova, a página demoraria muito mais. Com o `keep-alive`, a mesma conexão fica aberta e serve para vários pedidos, um depois do outro. No HTTP/1.1, manter a conexão aberta já é o comportamento padrão; o cabeçalho só deixa isso escrito. O contrário é `Connection: close`: "responda e feche".

Os exemplos do curso mostram só os cabeçalhos que importam para a explicação. Uma requisição de verdade costuma ter mais: o Chrome manda uns quinze. O `POST /carrinho` do curso, por exemplo, não mostra o `User-Agent`, mas o programa que o mandasse provavelmente mandaria um.

## O corpo e os cabeçalhos que o descrevem

O segundo exemplo do curso tem corpo:

```http
POST /carrinho HTTP/1.1
Host: api.loja.com
Content-Type: application/json
Content-Length: 34
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...

{"produtoId": 42, "quantidade": 2}
```

Um `GET` normalmente não tem corpo: ele só pede, não manda dados. Um `POST` costuma ter, com os dados para o servidor processar. Aqui, o produto e a quantidade que vão para o carrinho.

Quando há corpo, dois cabeçalhos descrevem o corpo:

| Cabeçalho | O que diz | Na caixa do correio |
|---|---|---|
| `Content-Type: application/json` | o **formato** do corpo: JSON | "conteúdo: livros" |
| `Content-Length: 34` | o **tamanho** do corpo, em bytes | "pesa 2 kg" |

O `Content-Type` diz ao servidor qual parser usar no corpo, como a aula 1.3 mostrou para a resposta. O mesmo `{"produtoId": 42}` vira dados se vier como `application/json`, e fica só texto se vier como `text/plain`.

### Por que o servidor precisa do tamanho

Junte duas coisas que você já viu. Na [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|aula 1.5]], o corpo chegava aos pedaços, e o servidor só podia usá-lo no fim. E, com o `keep-alive`, a conexão **não fecha** depois do pedido. Então como o servidor sabe que o corpo acabou? Não pode esperar a conexão fechar, porque ela vai ficar aberta.

É para isso que serve o `Content-Length`. O servidor conta os bytes que chegam depois da linha em branco, e quando chega a 34, o corpo acabou. O que vier depois já é o próximo pedido.

### Bytes, e não letras

O `Content-Length` conta **bytes**, e não letras. Um byte é a unidade de tamanho dos arquivos e das mensagens, a mesma do "KB" e do "MB". No texto `{"produtoId": 42, "quantidade": 2}`, cada caractere ocupa 1 byte, então são 34 letras e 34 bytes. Pode contar.

Mas letras com acento ocupam 2 bytes no formato de texto da web, o UTF-8, o mesmo do `charset=utf-8` da aula 1.1:

| Corpo | Letras | Bytes |
|---|---|---|
| `{"nome": "Ana"}` | 15 | 15 |
| `{"nome": "Tênis"}` | 17 | 18: o `ê` ocupa 2 |

Você quase nunca conta isso à mão: o curl, o navegador e o Node calculam o `Content-Length` sozinhos. Mas se alguém escrever o número errado, o servidor corta o corpo no lugar errado.

### O `Authorization`

O exemplo também traz o `Authorization`, com um token que diz quem está pedindo. É o crachá da [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|aula 1.5]], e o módulo 5 volta a ele com calma.

Repare que o token do curso, `eyJhbGciOiJIUzI1NiJ9...`, é bem diferente do `8f3a2c` da aula 1.5. O `...` quer dizer que ele foi cortado: os de verdade têm centenas de letras. Esse é um tipo de token que carrega informação dentro dele, escrita num código de letras e números. O pedaço mostrado, decodificado, é `{"alg":"HS256"}`, um pedacinho de JSON. A aula 5.4 abre esse tipo de token.

## Simples, mas rígido

O formato é texto, e dá para ler a olho. Mas os programas só se entendem porque os dois lados seguem as regras **ao pé da letra**. Um deslize, e o servidor não entende o pedido. Quase sempre ele responde **400**, "requisição mal formada"; às vezes, ele fica esperando o resto.

| Deslize | O que acontece |
|---|---|
| esquecer o `Host` | 400: no HTTP/1.1, o `Host` é obrigatório |
| escrever `get` em vez de `GET` | 400: o método diferencia maiúsculas de minúsculas, ao contrário do nome dos cabeçalhos |
| esquecer o `:` num cabeçalho, como `Host api.loja.com` | 400: o parser não acha onde termina o nome |
| terminar as linhas só com `\n`, sem o `\r` | depende do servidor. Alguns aceitam; o do Node e o do `example.com` respondem 400 |
| esquecer a linha em branco | o servidor não sabe que os cabeçalhos acabaram. Alguns respondem 400; o do Node fica esperando mais cabeçalhos |
| `Content-Length` errado | o servidor corta o corpo no lugar errado, ou fica esperando bytes que não vêm |

Você não vai escrever requisições à mão no trabalho: o navegador, o curl e as bibliotecas montam o texto por você. Saber o formato serve para ler o que está acontecendo, no DevTools ou num log, e para entender um 400 que aparece "do nada".

## Veja com os próprios olhos

### O texto cru que chega ao servidor

O `servidor.js` da aula 1.3 e o `pedidos.js` da aula 1.5 usavam o `node:http`, que faz o parse sozinho: o seu código já recebia `requisicao.method`, `requisicao.url` e `requisicao.headers` separados. Agora você vai usar o `node:net`, que fica um andar abaixo: entrega o texto que chegou pela conexão TCP, do jeito que chegou, **antes** do parse. Crie um arquivo `cru.js`:

```js
const net = require("node:net");

const servidor = net.createServer((conexao) => {
  conexao.on("data", (pedaco) => {
    const texto = pedaco.toString();
    console.log("----- chegou isto -----");
    console.log(texto);
    console.log("----- o mesmo texto, com as quebras visíveis -----");
    console.log(JSON.stringify(texto));
    conexao.end("HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: 9\r\n\r\nRecebido\n");
  });
});

servidor.listen(3000, () => {
  console.log("Escutando na porta 3000");
});
```

O que é novo:

- **`net.createServer((conexao) => ...)`**: a função roda a cada conexão nova, e não a cada requisição. A `conexao` é o "cano" por onde os bytes passam.
- **`conexao.on("data", ...)`**: o mesmo `.on` da aula 1.5, "quando chegar um pedaço, chame esta função".
- **`pedaco.toString()`**: o que chega pela conexão são bytes. O `toString()` transforma os bytes em texto.
- **`JSON.stringify(texto)`**: um truque. Transformar um texto em JSON põe aspas em volta e escreve os caracteres invisíveis como `\r` e `\n`. Assim você vê os CRLF.
- **`conexao.end(...)`**: manda a resposta e fecha a conexão. Sem o `node:http`, até a resposta é escrita à mão, com os `\r\n`, a linha em branco e o `Content-Length`. `Recebido\n` tem 9 bytes: as 8 letras e a quebra de linha.

Se o `pedidos.js` ainda estiver rodando, pare com **Ctrl+C**, porque os dois usam a porta 3000. Rode `node cru.js`.

**Um `GET`.** Em outro terminal:

```powershell
curl.exe http://localhost:3000/produtos/42
```

O terminal do servidor mostra:

```
----- chegou isto -----
GET /produtos/42 HTTP/1.1
Host: localhost:3000
User-Agent: curl/8.9.0
Accept: */*


----- o mesmo texto, com as quebras visíveis -----
"GET /produtos/42 HTTP/1.1\r\nHost: localhost:3000\r\nUser-Agent: curl/8.9.0\r\nAccept: */*\r\n\r\n"
```

Esse é o pedido inteiro, letra por letra. A linha de requisição, três cabeçalhos que o curl pôs sozinho, e o `\r\n\r\n` no fim: a linha em branco. Não tem corpo, então o texto acaba ali. O número da versão do curl pode ser outro no seu computador.

**Um `POST`, com corpo.** Use o `pedido.json` da aula 1.5, com `{"produtoId": 42, "quantidade": 2}`. Na mesma pasta:

```powershell
curl.exe http://localhost:3000/carrinho -H "Content-Type: application/json" -d "@pedido.json"
```

```
"POST /carrinho HTTP/1.1\r\nHost: localhost:3000\r\nUser-Agent: curl/8.9.0\r\nAccept: */*\r\nContent-Type: application/json\r\nContent-Length: 34\r\n\r\n{\"produtoId\": 42, \"quantidade\": 2}"
```

As três partes, com as marcas visíveis: a linha de requisição, os cabeçalhos, o `\r\n\r\n` e o corpo. O `Content-Length: 34` foi o curl que calculou. As barras antes das aspas do corpo, `\"`, são só o jeito do `JSON.stringify` mostrar uma aspa dentro de um texto; elas não fazem parte do pedido.

**Do navegador.** Abra `http://localhost:3000/produtos/42` no Chrome. A página mostra `Recebido`, e o terminal mostra o pedido do Chrome, bem mais comprido. Procure:

- `Connection: keep-alive`;
- o `User-Agent` que começa com `Mozilla/5.0 (Windows NT 10.0; Win64; x64)`;
- o `Accept`, com uma lista de formatos: `text/html`, imagens e outros;
- o `Accept-Language`, com `pt-BR`.

Pode aparecer um segundo pedido, `GET /favicon.ico`: é o navegador procurando o ícone da aba, sozinho.

> [!note] Por que o DevTools às vezes mostra outro formato
> Aqui o Chrome mandou o texto do HTTP/1.1, porque `localhost:3000` é HTTP sem o S. Em sites com HTTPS, como este, o Chrome costuma usar o HTTP/2, e a aba Network mostra os cabeçalhos como `:method: GET`, `:path: ...` e `:authority: ...`, como a [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|aula 1.1]] mostrou. São as mesmas informações: o `:method` e o `:path` fazem o papel da linha de requisição, e o `:authority`, o do `Host`. Só a embalagem muda. É a aula 2.4.

Pare o servidor com **Ctrl+C**.

### Escreva uma requisição à mão

Agora o contrário: em vez de o curl montar o texto, você monta, e manda para um servidor de verdade, o do `example.com`. Crie `amao.js`:

```js
const net = require("node:net");

const pedido =
  "GET / HTTP/1.1\r\n" +
  "Host: example.com\r\n" +
  "Connection: close\r\n" +
  "\r\n";

const conexao = net.connect(80, "example.com", () => {
  console.log("Conectado. Mandando:");
  console.log(JSON.stringify(pedido));
  conexao.write(pedido);
});

conexao.on("data", (pedaco) => {
  console.log(pedaco.toString());
});
```

- **`pedido`** é a requisição inteira, num texto só. Cada linha termina com `\r\n`, e o último `"\r\n"`, sozinho, é a linha em branco. O `+` só junta os pedaços do texto; estão em linhas separadas para ficar fácil de ler.
- **`Connection: close`** pede ao servidor que feche a conexão depois de responder. Assim, o programa termina sozinho.
- **`net.connect(80, "example.com", ...)`** abre uma conexão TCP com o `example.com`, na porta **80**. É a porta do HTTP sem o S, da [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]]. Na 443 teria o TLS, e o texto iria embaralhado. O Node faz o DNS sozinho.
- **`conexao.write(pedido)`** manda o texto pela conexão.

Rode `node amao.js`:

```
Conectado. Mandando:
"GET / HTTP/1.1\r\nHost: example.com\r\nConnection: close\r\n\r\n"
HTTP/1.1 200 OK
Date: ...
Content-Type: text/html; charset=utf-8
...
Connection: close
Server: cloudflare
...

<!doctype html><html lang=en><head>...<title>Example Domain</title>...
```

**200 OK**, e a página do `example.com`, em texto. Você conversou em HTTP com um servidor de verdade, escrevendo cada letra. Isso é tudo o que o navegador faz para pedir uma página: mandar esse texto. O resto é desenhar o que volta.

> [!info]- Os números soltos no meio da resposta (clique para abrir)
> A resposta do `example.com` não traz `Content-Length`, e sim `Transfer-Encoding: chunked`, "mando em blocos". Nesse jeito, cada bloco do corpo vem com o tamanho dele antes, em base 16, e por isso aparece um número solto, como `241`, antes do HTML, e um `0` no fim, que quer dizer "acabou". É a outra forma de dizer onde o corpo termina, usada quando o servidor não sabe o tamanho total antes de começar a mandar.

**Agora quebre de propósito.** Mude uma coisa por vez, salve e rode de novo:

| Mudança no `pedido` | O que volta |
|---|---|
| apague a linha do `Host` | `HTTP/1.1 400 Bad Request` |
| troque `GET` por `get` | `400 Bad Request` |
| apague o último `"\r\n"`, e ponha `;` no fim da linha do `Connection` | `400 Bad Request`: os cabeçalhos não terminaram |

O `400` chega na hora: o servidor nem tenta adivinhar o que você quis dizer. É o "simples, mas rígido" na prática. Desfaça as mudanças e confira que volta o `200`.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. As três partes
> Nesta requisição, qual é a linha de requisição, quais são os cabeçalhos e qual é o corpo? Onde está a linha em branco?
>
> ```http
> PUT /clientes/7 HTTP/1.1
> Host: api.loja.com
> Content-Type: application/json
> Content-Length: 15
>
> {"nome": "Ana"}
> ```
>
> > [!success]- Resposta
> > - Linha de requisição: `PUT /clientes/7 HTTP/1.1`. O método é `PUT`, o caminho é `/clientes/7` e a versão é `HTTP/1.1`.
> > - Cabeçalhos: `Host`, `Content-Type` e `Content-Length`.
> > - A linha em branco vem logo depois do `Content-Length`.
> > - Corpo: `{"nome": "Ana"}`, com 15 bytes, como diz o `Content-Length`.

> [!question] 2. Monte a primeira linha e o Host
> O navegador vai pedir `https://api.loja.com/produtos?cor=preto#fotos`. Escreva a linha de requisição e o cabeçalho `Host`.
>
> > [!success]- Resposta
> > ```http
> > GET /produtos?cor=preto HTTP/1.1
> > Host: api.loja.com
> > ```
> >
> > O caminho e a query string vão na primeira linha. O domínio vai no `Host`. O `https` não aparece em lugar nenhum: ele decide a porta, 443, e o TLS, antes de o texto ser mandado. O `#fotos` fica no navegador.

> [!question] 3. Quantos bytes?
> Qual é o `Content-Length` de cada corpo?
>
> - a) `{"nome": "Ana"}`
> - b) `{"nome": "João"}`
>
> > [!success]- Resposta
> > - a) 15: são 15 caracteres, todos de 1 byte.
> > - b) 17: são 16 caracteres, mas o `ã` ocupa 2 bytes no UTF-8.

> [!question] 4. O domínio sumiu
> Por que o domínio não vai na linha de requisição, junto do caminho? O que acontece se o `Host` faltar?
>
> > [!success]- Resposta
> > Porque, quando o pedido chega, o DNS já levou até o IP certo, e no mesmo IP podem estar muitos sites. O `Host` diz qual deles você quer. No HTTP/1.1 ele é obrigatório, e sem ele o servidor responde 400.

> [!question] 5. Onde está o erro?
> Alguém montou este texto e o servidor não respondeu. O que falta?
>
> ```js
> const pedido =
>   "POST /carrinho HTTP/1.1\r\n" +
>   "Host: api.loja.com\r\n" +
>   "Content-Type: application/json\r\n" +
>   "Content-Length: 34\r\n" +
>   '{"produtoId": 42, "quantidade": 2}';
> ```
>
> > [!success]- Resposta
> > Falta a linha em branco: um `"\r\n"` sozinho entre o `Content-Length` e o corpo. Sem ela, o servidor lê `{"produtoId": 42, "quantidade": 2}` como se fosse mais um cabeçalho, sem `:`, e responde 400, ou fica esperando os cabeçalhos acabarem.

> [!question] 6. Um GET com Content-Type?
> Um `GET /produtos/42` precisa de `Content-Type` e `Content-Length`? Por quê?
>
> > [!success]- Resposta
> > Não. Esses dois descrevem o corpo, e um `GET` normalmente não tem corpo. Não há o que descrever. Para dizer em que formato quer a **resposta**, o cliente usa outro cabeçalho, o `Accept`.

> [!question] 7. Conexão aberta, corpo no fim
> Com `Connection: keep-alive`, a conexão continua aberta depois do pedido. Como, então, o servidor sabe onde termina o corpo de um `POST`?
>
> > [!success]- Resposta
> > Pelo `Content-Length`. O servidor conta os bytes depois da linha em branco, e quando chega ao número do cabeçalho, o corpo acabou. Se ele esperasse a conexão fechar, esperaria para sempre, porque o `keep-alive` a mantém aberta para o próximo pedido.

> [!question] 8. Do HTTP/2 para o texto
> A aba Network do Chrome mostrou estes cabeçalhos de uma requisição em HTTP/2:
>
> ```
> :method: GET
> :authority: api.loja.com
> :path: /pedidos?pagina=2
> accept: application/json
> ```
>
> Escreva a mesma requisição no formato de texto do HTTP/1.1.
>
> > [!success]- Resposta
> > ```http
> > GET /pedidos?pagina=2 HTTP/1.1
> > Host: api.loja.com
> > Accept: application/json
> > ```
> >
> > O `:method` e o `:path` voltam para a linha de requisição, com a versão no fim. O `:authority` vira o `Host`. O resto continua igual, como cabeçalho.

> [!question] 9. Metadado ou dado?
> Num `POST /pedidos` com `Content-Type: application/json` e o corpo `{"produtoId": 42, "quantidade": 2}`, o que é dado e o que é metadado?
>
> > [!success]- Resposta
> > O dado é o corpo: o produto e a quantidade, que é o que o cliente quer mandar. O `Content-Type` é metadado: não é o pedido, é uma informação sobre o corpo, dizendo que ele está em JSON. Os outros cabeçalhos também são metadados: falam do pedido sem ser o pedido.

## De onde vêm as palavras

- **[[glossario/cabecalho|Cabeçalho]]**: de **cabeça** com o sufixo *-alho*. Cabeça vem do latim vulgar *capitia*, de *capitium*, de *caput*, "cabeça". É o que vem no alto, antes do conteúdo, como o cabeçalho de uma prova. Em inglês, *header*, de *head*, "cabeça", com o sufixo *-er*.
- **[[glossario/corpo|Corpo]]**: do latim *corpus*, "corpo". É a parte principal, a substância da mensagem, abaixo da cabeça, como o corpo de uma carta. Em inglês, *body*.
- **[[glossario/metadados|Metadados]]**: junta o prefixo **meta-**, do grego *metá*, e **dados**, plural de **dado**, do latim *datum*, "o que é dado". Na informática, *meta-* ganhou o sentido de "sobre si mesmo, um nível acima": metadados são dados sobre dados.
- **[[glossario/recurso|Recurso]]**: em português, do latim *recursus*, "volta, retorno", de *recurrere*, "correr de volta". O sentido de "coisa disponível, meio" veio do francês *ressource*, que deu o inglês *resource*, de *resurgere*, "erguer-se de novo": aquilo a que se recorre.
- **[[glossario/crlf|CRLF]]**: as iniciais de *carriage return*, "retorno do carro", e *line feed*, "avanço de linha", os dois movimentos da máquina de escrever no fim de cada linha.
- ***Keep-alive***: do inglês *keep*, "manter", e *alive*, "vivo": "mantenha viva" a conexão.

> [!tip] Para guardar
> - Uma requisição HTTP é um texto em formato fixo: **linha de requisição**, **cabeçalhos**, uma **linha em branco** e, se houver, o **corpo**.
> - A linha de requisição tem **método**, **caminho** e **versão**, separados por espaço: `GET /produtos/42 HTTP/1.1`. O caminho aponta o **recurso**, e leva a query string junto.
> - O domínio não vai na primeira linha: vai no **`Host`**, obrigatório no HTTP/1.1, porque muitos sites dividem um IP.
> - Cabeçalhos são **metadados**: `Nome: valor`, informações sobre o pedido, e não o pedido.
> - Cada linha termina com **CRLF**, `\r\n`. A linha em branco é um `\r\n\r\n`, e diz "os cabeçalhos acabaram".
> - Quando há corpo, o **`Content-Type`** diz o formato, e o **`Content-Length`**, o tamanho em **bytes**. Com a conexão aberta pelo `keep-alive`, é o `Content-Length` que diz onde o corpo acaba.
> - O formato é **rígido**: sem `Host`, com `get` minúsculo, sem `:` ou sem a linha em branco, o servidor responde 400 ou fica esperando.
> - No HTTP/2, o DevTools mostra `:method`, `:path` e `:authority`: as mesmas informações, em outra embalagem.

Fontes: MDN: [HTTP messages](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Messages), [Host](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Host), [User-Agent](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/User-Agent), [Accept](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Accept), [Connection](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Connection), [Content-Type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Type), [Content-Length](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Length), [Transfer-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Transfer-Encoding), [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Authorization) · IETF: [RFC 9112, HTTP/1.1](https://www.rfc-editor.org/rfc/rfc9112) · Node.js: [net](https://nodejs.org/api/net.html) · Wikipedia: [User-Agent header](https://en.wikipedia.org/wiki/User-Agent_header) · Wiktionary: [cabeçalho](https://en.wiktionary.org/wiki/cabe%C3%A7alho), [cabeça](https://en.wiktionary.org/wiki/cabe%C3%A7a), [header](https://en.wiktionary.org/wiki/header), [corpo](https://en.wiktionary.org/wiki/corpo), [metadata](https://en.wiktionary.org/wiki/metadata), [meta-](https://en.wiktionary.org/wiki/meta-), [datum](https://en.wiktionary.org/wiki/datum), [recurso](https://en.wiktionary.org/wiki/recurso), [resource](https://en.wiktionary.org/wiki/resource), [carriage return](https://en.wiktionary.org/wiki/carriage_return), [line feed](https://en.wiktionary.org/wiki/line_feed)
