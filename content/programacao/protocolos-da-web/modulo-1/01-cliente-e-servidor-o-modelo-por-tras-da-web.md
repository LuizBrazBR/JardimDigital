---
title: "1.1 Cliente e servidor: o modelo por trás da web"
tags:
  - protocolos-da-web
  - http
---

Primeira aula do módulo 1 e do curso de Protocolos da Web. O curso inteiro é sobre como os programas conversam pela internet, e essa conversa é a base de todo back-end. Esta aula ainda não abre o HTTP por dentro, que é o assunto do módulo 2. Ela monta a imagem que todas as outras aulas vão usar: numa conversa na web há dois papéis, um que pede e um que responde, e a ordem é sempre a mesma.

## Os dois papéis

### Cliente

> [!abstract] Definição
> **[[glossario/cliente|Cliente]] é o programa que começa a conversa, pedindo alguma coisa.**

O navegador é o cliente mais conhecido, mas não é o único:

| Cliente | Um pedido que ele faz |
|---|---|
| navegador (Chrome, Edge, Firefox) | "me manda a página deste endereço" |
| aplicativo de celular | "me manda a previsão do tempo de hoje" |
| curl, no terminal, ou Postman | um pedido montado à mão, para testar um servidor |
| um programa seu, em JavaScript ou Python | "me manda a lista de produtos" |
| outro servidor | "cobra 150 reais neste cartão", pedido a um serviço de pagamento |

O que faz de um programa um cliente não é ser navegador, aplicativo ou comando de terminal. É ele pedir primeiro.

### Servidor

> [!abstract] Definição
> **[[glossario/servidor|Servidor]] é o programa que fica esperando pedidos e responde a cada um.**

Ele passa o tempo todo ligado, pronto para atender quem chegar. O nome técnico disso é "ficar escutando", e a [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]] mostra como funciona.

A confusão mais comum é achar que servidor é a máquina. Servidor é **o programa**. Ele pode rodar num computador grande numa sala refrigerada, num computador alugado na nuvem ou no seu notebook, enquanto você testa o que está fazendo. O que faz dele um servidor é o trabalho que ele faz: esperar e responder.

No dia a dia, muita gente também chama de servidor a máquina onde esse programa roda. As duas formas aparecem por aí. Nesta aula, e no curso, servidor é o programa.

> [!example] O garçom
> Em inglês, o garçom também se chama *server*, e a comparação ajuda. No restaurante, você é o cliente: chama o garçom e faz o pedido. Ele leva o pedido à cozinha, espera o prato ficar pronto e traz até a mesa. Se o prato acabou, ele volta e avisa, e isso também é uma resposta. A cozinha é o trabalho que o servidor faz por trás, como buscar dados, e o cliente nem vê. O que esse garçom nunca faz é trazer um prato que ninguém pediu.

### O mesmo programa nos dois papéis

Cliente e servidor são papéis numa conversa, e não tipos de programa. O mesmo programa pode ser servidor numa conversa e cliente em outra. Numa compra pela internet:

1. O navegador pede à loja: "finaliza a compra". O navegador é o cliente, e a loja é o servidor.
2. Antes de responder, a loja pede ao serviço de pagamento: "cobra 150 reais neste cartão". Nessa conversa, a loja é o cliente, e o serviço de pagamento é o servidor.
3. O serviço de pagamento responde à loja: "aprovado".
4. Só então a loja responde ao navegador: "compra feita".

A loja fica no meio: atende o navegador e, para isso, pede ajuda a outro servidor. É parecido com as funções que chamam outras funções da [[programacao/logica-de-programacao/modulo-5/05-dividir-para-conquistar-funcoes-que-usam-funcoes|aula 5.5 de Lógica]]: a de fora só termina depois que a de dentro devolve o resultado.

## A ordem da conversa: requisição e resposta

Toda troca na web segue os mesmos três passos:

1. O cliente manda uma **[[glossario/requisicao|requisição]]**, que é o pedido. Pode ser para ler alguma coisa, como uma página ou uma lista, ou para fazer alguma coisa, como salvar um formulário ou apagar uma foto.
2. O servidor **processa** o pedido: busca a informação, faz uma conta, grava um dado.
3. O servidor devolve uma **[[glossario/resposta|resposta]]**: o resultado, ou o aviso de que não deu certo.

```
Cliente (navegador)                          Servidor (site de uma loja)
        |                                             |
        |---- requisição: "me manda a página" ------->|
        |                                             |  monta a página
        |<--- resposta: o HTML da página -------------|
        |                                             |
        |---- requisição: "me manda os produtos" ---->|
        |                                             |  busca no banco de dados
        |<--- resposta: a lista, em JSON -------------|
```

Daí saem três regras:

- **O cliente sempre fala primeiro.** O servidor não começa conversa. Ele só fala quando alguém pede.
- **Toda requisição recebe uma resposta.** "Não achei" e "deu erro" também são respostas. O módulo 4 mostra os códigos que dizem isso, como o famoso 404, "não encontrado".
- **Uma página costuma custar muitas requisições.** O navegador pede o HTML primeiro. Lendo o HTML, ele descobre que a página tem imagens, estilos e scripts, e faz mais uma requisição para cada um. A seção "Veja com os próprios olhos", mais abaixo, mostra isso acontecendo.

### Parece chamar uma função

Requisição e resposta lembram uma coisa que você já conhece da Lógica: chamar uma função e receber o `return`.

```js
const pendentes = contarPendentes(); // chama a função e espera
console.log(pendentes);              // só roda depois que o return voltar
```

| Na função | Na web |
|---|---|
| a chamada, como `concluirTarefa("Estudar laços")` | a requisição |
| os argumentos, como o `"Estudar laços"` | os dados que vão junto com a requisição |
| o corpo da função rodando | o servidor processando |
| o `return` | a resposta |
| a função não roda sozinha: alguém precisa chamá-la | o servidor não fala sozinho: alguém precisa pedir |

A grande diferença é a distância. A função está no mesmo programa, no mesmo computador. A requisição atravessa a internet até outro programa, às vezes em outro país. Por isso ela demora mais, e pode falhar no caminho: a internet cai, o servidor está desligado, o endereço está errado. Também por isso as regras da conversa precisam prever como avisar que algo deu errado.

## Protocolo: as regras da conversa

> [!abstract] Definição
> **[[glossario/protocolo|Protocolo]] é o conjunto de regras que dois programas combinam seguir para conversar: como se pede, como se responde, em que ordem e em que formato.**

Na web, o protocolo é o **[[glossario/http|HTTP]]**, sigla do inglês *Hypertext Transfer Protocol*, "protocolo de transferência de hipertexto". Qualquer cliente que fale HTTP conversa com qualquer servidor que fale HTTP. É por isso que o Chrome, feito pelo Google, abre um site feito por qualquer pessoa, em qualquer linguagem: os dois seguem as mesmas regras.

### Protocolo é como um idioma?

É uma boa comparação, e "o HTTP é o inglês da web" também. Ela só pede dois ajustes.

**1. Protocolo é idioma mais etiqueta.** Um idioma dá as palavras e a gramática. Um protocolo dá isso e também o ritual da conversa: quem fala primeiro, como cada mensagem começa, o que cada resposta quer dizer. Em português, protocolo também é o nome das regras de uma cerimônia: quem entra primeiro, quem senta onde, como se cumprimenta um presidente. Esse sentido fica mais perto do HTTP do que o de idioma.

| | Um idioma | O HTTP |
|---|---|---|
| palavras | milhares, e sempre aparecem novas | poucas e fixas, como `GET` ("me manda") e códigos como `404` ("não achei") |
| gramática | a ordem das palavras na frase | o formato da mensagem: o que vai na primeira linha, o que vem depois |
| quem fala primeiro | tanto faz | sempre o cliente |
| erros | uma pessoa entende "eu querer café" | um programa não adivinha: uma mensagem fora do formato volta com um aviso de erro |

A última linha é a mesma ideia da [[programacao/logica-de-programacao/modulo-1/01-o-que-e-programar-e-algoritmo|aula 1.1 de Lógica]]: o computador não adivinha o que você quis dizer. Entre pessoas, um idioma aguenta sotaque e erro de gramática. Entre programas, a regra precisa ser seguida à risca.

**2. "O mais usado" depende de onde.** Na web, o HTTP é praticamente o único: quase tudo que o navegador pede vai em HTTP, ou em HTTPS, a versão protegida, que é o assunto da aula 2.5. Mas a internet leva outras conversas, com outros protocolos. O e-mail, por exemplo, passa de um servidor para outro por um protocolo chamado SMTP.

E o próprio HTTP viaja em cima de outros protocolos, que cuidam de levar a mensagem até o computador certo. Pense numa carta: o idioma em que ela foi escrita é uma coisa, e as regras dos Correios, como o endereço e o CEP no envelope, são outra. O carteiro não lê a carta, e a carta não precisa saber a rota do caminhão. O HTTP é o idioma da carta. A parte do endereço é a [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]], sobre IP, DNS e porta.

### Uma espiada numa mensagem HTTP

Só para ver a cara das regras, sem decorar nada. O módulo 2 desmonta cada parte. Esta é uma requisição pedindo a página inicial do site `example.com`:

```http
GET / HTTP/1.1
Host: example.com
```

- `GET` quer dizer "me manda". O módulo 3 mostra os outros pedidos, como criar e apagar.
- `/` diz o quê. A barra sozinha é a página inicial do site.
- `HTTP/1.1` diz qual versão do protocolo o cliente está falando. As versões são o assunto da aula 2.4.
- `Host: example.com` diz para qual site é o pedido.

E este é o começo da resposta:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8

<!doctype html><html lang=en><head>...<title>Example Domain</title>...
```

- `200 OK` quer dizer "deu certo". Os códigos são o módulo 4.
- `Content-Type: text/html` avisa: "o que vem abaixo é HTML". Esse tipo de linha é o assunto do módulo 5.
- A linha em branco separa os avisos do conteúdo. Abaixo dela vem a página em si.

As regras, então, são estas: uma primeira linha com partes fixas, numa ordem fixa, depois linhas no formato `Nome: valor`, uma linha em branco e o conteúdo. Quem segue isso é entendido por qualquer programa que também siga.

As linhas `Nome: valor` se chamam **cabeçalhos**, em inglês *headers*. São avisos sobre a mensagem, como o tipo do conteúdo ou o site pedido, e não a mensagem em si. A requisição tem os cabeçalhos dela, e a resposta tem os dela.

## Veja com os próprios olhos

### No navegador

1. Abra qualquer site no Chrome ou no Edge. Pode ser esta página mesmo.
2. Aperte **F12** e vá na aba **Network** (em português, **Rede**). Se ela não aparecer, está escondida atrás do `>>`.
3. Aperte **F5** para recarregar a página.

Cada linha da lista é uma requisição que o navegador fez. Mesmo uma página simples pede dezenas de coisas: o HTML, os estilos, as imagens, as fontes das letras, os scripts. A coluna **Status** mostra o código de cada resposta, e 200 quer dizer "deu certo".

Repare que a lista estava vazia antes do F5. A página já estava aberta, mas nenhum pedido novo tinha sido feito. Só com o F5 o cliente pediu de novo, e as requisições apareceram.

#### Dentro de uma linha: as abas Headers e Response

Clicando numa linha, abre um painel com várias abas. Duas importam agora:

- **Headers** (em português, Cabeçalhos) mostra os **cabeçalhos** das duas mensagens, a requisição e a resposta. São só os avisos `nome: valor`, sem o conteúdo.
- **Response** (Resposta) mostra o **conteúdo** da resposta, o que vinha depois da linha em branco na espiada.

Cada parte da espiada tem o seu lugar no Chrome:

| Parte | Na espiada | No Chrome |
|---|---|---|
| primeira linha da requisição | `GET / HTTP/1.1` | **Request method** e **Request URL**, no bloco General, aba Headers |
| cabeçalhos da requisição | `Host: example.com` | bloco **Request Headers**, aba Headers |
| primeira linha da resposta | `HTTP/1.1 200 OK` | **Status code**, no bloco General, aba Headers |
| cabeçalhos da resposta | `Content-Type: text/html` | bloco **Response Headers**, aba Headers |
| conteúdo da resposta | o HTML depois da linha em branco | aba **Response** |

#### Os três blocos da aba Headers

A aba Headers tem três blocos, cada um com um título:

| Bloco | Em português | O que mostra |
|---|---|---|
| General | Geral | um resumo: o endereço pedido, o método e o código da resposta |
| Response Headers | Cabeçalhos de resposta | os avisos que o **servidor** mandou junto com a resposta |
| Request Headers | Cabeçalhos de solicitação | os avisos que o **navegador** mandou junto com o pedido |

> [!warning] A resposta aparece antes da requisição
> Na conversa, a requisição vem primeiro. Mas o Chrome mostra os cabeçalhos da resposta em cima e os da requisição embaixo. E, se você copiar a aba inteira, os títulos dos blocos não vão junto, e fica difícil ver onde um termina e o outro começa.

Um exemplo de verdade: o que a aba Headers mostra para a página do verbete [[glossario/http|HTTP]] deste site, aberta pelo link desta aula. A lista é longa, então aqui vão os cabeçalhos que dá para entender já. Os outros voltam no módulo 5.

**General**, o resumo:

| Linha | O que quer dizer |
|---|---|
| `Request URL: https://luizbrazbr.github.io/JardimDigital/glossario/http` | o endereço pedido |
| `Request method: GET` | "me manda", a primeira palavra da requisição |
| `Status code: 200 OK` | "deu certo", da primeira linha da resposta |
| `Remote address: 185.199.108.153:443` | o endereço do computador onde roda o servidor, e a porta. A [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta\|aula 1.4]] explica os dois |

**Response Headers**, o que o servidor contou:

| Cabeçalho | O que quer dizer |
|---|---|
| `content-type: text/html; charset=utf-8` | "o conteúdo é HTML" |
| `content-encoding: gzip` | "o conteúdo vai compactado, como um arquivo zip". O navegador descompacta antes de ler |
| `content-length: 6999` | o tamanho do conteúdo, em bytes, já compactado |
| `server: GitHub.com` | quem respondeu: o GitHub, onde este site fica |
| `last-modified: Sun, 08 Nov 2026 18:04:56 GMT` | quando esta página mudou pela última vez, no caso, quando o verbete foi publicado. As datas do HTTP vêm sempre no horário de Greenwich (GMT): 18h04 lá são 15h04 em Brasília |
| `cache-control: max-age=600` | "pode guardar uma cópia por 600 segundos", ou seja, 10 minutos. É o assunto da aula 5.3 |
| os que começam com `x-` | avisos extras do GitHub e da empresa que entrega as páginas dele. Não fazem parte das regras do HTTP |

**Request Headers**, o que o navegador contou:

| Cabeçalho | O que quer dizer |
|---|---|
| `:method: GET`, `:path: /JardimDigital/glossario/http` e `:authority: luizbrazbr.github.io` | a primeira linha e o `Host` da espiada, escritos de outro jeito. Os nomes com dois-pontos na frente são o formato das versões mais novas do HTTP, assunto da aula 2.4 |
| `accept: text/html, ...` | "aceito HTML, imagens e outros formatos" |
| `accept-language: pt-BR, ...` | "prefiro a página em português" |
| `referer: .../01-cliente-e-servidor-o-modelo-por-tras-da-web` | "vim desta página": o link foi clicado na aula 1.1 |
| `user-agent: Mozilla/5.0 ... Chrome/157 ...` | "quem está pedindo é o Chrome, neste sistema" |

Para saber de que lado é um cabeçalho, pergunte quem sabe aquela informação. Que idioma você prefere e qual navegador está usando, só o navegador sabe: são da requisição. Que tipo de conteúdo está indo e quando a página mudou, só o servidor sabe: são da resposta.

#### A aba Response não é a página que você vê

A aba **Response** mostra o texto que chegou, do jeito que chegou. Para a requisição de uma página, isso é o código HTML, com as marcas como `<h1>` e `<p>`, e não a página desenhada.

A página que aparece na tela é trabalho do navegador. Ele lê esse HTML, descobre que precisa de estilos, imagens, fontes e scripts, faz uma requisição para cada um, e monta tudo junto. Cada uma dessas requisições é outra linha na lista da aba Network, com os seus próprios Headers e a sua própria Response. Ou seja, o que você vê na tela é a soma de muitas respostas, e não uma só.

A aba ao lado, **Preview** (Visualização), mostra o conteúdo de um jeito mais fácil de ler: uma imagem aparece como imagem, e um JSON aparece arrumado, em vez de numa linha só.

### No terminal

Abra o terminal do VS Code, o mesmo em que você roda `node tarefas.js`, e digite:

```powershell
curl.exe https://example.com
```

A resposta é o HTML do `example.com`, o mesmo texto que o navegador transforma em página. Agora o cliente é o seu terminal.

> [!warning] Por que `curl.exe` e não só `curl`?
> No PowerShell do Windows, o terminal que o VS Code usa por padrão no Windows, `curl` sozinho é um apelido de outro comando, o `Invoke-WebRequest`, que mostra a resposta de outro jeito. Com o `.exe` no fim, você chama o curl de verdade, que já vem no Windows 10 e no 11. No Git Bash, no Mac e no Linux, basta `curl`.

Para ver também o começo da resposta, com o código e os avisos, acrescente `-i`, de *include*, "incluir":

```powershell
curl.exe -i https://example.com
```

```
HTTP/1.1 200 OK
Date: Sun, 08 Nov 2026 17:58:13 GMT
Content-Type: text/html; charset=utf-8
...

<!doctype html><html lang=en><head>...
```

É a mesma resposta da espiada, agora de verdade. Para terminar, faça o que o aplicativo do tempo faz por trás: peça a temperatura a uma API.

```powershell
curl.exe "https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current=temperature_2m"
```

```json
{"latitude":-23.514938,"longitude":-46.610504, ... ,"current":{"time":"2026-11-08T17:45","interval":900,"temperature_2m":16.5}}
```

A resposta vem em JSON, e o `temperature_2m` é a temperatura em graus. As coordenadas do exemplo são de São Paulo. Para a sua cidade, procure "latitude e longitude" com o nome dela e troque os números. As aspas em volta do endereço são obrigatórias: sem elas, o PowerShell entende o `&` como um comando dele e dá erro.

## E a lista de tarefas da aula 7.5?

Na [[programacao/logica-de-programacao/modulo-7/05-mini-projeto-uma-lista-de-tarefas|aula 7.5 de Lógica]], tudo ficava num programa só: o array `tarefas`, as funções e as chamadas, no mesmo arquivo. Numa versão para a web, o programa se divide em dois. A tela fica no navegador, que é o cliente. O array e as funções ficam no servidor. Cada clique na tela vira uma requisição:

| Na tela | O navegador pede | O servidor faz | E responde |
|---|---|---|---|
| abrir o site | "me manda as tarefas" | monta a lista, como o `listarTarefas`, só que sem `console.log` | a lista, em JSON |
| escrever "Comprar pão" e clicar em Adicionar | "cria a tarefa Comprar pão" | `adicionarTarefa("Comprar pão")` | "criei" |
| marcar "Estudar laços" | "conclui Estudar laços" | `concluirTarefa("Estudar laços")` | "pronto", ou "não achei essa tarefa" |

Por que deixar a lista no servidor, e não no navegador? Porque assim o celular e o notebook veem a mesma lista: os dois perguntam ao mesmo servidor. E a lista pode continuar existindo quando você fecha o navegador. Para isso, o servidor precisa guardá-la num banco de dados. Num array, como na 7.5, ela ainda some quando o programa do servidor para.

É isso que a trilha de back-end vai construir: a lógica da 7.5, recebendo requisições e devolvendo respostas. O jeito certo de batizar esses pedidos é o assunto do módulo 7 deste curso, que volta ao CRUD citado na 7.5.

## Palavras que a aula usou antes de explicar

A aula cita várias palavras sem apresentar. Aqui vai a versão curta de cada uma. Algumas voltam com calma mais adiante no curso.

### HTML

**[[glossario/html|HTML]]** é a linguagem em que as páginas são escritas. Não é uma linguagem de programação: não tem `if`, nem laço, nem função. Ela marca o que cada pedaço do texto é, como um título, um parágrafo, um link ou uma imagem. O servidor manda o HTML como texto, e o navegador desenha a página a partir dele.

```html
<h1>Minhas tarefas</h1>
<p>Faltam 2 tarefas.</p>
```

O `<h1>` marca um título, e o `<p>`, um parágrafo. O HTML é do front-end, mesmo chegando pelo servidor. Parece contradição, e a seção "Back-end e front-end", mais abaixo, explica por que não é. Neste curso, o HTML aparece só como um dos conteúdos que uma resposta pode trazer.

### JSON

**[[glossario/json|JSON]]** é um formato de texto para mandar dados. Ele tem a mesma cara dos arrays e objetos do módulo 6 de Lógica:

```json
[
  { "titulo": "Estudar laços", "concluida": true },
  { "titulo": "Comprar pão", "concluida": false }
]
```

A diferença que mais aparece: no JSON, os nomes dos campos vão entre aspas duplas. E por que texto? Um array guardado na memória do servidor não tem como ir assim para outro computador. Ele vira texto, viaja, e do outro lado vira array de novo. O módulo 6 deste curso é todo sobre isso.

### API

**[[glossario/api|API]]** é a sigla do inglês *Application Programming Interface*, "interface de programação de aplicações". É a lista de pedidos que um programa aceita de outros programas, com o que cada pedido precisa levar e o que volta.

Pense em quem fosse usar o arquivo da sua lista de tarefas. Essa pessoa não precisa saber como o `concluirTarefa` procura a tarefa por dentro. Precisa saber só o nome da função, o que passar para ela e o que ela devolve. Essa lista de funções é a interface do seu programa. Uma API da web é a mesma ideia, só que as "funções" são chamadas por requisições HTTP. A Open-Meteo, que você chamou com o curl, é uma API de previsão do tempo.

A diferença entre um site e uma API: o site responde HTML, para uma pessoa ver. A API responde dados, quase sempre em JSON, para um programa usar. O módulo 7 é sobre como desenhar uma API.

### Banco de dados

Um **[[glossario/banco-de-dados|banco de dados]]** é um programa especializado em guardar dados de forma permanente e achá-los rápido. A lista da 7.5 sumia quando o programa terminava. Num banco de dados, ela fica guardada.

O servidor conversa com o banco de dados pedindo e recebendo dados. Nessa conversa, o servidor é o cliente. É mais um caso do mesmo programa nos dois papéis. A maioria dos bancos de dados entende uma linguagem chamada SQL.

### curl e Postman

Programas para fazer requisições à mão, sem navegador. O curl roda no terminal, e você já o usou acima. O Postman é um aplicativo com janelas e botões que faz o mesmo. Servem para testar um servidor ou uma API antes de existir uma tela.

### Back-end e front-end

**Back-end** é a parte de um sistema que **roda** no servidor: recebe as requisições, aplica as regras, conversa com o banco de dados e responde. **Front-end** é a parte que **roda** no cliente: as telas e os botões. A [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|aula 1.5]] é sobre o back-end.

#### Se o HTML é do front-end, por que quem manda é o servidor?

Porque front-end e back-end separam o código pelo lugar onde ele **roda**, e não pelo lugar onde ele fica guardado.

O HTML fica guardado no servidor só porque o navegador precisa buscá-lo em algum lugar. O servidor não roda o HTML: só entrega, do mesmo jeito que entrega uma imagem. Quem lê o HTML e desenha a página é o navegador. Por isso o HTML é do front-end. O mesmo vale para o CSS, que dá as cores e o tamanho das letras, e para o JavaScript que mexe na tela.

> [!example] O móvel desmontado
> Você compra um armário numa loja, e ele chega numa caixa, com as peças e o manual de montagem. A loja guardou a caixa e despachou, mas quem monta o armário é você, em casa. O HTML, o CSS e o JavaScript das telas são as peças e o manual: saem do servidor, mas são montados no navegador. O back-end é o que fica na loja e trabalha lá: o estoque, o caixa, o cadastro dos clientes.

| Código | Fica guardado | Roda | Lado |
|---|---|---|---|
| HTML, CSS e o JavaScript das telas | no servidor, até alguém pedir | no navegador | front-end |
| o código do servidor, como um `adicionarTarefa` que grava no banco de dados | no servidor | no servidor | back-end |

O JavaScript aparece nas duas linhas. No navegador, ele mexe na tela. No servidor, com o Node.js, o mesmo que roda o seu `tarefas.js`, ele faz o back-end.

Na prática, um servidor trabalha de um destes jeitos:

- **Só entrega arquivos prontos.** Este site é assim. Quando uma aula é publicada, um programa chamado Quartz transforma as anotações em arquivos HTML, e o GitHub guarda esses arquivos. Quando você pede uma página, o servidor do GitHub só acha o arquivo e manda, sem rodar nada dele. Foi esse servidor que apareceu como `server: GitHub.com` na aba Headers. Ninguém escreveu um back-end para este site: tudo nele é front-end, guardado num servidor que entrega arquivos.
- **Roda código para responder.** Numa loja, ou na lista de tarefas na web, o servidor busca no banco de dados e aplica as regras: aí existe back-end. Às vezes ele responde só os dados, em JSON, e o JavaScript no navegador encaixa os dados na tela. Outras vezes ele monta o HTML na hora, já com os dados dentro, e manda pronto. Mesmo assim, o servidor só escreve o HTML. Quem desenha a página continua sendo o navegador.

O papel de cada um, navegador e servidor, é o assunto da [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|aula 1.3]].

### Nuvem

"Rodar na nuvem" é rodar em computadores alugados de uma empresa, como a Amazon, o Google ou a Microsoft, em grandes centros cheios de máquinas. Você não vê nem toca no computador. Paga para usar, e o seu servidor roda lá. O nome vem de uma imagem antiga do pessoal de redes e telecomunicações, que desenhava a rede como uma nuvem.

### Script

Um programa curto, normalmente de um arquivo só, que roda do começo ao fim e termina, como o seu `tarefas.js`. Quando a aula diz que "um script em Python" pode ser cliente, é um programa desses que faz uma requisição.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Quem é o cliente?
> Você abre um aplicativo de rede social no celular, e o feed carrega com as postagens. Nessa conversa, quem é o cliente e quem é o servidor?
>
> > [!success]- Resposta
> > O aplicativo no celular é o cliente: ele pediu as postagens. O servidor é o programa da empresa da rede social, que recebeu o pedido, buscou as postagens e respondeu com elas.

> [!question] 2. Um programa, dois papéis
> O back-end de uma loja recebe do navegador o pedido "finaliza a compra". Para atender, ele pede a um serviço de pagamento "cobra 150 reais neste cartão". Em cada uma das duas conversas, quem é o cliente e quem é o servidor?
>
> > [!success]- Resposta
> > - Navegador e loja: o navegador é o cliente, e a loja é o servidor.
> > - Loja e pagamento: a loja é o cliente, e o serviço de pagamento é o servidor.
> >
> > A loja é servidor numa conversa e cliente na outra. O papel depende de quem pede, e não do programa.

> [!question] 3. Em que ordem?
> Ponha estes passos na ordem em que acontecem quando você abre a lista de produtos de uma loja:
>
> - a) o servidor busca os produtos no banco de dados
> - b) o navegador mostra os produtos na tela
> - c) o navegador manda a requisição
> - d) o servidor manda a resposta com a lista
>
> > [!success]- Resposta
> > c, a, d, b. O cliente pede, o servidor processa, o servidor responde, e só então o cliente tem o que mostrar.

> [!question] 4. Certo ou errado?
> "Servidor é um computador potente que fica numa sala refrigerada de uma empresa."
>
> > [!success]- Resposta
> > Errado, pelo menos do jeito que o curso usa a palavra. Servidor é o programa que espera pedidos e responde. Ele pode rodar numa máquina potente, num computador alugado na nuvem ou no seu notebook. O que define o servidor é o papel na conversa, e não a máquina. No dia a dia, porém, muita gente chama a máquina de servidor também.

> [!question] 5. O servidor pode puxar conversa?
> Pelo modelo requisição-resposta, um servidor pode mandar uma mensagem para o navegador sem o navegador ter pedido nada?
>
> > [!success]- Resposta
> > Não. No modelo desta aula, o servidor só fala para responder a uma requisição, e cada requisição recebe uma resposta. Quando parece que um site avisou sozinho, como uma mensagem nova que aparece num chat, por trás há um cliente que perguntou antes ou que deixou uma conversa aberta, esperando. São técnicas que ficam para depois. A regra desta aula é a do HTTP: o cliente fala primeiro.

> [!question] 6. Para que um protocolo?
> Por que cliente e servidor precisam seguir um protocolo combinado? Não bastava cada navegador pedir do seu jeito?
>
> > [!success]- Resposta
> > Se cada navegador pedisse do seu jeito, cada servidor teria que entender o jeito de cada navegador, e cada site precisaria de um navegador próprio. Com um protocolo combinado, como o HTTP, qualquer cliente conversa com qualquer servidor: o Chrome abre um site feito por qualquer pessoa, e o curl conversa com o mesmo servidor que o navegador. E, como programas não adivinham o que o outro quis dizer, as regras precisam ser exatas.

> [!question] 7. A lista de tarefas na web
> Na aula 7.5 de Lógica, esta função marcava uma tarefa como feita, procurando-a pelo título no array `tarefas`:
>
> ```js
> function concluirTarefa(titulo) {
>   for (const tarefa of tarefas) {
>     if (tarefa.titulo === titulo) {
>       tarefa.concluida = true;
>       return;
>     }
>   }
> }
> ```
>
> Agora imagine a lista num site: o array e as funções ficam no servidor, e a tela fica no navegador. Você clica para marcar "Estudar laços" como feita. O que o navegador pede, o que o servidor faz e o que ele responde?
>
> > [!success]- Resposta
> > 1. O navegador manda uma requisição dizendo, mais ou menos, "conclui a tarefa Estudar laços". O título vai junto, como o argumento de uma chamada.
> > 2. O servidor roda o equivalente ao `concluirTarefa("Estudar laços")`: procura a tarefa e muda o `concluida` para `true`.
> > 3. O servidor responde "pronto". Se a tarefa não existir, responde "não achei essa tarefa", que também é uma resposta.
> > 4. O navegador recebe a resposta e marca a tarefa na tela.
> >
> > O navegador não mexe no array, porque o array não está com ele. Ele só pede, e quem muda a tarefa é o servidor.

> [!question] 8. Requisição e função
> Você chama uma função assim: `const total = contarPendentes();`. Na web, o que faz o papel da chamada, e o que faz o papel do `return`? E o que a requisição tem de diferente de uma chamada de função?
>
> > [!success]- Resposta
> > A requisição faz o papel da chamada, e a resposta faz o papel do `return`. A diferença é que a função está no mesmo programa, e a requisição atravessa a internet até outro programa, às vezes em outro computador muito longe. Por isso ela demora mais e pode falhar no caminho, por exemplo quando o servidor está desligado.

> [!question] 9. De quem é cada cabeçalho?
> Você copiou a aba Headers do Chrome, e os títulos dos blocos sumiram. Diga se cada cabeçalho abaixo foi mandado pelo navegador, na requisição, ou pelo servidor, na resposta:
>
> ```
> accept-language: pt-BR,pt;q=0.9
> content-type: text/html; charset=utf-8
> user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) ... Chrome/157.0.0.0
> server: GitHub.com
> referer: https://luizbrazbr.github.io/JardimDigital/
> last-modified: Sun, 08 Nov 2026 18:04:56 GMT
> ```
>
> > [!success]- Resposta
> > - `accept-language`: **requisição**. Só o navegador sabe que idioma você prefere.
> > - `content-type: text/html`: **resposta**. Só o servidor sabe o que está mandando.
> > - `user-agent`: **requisição**. É o navegador dizendo quem ele é.
> > - `server`: **resposta**. É o servidor dizendo quem ele é.
> > - `referer`: **requisição**. Só o navegador sabe de que página você veio.
> > - `last-modified`: **resposta**. Só o servidor sabe quando a página mudou.
> >
> > A pergunta que resolve é sempre a mesma: quem sabe essa informação? Um detalhe para depois: o `content-type` também aparece em requisições, quando o navegador manda dados ao servidor, como num formulário. Nesse caso, quem avisa o tipo é quem está mandando o conteúdo. O módulo 5 trata disso.

> [!question] 10. Do front-end, mas vindo do servidor
> O HTML é do front-end. Mesmo assim, quando você abre uma página, quem manda o HTML é o servidor. Como as duas coisas podem ser verdade ao mesmo tempo?
>
> > [!success]- Resposta
> > Front-end e back-end separam o código pelo lugar onde ele **roda**. O HTML fica guardado no servidor, que só o entrega, sem rodar nada. Quem lê o HTML e desenha a página é o navegador, então o HTML é do front-end. Back-end é o código que roda no próprio servidor, como buscar no banco de dados. É o armário desmontado: sai da loja, mas é montado em casa.

## De onde vêm as palavras

- **[[glossario/cliente|Cliente]]**: do latim *cliēns*. Em Roma, o cliente era quem dependia de um *patronus*, o patrono: um homem importante que dava proteção e ajuda. Toda manhã, os clientes iam à casa do patrono, numa recepção chamada *salutatio*, e faziam os seus pedidos: ajuda num processo, dinheiro emprestado, apoio num negócio. Em troca, prestavam serviços quando o patrono precisava. O cliente romano já fazia o que o da web faz: vai até a porta e pede. A origem da palavra não é certa. Pode vir de *clueō*, "ser chamado, ter fama", ou de *clīnō*, "inclinar".
- **[[glossario/servidor|Servidor]]**: do latim tardio *servītor*, "quem serve", da família de *servīre*, "servir", e de *servus*, "servo". No Brasil, servidor também é o funcionário público, e em inglês *server* também é o garçom. Em todos os casos, é quem atende.
- **[[glossario/protocolo|Protocolo]]**: do grego medieval *prōtókollon*, de *prôtos*, "primeiro", e *kólla*, "cola". Era a primeira folha colada num rolo de papiro, com a data e a autenticação do documento. Depois a palavra passou a querer dizer o registro oficial de uma reunião ou negociação, e daí as regras de etiqueta da diplomacia. No século XX, chegou à computação: as regras para dois programas trocarem dados. O sentido de registro continua vivo no "número de protocolo" que uma repartição dá a quem faz um pedido. O *kólla* também está em **cola** e em **colágeno**.
- **[[glossario/requisicao|Requisição]]**: da família do latim *requīrō*, "procurar, pedir", que junta *re-* e *quaerō*, "buscar, perguntar". Do mesmo *quaerō* vêm **querer**, **questão** e **requerimento**.
- **[[glossario/resposta|Resposta]]**: de *responder*, do latim *respondeō*, que junta *re-*, "de volta", e *spondeō*, "prometer, comprometer-se". Em Roma, o contrato mais básico era feito com pergunta e resposta, usando esse verbo. Ao pé da letra, responder era "prometer de volta". Do mesmo *spondeō* vem **esposo**, "o prometido".
- **[[glossario/http|HTTP]]** e **hipertexto**: *Hypertext Transfer Protocol*, "protocolo de transferência de hipertexto". **Hipertexto** é um texto com links, que levam a outros textos. A palavra junta o grego *hypér*, "acima, além", a **texto**, do latim *textus*, "tecido". Quem a inventou foi o americano Ted Nelson, em 1965. O HTTP e o HTML foram criados por Tim Berners-Lee no CERN, um laboratório de física perto de Genebra, na Suíça, entre 1989 e 1991.

> [!tip] Para guardar
> - **Cliente** é quem pede primeiro. **Servidor** é o programa que espera e responde. São papéis numa conversa, e não tipos de máquina: o mesmo programa pode ser servidor numa conversa e cliente em outra.
> - Toda troca segue a mesma ordem: requisição, processamento, resposta. O servidor nunca começa, e toda requisição ganha uma resposta, mesmo que seja "não achei".
> - Requisição e resposta funcionam como chamar uma função e receber o `return`, só que atravessando a internet.
> - **Protocolo** é idioma mais etiqueta: o formato das mensagens, quem fala primeiro e o que cada resposta quer dizer. Na web, o protocolo é o **HTTP**.
> - **Front-end** e **back-end** separam o código pelo lugar onde ele roda. O HTML fica guardado no servidor, mas é desenhado no navegador: é front-end. Back-end é o código que roda no próprio servidor.
> - Dá para ver as requisições acontecendo: F12 e a aba Network, no navegador, ou `curl.exe` no terminal.
> - No Chrome, a aba **Headers** mostra os cabeçalhos das duas mensagens, com os da resposta em cima. A aba **Response** mostra o conteúdo da resposta: para uma página, o HTML em texto, e não a página desenhada.

Fontes: MDN: [Uma visão geral do HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Guides/Overview) · Chrome DevTools: [Network panel](https://developer.chrome.com/docs/devtools/network) · curl: [FAQ](https://curl.se/docs/faq.html) · Open-Meteo: [API](https://open-meteo.com/en/docs) · Wikipedia: [Patronage in ancient Rome](https://en.wikipedia.org/wiki/Patronage_in_ancient_Rome), [Stipulatio](https://en.wikipedia.org/wiki/Stipulatio), [HTTP](https://en.wikipedia.org/wiki/HTTP), [Markup language](https://en.wikipedia.org/wiki/Markup_language), [JSON](https://en.wikipedia.org/wiki/JSON), [API](https://en.wikipedia.org/wiki/API), [Cloud computing](https://en.wikipedia.org/wiki/Cloud_computing) · Wiktionary: [cliente](https://en.wiktionary.org/wiki/cliente), [cliēns](https://en.wiktionary.org/wiki/cliens), [servidor](https://en.wiktionary.org/wiki/servidor), [serviō](https://en.wiktionary.org/wiki/servio), [protocol](https://en.wiktionary.org/wiki/protocol), [πρωτόκολλον](https://en.wiktionary.org/wiki/%CF%80%CF%81%CF%89%CF%84%CF%8C%CE%BA%CE%BF%CE%BB%CE%BB%CE%BF%CE%BD), [cola](https://en.wiktionary.org/wiki/cola), [collagen](https://en.wiktionary.org/wiki/collagen), [requīrō](https://en.wiktionary.org/wiki/requiro), [quaerō](https://en.wiktionary.org/wiki/quaero), [querer](https://en.wiktionary.org/wiki/querer), [resposta](https://en.wiktionary.org/wiki/resposta), [respondeō](https://en.wiktionary.org/wiki/respondeo), [spondeō](https://en.wiktionary.org/wiki/spondeo), [esposo](https://en.wiktionary.org/wiki/esposo), [hypertext](https://en.wiktionary.org/wiki/hypertext), [hyper-](https://en.wiktionary.org/wiki/hyper-), [texto](https://en.wiktionary.org/wiki/texto)
