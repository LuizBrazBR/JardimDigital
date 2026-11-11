---
title: "1.3 O papel do navegador e do servidor"
tags:
  - protocolos-da-web
  - http
---

Terceira aula do módulo 1. A aula 1.1 mostrou os dois papéis da conversa, cliente e servidor. A 1.2 seguiu uma URL do Enter até a página. Esta aula olha cada lado por dentro e responde três perguntas: o que os dois fazem igual, o que só o navegador faz e o que só o servidor faz. No fim, você vai saber dizer de que lado fica cada tarefa, e por que um aplicativo de celular conversa com o servidor do mesmo jeito que o navegador.

## O que os dois fazem igual: falar HTTP

O HTTP não é do navegador nem do servidor. Ele é a regra da conversa entre os dois, como a aula 1.1 mostrou. Por isso, **os dois lados falam HTTP**, cada um numa ponta:

| | Navegador (cliente) | Servidor |
|---|---|---|
| escreve | a requisição | a resposta |
| lê | a resposta | a requisição |

Para ler a mensagem que chega, cada lado faz o **[[glossario/parse|parse]]** dela, aquele trabalho de separar as partes que a aula 1.2 mostrou.

### O servidor faz o parse da requisição

Pela conexão, chega ao servidor um texto só, uma letra atrás da outra:

```http
GET /produtos/tenis?cor=preto HTTP/1.1
Host: www.loja.com.br
User-Agent: Mozilla/5.0 ... Chrome/157.0.0.0
Accept-Language: pt-BR

```

Para o programa do servidor, isso ainda é só texto. Ele não sabe que `GET` é o método nem onde termina o caminho. O parser lê esse texto seguindo as regras do HTTP, que a aula 1.1 mostrou: a primeira linha tem três partes separadas por espaço, cada linha seguinte é um `Nome: valor`, e a linha em branco marca o fim dos cabeçalhos. Ele corta nesses pontos e entrega ao programa as partes já separadas:

| Parte | Valor | Onde estava no texto |
|---|---|---|
| método | `GET` | primeira linha, antes do primeiro espaço |
| caminho | `/produtos/tenis?cor=preto` | primeira linha, entre os dois espaços |
| versão | `HTTP/1.1` | primeira linha, depois do segundo espaço |
| cabeçalho `host` | `www.loja.com.br` | linha `Host: ...`, cortada no `:` |
| cabeçalho `user-agent` | `Mozilla/5.0 ... Chrome/157.0.0.0` | linha `User-Agent: ...` |
| cabeçalho `accept-language` | `pt-BR` | linha `Accept-Language: ...` |

Só depois disso o servidor consegue perguntar "o método é `GET`?" ou "o caminho é `/produtos/tenis`?" e decidir o que fazer. Se a primeira linha vier fora do formato, por exemplo sem o método, o parse falha e o servidor responde com um erro, o 400, "requisição mal formada".

No Node, é exatamente isso que o programa recebe. No `servidor.js`, mais abaixo nesta aula, o parse já veio feito: `requisicao.method` é o `GET`, `requisicao.url` é o caminho e `requisicao.headers` é um objeto com os cabeçalhos. O Node escreve os nomes dos cabeçalhos em minúsculas, como `requisicao.headers["user-agent"]`, porque no HTTP tanto faz escrever `User-Agent` ou `user-agent`.

### O navegador faz o parse da resposta

Na volta, acontece o mesmo, do outro lado. Chega ao navegador outro texto:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1256
Set-Cookie: carrinho=abc123

<!doctype html><html><head><title>Tênis</title>...
```

O parser do navegador separa:

| Parte | Valor | O que o navegador faz com ela |
|---|---|---|
| código de status | `200` | sabe que deu certo. Se fosse `404`, mostraria a página de erro que veio no corpo |
| cabeçalho `content-type` | `text/html` | sabe que o corpo é HTML, e por isso vai montar uma página. Se fosse `image/png`, mostraria uma imagem |
| cabeçalho `content-length` | `1256` | sabe quantos bytes de corpo esperar, e quando a resposta terminou |
| cabeçalho `set-cookie` | `carrinho=abc123` | guarda o cookie, para devolver no próximo pedido |
| corpo | o HTML, depois da linha em branco | passa para o parser do HTML |

Repare na última linha: o corpo de uma resposta passa por **dois** parses. Primeiro o do HTTP, que separa o corpo do resto da mensagem. Depois o do HTML, que monta a árvore de elementos. São parsers diferentes, cada um para um formato.

E é o `content-type` que diz qual parser usar no corpo. O mesmo texto `{"id":42}` vira dados num cliente que recebe `application/json`, e vira só texto na tela se vier como `text/plain`. Os cabeçalhos são o assunto do módulo 5.

Essa parte é igual em qualquer conversa HTTP. Não importa se o cliente é o Chrome, o curl ou um aplicativo de celular: todos escrevem requisições e leem respostas no mesmo formato. O que muda de um cliente para outro é **o que ele faz com a resposta depois**, e é aí que o navegador se separa dos outros.

## O que só o navegador faz

Um cliente qualquer, como o curl, só precisa mandar a requisição e receber a resposta. O navegador vai além: ele é o programa que mostra a web para uma pessoa. Por isso ele tem trabalhos que nenhum outro cliente precisa ter.

### 1. Transformar a resposta em página

Quando a resposta traz HTML, o navegador:

1. faz o parse do HTML e monta a árvore de elementos na memória, como na seção "O que é um parser" da aula 1.2;
2. faz o parse do CSS, para saber a cor, o tamanho e a posição de cada elemento;
3. **executa** o JavaScript da página. Primeiro faz o parse do código, e só depois o executa;
4. **[[glossario/renderizar|renderiza]]**: desenha tudo na tela.

Repare nos verbos. Parse é ler e organizar, e vale para os três: HTML, CSS e JavaScript. Executar é só para o JavaScript, porque só ele é código que roda. O HTML e o CSS descrevem a página, e não fazem nada sozinhos.

### 2. Fazer mais requisições por conta própria

Você digita uma URL só, mas o navegador faz dezenas de requisições, como a aula 1.2 mostrou. Uma parte vem do HTML: cada `src` e cada `href` vira mais um pedido. A outra parte vem do JavaScript, que pode pedir dados ao servidor depois que a página já abriu. É assim que uma lista de produtos carrega mais itens quando você rola até o fim, sem a página recarregar.

### 3. Lembrar de coisas entre um pedido e outro

O navegador guarda três coisas no computador do usuário: os cookies, o cache e o histórico. O histórico você já conhece: é a lista das páginas que você visitou. Os outros dois pedem explicação.

#### Cookie

O HTTP não tem memória. Cada requisição chega ao servidor sozinha, sem nada que diga "sou a mesma pessoa do pedido anterior". A aula 2.3 é sobre isso. Então como o site sabe que você já fez login, quando você muda de página?

Pelo **[[glossario/cookie|cookie]]**. Um cookie é um pequeno texto, no formato `nome=valor`, que o **servidor manda** o navegador guardar. O **navegador guarda** e, a partir daí, **devolve** esse texto em todo pedido ao mesmo site, sem ninguém pedir. Acontece assim:

1. Você manda o e-mail e a senha. O servidor confere, cria um número de sessão, como `8f3a2c`, e anota no banco de dados: "a sessão `8f3a2c` é da Ana".
2. Na resposta, o servidor manda o cabeçalho `Set-Cookie: sessao=8f3a2c`. Quer dizer: "guarda isto".
3. O navegador guarda o cookie, ligado ao endereço daquele site.
4. Em cada pedido seguinte ao mesmo site, o navegador acrescenta sozinho o cabeçalho `Cookie: sessao=8f3a2c`.
5. O servidor lê o cookie, procura `8f3a2c` no banco de dados e descobre que é a Ana.

> [!example] A comanda do bar
> Na entrada do bar, você recebe uma comanda com um número. A cada pedido, você mostra a comanda, e o garçom anota na conta daquele número. O garçom não lembra de você: lembra do número. O cookie é a comanda. Quem dá é o servidor, quem carrega é o navegador, e quem sabe o que aquele número quer dizer é o servidor, de novo.

Então o cookie fica **guardado no navegador**, mas quem **cria e entende** o cookie é o servidor. O navegador só carrega e devolve. Os cookies voltam com detalhes na aula 5.5.

#### Cache

**[[glossario/cache|Cache]]** é uma cópia guardada de algo que já foi buscado, para não buscar de novo. A palavra é genérica: qualquer programa pode ter um cache, inclusive o servidor. O que está nesta lista é o **cache do navegador**, que fica no computador do usuário.

Quando você abre uma página pela segunda vez, o logo do site, os estilos e os scripts costumam ser os mesmos da primeira vez. Em vez de pedir tudo de novo, o navegador usa as cópias que guardou. A página abre mais rápido, e o servidor recebe menos pedidos.

Mas por quanto tempo a cópia vale? Quem decide isso é o servidor, num cabeçalho da resposta, como o `cache-control: max-age=600` da aula 1.1: "pode guardar por 600 segundos". É a mesma divisão do cookie: o servidor diz a regra, e o navegador guarda e obedece.

Do lado do servidor também existem caches. Um servidor pode guardar, por exemplo, uma lista de produtos que demora para buscar no banco de dados, e reaproveitar a mesma lista para muitos clientes. Esse cache é dele, fica na máquina dele e serve a todos. O do navegador serve a um usuário só. O cache é o assunto da aula 5.3.

| | Cookie | Cache do navegador |
|---|---|---|
| o que é | um pequeno texto `nome=valor` | cópias de arquivos já baixados |
| para quê | o servidor reconhecer quem está pedindo | não baixar de novo o que já veio |
| quem decide | o servidor, com o `Set-Cookie` | o servidor, com o `Cache-Control` |
| onde fica | no navegador | no navegador |
| vai junto nos pedidos seguintes? | sim, sempre | não: evita o pedido

### 4. Proteger o usuário

O navegador roda código de qualquer site que você abre. Por isso, ele cria barreiras:

- **Um site não mexe no outro.** O JavaScript de um site não consegue ler o que está aberto em outra aba, de outro site. Sem essa regra, uma página qualquer poderia ler o seu e-mail aberto na aba ao lado. A aula 5.5 volta a esse assunto, com o CORS.
- **O servidor precisa provar quem é.** É o TLS da aula 1.2. Se o servidor não prova, o navegador mostra um aviso e não abre a página.

## O que só o servidor faz

Do outro lado, o trabalho é outro.

### 1. Ficar escutando

O servidor fica ligado o tempo todo, numa porta, esperando alguém chamar. O navegador só abre a conversa quando o usuário pede. A [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]] mostra como a porta funciona.

### 2. Atender muitos clientes ao mesmo tempo

Um navegador conversa com alguns servidores por vez. Um servidor de loja recebe pedidos de milhares de navegadores e aplicativos ao mesmo tempo, e não pode misturar o carrinho de um com o de outro.

### 3. Decidir o que fazer com cada pedido

O servidor olha o **método** e o **caminho** da requisição e escolhe o que fazer. Em pseudocódigo:

```
GET /produtos/42
  -> buscar o produto 42 no banco de dados
  -> se existir: responder 200, com o produto em JSON
  -> se não existir: responder 404

POST /produtos
  -> fazer o parse dos dados que vieram no corpo da requisição
  -> conferir se os dados estão certos
  -> salvar o produto novo no banco de dados
  -> responder 201, com o produto criado
```

O `GET` é "me manda" e o `POST` é "cria". Os outros métodos ficam para o módulo 3. O 200 quer dizer "deu certo", o 404 "não achei" e o 201 "criei". Os códigos são o módulo 4.

### 4. Guardar os dados e as regras

Uma loja tem dois tipos de coisa que precisam valer para todo mundo: os dados e as regras.

Os **dados** são os produtos, os clientes, os pedidos, o estoque. Eles ficam no **[[glossario/banco-de-dados|banco de dados]]**, e quem conversa com o banco é o servidor. Precisam ficar desse lado porque são de todos: o estoque que você vê é o mesmo que eu vejo. Se cada navegador guardasse a sua cópia, cada um veria um estoque diferente, e os dados sumiriam quando o usuário limpasse o navegador.

As **regras de negócio** são as regras de como a empresa funciona. Não têm nada a ver com a tela: valeriam igual numa loja de rua, com papel e caneta. Alguns exemplos:

- o preço de cada produto, e o desconto de 10% no Pix;
- não vender o que não tem no estoque;
- frete grátis acima de 200 reais;
- só o dono de um pedido pode ver esse pedido;
- um cupom vale uma vez por cliente.

Essas regras também ficam no servidor, por dois motivos. O primeiro é o mesmo dos dados: valem para todos, e precisam ser iguais no site e no aplicativo. O segundo é segurança: o que roda no navegador o usuário pode mudar, como a seção "O servidor não confia no navegador", mais abaixo, mostra. Uma regra que o usuário pode desligar não é regra.

Esse código, que roda no servidor, cuida dos dados e aplica as regras, é o que se chama **back-end**. A aula 1.5 é sobre ele.

### 5. Montar a resposta

Por fim, o servidor decide as três partes da resposta: o **código de status**, os **cabeçalhos** e o **corpo**. O corpo pode ser uma página em HTML, dados em JSON, uma imagem ou nada.

## Como saber de que lado fica uma tarefa

Quatro perguntas resolvem quase todos os casos:

| Pergunta | Navegador | Servidor |
|---|---|---|
| Quem começa? | ele, quando o usuário pede | ninguém: ele espera |
| Onde roda? | no computador ou no celular do usuário | numa máquina da empresa, ou na nuvem |
| Com quantos conversa? | com alguns servidores | com milhares de clientes |
| De quem cuida? | do que **um usuário** vê e faz | dos dados e das regras de **todos** |

Um teste rápido: desligue o computador do usuário. O que some com ele era do navegador, como a página na tela e o histórico guardado ali. O que continua existindo, como os produtos da loja e os pedidos de todos os clientes, é do servidor.

E lembre-se da aula 1.1: cliente e servidor são papéis, e não tipos de programa. O servidor da loja vira cliente quando pede ao serviço de pagamento para cobrar um cartão. Para saber o papel, olhe quem pediu primeiro naquela conversa.

## O servidor não confia no navegador

O navegador roda na máquina do usuário, e o usuário controla a própria máquina. Com o F12, dá para mudar qualquer coisa na página: apagar a regra que proíbe deixar um campo vazio, trocar o preço que aparece na tela, mandar uma requisição montada à mão. Com o curl, dá até para pular o navegador.

Por isso, **o servidor confere tudo de novo**. Se a página mostra um tênis por R\$ 299,90 e alguém muda para R\$ 1,00 antes de finalizar a compra, o servidor ignora o preço que veio do navegador e busca o preço certo no banco de dados.

| Conferir no navegador | Conferir no servidor |
|---|---|
| para avisar o usuário rápido, sem esperar uma resposta | para garantir que a regra vale |
| é conforto | é segurança |
| pode ser burlado | não tem como pular |

As duas conferências convivem. A do navegador poupa tempo do usuário. A do servidor é a que vale.

## Nem todo cliente é navegador

Um aplicativo de celular e um script que pede dados a uma API também são clientes. O que eles fazem **na conversa** é igual ao que o navegador faz: escrevem requisições HTTP e leem respostas HTTP. O mesmo servidor atende todos eles do mesmo jeito.

Quando a aula 1.1 pediu a temperatura à Open-Meteo com o curl, o servidor recebeu uma requisição HTTP e respondeu em HTTP. Um aplicativo do tempo faria exatamente o mesmo pedido. Do lado do servidor, não dá nem para notar a diferença, a não ser pelo cabeçalho `User-Agent`, que diz quem está pedindo.

A diferença está **depois** da resposta, nos trabalhos que só o navegador faz:

| | Navegador | Aplicativo de celular | Script, curl |
|---|---|---|---|
| fala HTTP | sim | sim | sim |
| recebe, quase sempre | HTML, CSS, JavaScript e imagens | JSON | JSON, ou o que pedir |
| faz o parse de HTML e desenha a página | sim | não: desenha a tela com o código do próprio aplicativo | não: só usa os dados |
| guarda cookies e cache sozinho | sim | só se o aplicativo for programado para isso | só se você mandar |

Então não é que um aplicativo "funcione diferente da web". A conversa é a mesma: HTTP. O que o aplicativo não tem são os trabalhos extras do navegador. Ele recebe os dados em JSON e monta a tela com o próprio código, em vez de receber uma página pronta para desenhar.

### Quem monta a tela: o servidor ou o navegador?

O navegador também pode trabalhar como o aplicativo: receber só os dados em JSON e montar a tela com o JavaScript. Hoje, os sites são feitos de dois jeitos.

**1. O servidor monta o HTML.** O servidor busca os dados no banco, escreve o HTML já com eles dentro e manda a página pronta. O navegador só faz o parse e desenha.

```
GET /produtos   -> HTML, já com os produtos escritos dentro
```

É o jeito mais antigo, e continua muito usado em lojas, blogs e sistemas de empresa.

**2. O navegador monta a tela.** O servidor manda primeiro o site em si: um HTML quase vazio, o CSS e o JavaScript das telas. Depois, o JavaScript pede os dados a uma API, e eles chegam em JSON:

```
1. GET /                -> HTML       (a página quase vazia)
2. GET /app.js          -> JavaScript (o código das telas)
3. GET /api/produtos    -> JSON       (os dados)
```

Com os dados na mão, o JavaScript monta a lista de produtos na tela. É assim no Gmail e em muitos painéis de sistema.

Repare que, mesmo no segundo jeito, o navegador não recebe só JSON. Antes ele precisa receber o código que vai montar a tela, nos pedidos 1 e 2. É o armário desmontado da aula 1.1: as peças e o manual chegam primeiro.

O aplicativo de celular faz só o pedido 3. O código das telas dele já veio instalado da loja de aplicativos. Por isso, uma empresa que monta as telas no navegador consegue usar **uma API só para o site e para o aplicativo**: os dois fazem o mesmo `GET /api/produtos`, recebem o mesmo JSON, e cada um monta a tela do seu jeito.

| | O servidor monta o HTML | O navegador monta a tela |
|---|---|---|
| o que o navegador recebe | a página pronta, com os dados dentro | primeiro o código das telas, depois os dados em JSON |
| quem junta os dados com a tela | o servidor | o JavaScript, no navegador |
| o aplicativo de celular aproveita o mesmo servidor? | não direto: o aplicativo não quer HTML, quer os dados | sim: pede a mesma API |

Um jeito não substituiu o outro. Muitos sites misturam os dois: a primeira página vem pronta do servidor, e as partes que mudam depois, como o carrinho ou a busca, pedem JSON a uma API.

E uma API não é "o que devolve JSON". Pela definição da aula 1.1, **[[glossario/api|API]]** é a lista de pedidos que um programa aceita de outros programas. Numa API da web, esses pedidos são requisições HTTP, e as respostas **quase sempre** vêm em JSON, mas podem vir em outros formatos. E nem toda API é pela internet: o `JSON.parse` e o `http.createServer` do Node também são APIs, que você usa chamando uma função, sem requisição nenhuma.

## Veja com os próprios olhos

### Os dois lados no seu computador

Até aqui, o servidor sempre foi de outra pessoa. Agora você vai rodar um. O Node.js, o mesmo do seu `tarefas.js`, já vem com o que é preciso. Crie um arquivo `servidor.js`:

```js
const http = require("node:http");

const servidor = http.createServer((requisicao, resposta) => {
  console.log(requisicao.method, requisicao.url, "|", requisicao.headers["user-agent"]);

  if (requisicao.method === "GET" && requisicao.url === "/produtos/42") {
    resposta.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    resposta.end(JSON.stringify({ id: 42, nome: "Tênis preto", preco: 299.9 }));
  } else {
    resposta.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    resposta.end("Não achei");
  }
});

servidor.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});
```

Não precisa entender cada linha agora. O back-end é a aula 1.5 e a trilha inteira que vem depois. Repare só nos trabalhos do servidor:

- `servidor.listen(3000, ...)`: **ficar escutando** na porta 3000;
- a função dentro do `createServer` roda **uma vez para cada requisição** que chega;
- o `if` olha o **método e o caminho** e decide o que fazer;
- o `writeHead` escolhe o **status e os cabeçalhos**, e o `end` manda o **corpo**.

Rode com `node servidor.js`. O terminal mostra `Servidor escutando na porta 3000` e fica parado, esperando. Ele não termina sozinho como o `tarefas.js`, porque esse é o trabalho de um servidor: esperar. Para desligar, aperte **Ctrl+C**.

Com o servidor rodando, faça dois clientes pedirem a mesma coisa:

1. **O navegador.** Abra `http://localhost:3000/produtos/42`. Aparece o JSON do produto.
2. **O curl.** Abra outro terminal, com o `+` do painel de terminais do VS Code, e rode:

   ```powershell
   curl.exe http://localhost:3000/produtos/42
   ```

   Vem o mesmo JSON.

Agora volte ao terminal do servidor. Ele registrou cada pedido:

```
Servidor escutando na porta 3000
GET /produtos/42 | Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/...
GET /favicon.ico | Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/...
GET /produtos/42 | curl/8.21.0
```

Três coisas para reparar:

- **O servidor tratou os dois clientes do mesmo jeito.** O mesmo pedido, a mesma resposta. A única diferença está no `User-Agent`: um diz que é o Chrome, o outro diz que é o curl.
- **O navegador fez um pedido que você não fez.** O `/favicon.ico` é o iconezinho que aparece na aba. O navegador pede esse arquivo sozinho a todo site. Como o seu servidor não tem, ele respondeu 404. É o navegador fazendo requisições por conta própria.
- **O curl só mostrou o texto, e o navegador arrumou o JSON.** Alguns navegadores mostram o JSON com cores e recuos, ou com uma opção "Estilo de formatação". Isso é trabalho extra do navegador. O que chegou nos dois foi o mesmo texto.

Troque o endereço para `http://localhost:3000/produtos/7`. Os dois clientes recebem `Não achei`, com status 404.

### Quem disparou cada pedido

Abra um site qualquer, aperte **F12**, vá na aba **Network** (em português, **Rede**) e aperte **F5**, para a lista se encher do zero. Use um site de verdade, e não o `localhost:3000`: o nosso servidor só devolve um texto, então ninguém pede mais nada.

Na lista, procure a coluna **Initiator** (em português, **Iniciador**), "quem iniciou". Ela costuma já vir ligada, entre **Type** e **Size**. Se não estiver, clique com o botão direito no título de qualquer coluna e marque-a.

Ela diz o que fez o navegador pedir cada arquivo. Em cada linha aparece o nome do arquivo que fez o pedido, seguido de `:` e do número da linha onde o pedido está escrito:

| Na coluna Initiator | Quer dizer |
|---|---|
| **Other** | ninguém da página pediu: foi você, digitando a URL ou clicando num link. É o que aparece na linha do próprio HTML, a primeira da lista |
| **(index):12**, ou o nome da página com um número | o parser do HTML achou um `src` ou um `href` na linha 12 da página e pediu o arquivo |
| **app.js:3**, ou outro arquivo `.js` com um número | o JavaScript da página pediu, na linha 3 desse arquivo |

O **(index)** é o nome que o Chrome dá à página quando o endereço termina em `/`, como `https://site.com/`. Se o endereço for `https://site.com/produtos`, aparece **produtos** no lugar.

Clique num desses nomes, e o Chrome abre o arquivo exatamente na linha que fez o pedido. Num `(index)`, você cai numa tag como `<img src="...">` ou `<link href="...">`.

Para ver o tipo escrito por extenso, clique na engrenagem do canto direito da aba Network e marque **Big request rows** (pode aparecer como "Use large request rows"). Cada linha ganha uma segunda linha, em cinza, e na coluna Initiator aparece o tipo: **Other**, **Parser** ou **Script**, um para cada linha da tabela acima.

É a lista dos trabalhos do navegador, vista por dentro: você pediu um, o parser pediu vários, e o JavaScript pediu outros.

### O que o navegador guarda

Ainda no F12, abra a aba **Application** (em português, **Aplicativo**). Na lateral, em **Storage**, abra **Cookies** e clique no endereço do site. Aparece a lista dos cookies que esse site mandou o navegador guardar, com o nome, o valor e a validade de cada um. Num site em que você fez login, um deles costuma ser o que diz ao servidor quem você é.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. De que lado?
> Diga se cada tarefa é do navegador ou do servidor:
>
> - a) desenhar o botão "Comprar" na tela
> - b) conferir se ainda tem o tênis no estoque
> - c) guardar o cookie de login
> - d) escolher entre responder 200 ou 404
> - e) pedir a imagem do produto que aparece no HTML
> - f) atender mil clientes ao mesmo tempo
>
> > [!success]- Resposta
> > - a) navegador: é renderizar.
> > - b) servidor: o estoque é um dado de todos, e fica no banco de dados.
> > - c) navegador: o servidor manda criar, mas quem guarda e devolve é o navegador.
> > - d) servidor: é ele que monta a resposta.
> > - e) navegador: o parser do HTML acha o `src` e o navegador faz mais uma requisição.
> > - f) servidor: o navegador conversa com alguns servidores, e o servidor com muitos clientes.

> [!question] 2. Só o navegador fala HTTP?
> Alguém disse: "o navegador monta e manda a requisição HTTP, e o servidor processa". Falta alguma coisa nessa frase?
>
> > [!success]- Resposta
> > Falta dizer que o servidor também fala HTTP. O HTTP é a regra da conversa entre os dois. O navegador escreve a requisição e lê a resposta. O servidor lê a requisição e escreve a resposta. Os dois fazem o parse da mensagem que recebem.

> [!question] 3. Faça o parse você mesmo
> Chegou ao servidor este texto:
>
> ```http
> POST /tarefas HTTP/1.1
> Host: localhost:3000
> Content-Type: application/json
>
> {"titulo":"Comprar pão"}
> ```
>
> Separe o método, o caminho, o host, o tipo do corpo e o corpo. Que outro parse o servidor ainda precisa fazer antes de usar o título?
>
> > [!success]- Resposta
> > - método: `POST`
> > - caminho: `/tarefas`
> > - host: `localhost:3000`
> > - tipo do corpo: `application/json`
> > - corpo: `{"titulo":"Comprar pão"}`, tudo depois da linha em branco
> >
> > O corpo ainda é texto. Como o `Content-Type` diz que é JSON, o servidor faz mais um parse, com `JSON.parse`, para virar um objeto e poder ler o `titulo`. É o mesmo caso do HTML no navegador: o corpo passa por dois parses, o do HTTP e o do formato dele.

> [!question] 4. Parse ou execução?
> O navegador recebeu um HTML, um CSS e um JavaScript. De quais ele faz o parse? Quais ele executa?
>
> > [!success]- Resposta
> > Ele faz o parse dos três, porque precisa entender a estrutura de cada um. Executa só o JavaScript, que é o único que é código. O HTML e o CSS descrevem a página, e não rodam.

> [!question] 5. O preço trocado
> Numa loja, o preço aparece na página como R\$ 299,90. Um usuário abre o F12, muda o número para R\$ 1,00 e clica em "Finalizar compra". A loja deveria cobrar R\$ 1,00?
>
> > [!success]- Resposta
> > Não. O usuário controla o navegador, então nada que vem dele é garantido. O servidor não usa o preço que veio do navegador. Ele busca o preço no banco de dados, que só o servidor controla, e cobra R\$ 299,90.

> [!question] 6. Conferir duas vezes
> Um formulário de cadastro avisa na hora, ainda no navegador, que o e-mail está sem `@`. Se o navegador já confere, por que o servidor confere de novo?
>
> > [!success]- Resposta
> > Porque a conferência do navegador pode ser pulada: dá para desligá-la pelo F12, ou mandar a requisição direto pelo curl. A do navegador existe para avisar o usuário rápido, sem esperar o servidor. A do servidor é a que garante a regra.

> [!question] 7. O aplicativo e o site
> Uma loja tem um site e um aplicativo de celular. Os dois mostram a mesma lista de produtos. O aplicativo conversa com o servidor por um protocolo diferente do HTTP? O que muda entre os dois?
>
> > [!success]- Resposta
> > Não, os dois falam HTTP, e podem até pedir ao mesmo servidor. O que muda é o que cada um faz com a resposta. O navegador costuma receber HTML, CSS e JavaScript, e desenha a página. O aplicativo costuma receber os produtos em JSON e monta a tela com o próprio código, sem HTML e sem CSS.

> [!question] 8. O pedido que ninguém fez
> No terminal do `servidor.js`, apareceu um `GET /favicon.ico` que você não digitou em lugar nenhum. De onde ele veio? O curl faria o mesmo pedido?
>
> > [!success]- Resposta
> > Veio do navegador. Ele pede o ícone da aba sozinho, a todo site. O curl não pede, porque só faz o que você manda e não tem aba para pôr ícone. É um dos trabalhos extras do navegador.

> [!question] 9. A loja vira cliente
> O servidor da loja, para finalizar uma compra, pede a um serviço de pagamento que cobre o cartão. Nessa conversa, a loja faz o trabalho de navegador?
>
> > [!success]- Resposta
> > Ela faz o papel de **cliente**: escreve a requisição e lê a resposta, em HTTP. Mas não faz nenhum trabalho extra de navegador: não desenha página, não guarda cookie por conta própria, não roda o JavaScript de ninguém. Todo navegador é cliente, mas nem todo cliente é navegador.

## De onde vêm as palavras

- **Navegador**: de navegar, do latim *nāvigāre*, que junta *nāvis*, "navio", e *agere*, "conduzir": conduzir um navio. A palavra pegou na web por causa do Netscape Navigator, o navegador mais usado nos anos 1990. Em inglês, o nome mais comum é *browser*, de *to browse*, que primeiro queria dizer o animal que vai mordiscando os brotos das plantas, de um em um, e depois passou a ser folhear, dar uma olhada sem pressa. *Browse* vem do francês antigo *brost*, "broto".
- **[[glossario/cookie|Cookie]]**: em inglês, "biscoito", do holandês *koekje*, "bolinho". Na computação, *magic cookie* já era o nome de um pequeno dado que um programa recebe e devolve igual, sem mexer nele. Em 1994, Lou Montulli, programador da Netscape, usou a ideia no navegador e manteve o nome.
- **[[glossario/cache|Cache]]**: do francês *cache*, "esconderijo", de *cacher*, "esconder". Era o lugar onde exploradores e caçadores escondiam comida e mantimentos para pegar na volta. O cache do navegador é isso: um estoque guardado para não precisar buscar de novo.

> [!tip] Para guardar
> - O **HTTP** é dos dois lados. O navegador escreve a requisição e lê a resposta. O servidor lê a requisição e escreve a resposta. Os dois fazem o **parse** da mensagem que recebem.
> - **Parse** é ler e organizar, e vale para HTML, CSS e JavaScript. **Executar** é só para o JavaScript.
> - O que só o navegador faz: transformar a resposta em página, fazer mais requisições por conta própria, guardar **cookies**, **cache** e histórico, e proteger o usuário.
> - O que só o servidor faz: ficar escutando numa porta, atender muitos clientes, decidir o que fazer pelo método e pelo caminho, cuidar dos dados e das regras e montar a resposta.
> - Para saber de que lado fica uma tarefa: quem começa, onde roda, com quantos conversa e de quem cuida.
> - O servidor **não confia** no navegador: confere tudo de novo, porque o usuário controla a própria máquina.
> - Aplicativos e scripts falam o mesmo HTTP. O que eles não têm são os trabalhos extras do navegador: em vez de desenhar uma página, usam os dados, quase sempre em JSON.

Fontes: MDN: [Uma visão geral do HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview), [Como os navegadores funcionam](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/How_browsers_work), [Cookies HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Cookies), [Política de mesma origem](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) · Node.js: [http](https://nodejs.org/api/http.html) · Chrome DevTools: [Network features reference](https://developer.chrome.com/docs/devtools/network/reference) · Wikipedia: [HTTP cookie](https://en.wikipedia.org/wiki/HTTP_cookie), [Netscape Navigator](https://en.wikipedia.org/wiki/Netscape_Navigator) · Wiktionary: [navegar](https://en.wiktionary.org/wiki/navegar), [nāvigō](https://en.wiktionary.org/wiki/navigo), [browse](https://en.wiktionary.org/wiki/browse), [cookie](https://en.wiktionary.org/wiki/cookie), [cache](https://en.wiktionary.org/wiki/cache)
