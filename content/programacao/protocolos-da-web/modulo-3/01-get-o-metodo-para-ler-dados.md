---
title: "3.1 GET: o método para ler dados"
tags:
  - protocolos-da-web
  - http
---

Primeira aula do módulo 3. Na [[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|aula 2.1]], a linha de requisição `GET /produtos/42 HTTP/1.1` foi dividida em três partes: o método, o caminho e a versão. O caminho apontava o recurso, e a versão foi o assunto da aula 2.4. Faltava o método, a primeira palavra da linha. Este módulo é todo sobre ele, e começa pelo mais usado: o `GET`.

## O método: a ação do pedido

> [!abstract] Definição
> **O [[glossario/metodo-http|método]] é a palavra no começo da requisição que diz qual ação o cliente quer fazer com o recurso.** Em `GET /produtos/42`, o método `GET` diz "me mande", e o caminho `/produtos/42` diz o quê.

O curso também chama o método de **verbo**. São dois nomes para a mesma coisa: a palavra `GET`, e não a linha inteira. O apelido vem da gramática. Leia o pedido como uma frase: "**buscar** o produto 42". O verbo da frase é a ação (`GET`), e o resto é a coisa sobre a qual ela age (`/produtos/42`). O nome oficial, na especificação do HTTP, é *method*.

> [!warning] Não é o método do JavaScript
> No curso de lógica, [[glossario/metodo|método]] era outra coisa: uma função que vem dentro de um valor, como `compras.push("café")`. O método HTTP só divide o nome com ele. É uma palavra escrita no texto da requisição, sempre em maiúsculas: `get`, em minúsculas, recebe 400, como a aula 2.1 mostrou.

Existem poucos métodos, e cada um tem um significado combinado. O módulo 3 passa por todos:

| Método | O que o cliente pede | Aula |
|---|---|---|
| `GET` | ler um recurso | 3.1, esta |
| `POST` | criar um recurso | 3.2 |
| `PUT` e `PATCH` | trocar um recurso inteiro, ou só uma parte | 3.3 |
| `DELETE` | apagar um recurso | 3.4 |
| `HEAD` e `OPTIONS` | só os cabeçalhos da resposta, ou quais métodos o servidor aceita | 3.4 |

### Por que escolher o método certo importa

O método não é só uma formalidade, porque outros programas tomam decisões olhando para ele, sem ler o resto do pedido:

- **O navegador** decide se pode repetir um pedido sozinho. Recarregue uma página que veio de um `GET`, e ele repete sem perguntar. Recarregue uma página que veio de um formulário enviado com `POST`, e ele pergunta antes se você quer mandar os dados de novo.
- **Um [[glossario/cache|cache]]** decide se pode guardar a resposta. "Cachear" uma resposta é guardar uma cópia dela no cache para usar de novo. Resposta de `GET` pode ser cacheada; de `POST`, normalmente não.
- **Um [[glossario/proxy|proxy]]**, o programa que fica no meio do caminho entre o cliente e o servidor, faz as mesmas contas. Explicado mais abaixo.
- **As ferramentas de monitoramento**, os programas que contam os pedidos que um back-end recebe, quanto tempo cada um leva e quantos deram erro, separam as contas por método e caminho. Um `GET /produtos` lento e um `POST /pedidos` lento são problemas diferentes.

Se o método estiver errado, essas decisões saem erradas. Um pedido que muda dados, mandado como `GET`, pode ser cacheado e nem chegar ao servidor, ou pode ser repetido sem ninguém querer.

## Para que serve o GET

> [!abstract] Definição
> **O `GET` pede ao servidor uma cópia de um recurso, para ler. Ele promete não mudar nada no servidor e não leva corpo: tudo o que o servidor precisa saber vai na URL e nos cabeçalhos.**

É o método que o navegador usa quando você digita uma URL, clica num link ou abre uma página com imagens: cada imagem, cada arquivo de estilo, cada script é um `GET`.

> [!example] Veja os GETs no DevTools
> Abra qualquer site no Chrome, aperte **F12** e vá na aba **Network**. Recarregue a página. Cada linha da lista é uma requisição. As colunas, da esquerda para a direita, são: **Name** (o fim da URL), **Status**, **Type**, **Initiator** (quem pediu), **Size** e **Time**.
>
> A coluna do método não vem ligada. Clique com o botão direito em qualquer título de coluna e marque **Method**. Ela aparece, e quase todas as linhas dizem `GET`.
>
> Clique numa linha. Na aba **Headers**, que abre à direita, o primeiro bloco, **General**, mostra a **Request URL**, a **Request Method** (o método) e o **Status Code**. Depois vêm os **Response Headers** (os cabeçalhos da resposta) e, por último, os **Request Headers** (os do pedido).

### As duas regras do GET

1. **O `GET` não muda dados no servidor.** Ele só lê. Ler o produto 42 cem vezes deixa o produto 42 igual.
2. **O `GET` não tem corpo.** Toda a informação vai na URL, no [[glossario/caminho|caminho]] e na [[glossario/query-string|query string]], ou nos [[glossario/cabecalho|cabeçalhos]].

Da regra 2 sai uma consequência que a aula 2.1 já mostrou num exercício: um `GET` não precisa de `Content-Type` nem de `Content-Length`. Esses dois cabeçalhos descrevem o corpo, o formato e o tamanho dele, e sem corpo não há o que descrever. Se você precisa mandar um dado junto de um `GET`, como um filtro, ele vai na URL.

> [!info]- Mas um GET pode ter corpo? (clique para abrir)
> O formato do HTTP não impede escrever um corpo depois de um `GET`. Só que a especificação diz que esse corpo **não tem significado combinado**: o servidor não é obrigado a ler, e alguns servidores e proxies recusam o pedido ou fecham a conexão. Na prática, ninguém conta com isso. Se o pedido precisa de um corpo, provavelmente não é um `GET`.
>
> O curl deixa isso visível: quando você põe um corpo com `-d`, ele troca o método para `POST` sozinho, como a seção "Veja com os próprios olhos" mostra.

### Um GET completo, linha por linha

O exemplo do curso, pedindo produtos eletrônicos até 500 reais:

```http
GET /api/produtos?categoria=eletronicos&preco_max=500 HTTP/1.1
Host: loja.exemplo.com
Accept: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

| Linha | O que diz |
|---|---|
| `GET /api/produtos?categoria=eletronicos&preco_max=500 HTTP/1.1` | ler a lista de produtos, só os da categoria `eletronicos` com preço até 500. O `/api` no começo do caminho é um costume: separa os endereços que devolvem dados dos que devolvem páginas |
| `Host: loja.exemplo.com` | para qual site é o pedido, como na aula 2.1 |
| `Accept: application/json` | em que formato o cliente quer a **resposta**: JSON. Não descreve corpo nenhum, por isso cabe num `GET` |
| `Authorization: Bearer eyJ...` | quem está pedindo, com um token |

Não há linha em branco seguida de corpo: o pedido acaba nos cabeçalhos. O `Authorization` merece uma palavra: *bearer* é "portador" em inglês, e `Bearer` quer dizer "o portador deste token tem acesso". É o crachá da aula 1.5, e o `eyJ...` é o começo de um [[glossario/jwt|JWT]], como na aula 2.3. A aula 5.4 abre esse cabeçalho.

A resposta:

```http
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=60

[
  { "id": 42, "nome": "Fone bluetooth", "preco": 129.90 },
  { "id": 58, "nome": "Mouse sem fio", "preco": 79.90 }
]
```

A resposta tem corpo, e por isso tem `Content-Type`: quem não tem corpo é o **pedido** `GET`. O `Cache-Control: max-age=60` diz "pode guardar esta resposta por 60 segundos". É uma permissão que só faz sentido porque o `GET` não muda nada: durante um minuto, quem pedir a mesma lista pode receber a cópia guardada. A aula 5.3 trata do cache.

## Os dados de um GET: caminho ou query string

Sem corpo, os dados de um `GET` vão na URL, de dois jeitos:

- **Parâmetro de caminho**, ou *path param*: um pedaço do caminho que diz **qual** recurso você quer. Em `/produtos/42`, o `42` é o [[glossario/parametro-de-caminho|parâmetro de caminho]]: aponta o produto de id 42.
- **Parâmetro de query**: um par `nome=valor` da [[glossario/query-string|query string]], depois do `?`, que diz **como** buscar: filtrar, ordenar, escolher a página. Em `/produtos?categoria=eletronicos&pagina=2`, há dois.

> [!abstract] A regra prática
> **Se o dado diz qual recurso você quer, vai no caminho. Se o dado ajusta como a busca é feita, vai na query string.**

### Query string e parâmetro de query: o todo e as partes

A aula usa os dois nomes, e eles não são a mesma coisa. A **query string** é o texto inteiro depois do `?`. Cada par `nome=valor` dentro dela é um **parâmetro de query**. O `&` separa os pares.

| URL | Caminho | Parâmetro de caminho | Query string | Parâmetros de query |
|---|---|---|---|---|
| `/produtos/42` | `/produtos/42` | `42` | nenhuma | nenhum |
| `/produtos?categoria=eletronicos&pagina=2` | `/produtos` | nenhum | `categoria=eletronicos&pagina=2` | `categoria=eletronicos` e `pagina=2` |
| `/clientes/7/pedidos?status=pago` | `/clientes/7/pedidos` | `7` | `status=pago` | `status=pago` |

Um contraexemplo: `categoria=eletronicos` sozinho não é "a query string" da segunda linha. É um dos parâmetros. A query string é `categoria=eletronicos&pagina=2`, com os dois.

E esse "parâmetro" não é o [[glossario/parametro|parâmetro]] de uma função, do curso de lógica, embora a ideia seja parecida. O parâmetro da função fica entre os parênteses e recebe um valor a cada chamada. O parâmetro de caminho fica na URL e recebe um valor a cada pedido: `/produtos/42`, `/produtos/58`, `/produtos/71` são o mesmo endpoint com valores diferentes.

> [!example] Na biblioteca
> No balcão de uma biblioteca, dá para pedir de dois jeitos. "O livro de código 42" aponta **um** livro: é o parâmetro de caminho. "Os livros de ficção, do mais novo para o mais velho, a segunda página da lista" não aponta livro nenhum: diz como montar uma lista. São os parâmetros de query.
>
> A analogia para aqui: o bibliotecário entende qualquer pedido. O servidor só entende os parâmetros para os quais foi programado. Os outros ele ignora, sem dar erro. Na seção "Veja com os próprios olhos", o servidor recebe `ordenar=preco` e simplesmente não ordena, porque ninguém escreveu esse código.

Os três `curl` do curso, um de cada tipo:

```powershell
# Um produto: parâmetro de caminho
curl.exe https://loja.exemplo.com/api/produtos/42

# Uma lista filtrada e ordenada: parâmetros de query
curl.exe "https://loja.exemplo.com/api/produtos?categoria=eletronicos&ordenar=preco"

# Um GET com um cabeçalho a mais
curl.exe -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." https://loja.exemplo.com/api/perfil
```

O `loja.exemplo.com` é um endereço de mentira, então esses três não respondem. Na seção "Veja com os próprios olhos", você roda os mesmos pedidos contra um servidor seu. Duas coisas para reparar:

- **O `-H`** acrescenta um cabeçalho ao pedido, escrito como na mensagem: `"Nome: valor"`. O método continua `GET`: cabeçalho não é corpo.
- **As aspas na URL do meio** não são enfeite. No PowerShell, o `&` é um caractere especial. Sem as aspas, o comando nem roda, e aparece: `The ampersand (&) character is not allowed.` Com aspas, o `&` vai para o curl como parte da URL. A URL do primeiro comando não tem `&` e funciona sem aspas, mas pôr aspas sempre é o hábito mais seguro.

## Por que o GET não pode mudar dados

A promessa de não mudar nada tem nome: o `GET` é um [[glossario/metodo-seguro|método seguro]]. "Seguro", aqui, não tem a ver com ataques nem com HTTPS. Quer dizer só "só lê". A aula 3.5 define o termo com precisão.

O resto da web conta com essa promessa, e vários programas mandam `GET` **sem nenhuma pessoa por trás**:

- **O pré-carregamento.** O navegador pode buscar a página de um link **antes** do clique, para ela abrir na hora se o clique vier. Isso se chama [[glossario/prefetch|prefetch]]. A própria página pode pedir, com `<link rel="prefetch" href="...">` no HTML, e o navegador também pode decidir sozinho.
- **Os crawlers.** Um [[glossario/crawler|crawler]] é um programa que visita páginas sozinho: baixa uma, acha os links dela e segue cada um. O do Google, o Googlebot, faz isso com a web inteira para montar a busca. Cada link seguido é um `GET`.
- **Os proxies com cache.** Um proxy fica entre o cliente e o servidor e repassa os pedidos. Se tiver um cache, ele pode guardar a resposta de um `GET` e entregar a mesma cópia várias vezes, sem perguntar ao servidor de novo.

Nenhum desses programas sabe o que um link faz. Eles confiam no método.

### O link que apaga

Imagine uma API que apaga um usuário com `GET /usuarios/42/deletar`, e uma página de administração com esse link num botão "Apagar". Agora siga o que acontece:

1. Um crawler visita a página de administração, que ficou aberta sem login.
2. Ele encontra o link `/usuarios/42/deletar` e o segue, como segue todos.
3. O servidor recebe um `GET /usuarios/42/deletar`. Para ele, esse pedido é igual ao de uma pessoa que clicou.
4. O usuário 42 é apagado. Ninguém decidiu isso.

O mesmo vale para o pré-carregamento: basta o navegador decidir buscar o link antes do clique. Isso já aconteceu de verdade. Em 2005, o Google lançou o *Google Web Accelerator*, um programa que pré-carregava os links das páginas para a navegação ficar mais rápida. Em aplicações que apagavam coisas por link, ele apagou dados sem ninguém clicar.

O jeito certo é usar o método que diz o que o pedido faz: `DELETE /usuarios/42`, da aula 3.4. Navegadores, crawlers e proxies não mandam `DELETE` sozinhos.

### De quem é a responsabilidade

A especificação do HTTP é explícita: cumprir a promessa do `GET` é responsabilidade de **quem escreve o back-end**. Se uma ação que muda dados pode ser disparada por um `GET`, o dono do servidor tem que tirá-la dali.

Não é responsabilidade de quem **consome** a API. [[glossario/api|Consumir uma API]] é usar a API de outro programa: mandar os pedidos e usar as respostas. O crawler que seguiu o link consumiu a API do jeito que ela se anunciou, e não fez nada de errado.

> [!info] E o log, não é uma mudança?
> O servidor quase sempre anota cada pedido num [[glossario/log|log]], e muitos sites contam as visitas de cada página. Isso muda alguma coisa no servidor. Mesmo assim, o `GET` continua seguro. A especificação explica: o cliente **não pediu** essa anotação e não responde por ela.
>
> O nome do que o `GET` não pode ter é **[[glossario/efeito-colateral|efeito colateral]]**: uma mudança que a ação deixa além do resultado que devolve. Gravar um pedido novo, baixar um estoque, apagar um usuário são efeitos colaterais que o cliente **pede**. Esses o `GET` não pode ter. A linha de log é um efeito que o servidor faz por conta dele.

## Veja com os próprios olhos

Você vai escrever um servidor que só atende `GET`, com os dois tipos de parâmetro. Crie `catalogo.js`:

```js
const http = require("node:http");

// O "banco de dados" na memória. Os preços estão em centavos, como na aula 1.5.
const produtos = [
  { id: 42, nome: "Fone bluetooth", categoria: "eletronicos", preco: 12990 },
  { id: 58, nome: "Mouse sem fio", categoria: "eletronicos", preco: 7990 },
  { id: 71, nome: "Caneca", categoria: "cozinha", preco: 3500 },
];

function responder(resposta, status, dados) {
  resposta.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  resposta.end(JSON.stringify(dados));
}

const servidor = http.createServer((requisicao, resposta) => {
  console.log(requisicao.method, requisicao.url);

  if (requisicao.method !== "GET") {
    return responder(resposta, 405, { erro: "Este servidor só atende GET" });
  }

  const url = new URL(requisicao.url, "http://localhost:3000");
  const partes = url.pathname.split("/");

  // GET /produtos/42: o parâmetro de caminho diz QUAL produto
  if (partes.length === 3 && partes[1] === "produtos") {
    const id = Number(partes[2]);
    for (const produto of produtos) {
      if (produto.id === id) {
        return responder(resposta, 200, produto);
      }
    }
    return responder(resposta, 404, { erro: "Esse produto não existe" });
  }

  // GET /produtos?categoria=cozinha: a query string diz COMO filtrar a lista
  if (url.pathname === "/produtos") {
    const categoria = url.searchParams.get("categoria");
    const encontrados = [];
    for (const produto of produtos) {
      if (categoria === null || produto.categoria === categoria) {
        encontrados.push(produto);
      }
    }
    return responder(resposta, 200, encontrados);
  }

  responder(resposta, 404, { erro: "Não achei" });
});

servidor.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});
```

O `responder`, o `for...of` e o `return responder(...)` são os do `pedidos.js` da [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|aula 1.5]]. O que é novo:

**`if (requisicao.method !== "GET")`** é o servidor olhando o método antes de tudo. Se não for `GET`, responde **405**, *Method Not Allowed*, "método não permitido". Os status codes são o módulo 4.

**`new URL(requisicao.url, "http://localhost:3000")`**: a aula 1.2 usou o `new URL` para desmontar uma URL inteira. Só que o `requisicao.url` não é a URL inteira: é só o que veio na linha de requisição, o caminho com a query string, como `/produtos?categoria=cozinha`. O `new URL` não aceita um texto que começa com `/`, porque falta o esquema e o host. O segundo argumento é a **base**: a parte que falta, para completar. Com ela, o resultado é `http://localhost:3000/produtos?categoria=cozinha`, e daí saem o `pathname` e o `searchParams`, como na aula 1.2. A base só serve para completar o texto: nenhum pedido é feito a ela.

**`url.pathname.split("/")`**: o `split` corta um texto em pedaços, em cada lugar onde aparece o separador, e devolve um array com os pedaços. O separador some. Como o caminho começa com `/`, o primeiro pedaço é um texto vazio, `""`: é o que havia antes da primeira barra.

| `url.pathname` | `split("/")` devolve | `partes.length` |
|---|---|---|
| `"/produtos/42"` | `["", "produtos", "42"]` | 3 |
| `"/produtos"` | `["", "produtos"]` | 2 |
| `"/produtos/"` | `["", "produtos", ""]` | 3 |

**`partes.length === 3 && partes[1] === "produtos"`**: "o caminho tem a forma `/produtos/alguma-coisa`". O `partes[1]` é `"produtos"` e o `partes[2]` é o parâmetro de caminho.

**`Number(partes[2])`**: o parâmetro chega como texto, `"42"`, e os ids do array são números. A aula 1.2 já avisou: na URL, tudo é texto. Sem o `Number`, a comparação `produto.id === id` compararia o número `42` com o texto `"42"`, e daria `false`.

| `partes[2]` | `Number(partes[2])` | Acha algum produto? |
|---|---|---|
| `"42"` | `42` | sim, o fone |
| `"99"` | `99` | não: 404 |
| `""` (de `/produtos/`) | `0` | não: 404 |
| `"abc"` | `NaN`, "não é um número" | não: 404 |

**`url.searchParams.get("categoria")`** devolve o valor do parâmetro de query `categoria`, como texto. Se a URL não tem esse parâmetro, devolve **`null`**, o valor do JavaScript para "nada". Repare na diferença: um objeto devolve `undefined` para uma chave que não existe (aula 6.4); o `searchParams.get` devolve `null`. Os dois querem dizer "não tem", mas não são iguais, e o `if` precisa testar o certo.

**`categoria === null || produto.categoria === categoria`**: "entra na lista se não pediram categoria nenhuma, **ou** se a categoria do produto é a pedida". Sem o parâmetro, todos entram:

| Pedido | `categoria` | Quem entra em `encontrados` |
|---|---|---|
| `/produtos` | `null` | os três |
| `/produtos?categoria=cozinha` | `"cozinha"` | a caneca |
| `/produtos?categoria=eletronicos` | `"eletronicos"` | o fone e o mouse |
| `/produtos?categoria=livros` | `"livros"` | ninguém: volta `[]`, a lista vazia, com 200 |

Rode `node catalogo.js`. Em outro terminal:

```powershell
curl.exe http://localhost:3000/produtos/42
```

```
{"id":42,"nome":"Fone bluetooth","categoria":"eletronicos","preco":12990}
```

```powershell
curl.exe "http://localhost:3000/produtos?categoria=cozinha"
```

```
[{"id":71,"nome":"Caneca","categoria":"cozinha","preco":3500}]
```

```powershell
curl.exe "http://localhost:3000/produtos?categoria=eletronicos&ordenar=preco"
```

```
[{"id":42,"nome":"Fone bluetooth","categoria":"eletronicos","preco":12990},{"id":58,"nome":"Mouse sem fio","categoria":"eletronicos","preco":7990}]
```

O filtro funcionou, mas a lista **não** veio ordenada pelo preço: o fone, mais caro, vem antes. O servidor nunca lê o `ordenar`, então o parâmetro foi ignorado, sem erro. É o limite da analogia da biblioteca.

### O pedido por dentro

O `-v` do curl, da aula 1.2, mostra o pedido que ele manda. As linhas que começam com `>` são o pedido; as que começam com `<`, a resposta:

```powershell
curl.exe -sv -o NUL -H "Accept: application/json" "http://localhost:3000/produtos?categoria=cozinha"
```

```
> GET /produtos?categoria=cozinha HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.9.0
> Accept: application/json
>
< HTTP/1.1 200 OK
< Content-Type: application/json; charset=utf-8
< Date: ...
< Connection: keep-alive
< Keep-Alive: timeout=5
< Transfer-Encoding: chunked
<
```

O pedido: método `GET`, a query string na primeira linha, e nenhum `Content-Type` ou `Content-Length`. A linha em branco fecha os cabeçalhos, e o pedido acaba ali. O `-H` trocou o `Accept: */*` que o curl manda sozinho pelo `application/json`. A resposta, que tem corpo, traz o `Content-Type`.

Agora ponha um corpo com `-d`:

```powershell
curl.exe -sv -o NUL -d "x=1" http://localhost:3000/produtos
```

```
> POST /produtos HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.9.0
> Accept: */*
> Content-Length: 3
> Content-Type: application/x-www-form-urlencoded
>
< HTTP/1.1 405 Method Not Allowed
```

Você não escreveu `POST` em lugar nenhum. O curl trocou o método sozinho, porque um corpo não combina com `GET`. Junto com o corpo vieram os dois cabeçalhos que o descrevem: o `Content-Length: 3` (os 3 bytes de `x=1`) e um `Content-Type`. E o servidor respondeu **405**, do `if` do método.

O terminal do servidor mostra cada pedido que chegou, com o método na frente:

```
GET /produtos/42
GET /produtos?categoria=cozinha
GET /produtos?categoria=eletronicos&ordenar=preco
GET /produtos?categoria=cozinha
POST /produtos
```

### No navegador

Com o servidor rodando, abra `http://localhost:3000/produtos?categoria=cozinha` no Chrome, com o DevTools aberto na aba **Network**, e recarregue a página. Clique na linha `produtos?categoria=cozinha`:

- Na aba **Headers**, o bloco **General** mostra `Request Method: GET`.
- Na aba **Payload**, ao lado, aparece o bloco **Query String Parameters**, com `categoria: cozinha`. O Chrome já separou os parâmetros de query para você. Um `GET` sem query string, como `/produtos/42`, não tem aba Payload: não há nada a mostrar.

Pare o servidor com **Ctrl+C**.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Qual é o método?
> Na linha de requisição abaixo, qual é o método? E o caminho?
>
> ```http
> GET /clientes/7/pedidos?status=pago HTTP/1.1
> ```
>
> > [!success]- Resposta
> > O método é `GET`, a primeira palavra. O caminho é `/clientes/7/pedidos`, e a query string `status=pago` vai junto dele, na mesma linha. A versão é `HTTP/1.1`. A linha inteira não é "o método": o método é só a ação.

> [!question] 2. Caminho ou query?
> Para cada dado, diga se ele vai no caminho ou na query string, numa API de uma loja:
>
> - a) o pedido de número 1530
> - b) mostrar só os pedidos de outubro
> - c) a segunda página da lista de produtos
> - d) o cliente de id 7
>
> > [!success]- Resposta
> > - a) Caminho: `/pedidos/1530`. Diz qual pedido.
> > - b) Query string: `/pedidos?mes=10`. Filtra a lista.
> > - c) Query string: `/produtos?pagina=2`. Diz como montar a lista, e não qual produto.
> > - d) Caminho: `/clientes/7`. Diz qual cliente.

> [!question] 3. O todo e as partes
> Na URL `/produtos?cor=preto&tamanho=42&pagina=3`, qual é a query string? Quantos parâmetros de query ela tem? Tem parâmetro de caminho?
>
> > [!success]- Resposta
> > A query string é `cor=preto&tamanho=42&pagina=3`, o texto inteiro depois do `?`. Ela tem três parâmetros de query: `cor=preto`, `tamanho=42` e `pagina=3`. Não há parâmetro de caminho: `/produtos` é fixo, e não aponta um produto específico.

> [!question] 4. Um GET com Content-Type
> Alguém mandou este pedido. O que está sobrando, e por quê?
>
> ```http
> GET /produtos/42 HTTP/1.1
> Host: api.loja.com
> Accept: application/json
> Content-Type: application/json
> ```
>
> > [!success]- Resposta
> > O `Content-Type`. Ele diz o formato do **corpo**, e um `GET` não tem corpo. O `Accept` pode ficar: ele diz o formato que o cliente quer na **resposta**, e não descreve nada do pedido.

> [!question] 5. O botão de esvaziar o carrinho
> Um site tem um link "Esvaziar carrinho" que manda `GET /carrinho/esvaziar`. O que pode dar errado? Qual método combina com essa ação?
>
> > [!success]- Resposta
> > O pedido muda dados, e o `GET` promete não mudar. Um pré-carregamento do navegador pode buscar o link antes do clique e esvaziar o carrinho de quem nem clicou. Um proxy com cache pode guardar a resposta e não repassar o pedido seguinte ao servidor, e aí o carrinho não esvazia quando a pessoa clica de verdade. A ação apaga os itens do carrinho, então combina com `DELETE`, da aula 3.4.

> [!question] 6. O curl no PowerShell
> Este comando, no PowerShell, nem chega a rodar. Por quê? Como consertar?
>
> ```powershell
> curl.exe http://localhost:3000/produtos?categoria=cozinha&pagina=2
> ```
>
> > [!success]- Resposta
> > O `&` é um caractere especial no PowerShell, e aparece o erro `The ampersand (&) character is not allowed.` Põe a URL entre aspas, para o `&` ir para o curl como parte da URL:
> >
> > ```powershell
> > curl.exe "http://localhost:3000/produtos?categoria=cozinha&pagina=2"
> > ```

> [!question] 7. O que volta?
> Com este trecho do `catalogo.js` e o array de produtos abaixo, o que o servidor devolve para `GET /produtos?categoria=cozinha&cor=azul`? E para `GET /produtos/abc`?
>
> ```js
> const produtos = [
>   { id: 42, nome: "Fone bluetooth", categoria: "eletronicos", preco: 12990 },
>   { id: 71, nome: "Caneca", categoria: "cozinha", preco: 3500 },
> ];
>
> // ...
> const categoria = url.searchParams.get("categoria");
> const encontrados = [];
> for (const produto of produtos) {
>   if (categoria === null || produto.categoria === categoria) {
>     encontrados.push(produto);
>   }
> }
> ```
>
> > [!success]- Resposta
> > Para `/produtos?categoria=cozinha&cor=azul`: só a caneca, com 200. O `categoria` vale `"cozinha"`, e o `cor` é ignorado, porque o código nunca o lê.
> >
> > Para `/produtos/abc`: 404, "Esse produto não existe". O `split` dá `["", "produtos", "abc"]`, o `Number("abc")` dá `NaN`, e nenhum id é igual a `NaN`.

> [!question] 8. Acrescente um filtro
> No `catalogo.js`, acrescente o parâmetro de query `preco_max`: `/produtos?preco_max=5000` deve devolver só os produtos com preço até 5000 centavos. Sem o parâmetro, a lista não muda.
>
> > [!success]- Resposta
> > ```js
> > const categoria = url.searchParams.get("categoria");
> > const precoMax = url.searchParams.get("preco_max");
> > const encontrados = [];
> > for (const produto of produtos) {
> >   const categoriaServe = categoria === null || produto.categoria === categoria;
> >   const precoServe = precoMax === null || produto.preco <= Number(precoMax);
> >   if (categoriaServe && precoServe) {
> >     encontrados.push(produto);
> >   }
> > }
> > ```
> >
> > O `preco_max` chega como texto, então precisa do `Number` antes de comparar. Cada filtro tem o seu "ou não pediram": se um parâmetro faltar, aquele teste deixa todo mundo passar. Com `/produtos?preco_max=5000`, só a caneca, de 3500, entra. Os dois filtros juntos também funcionam: `/produtos?categoria=eletronicos&preco_max=10000` devolve só o mouse, de 7990.

> [!question] 9. Quem é o responsável?
> Um crawler seguiu o link `GET /posts/10/apagar` de um blog e apagou um post. De quem é a culpa: do crawler ou de quem fez o blog?
>
> > [!success]- Resposta
> > De quem fez o blog. O crawler só mandou um `GET`, o método que promete não mudar nada, e confiou na promessa. A especificação do HTTP põe a responsabilidade no dono do servidor: uma ação que apaga não pode ser disparada por `GET`. O certo seria `DELETE /posts/10`.

## De onde vêm as palavras

- **[[glossario/metodo-http|Método]] e verbo**: *método* vem do grego *méthodos*, de *hodós*, "caminho": o caminho para fazer alguma coisa. *Verbo* vem do latim *verbum*, "palavra", da mesma raiz do inglês *word*.
- ***GET***: do inglês *get*, "obter, pegar".
- **[[glossario/proxy|Proxy]]**: do latim *prōcūrātiō*, "administração", pelo inglês médio *procuracie*. Em inglês, é o procurador, quem age em nome de outro. É parente da nossa **procuração**.
- **[[glossario/crawler|Crawler]]**: do inglês *crawl*, "rastejar", do nórdico antigo *krafla*. O programa que percorre a web devagar, link por link.
- **[[glossario/prefetch|Prefetch]]**: *pre-*, "antes", e *fetch*, "ir buscar", do inglês antigo *feċċan*. Buscar antes.
- **[[glossario/efeito-colateral|Efeito colateral]]**: *efeito*, do latim *effectus*, "resultado"; *colateral*, do latim *collaterālis*, de *con-*, "junto", e *latus*, "lado". O efeito que acontece ao lado do principal.
- **[[glossario/metodo-seguro|Seguro]]**: do latim *sēcūrus*, de *sē-*, "sem", e *cūra*, "preocupação". Sem preocupação: um pedido que se pode repetir sem medo.
- **[[glossario/parametro-de-caminho|Caminho]]**: do latim tardio *cammīnus*, "estrada", palavra que os romanos tiraram do gaulês.
- ***Bearer***: do inglês *bear*, "carregar", com *-er*: "o portador".

> [!tip] Para guardar
> - O **método**, ou **verbo**, é a primeira palavra da requisição: a **ação** que o cliente quer. Não é o método do JavaScript.
> - Navegadores, caches, proxies e ferramentas de monitoramento decidem coisas olhando o método. Método errado, decisão errada.
> - O **`GET`** pede uma cópia de um recurso, **para ler**. Duas regras: **não muda dados** e **não tem corpo**.
> - Sem corpo, um `GET` não precisa de `Content-Type` nem de `Content-Length`. O `Accept` cabe, porque fala da resposta.
> - Os dados de um `GET` vão na URL. **Qual** recurso: no **caminho** (`/produtos/42`). **Como** buscar: na **query string** (`?categoria=eletronicos&pagina=2`). A query string é o todo; cada `nome=valor` é um parâmetro.
> - Tudo na URL chega como texto: o back-end converte com `Number(...)`.
> - O `GET` é um **método seguro**: pré-carregamento, crawlers e proxies mandam `GET` sozinhos, confiando que nada muda. Uma ação que apaga ou grava num `GET` pode disparar sem ninguém clicar.
> - Garantir isso é trabalho de **quem escreve o back-end**, e não de quem consome a API.
> - No PowerShell, URL com `&` vai entre aspas.

Fontes: IETF: [RFC 9110, seção 9: Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9), [9.2.1: Safe Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9.2.1), [9.3.1: GET](https://www.rfc-editor.org/rfc/rfc9110#section-9.3.1) · MDN: [HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods), [GET](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/GET), [Safe](https://developer.mozilla.org/en-US/docs/Glossary/Safe/HTTP), [URL.searchParams](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams), [String.prototype.split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), [rel=prefetch](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/prefetch) · Wikipedia: [Google Web Accelerator](https://en.wikipedia.org/wiki/Google_Web_Accelerator) · Wiktionary: [method](https://en.wiktionary.org/wiki/method), [verbum](https://en.wiktionary.org/wiki/verbum), [proxy](https://en.wiktionary.org/wiki/proxy), [crawl](https://en.wiktionary.org/wiki/crawl), [fetch](https://en.wiktionary.org/wiki/fetch), [collateral](https://en.wiktionary.org/wiki/collateral), [securus](https://en.wiktionary.org/wiki/securus), [caminho](https://en.wiktionary.org/wiki/caminho)
