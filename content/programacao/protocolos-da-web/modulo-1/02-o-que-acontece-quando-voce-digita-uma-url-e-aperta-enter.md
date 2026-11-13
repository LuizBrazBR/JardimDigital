---
title: "1.2 O que acontece quando você digita uma URL e aperta Enter"
tags:
  - protocolos-da-web
  - http
  - url
---

Segunda aula do módulo 1. A aula 1.1 mostrou a conversa entre cliente e servidor: um pede, o outro responde. Só que, quando você digita um endereço e aperta Enter, o navegador ainda não sabe com quem vai conversar. Ele tem só um texto na barra. Esta aula mostra o que ele faz com esse texto: separa as partes, descobre onde está o servidor, abre a conversa com ele, faz o pedido e, quando a resposta chega, monta a página. Tudo isso costuma levar menos de um segundo.

## A URL

> [!abstract] Definição
> **[[glossario/url|URL]] é o endereço completo de uma coisa, quase sempre na internet. Ela diz como pedir, a quem pedir e o que pedir.**

URL é a sigla do inglês *Uniform Resource Locator*, "localizador uniforme de recursos". Cada palavra conta um pedaço da ideia:

- **Localizador**: a URL diz onde a coisa está.
- **Recurso**: a coisa em si. Pode ser qualquer coisa que se peça a um servidor: uma página, uma imagem, um vídeo, uma lista de produtos em JSON.
- **Uniforme**: todas as URLs são escritas no mesmo formato. Por isso qualquer programa, seja o Chrome, o curl ou um código seu, sabe separar as partes de qualquer URL.

No dia a dia, a URL é o "endereço" ou o "link": o texto que fica na barra, lá em cima no navegador.

## As partes de uma URL

A aula usa esta URL de exemplo, de uma loja inventada:

```
https://www.loja.com.br:443/produtos/tenis?cor=preto&tamanho=42#avaliacoes
\___/   \_____________/ \_/\_____________/ \__________________/ \________/
  |            |         |        |                 |               |
esquema      host      porta   caminho        query string      fragmento
```

Cada parte responde a uma pergunta:

| Pedaço da URL | Nome da parte | A pergunta que ele responde |
|---|---|---|
| `https` | esquema | como conversar? |
| `www.loja.com.br` | host | com quem conversar? |
| `443` | porta | em que porta desse computador bater? |
| `/produtos/tenis` | caminho | o que pedir? |
| `cor=preto&tamanho=42` | query string | com que detalhes? |
| `avaliacoes` | fragmento | para onde rolar a página, quando ela chegar? |

> [!info] Como ler o quadro da aula
> A aula mostra as partes assim:
>
> ```
> https               <- esquema (protocolo usado: http, https...)
> www.loja.com.br     <- host (o dominio; "quem" vai responder)
> ```
>
> Cada linha tem três pedaços:
>
> 1. À esquerda, o pedaço recortado da URL, do jeito que aparece nela: `https`.
> 2. A seta `<-` aponta para esse pedaço, e logo depois dela vem o **nome** dele: esquema.
> 3. Entre parênteses, uma observação sobre o que ele faz.
>
> A primeira linha, então, quer dizer: "o pedaço `https` se chama **esquema**, e é ele que diz qual protocolo usar; pode ser `http`, `https` e outros". A segunda: "o pedaço `www.loja.com.br` se chama **host**; também é chamado de domínio, e diz quem vai responder". A tabela acima é o mesmo quadro, com uma coluna para cada pedaço.

### Os sinais entre as partes

As partes vêm grudadas, sem espaço entre elas. O que separa uma da outra são sinais fixos:

| Sinal | O que ele marca |
|---|---|
| `://` | o fim do esquema e o começo do host |
| `:`, depois do host | o começo da porta |
| `/` | o começo do caminho. Dentro dele, cada `/` separa um nível, como uma pasta dentro de outra |
| `?` | o começo da query string |
| `&` | a divisa entre dois detalhes da query string |
| `=` | a divisa entre o nome e o valor de cada detalhe |
| `#` | o começo do fragmento |

É procurando esses sinais que o navegador acha cada parte, do mesmo jeito que você acha o fim de uma frase pelo ponto final. Por isso a ordem das partes nunca muda: o `?` sempre vem depois do caminho, e o `#` fica sempre por último.

### Esquema: como conversar

O **[[glossario/esquema|esquema]]** é o começo da URL, antes do `://`. Nos endereços da web, ele diz qual protocolo o navegador deve usar na conversa:

- `http`: o [[glossario/http|HTTP]] da aula 1.1, sem proteção. Quem estiver no meio do caminho consegue ler a conversa.
- `https`: o mesmo HTTP, só que protegido. O *s* é de *secure*, "seguro". Hoje, quase todo site usa este. O passo 4, mais abaixo, conta o que muda, e a aula 2.5 é toda sobre isso.

#### Afinal, o nome é esquema ou protocolo?

As duas palavras estão certas, cada uma no seu lugar. **Esquema** é o nome da parte. **Protocolo** é o que essa parte informa, nos endereços da web.

Pense numa variável:

```js
const esquema = "https";
```

A variável se chama `esquema`, e o valor guardado nela é `"https"`. E `"https"` é o nome de um protocolo. Na URL é igual: a parte se chama esquema, e o que vem escrito nela é um protocolo.

Por que, então, a parte não se chama logo "protocolo"? Porque nem toda URL é um endereço da web, e nem todo esquema é um protocolo para conversar com um servidor:

| URL | Esquema | O que acontece quando você abre |
|---|---|---|
| `https://www.loja.com.br` | `https` | o navegador pede a página ao servidor da loja, pelo HTTPS |
| `http://localhost:3000` | `http` | o navegador pede a página pelo HTTP, sem proteção, a um servidor no seu próprio computador |
| `mailto:fulano@exemplo.com` | `mailto` | abre o programa de e-mail, com o destinatário já preenchido. Nenhum servidor é chamado |
| `file:///C:/Users/voce/Desktop/pagina.html` | `file` | abre um arquivo do seu computador, sem passar pela internet |

O `mailto` e o `file` não são protocolos de conversa: um abre outro programa, e o outro abre um arquivo. O esquema é mais geral do que um protocolo. Ele diz que tipo de endereço é aquele e como ler o resto. Só nos endereços da web esse tipo é um protocolo. Por isso as regras oficiais das URLs chamam essa parte de *scheme*, "esquema" em inglês.

Mesmo assim, muita gente chama essa parte de protocolo, e até o JavaScript faz isso: o objeto `URL`, que aparece na seção "Veja com os próprios olhos", guarda o esquema numa propriedade chamada `protocol`. Quando alguém falar "o protocolo da URL", está falando do esquema.

#### Então qualquer coisa pode ser uma URL?

Qualquer coisa, não. Qualquer texto escrito **no formato** de URL, sim. Uma URL não precisa ser um endereço da web. O que faz um texto ser uma URL é o jeito como ele está escrito, e não o que ele aponta.

A regra que vale para toda URL é esta: **ela começa com um esquema, que é uma palavra, seguido de dois-pontos**. Depois do `:`, cada esquema tem o seu jeito de escrever o resto. O `https` pede `://`, host e caminho. O `mailto` pede só um e-mail. O `tel`, de "telefone", pede um número: `tel:+5511999999999` é a URL que, num celular, abre a discagem com o número preenchido.

Os endereços da web são as URLs que começam com `http:` ou `https:`. São as mais comuns, e por isso a gente costuma pensar que URL é só isso.

Para saber se um texto é uma URL, olhe o começo:

| Texto | É URL? | Por quê |
|---|---|---|
| `https://www.loja.com.br` | sim | começa com o esquema `https` e os dois-pontos |
| `mailto:fulano@exemplo.com` | sim | começa com o esquema `mailto` e os dois-pontos |
| `www.loja.com.br` | não | falta o esquema. Quando você digita isso na barra, o navegador põe o `https://` na frente por conta própria, e só então vira URL |
| `/estilos.css` | não, sozinho | é só o caminho, um pedaço de URL. Quem completa é o navegador, com o começo da página em que ele aparece. A seção "Uma página, muitas requisições" mostra isso |
| `oi tudo bem` | não | não tem esquema nenhum |

O JavaScript faz esse teste por você. O `new URL(...)` da seção "Veja com os próprios olhos" aceita o texto se ele está no formato e dá erro se não está:

```js
new URL("mailto:fulano@exemplo.com");  // aceita: o esquema é mailto
new URL("www.loja.com.br");            // erro: TypeError: Invalid URL
```

Duas pegadinhas:

- **Estar no formato não quer dizer que alguém entende.** `banana:qualquer-coisa` também passa no `new URL`, porque tem uma palavra e dois-pontos no começo. Só que nenhum programa sabe o que fazer com o esquema `banana`. Ser URL é questão de formato, e funcionar depende de algum programa conhecer aquele esquema.
- **Um caminho de arquivo do Windows parece URL.** Em `C:\Users\voce\pagina.html`, o `C:` parece um esquema, e o `new URL` lê assim mesmo, com o esquema `c`. Por isso, para apontar um arquivo como URL, se escreve com o esquema `file`: `file:///C:/Users/voce/pagina.html`.

#### E URI, é a mesma coisa que URL?

Quase. Você vai encontrar também a sigla **URI**, de *Uniform Resource Identifier*, "identificador uniforme de recurso". URL é *Uniform Resource Locator*, "localizador uniforme de recurso". A diferença está na última palavra: identificar e localizar.

A regra antiga das URLs, de 2005, separa as duas assim:

- **URI** é qualquer texto no formato `esquema:resto`. Ela dá um nome a alguma coisa.
- **URL** é a URI que diz **onde** a coisa está, e como chegar nela.

Toda URL é uma URI, mas nem toda URI é uma URL. O exemplo clássico é `urn:isbn:9788535902778`. O ISBN é o número que todo livro publicado recebe, e essa URI dá nome a um livro. Só que ela não diz onde o livro está: nenhum programa abre esse texto e te entrega o livro.

As URLs desta aula, inclusive `mailto:` e `file:`, dizem onde a coisa está. O `file:///C:/Users/voce/pagina.html` diz em que pasta do seu computador fica o arquivo. Então elas são URLs, e são URIs também. Não acredite em quem disser que `file:` "não é URL, é URI" só porque não é endereço de site. URL não quer dizer endereço de site.

Hoje a separação quase não se usa. O padrão que os navegadores seguem, o *URL Standard*, chama tudo de URL, inclusive o `urn:`. Por isso o `new URL("urn:isbn:9788535902778")` funciona. No dia a dia, fale URL. A palavra URI aparece mais em documentação técnica antiga e em algumas linguagens de programação.

### Host: com quem conversar

O **[[glossario/host|host]]**, `www.loja.com.br`, é o nome do computador onde roda o servidor que vai responder.

Só que os computadores, na internet, não se acham pelo nome. Eles se acham por números, os **endereços IP**, como o `185.199.108.153` que apareceu na aula 1.1, no `Remote address` da aba Headers. Os nomes existem para as pessoas, que não iam decorar esses números. É como a lista de contatos do celular: você toca em "Mãe", e o celular liga para o número guardado com esse nome. Por isso, antes de conversar, o navegador precisa trocar o nome pelo número. É o passo 2, mais abaixo.

#### Host ou domínio?

A aula chama o host também de domínio. As duas palavras são quase a mesma coisa, e muita gente usa uma pela outra. Quando há diferença, é esta:

- O **[[glossario/dominio|domínio]]** é o nome que alguém registrou e que passou a ser dele, como `loja.com.br`. Quem registrou pode criar outros nomes dentro do domínio: `www.loja.com.br`, `api.loja.com.br`, `blog.loja.com.br`.
- O **host** é o nome completo que vem na URL, o do computador que o navegador vai procurar: aqui, `www.loja.com.br`.

O nome se lê da direita para a esquerda, do mais geral para o mais específico. `.br` é o Brasil. `.com` é o tipo, comercial. `loja` é o nome escolhido por quem registrou. E `www` é um nome criado dentro do domínio, um costume que vem do começo da web: são as iniciais de *World Wide Web*. Muitos sites respondem com e sem o `www`.

Este site é um exemplo. O host é `luizbrazbr.github.io`, e o domínio, `github.io`, é do GitHub. O GitHub dá a cada pessoa um nome dentro dele, para publicar as suas páginas.

### Porta: em que porta bater

O IP leva até um computador. Só que um computador pode rodar vários servidores ao mesmo tempo: o do site, o do banco de dados, o do e-mail. A **[[glossario/porta|porta]]** é um número que diz com qual deles você quer falar. Cada servidor fica escutando numa porta, à espera dos pedidos que chegam nela. O "ficar escutando" da aula 1.1 é isso.

> [!example] O prédio e o apartamento
> O endereço de um prédio leva até o prédio, mas não até a pessoa. Para isso, falta o número do apartamento. O IP é o endereço do prédio, e a porta é o número do apartamento.

Cada protocolo tem uma porta combinada, chamada **porta padrão**: a do HTTP é a 80, e a do HTTPS é a 443. Quando a URL usa a porta padrão, você não precisa escrever o número, porque o navegador já sabe qual é. Por isso quase nunca se vê uma porta numa URL. Estes dois endereços são o mesmo:

```
https://www.loja.com.br:443/produtos/tenis
https://www.loja.com.br/produtos/tenis
```

Mesmo quando não está escrita, a porta é usada. Na aula 1.1, o `Remote address` era `185.199.108.153:443`: o IP, os dois-pontos e a porta. A URL não tinha porta nenhuma escrita, mas começava com `https`, então o navegador bateu na 443.

Quando você escrever o seu primeiro back-end, vai ver endereços como `http://localhost:3000`. O `localhost` é um nome especial que quer dizer "este computador mesmo". Ali a porta precisa ser escrita, porque a 3000 não é a porta padrão do HTTP: é um número livre, que muita gente usa para testar. A [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]] volta ao IP e à porta com calma.

### Caminho: o que pedir

O **[[glossario/caminho|caminho]]**, `/produtos/tenis`, diz o que você quer dentro do site. Ele sempre começa com uma barra. A barra sozinha, `/`, é a página inicial, como no `GET /` da aula 1.1.

O caminho lembra o endereço de uma pasta no seu computador, como `C:\Users\voce\Documentos\Estudo`. A diferença é que a web usa a barra normal, `/`, e o Windows usa a barra invertida, `\`.

Às vezes o caminho é mesmo uma pasta e um arquivo: neste site, cada caminho leva a um arquivo HTML que o Quartz gerou. Outras vezes, não existe pasta nenhuma: o back-end lê o caminho e decide o que fazer, como procurar no banco de dados os produtos da categoria "tenis". O navegador não sabe qual dos dois é, e nem precisa saber: ele só manda o caminho.

### Query string: com que detalhes

A **[[glossario/query-string|query string]]** é o que vem depois do `?`: `cor=preto&tamanho=42`. São detalhes do pedido. O caminho diz o que você quer, os tênis. A query string diz quais: os pretos, de tamanho 42. Trocando só a query string, o pedido muda, mas o caminho continua o mesmo:

```
https://www.loja.com.br/produtos/tenis?cor=preto&tamanho=42
https://www.loja.com.br/produtos/tenis?cor=branco&tamanho=40
```

O formato é sempre o mesmo: pares `nome=valor`, separados por `&`. Cada par se chama **parâmetro**. Este exemplo tem dois: `cor`, com o valor `preto`, e `tamanho`, com o valor `42`.

É parecido com chamar uma função. Na Lógica, uma função com dois parâmetros seria assim:

```js
function buscarTenis(cor, tamanho) {
  // procura os tênis com essa cor e esse tamanho
}

buscarTenis("preto", 42);
```

Na função, os nomes `cor` e `tamanho` ficam na declaração, e a chamada leva só os valores, na ordem certa. Na query string, cada valor vai junto com o nome: `cor=preto`. Por isso, ali, a ordem não importa: `?tamanho=42&cor=preto` pede os mesmos tênis.

Você já usou uma query string na aula 1.1, no curl da previsão do tempo:

```
https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current=temperature_2m
```

São três parâmetros: `latitude`, `longitude` e `current`. O `&`, que o PowerShell confundia com um comando dele quando faltavam as aspas, é o sinal entre um parâmetro e outro. Outra que aparece todo dia: quando você pesquisa "gatos" no Google, a URL na barra começa com `https://www.google.com/search?q=gatos`. O parâmetro é o `q`, de *query*.

O nome vem do inglês: *query* é "consulta, pergunta", e *string* é texto, como as [[glossario/string|strings]] do JavaScript. A query string é o pedaço de texto com a consulta.

### Fragmento: para onde rolar

O **[[glossario/fragmento|fragmento]]** é o que vem depois do `#`: `avaliacoes`. Ele aponta para um lugar dentro da página. Quando a página chega, o navegador rola a tela até a parte que tem esse nome, no exemplo, a seção de avaliações do tênis.

O fragmento é a única parte que **nunca chega ao servidor**. O navegador fica com ele e manda o resto. Faz sentido: o servidor manda a página inteira de qualquer jeito, e rolar a tela é trabalho do navegador.

Dá para ver neste site. Cada título de seção tem um nome, e este link leva direto à seção "Servidor" da aula 1.1:

[https://luizbrazbr.github.io/JardimDigital/programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web#servidor](https://luizbrazbr.github.io/JardimDigital/programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web#servidor)

O servidor do GitHub recebe o pedido da aula inteira, sem o `#servidor`. Quem rola até a seção é o navegador.

### O que o navegador faz com cada parte

Depois de separar as partes, o navegador usa cada uma num momento diferente:

| Parte | O que o navegador faz com ela |
|---|---|
| esquema | escolhe o protocolo: HTTP, ou HTTPS, com a proteção |
| host | descobre o IP do servidor, e também manda o nome junto com o pedido, no cabeçalho `Host` |
| porta | bate nessa porta do servidor, ou na porta padrão, se a URL não disser nenhuma |
| caminho e query string | escreve os dois na primeira linha da requisição |
| fragmento | fica com ele, para usar quando a página chegar |

A URL de exemplo vira esta requisição, no formato da espiada da aula 1.1:

```http
GET /produtos/tenis?cor=preto&tamanho=42 HTTP/1.1
Host: www.loja.com.br
```

O esquema e a porta não aparecem escritos nela, porque já foram usados antes, para abrir a conversa. E o `avaliacoes` não aparece porque nunca sai do navegador.

## Do Enter até a página

Agora, o caminho inteiro, na ordem. Para acompanhar, pense numa ligação de telefone: você procura o contato, o celular disca, a pessoa atende e só então você fala.

```
Enter
 1. separa as partes da URL           (usa a URL inteira)
 2. troca o nome pelo IP, no DNS      (usa o host)
 3. abre a conexão com o servidor     (usa o IP e a porta)
 4. combina a proteção, no TLS        (só se o esquema for https)
 5. manda a requisição HTTP           (usa o caminho e a query string)
 6. o servidor processa e responde
 7. o navegador desenha a página      (e usa o fragmento para rolar)
```

### 1. Separar as partes

O navegador lê o texto da barra e corta nos sinais: `://`, `:`, `/`, `?` e `#`. Esse trabalho de ler um texto, separar as partes e dizer o que cada uma é se chama **[[glossario/parse|parse]]**, palavra inglesa que se lê "párs". Em português, se diz "fazer o parse" ou "parsear". Quando a aula fala em "parse da URL", é deste passo.

Aqui o navegador também resolve dois casos:

- Se o texto não parece uma URL, como `tenis preto`, o navegador entende que é uma pesquisa e monta uma URL do site de busca, com o texto na query string. Algo como `https://www.google.com/search?q=tenis+preto`.
- Se falta o esquema, como em `loja.com.br`, o navegador completa. Os navegadores de hoje tentam primeiro com `https`.

#### O que é um parser

A parte do programa que faz o parse se chama **parser**. Ela recebe um texto, entende a estrutura dele e devolve ao programa uma versão organizada, que ele consegue usar. Se o texto está fora do formato, o parser devolve um erro.

Mas, se o texto já tem estrutura, por que precisa de parser? Porque a estrutura está **escrita**, e o programa ainda não consegue usá-la. Veja este HTML:

```html
<ul><li>Arroz</li><li>Feijão</li></ul>
```

Você olha e vê uma lista com dois itens. O programa vê uma fila de caracteres: `<`, `u`, `l`, `>`, `<`, `l`, `i`... Ele não sabe que "Arroz" está dentro de um item, nem que o item está dentro da lista. O parser lê caractere por caractere e monta essa estrutura na memória:

```
ul
├── li → "Arroz"
└── li → "Feijão"
```

Agora o programa responde na hora "quantos itens tem a lista?" ou "qual é o segundo?", sem reler o texto. O parser não inventa a estrutura: ela já estava no texto, e ele só a deixa pronta para uso. Por isso só existe parser para formatos que têm regras. Num texto como `oi tudo bem`, não há estrutura para procurar.

Existe parser para quase todo formato que um programa precisa entender. Só nessa ida à página, o navegador usa vários:

| Entra (texto) | Sai (estrutura organizada) |
|---|---|
| a URL | o esquema, o host, a porta, o caminho... |
| a resposta HTTP | o código de status, os cabeçalhos e o corpo, separados |
| o HTML | a árvore de elementos que o navegador desenha |
| o CSS | o estilo de cada elemento |
| o JavaScript | a estrutura do código, pronta para ser executada |
| um JSON, com `JSON.parse` | objetos e arrays de verdade |

Cuidado para não chamar o parser de interpretador. Na programação, **interpretador** é o programa que **executa** código. O parser só lê e organiza. No JavaScript dá para ver os dois: primeiro o parser entende o código, e só depois outra parte do navegador o executa. Em português, o nome técnico do parser é *analisador sintático*, com o mesmo "sintático" da análise sintática da escola.

### 2. Trocar o nome pelo IP: o DNS

O navegador tem o nome, `www.loja.com.br`, mas precisa do número. Para isso, ele pergunta ao **DNS**, sigla do inglês *Domain Name System*, "sistema de nomes de domínio". O DNS é a lista de contatos da internet: recebe um nome e devolve o IP. A [[programacao/protocolos-da-web/modulo-1/04-enderecos-na-internet-ip-dns-e-porta|aula 1.4]] mostra como ele funciona por dentro.

Se você abriu o site há pouco, o computador já guardou a resposta, e este passo fica mais rápido.

### 3. Abrir a conexão

Com o IP e a porta, o navegador chama o servidor, e os dois trocam um primeiro "alô": o navegador avisa que quer conversar, o servidor responde que está ouvindo, e o navegador confirma. Depois disso existe uma **conexão**: um canal aberto entre os dois, por onde as mensagens vão passar. É a ligação completada. O telefone tocou e a pessoa atendeu, mas ninguém disse nada ainda.

Essa troca de abertura se chama **aperto de mão**, do inglês *handshake*, porque é o cumprimento que vem antes da conversa. Como são três mensagens, em inglês ela também é chamada de *three-way handshake*, "aperto de mão em três tempos".

Essa parte não é do HTTP. Na maioria das vezes, quem cuida dela é outro protocolo, o **TCP**, sigla de *Transmission Control Protocol*, "protocolo de controle de transmissão". É ele que dita as regras da conexão: além do aperto de mão, garante que as mensagens cheguem inteiras e na ordem certa, e manda de novo o que se perder. O TCP é um dos que levam o HTTP de um computador a outro, como os Correios levam a carta da aula 1.1.

### 4. Combinar a proteção: o TLS

Este passo só acontece quando o esquema é `https`. Antes de mandar qualquer pedido, navegador e servidor trocam algumas mensagens para combinar a proteção da conversa. É um **segundo aperto de mão**, logo depois do aperto de mão do TCP, e acontece por dentro da mesma conexão. *Handshake* não é nome de um protocolo só: é como se chama qualquer troca de abertura, e cada protocolo tem a sua. As regras deste segundo aperto de mão são de mais um protocolo, o **TLS**, sigla de *Transport Layer Security*, "segurança da camada de transporte". Ele não abre outra conexão: põe uma camada de proteção por cima da que o TCP abriu.

Nessa troca, acontecem duas coisas:

- O servidor prova que é mesmo o dono do nome `www.loja.com.br`, e não um impostor fingindo ser a loja.
- Os dois combinam uma chave para **criptografar** tudo o que vier depois, isto é, embaralhar as mensagens de um jeito que só eles dois sabem desembaralhar. Quem estiver no meio do caminho, como alguém no mesmo Wi-Fi de uma lanchonete, vê só letras sem sentido. Criptografar vem do grego *kryptós*, "escondido", e *gráphein*, "escrever": escrever escondido.

Com `http`, este passo não existe, e a conversa passa aberta, como um cartão-postal que qualquer um no caminho pode ler. A aula 2.5 mostra o TLS por dentro.

### 5. Mandar a requisição

Com o canal aberto, e protegido, se for HTTPS, o navegador finalmente manda o pedido. Ele o monta com o caminho, a query string e o host:

```http
GET /produtos/tenis?cor=preto&tamanho=42 HTTP/1.1
Host: www.loja.com.br
```

Daqui em diante, é a conversa da aula 1.1.

### 6. O servidor processa e responde

O servidor da loja recebe o pedido, lê o caminho e a query string, procura no banco de dados os tênis pretos de tamanho 42, monta a página e responde. Esse é o trabalho do back-end, o assunto da [[programacao/protocolos-da-web/modulo-1/05-o-que-e-um-back-end-e-o-que-ele-faz|aula 1.5]].

### 7. O navegador desenha a página

A resposta chega com o HTML. O navegador lê o HTML e desenha a página na tela, pondo os títulos, os textos e as imagens, cada coisa no seu lugar. Esse desenho se chama **[[glossario/renderizar|renderizar]]**, do inglês *render*. Se a URL tinha um fragmento, é agora que o navegador rola até ele.

Ninguém percebe os sete passos porque cada um leva milésimos de segundo. A seção "Veja com os próprios olhos" mede quanto.

### Os passos 2, 3 e 4 não se repetem a cada pedido

Uma página pede muitos arquivos ao mesmo servidor, como mostra a próxima seção. Se o navegador refizesse o DNS, a conexão e o TLS para cada arquivo, a página ia demorar muito mais. Por isso ele aproveita a conexão que já está aberta: os pedidos seguintes ao mesmo servidor pulam direto para o passo 5. É como pedir a segunda coisa na mesma ligação, em vez de desligar e ligar de novo.

## Uma página, muitas requisições

A aula 1.1 contou que uma página custa muitas requisições. O motivo está dentro do HTML. Ao renderizar a página, o navegador encontra linhas como estas:

```html
<link rel="stylesheet" href="/estilos.css">
<img src="/imagens/tenis-preto.jpg">
<script src="https://arquivos.exemplo.com/app.js"></script>
```

Cada `href` e cada `src` traz uma URL, e para cada uma o navegador faz mais uma requisição.

As duas primeiras estão pela metade: têm só o caminho. Quando falta o começo, o navegador completa com o esquema, o host e a porta da própria página. Assim, `/estilos.css` vira `https://www.loja.com.br/estilos.css`. Como o servidor é o mesmo da página, o pedido vai pela conexão que já está aberta.

A terceira é completa e aponta para outro host, `arquivos.exemplo.com`. Para esse, o navegador faz o caminho todo de novo, com DNS, conexão e TLS. Muitos sites buscam em outros servidores as fontes das letras, os vídeos e os anúncios.

E a lista cresce: um arquivo de estilos também pode pedir outros arquivos, como uma fonte de letras. A página só fica completa quando todas essas respostas chegam.

## Veja com os próprios olhos

### As partes de uma URL, no Node

O JavaScript já vem com um jeito de separar as partes de uma URL: o objeto `URL`. Crie um arquivo `url.js`, na pasta em que você costuma rodar os seus programas, com este código:

```js
const url = new URL("https://www.loja.com.br:443/produtos/tenis?cor=preto&tamanho=42#avaliacoes");

console.log(url.protocol);  // o esquema
console.log(url.hostname);  // o host
console.log(url.port);      // a porta
console.log(url.pathname);  // o caminho
console.log(url.search);    // a query string, com o ?
console.log(url.hash);      // o fragmento, com o #
console.log(url.searchParams.get("cor"));
console.log(url.searchParams.get("tamanho"));
console.log(url.href);      // a URL inteira, montada de volta
```

Rode com `node url.js`. A saída é esta:

```
https:
www.loja.com.br

/produtos/tenis
?cor=preto&tamanho=42
#avaliacoes
preto
42
https://www.loja.com.br/produtos/tenis?cor=preto&tamanho=42#avaliacoes
```

Três coisas para reparar:

- **O esquema está numa propriedade chamada `protocol`**, e vem com os dois-pontos: `https:`. É o JavaScript chamando o esquema de protocolo, como se contou lá em cima.
- **A porta saiu vazia**, uma linha em branco. Como 443 é a porta padrão do `https`, o objeto `URL` jogou o número fora. Na última linha, a URL inteira volta sem o `:443`. É a prova de que os dois endereços são o mesmo.
- **`searchParams.get("tamanho")` devolve `42` como texto**, a string `"42"`, e não o número 42. Numa URL, tudo é texto. Quando um back-end recebe um número pela query string, precisa convertê-lo, com `Number(...)`, antes de fazer conta com ele.

Para desmontar uma URL de verdade, troque o texto entre aspas por qualquer endereço copiado da barra do navegador, como o da Open-Meteo, e rode de novo.

### O caminho inteiro, no terminal

O curl conta os passos que deu, se você pedir. No terminal do VS Code:

```powershell
curl.exe -sv -o NUL "https://example.com/?cor=preto#avaliacoes"
```

O `-v`, de *verbose*, "detalhado", manda o curl escrever um relatório do que está fazendo. O `-s`, de *silent*, "silencioso", esconde a barra de progresso, que embaralharia o relatório. E o `-o NUL` joga fora o HTML da resposta, para sobrar só o relatório. O começo é assim (os números do IP podem sair diferentes):

```
* Host example.com:443 was resolved.
* IPv6: (none)
* IPv4: 104.20.23.154, 172.66.147.243
*   Trying 104.20.23.154:443...
* schannel: disabled automatic use of client certificate
* ALPN: curl offers http/1.1
* ALPN: server accepted http/1.1
* Established connection to example.com (104.20.23.154 port 443) ...
* using HTTP/1.x
> GET /?cor=preto HTTP/1.1
> Host: example.com
> User-Agent: curl/8.21.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Content-Type: text/html; charset=utf-8
...
```

Cada grupo de linhas é um dos passos:

| Linhas | Passo |
|---|---|
| `was resolved` ("foi resolvido") e `IPv4: ...` | **2.** o DNS trocou o nome pelo IP. Vieram dois IPs, e o curl tenta o primeiro |
| `Trying 104.20.23.154:443...` ("tentando") | **3.** a conexão, no IP e na porta 443 |
| as linhas `schannel` e `ALPN` | **4.** o TLS. O *Schannel* é a peça do Windows que faz o TLS. No `ALPN`, os dois combinam qual versão do HTTP vão falar: o curl oferece a 1.1, e o servidor aceita. As versões são o assunto da aula 2.4 |
| `Established connection` ("conexão estabelecida") | o fim dos passos 3 e 4: para o curl, a conexão só fica pronta quando a proteção também está |
| as linhas com `>` | **5.** a requisição que o curl mandou |
| as linhas com `<` | **6.** a resposta do servidor |

Repare na linha do `GET`. O `?cor=preto` foi junto, mas o `#avaliacoes` sumiu: o fragmento ficou com o curl e não chegou ao servidor. Mais abaixo, depois das linhas com `>`, podem aparecer outras linhas `schannel`. São ajustes do TLS, e dá para ignorar.

### Quanto tempo leva cada passo

O curl também mede o tempo de cada passo. O comando é comprido, mas é um só, numa linha:

```powershell
curl.exe -s -o NUL -w 'dns: %{time_namelookup}s\nconexao: %{time_connect}s\ntls: %{time_appconnect}s\nprimeiro byte: %{time_starttransfer}s\ntotal: %{time_total}s\n' https://example.com
```

```
dns: 0.021147s
conexao: 0.034657s
tls: 0.054064s
primeiro byte: 0.071781s
total: 0.071833s
```

O `-w`, de *write-out*, "escrever no fim", manda o curl escrever esses tempos depois de terminar. Cada número é o tempo, em segundos, desde o começo até o fim daquele passo. Neste exemplo, o DNS terminou com 21 milésimos de segundo, a conexão com 35, o TLS com 54, e o primeiro pedaço da resposta chegou com 72. O caminho inteiro levou menos de um décimo de segundo. Os seus números vão sair diferentes, porque dependem da sua internet e da distância até o servidor.

### No Chrome: a aba Timing

Na aba **Network** do F12, clique numa requisição e abra a aba **Timing**, ao lado de Headers e Response. Ela mostra os mesmos passos em barras coloridas:

| No Chrome | O passo |
|---|---|
| **DNS Lookup** | 2, o DNS |
| **Initial connection** | 3, a conexão |
| **SSL** | 4, o TLS. SSL é o nome do protocolo que veio antes do TLS, e muita gente ainda chama o TLS assim |
| **Request sent** | 5, o pedido indo |
| **Waiting for server response** (em algumas versões, **Waiting (TTFB)**) | 6, o servidor processando |
| **Content Download** | 6, a resposta chegando |

Nas requisições que aproveitaram uma conexão já aberta, as três primeiras linhas nem aparecem, porque esses passos não foram feitos de novo. Para vê-las, abra um site que você não visitou hoje.

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Separe as partes
> Esta é a URL que você usou na aula 1.1 para pedir a temperatura:
>
> ```
> https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.63&current=temperature_2m
> ```
>
> Diga qual é o esquema, o host, a porta, o caminho, a query string e o fragmento.
>
> > [!success]- Resposta
> > - esquema: `https`
> > - host: `api.open-meteo.com`
> > - porta: não está escrita. Como o esquema é `https`, é a 443, a porta padrão
> > - caminho: `/v1/forecast`
> > - query string: `latitude=-23.55&longitude=-46.63&current=temperature_2m`, com três parâmetros
> > - fragmento: não tem. Não há `#` na URL
> >
> > Repare no host: `api` é um nome criado dentro do domínio `open-meteo.com`, como o `www` da loja.

> [!question] 2. Esquema ou protocolo?
> Num site, um botão "Fale conosco" leva a esta URL:
>
> ```
> mailto:contato@loja.com.br
> ```
>
> Qual é o esquema? Ele diz qual protocolo o navegador vai usar para conversar com um servidor?
>
> > [!success]- Resposta
> > O esquema é `mailto`, o pedaço antes dos dois-pontos. Ele não é um protocolo de conversa com um servidor: só manda o computador abrir o programa de e-mail, com o destinatário já preenchido. É por isso que a parte se chama esquema. Ela diz que tipo de endereço é aquele, e só nos endereços da web, com `http` e `https`, esse tipo é um protocolo.

> [!question] 3. O que chega ao servidor?
> Você abre esta URL:
>
> ```
> https://www.loja.com.br/produtos/tenis?cor=preto#avaliacoes
> ```
>
> Escreva a primeira linha da requisição que o navegador manda, e o cabeçalho `Host`.
>
> > [!success]- Resposta
> > ```http
> > GET /produtos/tenis?cor=preto HTTP/1.1
> > Host: www.loja.com.br
> > ```
> >
> > O caminho e a query string vão na primeira linha. O host vai no cabeçalho `Host`. O `#avaliacoes` não vai: o navegador fica com ele, para rolar a página quando ela chegar.

> [!question] 4. Mesmo endereço?
> Destas três URLs, quais levam exatamente à mesma conversa?
>
> ```
> https://www.loja.com.br:443/produtos
> https://www.loja.com.br/produtos
> http://www.loja.com.br/produtos
> ```
>
> > [!success]- Resposta
> > As duas primeiras. A 443 é a porta padrão do `https`, então escrever ou não o número dá no mesmo.
> >
> > A terceira começa com `http`. Ela vai para outra porta, a 80, a padrão do `http`, e sem o passo do TLS: a conversa passa sem proteção. Hoje, a maioria dos sites responde a ela com um aviso para ir à versão `https`. Esses avisos são o assunto da aula 4.3.

> [!question] 5. A lista de tarefas no seu computador
> Quando você fizer a lista de tarefas da aula 7.5 de Lógica virar um servidor, vai abrir no navegador um endereço assim:
>
> ```
> http://localhost:3000/tarefas
> ```
>
> Diga o esquema, o host, a porta e o caminho. Por que aqui a porta precisa estar escrita?
>
> > [!success]- Resposta
> > - esquema: `http`
> > - host: `localhost`, que quer dizer "este computador mesmo"
> > - porta: `3000`
> > - caminho: `/tarefas`
> >
> > A porta precisa estar escrita porque a 3000 não é a porta padrão do `http`, que é a 80. Sem o número, o navegador bateria na 80, e o seu servidor está escutando na 3000.

> [!question] 6. Em que ordem?
> Ponha estes passos na ordem em que acontecem, depois que você digita `https://www.loja.com.br` e aperta Enter:
>
> - a) o navegador desenha a página
> - b) navegador e servidor combinam a proteção, no TLS
> - c) o navegador troca o nome pelo IP, no DNS
> - d) o navegador manda o `GET`
> - e) o navegador abre a conexão com o servidor
> - f) o servidor responde com o HTML
>
> > [!success]- Resposta
> > c, e, b, d, f, a. Primeiro o navegador descobre o número (DNS), depois liga para ele (conexão), combina a proteção (TLS), faz o pedido (`GET`), recebe a resposta e só então desenha a página. Antes de tudo isso vem o passo 1, separar as partes da URL.

> [!question] 7. Trinta arquivos, um servidor
> Uma página pede 30 arquivos (estilos, imagens e scripts), todos ao mesmo servidor da própria página. O navegador faz o DNS, a conexão e o TLS 30 vezes?
>
> > [!success]- Resposta
> > Não. Ele faz esses passos uma vez e aproveita a conexão aberta para os pedidos seguintes, que pulam direto para o passo 5, mandar a requisição. Só um arquivo de outro host, como `arquivos.exemplo.com`, obriga o navegador a fazer o caminho todo de novo, para esse outro servidor.

> [!question] 8. Mude o pedido
> Esta URL mostra os tênis pretos de tamanho 42:
>
> ```
> https://www.loja.com.br/produtos/tenis?cor=preto&tamanho=42
> ```
>
> Escreva a URL dos tênis brancos de tamanho 40. Que parte da URL mudou?
>
> > [!success]- Resposta
> > ```
> > https://www.loja.com.br/produtos/tenis?cor=branco&tamanho=40
> > ```
> >
> > Só a query string mudou. O caminho continua o mesmo, `/produtos/tenis`, porque o que você quer ainda são os tênis. Mudaram os detalhes.

> [!question] 9. Um link para o Treine
> Você manda a um amigo o link de uma aula deste site, com `#treine` no fim, para ele cair direto nos exercícios. O servidor do GitHub fica sabendo que ele quer ir para o Treine?
>
> > [!success]- Resposta
> > Não. O `#treine` é o fragmento, e o fragmento nunca sai do navegador. O servidor recebe o pedido da aula inteira e manda a página inteira. Quem rola até o Treine é o navegador do seu amigo, quando a página chega.

## De onde vêm as palavras

- **[[glossario/url|URL]]**: *Uniform Resource Locator*. **Uniforme** vem do latim *ūnifōrmis*, de *ūnus*, "um", e *fōrma*, "forma": "de uma forma só". *Resource*, "recurso", veio do francês *ressource*, "fonte, nascente", do latim *resurgō*, "brotar de novo". *Locator*, "localizador", vem do latim *locāre*, "pôr num lugar", de *locus*, "lugar", o mesmo de **local**. Quem definiu a URL foi Tim Berners-Lee, o mesmo do HTTP, em 1994. O U era de *Universal*, e virou *Uniform* naquele ano, numa troca que ele não queria. Anos depois, ele também disse que as duas barras do `://` eram desnecessárias.
- **[[glossario/esquema|Esquema]]**: do latim *schēma*, do grego *skhêma*, "forma, figura, postura", que vem de *ékhō*, "ter, segurar": o jeito como uma coisa se mantém. Em inglês, *scheme* também é "plano, sistema". Numa URL, o esquema diz em que sistema o endereço foi escrito.
- **[[glossario/host|Host]]**: do latim *hospes*, que queria dizer ao mesmo tempo quem recebe, o anfitrião, e quem é recebido, o hóspede. Vem de uma palavra antiga que juntava "estrangeiro" e "senhor": o senhor que recebe os estrangeiros. Do mesmo *hospes* vêm **hóspede**, **hospedar**, **hospital** e **hotel**. Em português, o serviço de guardar um site num servidor se chama **hospedagem**: o host é o computador que hospeda o site.
- **[[glossario/dominio|Domínio]]**: do latim *dominium*, "propriedade", de *dominus*, "senhor, dono", que vem de *domus*, "casa". O *dominus* era o dono da casa. Da mesma família vêm **dono**, **dominar**, **doméstico** e **domingo**, o "dia do Senhor". Um domínio na internet é isso: um nome que tem dono.
- **[[glossario/porta|Porta]]**: do latim *porta*, "portão, passagem", de uma raiz antiga que queria dizer "atravessar". A *port* do inglês, que deu o nome à porta da computação, vem do mesmo *porta*: em inglês, *port* também é a abertura no casco de um navio, por onde a carga entra. E o **porto**, do latim *portus*, é da mesma família: o lugar por onde se passa do mar para a terra.
- **[[glossario/caminho|Caminho]]**: do latim tardio *cammīnus*, que os romanos pegaram do gaulês, a língua dos celtas da França antiga, de uma palavra que queria dizer "passo". Aparece escrita pela primeira vez na Espanha, no fim do século VII. Em inglês, essa parte da URL se chama *path*, "trilha".
- **[[glossario/query-string|Query]]**: do latim *quaere*, "pergunte!", de *quaerō*, "buscar, perguntar". É o mesmo *quaerō* de **[[glossario/requisicao|requisição]]**, de **querer** e de **questão**.
- **[[glossario/fragmento|Fragmento]]**: do latim *fragmentum*, "pedaço quebrado", de *frangō*, "quebrar". Da mesma família vêm **frágil**, **fração**, **fratura** e **naufrágio**, o navio que se quebrou.
- **[[glossario/parse|Parse]]**: do latim *pars*, "parte", provavelmente pelo inglês medieval *pars*, "as partes do discurso", ou seja, a gramática. Fazer o parse de uma frase era dizer o que cada palavra é, como na análise sintática da escola. O navegador faz o mesmo com a URL: diz o que cada pedaço é.
- **[[glossario/renderizar|Renderizar]]**: do inglês *render*, que vem do francês antigo *rendre*, "devolver, entregar", do latim *reddere*, de *re-*, "de volta", e *dare*, "dar". Em inglês, *render* também passou a querer dizer "retratar", como um pintor retrata um rosto. Na computação, é transformar dados numa imagem na tela. Do mesmo *reddere* vem o **render** do português: o dinheiro que rende, o soldado que se rende.

> [!tip] Para guardar
> - A **URL** tem partes fixas, numa ordem fixa, separadas por sinais: **esquema** (`https`), `://`, **host** (`www.loja.com.br`), `:` e **porta** (`443`), **caminho** (`/produtos/tenis`), `?` e **query string** (`cor=preto&tamanho=42`), `#` e **fragmento** (`avaliacoes`).
> - Toda **URL** começa com um esquema e dois-pontos. Os endereços da web são só as URLs de esquema `http` ou `https`; `mailto:` e `tel:` também são URLs.
> - **Esquema** é o nome da parte, e **protocolo** é o que ela informa nos endereços da web. Muita gente, e até o JavaScript, chama a parte de protocolo.
> - A **porta padrão** do HTTP é a 80, e a do HTTPS é a 443. Quando a URL usa a padrão, não precisa escrever.
> - O **fragmento** nunca chega ao servidor: o navegador fica com ele, para rolar a página.
> - Do Enter à página: separar as partes (**parse**), trocar o nome pelo IP (**DNS**), abrir a **conexão**, combinar a proteção (**TLS**, só no HTTPS), mandar a requisição, receber a resposta e desenhar a página (**renderizar**).
> - Os pedidos seguintes ao mesmo servidor aproveitam a conexão aberta e pulam o DNS, a conexão e o TLS.
> - Dá para ver tudo isso: `new URL(...)` no Node, `curl.exe -sv` no terminal e a aba **Timing** no Chrome.

Fontes: MDN: [URL](https://developer.mozilla.org/pt-BR/docs/Web/API/URL), [URL.protocol](https://developer.mozilla.org/en-US/docs/Web/API/URL/protocol), [What is a URL?](https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL) · IETF: [RFC 3986, a sintaxe das URLs](https://www.rfc-editor.org/rfc/rfc3986) · Chrome DevTools: [Network features reference](https://developer.chrome.com/docs/devtools/network/reference) · curl: [manual](https://curl.se/docs/manpage.html) · Wikipedia: [URL](https://en.wikipedia.org/wiki/URL) · Wiktionary: [uniformis](https://en.wiktionary.org/wiki/uniformis), [resource](https://en.wiktionary.org/wiki/resource), [locator](https://en.wiktionary.org/wiki/locator), [scheme](https://en.wiktionary.org/wiki/scheme), [σχῆμα](https://en.wiktionary.org/wiki/%CF%83%CF%87%E1%BF%86%CE%BC%CE%B1), [host](https://en.wiktionary.org/wiki/host), [hospes](https://en.wiktionary.org/wiki/hospes), [hóspede](https://en.wiktionary.org/wiki/h%C3%B3spede), [domínio](https://en.wiktionary.org/wiki/dom%C3%ADnio), [dominus](https://en.wiktionary.org/wiki/dominus), [dono](https://en.wiktionary.org/wiki/dono), [port](https://en.wiktionary.org/wiki/port), [porta](https://en.wiktionary.org/wiki/porta), [portus](https://en.wiktionary.org/wiki/portus), [caminho](https://en.wiktionary.org/wiki/caminho), [camminus](https://en.wiktionary.org/wiki/camminus), [query](https://en.wiktionary.org/wiki/query), [fragmentum](https://en.wiktionary.org/wiki/fragmentum), [frangō](https://en.wiktionary.org/wiki/frango), [parse](https://en.wiktionary.org/wiki/parse), [render](https://en.wiktionary.org/wiki/render), [renderizar](https://en.wiktionary.org/wiki/renderizar), [reddō](https://en.wiktionary.org/wiki/reddo)
