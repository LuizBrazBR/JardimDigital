---
title: "1.5 O que é um back-end e o que ele faz"
tags:
  - protocolos-da-web
  - back-end
---

Quinta e última aula do módulo 1. A aula 1.1 mostrou os dois papéis da conversa, cliente e servidor. A 1.2 seguiu uma URL do Enter até a página. A 1.3 separou o trabalho do navegador do trabalho do servidor. A 1.4 mostrou como a requisição acha o computador e o programa certos. Esta aula junta tudo na pergunta que dá nome à trilha: o que é um back-end, e o que ele faz de fato? No fim, você vai saber dizer o que é front-end e o que é back-end, listar os trabalhos de um back-end, seguir um pedido de compra por dentro do servidor, passo a passo, e rodar no seu computador um back-end pequeno que faz esses passos.

## O lado servidor da aplicação

> [!abstract] Definição
> **[[glossario/back-end|Back-end]] é o código que roda no servidor e cuida das regras de negócio, dos dados e da segurança da aplicação.** **[[glossario/front-end|Front-end]] é o código que roda no navegador do usuário, ou dentro de um aplicativo, e cuida da tela e da interação.**

A aula 1.1 já tinha separado os dois [[programacao/protocolos-da-web/modulo-1/01-cliente-e-servidor-o-modelo-por-tras-da-web|pelo lugar onde o código **roda**]], e não pelo lugar onde ele fica guardado: o HTML fica guardado no servidor, mas é desenhado no navegador, então é front-end. E a aula 1.3 mostrou [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|o que só o servidor faz]]: escutar, atender muitos clientes, decidir pelo método e pelo caminho, cuidar dos dados e das regras e montar a resposta. O back-end é o código que faz esses trabalhos.

Front-end e back-end conversam exatamente como a trilha mostrou até aqui: o front-end, no papel de cliente, pede; o back-end, no papel de servidor, responde. A conversa é em HTTP, e os dados vão quase sempre em [[glossario/json|JSON]], o assunto do módulo 6.

> [!example] O salão e a cozinha
> Num restaurante, o salão é o que o cliente vê: as mesas, o cardápio, a decoração. A cozinha fica atrás de uma porta, e o cliente nunca entra lá. Na cozinha estão as receitas, a despensa e o cozinheiro que decide se dá para fazer o prato.
>
> O front-end é o salão. O back-end é a cozinha: as receitas são as regras de negócio, e a despensa é o banco de dados. O pedido passa de um para o outro por escrito, na comanda, num formato que os dois entendem. Na web, a comanda é a requisição HTTP. E se o cliente escreve na comanda "um bife, e eu pago 1 real", a cozinha não aceita o preço: o preço é do cardápio da casa.

| | Front-end | Back-end |
|---|---|---|
| onde roda | no navegador do usuário, ou no aplicativo do celular | no servidor |
| do que cuida | a tela, a interação, o visual | as regras de negócio, os dados, a segurança |
| tecnologias comuns | HTML, CSS, JavaScript, e frameworks como o React | JavaScript com Node.js, Python, Java, C#, e um banco de dados |
| o usuário vê o código? | sim, dá para inspecionar | não: o código fica longe dele |
| quantos usuários atende | um: o dono daquele navegador | todos ao mesmo tempo |

> [!warning] Node.js não é uma linguagem
> A tabela do curso põe Node.js ao lado de Python, Java e C#, mas eles não são a mesma coisa. Python, Java e C# são linguagens. O Node.js é o programa que roda JavaScript fora do navegador, o mesmo que roda o seu `tarefas.js`. A linguagem do back-end em Node é o JavaScript, a mesma do front-end. Por isso a aula 1.1 dizia que o JavaScript aparece dos dois lados: no navegador, ele mexe na tela; no Node, ele faz o back-end.

### Back-end é o código; servidor é o papel

A aula do curso diz que o back-end "é quem implementa o papel de servidor". É verdade, mas vale lembrar duas coisas da aula 1.1.

**O back-end também é cliente.** Para responder ao navegador, o back-end de uma loja pede dados ao banco de dados e pede ao serviço de pagamento que cobre o cartão. Nessas conversas, quem pede é ele. Para o front-end, ele é servidor. Para o banco e para o pagamento, ele é cliente.

**Nem todo servidor tem back-end.** Este site é servido pelo GitHub, que só acha o arquivo HTML pedido e manda, sem rodar nada. Ninguém escreveu um back-end para este site. Back-end existe quando há código **seu** rodando no servidor para montar a resposta: buscar no banco, aplicar regras, decidir.

### Dois programas, ou um?

O curso diz que front-end e back-end são, quase sempre, dois programas separados. Depende de quem monta a tela, os dois jeitos que a [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|aula 1.3]] mostrou:

- **O navegador monta a tela.** Aí são mesmo dois programas. O front-end é um projeto, por exemplo em React, que vira HTML, CSS e JavaScript. O back-end é outro projeto, uma **API** que só responde dados em JSON. Às vezes cada um tem a sua equipe. E a mesma API pode atender o site e o aplicativo de celular.
- **O servidor monta o HTML.** Aí o back-end escreve a página já com os dados dentro e manda pronta. É um programa só, no servidor. Mesmo assim, o HTML, o CSS e o JavaScript que ele manda rodam no navegador: continuam sendo front-end, só que gerados pelo back-end.

Então "dois programas" é o caso mais comum hoje, mas a separação que sempre vale é a de **onde o código roda**.

### O usuário vê o código?

Esta é a linha da tabela que mais pesa na hora de programar.

O código do front-end **precisa** ir para a máquina do usuário, porque é lá que ele roda. Uma vez lá, qualquer um lê. Abra um site qualquer, aperte **F12** e vá na aba **Sources** (em português, **Fontes**): na lateral aparecem os arquivos `.js` da página, inteiros. Muitas vezes o código vem **minificado**, tudo numa linha só, com nomes curtos como `a` e `b`, para ficar menor. Fica difícil de ler, mas continua ali. Se o arquivo aparecer numa linha só, o botão `{}`, no canto de baixo, arruma os espaços e as quebras de linha.

O código do back-end **nunca sai do servidor**. O que sai é só a resposta. Pela aba **Network**, você vê o que a loja respondeu, mas não tem como ver o código que decidiu essa resposta.

Daí saem duas regras, que valem para toda a trilha:

1. **Segredo só no back-end.** A senha do banco de dados, a chave que a loja usa para cobrar no serviço de pagamento, a chave do serviço de e-mail: nada disso pode estar no JavaScript do front-end, porque qualquer pessoa com o F12 copiaria. Se a chave do pagamento estivesse no front-end, alguém poderia usá-la para fazer cobranças em nome da loja.
2. **Regra que importa só no back-end.** É a seção "[[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|O servidor não confia no navegador]]" da aula 1.3. O front-end pode conferir um formulário para avisar o usuário rápido, mas a conferência que vale é a do back-end, porque o usuário controla o navegador.

Ver o código do front-end não é uma falha de segurança. É assim que a web funciona: o navegador precisa do código para rodar a página. O erro é pôr no front-end o que não pode ser visto.

## O que um back-end faz, na prática

O curso lista sete trabalhos. Cada um volta, com calma, em algum módulo deste curso.

### 1. Expor endpoints

Um **[[glossario/endpoint|endpoint]]** é uma das portas de entrada do back-end: um pedido que ele sabe atender. O curso diz "endpoints (URLs)", mas um endpoint é, mais exatamente, um **método e um caminho**:

| Endpoint | O que faz |
|---|---|
| `GET /produtos` | lista os produtos |
| `GET /produtos/42` | mostra o produto 42 |
| `POST /pedidos` | cria um pedido |
| `GET /pedidos` | lista os pedidos de quem pediu |

Repare nas duas últimas linhas: a URL é a mesma, `/pedidos`, mas são dois endpoints, porque o método muda. Um lista, o outro cria. Foi o que o `if` do `servidor.js` da aula 1.3 fez: olhou o método **e** o caminho.

"Expor" quer dizer deixar disponível para quem está fora. O conjunto dos endpoints de um back-end é a **API** dele, a lista de pedidos que ele aceita. Os métodos são o módulo 3, e o jeito de escolher os caminhos é o módulo 7.

### 2. Receber e validar os dados

Primeiro, o back-end faz o parse da requisição e do corpo, como a aula 1.3 mostrou. Depois, confere se os dados fazem sentido. Os campos que deviam vir vieram? A quantidade é um número? É maior que zero? O e-mail tem `@`?

Isso se chama **validar**: conferir o formato dos dados, olhando só o que veio no pedido. Se algo está errado, o back-end para ali e responde um erro, quase sempre o **400**, "requisição mal formada", com uma mensagem dizendo o que estava errado.

### 3. Aplicar as regras de negócio

As **regras de negócio** são as regras de como a empresa funciona, que a aula 1.3 listou: o preço, o desconto, o frete grátis acima de 200 reais, não vender o que não tem no estoque, um cupom por cliente.

A diferença para a validação: validar é conferir se o dado está **bem escrito**, só olhando o pedido. A regra de negócio depende **do resto do sistema**. "A quantidade é 2" passa na validação. "Tem 2 no estoque?" só dá para responder olhando o banco de dados, e a resposta pode mudar de um minuto para o outro.

### 4. Ler e gravar no banco de dados

Os produtos, os clientes, os pedidos e o estoque ficam no **[[glossario/banco-de-dados|banco de dados]]**, e quem conversa com ele é o back-end. Nessa conversa, o back-end é o cliente. Na aula 1.4, o PostgreSQL apareceu como um desses bancos, escutando na porta 5432, na mesma máquina do site ou em outra.

O usuário nunca fala com o banco direto. Tudo passa pelo back-end, que decide o que cada um pode ler e gravar.

### 5. Autenticar e autorizar

São duas perguntas diferentes, e as palavras se parecem:

| | Pergunta | Exemplo |
|---|---|---|
| **[[glossario/autenticacao\|autenticar]]** | **quem é** você? | conferir que o pedido veio da Ana, pela sessão ou pelo token |
| **autorizar** | o que você **pode** fazer? | a Ana pode ver o pedido 15? Só se o pedido for dela |

> [!example] O crachá e a catraca
> Num prédio comercial, a portaria confere o seu documento e entrega um crachá: isso é **autenticar**. Depois, cada catraca lê o crachá e decide se você entra naquele andar: isso é **autorizar**. Dá para estar autenticado e não autorizado: o crachá é seu, mas não abre aquele andar.

Para saber quem é, o back-end olha alguma coisa que vem em todo pedido: o cookie de sessão da [[programacao/protocolos-da-web/modulo-1/03-o-papel-do-navegador-e-do-servidor|aula 1.3]], ou um **token** no cabeçalho `Authorization`, que é o assunto da aula 5.4. Lembre que o HTTP não tem memória: cada pedido precisa provar de novo quem é.

Cada pergunta tem o seu erro:

- **401**: não sei quem você é. Falta o login, ou a sessão venceu.
- **403**: sei quem você é, mas você não pode fazer isso.

O nome oficial do 401 é *Unauthorized*, "não autorizado", mas o sentido é "não autenticado". É um nome mal escolhido que ficou. O módulo 4 volta aos dois.

### 6. Conversar com outros serviços

Um back-end raramente faz tudo sozinho. Para cobrar, ele chama um **gateway de pagamento**, um serviço que conversa com os bancos e as operadoras de cartão. Para mandar o e-mail de "pedido confirmado", chama um serviço de e-mail. Para calcular o frete, pode chamar a API de uma transportadora.

Em todas essas conversas, o back-end é o cliente, e manda requisições HTTP, como o curl fez com a Open-Meteo na aula 1.1. E é aqui que entram as chaves secretas da seção anterior: cada serviço desses dá à loja uma chave, que vai em cada pedido, e que só pode morar no back-end.

### 7. Devolver a resposta

Por fim, o back-end monta a resposta: o **código de status**, os **cabeçalhos** e o **corpo**, quase sempre em JSON, com o resultado. Os erros também: em vez de só um 400, uma API bem feita manda junto um JSON dizendo o que deu errado, para o front-end mostrar ao usuário. A resposta por dentro é o módulo 2, e os códigos, o módulo 4.

## Um pedido por dentro

O curso segue um pedido de compra do começo ao fim. Primeiro, o que chega ao servidor:

```http
POST /pedidos HTTP/1.1
Host: api.loja.com.br
Authorization: Bearer 8f3a2c
Content-Type: application/json

{"produtoId": 42, "quantidade": 2}
```

Antes dos passos, repare no que **não** veio no corpo:

- **O preço.** O front-end não manda o preço, e se mandasse, o back-end ignoraria. O preço é um dado da loja, e vem do banco de dados. É o caso do preço trocado no F12 da aula 1.3.
- **Quem está comprando.** Não vem um `"cliente": "Ana"` no corpo, porque qualquer um poderia escrever qualquer nome. Quem diz quem é o usuário é o token, no `Authorization`, que o back-end mesmo criou no login.

Agora, o que o back-end faz:

1. **Confere se o usuário está autenticado.** Procura o token `8f3a2c` entre as sessões e descobre que é a Ana. Se não achar, para aqui: **401**.
2. **Valida os dados.** O corpo é um JSON válido? A `quantidade` é um número inteiro maior que zero? O produto 42 existe? Se a quantidade é `-3`, para aqui: **400**. Se o produto não existe: **404**, "não achei".
3. **Consulta o estoque.** O produto 42 tem 2 unidades? Se só tem 1, para aqui. Muitas APIs respondem **409**, "conflito com o estado atual", outras **422**, "entendi o pedido, mas não dá para fazer". O módulo 4 discute a escolha.
4. **Aplica as regras de negócio.** Calcula o total com o preço do banco: 2 × R\$ 299,90. Se houver desconto ou frete, entram aqui.
5. **Grava o pedido** no banco de dados e tira as 2 unidades do estoque.
6. **Responde.** **201**, "criado", com o pedido em JSON:

```http
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"id": 1, "cliente": "Ana", "produtoId": 42, "quantidade": 2, "total": 59980}
```

A resposta traz coisas que o cliente não mandou: o `id` do pedido e o `total`. Quem criou foi o back-end. O `59980` está em centavos, e a seção "Veja com os próprios olhos" explica por quê.

### Por que nessa ordem

Os passos que podem recusar vêm primeiro, e do mais barato para o mais caro:

- **Autenticar antes de tudo.** Conferir um token é rápido, e não faz sentido gastar trabalho, nem consultar o banco, para quem nem disse quem é.
- **Validar antes de consultar.** Se a quantidade é `-3`, nem precisa perguntar ao banco se tem estoque.
- **Gravar só no fim.** Só depois de todas as conferências passarem. Se o pedido fosse gravado antes de conferir o estoque, sobraria um pedido que não podia existir.

Cada passo que falha **para tudo e responde na hora**. É a mesma ideia do `return` que parava a busca na [[programacao/logica-de-programacao/modulo-7/05-mini-projeto-uma-lista-de-tarefas|aula 7.5 de Lógica]]: achou o problema, sai da função.

| Passo | Pergunta | Se falhar |
|---|---|---|
| 1. autenticar | quem é? | 401 |
| 2. validar | os dados estão bem escritos? o produto existe? | 400, ou 404 |
| 3. estoque | tem o suficiente? | 409, ou 422 |
| 4. regras | quanto custa? | — |
| 5. gravar | — | 500, se o banco falhar |
| 6. responder | — | 201, deu certo |

O **500** é "erro no servidor": a culpa não é do pedido, e sim de alguma coisa do lado de lá, como o banco fora do ar. Os erros que começam com 4 são culpa do cliente; os que começam com 5, do servidor. É o módulo 4.

> [!question] E se duas pessoas comprarem o último tênis ao mesmo tempo?
> Sobrou 1 tênis. A Ana e o Bruno clicam em "Comprar" no mesmo segundo. O back-end atende os dois ao mesmo tempo, e os dois passam pelo passo 3: "tem 1, pede 1, tudo certo". Os dois chegam ao passo 5, e a loja vende 2 tênis que não tem.
>
> O problema é o tempo entre **conferir** (passo 3) e **gravar** (passo 5). Para isso, os bancos de dados têm as **transações**: um jeito de dizer ao banco "estes passos acontecem juntos, ou nenhum acontece". Dentro de uma transação, enquanto o pedido da Ana mexe no estoque, o do Bruno espera, e quando chega a vez dele já não tem tênis. É assunto da parte de banco de dados da trilha, mas vale saber desde já que o problema existe: é um dos motivos de o estoque ser trabalho do back-end, que é o único lugar que vê os pedidos de todos.

## Veja com os próprios olhos

### Um back-end de verdade, pequeno

O `servidor.js` da aula 1.3 só olhava o método e o caminho. Agora você vai escrever um que faz os seis passos. Crie um arquivo `pedidos.js`:

```js
const http = require("node:http");

// O "banco de dados", por enquanto na memória. Os preços estão em centavos.
const produtos = [
  { id: 42, nome: "Tênis preto", preco: 29990, estoque: 3 },
  { id: 7, nome: "Meia branca", preco: 1990, estoque: 10 },
];
const sessoes = { "8f3a2c": "Ana" };
const pedidos = [];

function buscarProduto(id) {
  for (const produto of produtos) {
    if (produto.id === id) {
      return produto;
    }
  }
  return undefined;
}

function responder(resposta, status, dados) {
  resposta.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  resposta.end(JSON.stringify(dados));
}

const servidor = http.createServer((requisicao, resposta) => {
  console.log(requisicao.method, requisicao.url);

  if (requisicao.method !== "POST" || requisicao.url !== "/pedidos") {
    return responder(resposta, 404, { erro: "Não achei" });
  }

  // 1. Quem está pedindo?
  const autorizacao = requisicao.headers.authorization || "";
  const usuario = sessoes[autorizacao.replace("Bearer ", "")];
  if (!usuario) {
    return responder(resposta, 401, { erro: "Faça login" });
  }

  // O corpo chega aos pedaços: junta tudo antes de usar
  let texto = "";
  requisicao.on("data", (pedaco) => {
    texto += pedaco;
  });

  requisicao.on("end", () => {
    // 2. Os dados vieram certos? O produto existe?
    let corpo;
    try {
      corpo = JSON.parse(texto);
    } catch {
      return responder(resposta, 400, { erro: "O corpo não é um JSON válido" });
    }
    if (!Number.isInteger(corpo.quantidade) || corpo.quantidade < 1) {
      return responder(resposta, 400, { erro: "A quantidade precisa ser um número inteiro maior que zero" });
    }
    const produto = buscarProduto(corpo.produtoId);
    if (!produto) {
      return responder(resposta, 404, { erro: "Esse produto não existe" });
    }

    // 3. Tem estoque?
    if (produto.estoque < corpo.quantidade) {
      return responder(resposta, 409, { erro: "Estoque insuficiente: restam " + produto.estoque });
    }

    // 4. A regra de negócio: o preço vem daqui, e não do cliente
    const subtotal = produto.preco * corpo.quantidade;
    const frete = subtotal >= 20000 ? 0 : 1500;

    // 5. Grava
    produto.estoque -= corpo.quantidade;
    const pedido = {
      id: pedidos.length + 1,
      cliente: usuario,
      produtoId: produto.id,
      quantidade: corpo.quantidade,
      total: subtotal + frete,
    };
    pedidos.push(pedido);

    // 6. Responde
    responder(resposta, 201, pedido);
  });
});

servidor.listen(3000, () => {
  console.log("Servidor escutando na porta 3000");
});
```

A maior parte você já conhece. O que é novo:

- **`produtos`, `sessoes` e `pedidos`** fazem o papel do banco de dados. São um array e um objeto, como na [[programacao/logica-de-programacao/modulo-7/05-mini-projeto-uma-lista-de-tarefas|aula 7.5]], e por isso somem quando o servidor para. O `sessoes` é a tabela da aula 1.3, "a sessão `8f3a2c` é da Ana", que o login teria criado.
- **`buscarProduto`** é a busca linear da aula 7.2: percorre o array e devolve o produto assim que acha.
- **`responder`** junta numa função o que o `servidor.js` fazia em duas linhas: o `writeHead`, com o status e o cabeçalho, e o `end`, com o corpo em JSON. Assim cada passo responde numa linha só.
- **`return responder(...)`** responde e sai da função na mesma linha. É o "para tudo e responde na hora" da seção anterior.
- **`requisicao.on("data", ...)` e `requisicao.on("end", ...)`**: o corpo não chega de uma vez. Como a aula 1.4 mostrou, os dados viajam em pacotes, e um corpo grande chega aos pedaços. O Node chama a primeira função a cada pedaço que chega, e a segunda quando acabou. São duas callbacks: você diz o que fazer, e o Node decide quando.
- **`try { ... } catch { ... }`**: o `JSON.parse` dá erro, e derrubaria o programa, se o texto não for um JSON válido. O `try` quer dizer "tenta isto", e o `catch`, "se der erro, faça isto no lugar". Aqui, em vez de cair, o servidor responde 400.
- **`Number.isInteger(x)`** devolve `true` só se `x` for um número inteiro. Para `"2"`, um texto, ou para `1.5`, devolve `false`.

> [!info] Por que o dinheiro está em centavos
> No computador, os números com vírgula nem sempre dão a conta exata. Rode no terminal:
>
> ```powershell
> node -e "console.log(299.9 * 3)"
> ```
>
> ```
> 899.6999999999999
> ```
>
> O certo seria 899,70. O erro é minúsculo, mas em dinheiro não pode existir. Por isso, é costume guardar os valores em centavos, como números inteiros: `29990 * 3` dá `89970`, exato. Só na hora de mostrar na tela o front-end divide por 100 e escreve "R\$ 899,70".

### Mande um pedido

Rode `node pedidos.js`. Aparece `Servidor escutando na porta 3000`.

No navegador, a barra de endereço só faz `GET`. Para mandar um `POST` com um corpo, use o curl. Primeiro, crie no VS Code, na mesma pasta, um arquivo `pedido.json`:

```json
{"produtoId": 42, "quantidade": 2}
```

Abra outro terminal, com o `+`, e rode:

```powershell
curl.exe -i http://localhost:3000/pedidos -H "Authorization: Bearer 8f3a2c" -H "Content-Type: application/json" -d "@pedido.json"
```

| Parte | O que faz |
|---|---|
| `-i` | mostra a primeira linha e os cabeçalhos da resposta, além do corpo |
| `-H "..."` | acrescenta um cabeçalho, como na aula 1.4 |
| `-d "@pedido.json"` | manda um corpo, de *data*, "dados". O `@` quer dizer "leia o corpo deste arquivo". Com `-d`, o curl já usa o método `POST` sozinho |

Por que um arquivo, e não o JSON direto no comando? Porque o PowerShell mexe nas aspas dos textos que passa para outros programas, e o JSON chegaria ao servidor sem as aspas, quebrado. Com o arquivo, o texto vai como está.

A resposta:

```
HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8
...

{"id":1,"cliente":"Ana","produtoId":42,"quantidade":2,"total":59980}
```

**201 Created**, com o pedido. O total é 2 × 29990, em centavos: R\$ 599,80. Como passou de 200 reais, o frete saiu de graça.

### Faça cada passo falhar

Agora provoque cada erro. Rode cada comando, ou mude o `pedido.json`, salve e rode o comando de cima de novo:

| O que fazer | O que volta | Passo que parou |
|---|---|---|
| rode o mesmo comando de novo | `409 Conflict`, `Estoque insuficiente: restam 1` | 3. Eram 3 tênis, e o primeiro pedido levou 2 |
| tire o `-H "Authorization: Bearer 8f3a2c"` | `401 Unauthorized`, `Faça login` | 1 |
| troque o token por `Bearer 123` | `401 Unauthorized` | 1: esse token não está em `sessoes` |
| no arquivo, `"quantidade": 0` | `400 Bad Request`, `A quantidade precisa ser...` | 2 |
| no arquivo, `"quantidade": "2"`, com aspas | `400 Bad Request` | 2: `"2"` é um texto, não um número |
| no arquivo, apague uma das chaves `}` | `400`, `O corpo não é um JSON válido` | 2: o `JSON.parse` deu erro, e o `catch` pegou |
| no arquivo, `"produtoId": 99` | `404 Not Found`, `Esse produto não existe` | 2 |
| no arquivo, `{"produtoId": 7, "quantidade": 1}` | `201`, `"total":3490` | nenhum: são R\$ 19,90 da meia e R\$ 15,00 de frete, porque não chegou a 200 reais |
| no arquivo, `{"produtoId": 42, "quantidade": 1, "preco": 1}` | `201`, `"total":29990` | nenhum: o `preco` que veio no corpo foi ignorado |

A última linha é a aula 1.3 de novo, agora no seu código. O corpo trouxe `"preco": 1`, mas nenhuma linha do back-end lê `corpo.preco`. O preço vem de `produto.preco`, do "banco".

Volte ao terminal do servidor: cada pedido aparece como `POST /pedidos`.

### O banco que esquece

Aperte **Ctrl+C** no terminal do servidor e rode `node pedidos.js` de novo. Mande o primeiro pedido outra vez: volta **201**, com `"id":1`. O estoque voltou a 3, e os pedidos anteriores sumiram.

É o que acontece com dados num array: ficam na memória do programa, e somem quando ele para. Num back-end de verdade, o `produtos` e o `pedidos` seriam tabelas num banco de dados, e o servidor poderia reiniciar quantas vezes fosse sem perder nada. É o passo que falta, e um dos primeiros da trilha de back-end.

### O navegador só sabe pedir com GET

Com o servidor rodando, abra no navegador `http://localhost:3000/pedidos`. Aparece `{"erro":"Não achei"}`. O terminal do servidor mostra `GET /pedidos`.

É a mesma URL que funcionou no curl, mas a barra de endereço sempre faz `GET`, e este back-end só tem o endpoint `POST /pedidos`. Num site de verdade, quem manda o `POST` é um formulário ou o JavaScript da página, quando você clica em "Comprar".

## Fechando o módulo

As cinco aulas, juntas, contam o caminho inteiro de um clique em "Comprar":

```
no navegador (front-end)
  o JavaScript monta o pedido: POST /pedidos             aula 1.3
  o DNS troca www.loja.com.br por 203.0.113.55           aula 1.4
  a conexão abre em 203.0.113.55:443, com TCP e TLS      aulas 1.2 e 1.4
  a requisição HTTP vai pela conexão                     aulas 1.1 e 1.2

no servidor (back-end)
  o programa que escuta na 443 recebe e faz o parse      aulas 1.3 e 1.4
  autentica, valida, aplica as regras, grava no banco    aula 1.5
  monta a resposta: 201 Created, com o pedido em JSON    aula 1.5

de volta ao navegador
  faz o parse da resposta e mostra "Pedido confirmado"   aula 1.3
```

Esse é o alicerce. A partir do módulo 2, o curso abre a peça que sustenta a conversa toda, o HTTP, e mostra cada detalhe de uma requisição e de uma resposta reais. Cada trabalho do back-end desta aula tem o seu lugar no resto do curso:

| Trabalho do back-end | Onde o curso volta a ele |
|---|---|
| expor endpoints | módulo 3, os métodos, e módulo 7, o desenho da API |
| receber e validar os dados | módulo 2, a requisição por dentro, e módulo 6, o JSON |
| autenticar | aulas 5.4, o `Authorization`, e 5.5, cookies e sessão |
| devolver a resposta | módulo 2, a resposta por dentro, módulo 4, os status, e módulo 6, o JSON |
| regras de negócio, banco de dados, outros serviços | depois deste curso, na construção do back-end em si |

## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Front-end ou back-end?
> Diga de que lado fica cada coisa:
>
> - a) o botão "Comprar", com a cor e o tamanho certos
> - b) o cálculo do frete
> - c) a senha do banco de dados
> - d) o aviso "o e-mail está sem @", que aparece enquanto você digita
> - e) gravar o pedido
> - f) a chave para cobrar no serviço de pagamento
> - g) o código que decide se a Ana pode ver o pedido 15
>
> > [!success]- Resposta
> > - a) front-end: é tela.
> > - b) back-end: é regra de negócio. O front-end pode até mostrar uma estimativa, mas o valor cobrado é o que o back-end calcula.
> > - c) back-end: é segredo. No front-end, qualquer um leria pelo F12.
> > - d) front-end, para avisar rápido. Mas o back-end confere de novo quando o formulário chega, porque a conferência do front-end pode ser pulada.
> > - e) back-end: só ele fala com o banco de dados.
> > - f) back-end: é segredo, pelo mesmo motivo da senha do banco.
> > - g) back-end: é autorização, e regra de segurança só vale no back-end.

> [!question] 2. Validação ou regra de negócio?
> Para cada pedido recusado, diga se foi a validação ou uma regra de negócio que recusou:
>
> - a) `"quantidade": -3`
> - b) pediu 5, e só há 2 no estoque
> - c) e-mail `ana.gmail.com`
> - d) o cupom `BEMVINDO` já foi usado por esse cliente
> - e) `"produtoId": "abc"`
>
> > [!success]- Resposta
> > - a) validação: só de olhar o pedido, dá para ver que a quantidade não faz sentido.
> > - b) regra de negócio: o pedido está bem escrito, mas a resposta depende do estoque, que está no banco.
> > - c) validação: o formato está errado.
> > - d) regra de negócio: o cupom é válido, mas a regra "um por cliente" depende do que já aconteceu, guardado no banco.
> > - e) validação: o id devia ser um número.

> [!question] 3. Qual status?
> Para cada caso, que status o back-end deveria responder: 201, 400, 401, 403 ou 404?
>
> - a) o pedido chegou sem o `Authorization`
> - b) o pedido deu certo, e a compra foi gravada
> - c) o corpo veio com `{"produtoId": 42, "quantidade":` e acabou ali
> - d) a Ana, com login feito, pediu o produto 99, que não existe
> - e) a Ana, com login feito, pediu para ver o pedido 15, que é do Bruno
>
> > [!success]- Resposta
> > - a) 401: não dá para saber quem é.
> > - b) 201: criado.
> > - c) 400: o JSON está quebrado, e o parse falha.
> > - d) 404: não achei.
> > - e) 403: o back-end sabe que é a Ana, mas ela não pode ver o pedido de outra pessoa. Algumas APIs respondem 404 nesse caso, para nem contar que o pedido 15 existe.

> [!question] 4. O preço que não veio
> No `POST /pedidos`, o corpo traz só `produtoId` e `quantidade`. Por que o front-end não manda o preço e o nome do cliente, se ele tem os dois na tela?
>
> > [!success]- Resposta
> > Porque tudo que vem do front-end pode ter sido mudado pelo usuário, no F12 ou com o curl. O preço é um dado da loja, e o back-end busca no banco. Quem é o cliente, o back-end descobre pelo token, que ele mesmo criou no login. Se o corpo trouxesse `"cliente": "Bruno"`, qualquer um poderia comprar em nome de outra pessoa.

> [!question] 5. Fora de ordem
> Um back-end grava o pedido no banco e só depois confere se tem estoque. O que pode dar errado?
>
> > [!success]- Resposta
> > Se não tiver estoque, já existe no banco um pedido que não podia existir, e o back-end ainda precisa apagá-lo. Se ele esquecer, ou cair no meio do caminho, o pedido fica lá. Por isso as conferências vêm antes, e gravar é o último passo antes de responder.

> [!question] 6. A chave no JavaScript
> Para ganhar tempo, alguém pôs no JavaScript do front-end a chave do serviço de pagamento, e o navegador chama o serviço direto, sem passar pelo back-end. Funciona. Qual é o problema?
>
> > [!success]- Resposta
> > O código do front-end vai para o computador de todo mundo que abre o site. Qualquer pessoa pode abrir o F12, na aba Sources, e copiar a chave. Com ela, dá para fazer pedidos ao serviço de pagamento em nome da loja. E o usuário ainda poderia mudar o valor cobrado, porque quem montaria o pedido de cobrança seria o navegador dele. A chave e a cobrança precisam ficar no back-end.

> [!question] 7. Mesmo endereço, dois endpoints
> Um back-end tem `GET /pedidos` e `POST /pedidos`. É o mesmo endpoint?
>
> > [!success]- Resposta
> > Não. Um endpoint é o método mais o caminho. A URL é a mesma, mas o `GET` lista os pedidos, e o `POST` cria um novo. O `if` do back-end olha os dois para decidir o que fazer.

> [!question] 8. Os pedidos sumiram
> Você reiniciou o `pedidos.js`, e os pedidos que tinha feito sumiram. O estoque voltou a 3. Por quê? O que um back-end de verdade faz diferente?
>
> > [!success]- Resposta
> > Os dados estavam em arrays, na memória do programa, e a memória é apagada quando o programa para. Um back-end de verdade guarda os dados num banco de dados, que fica gravado em disco, fora do programa. O servidor pode reiniciar, e os dados continuam lá.

> [!question] 9. Autenticado, mas não autorizado
> Dê um exemplo, numa loja, de alguém autenticado que não está autorizado a fazer uma coisa.
>
> > [!success]- Resposta
> > A Ana fez login: o back-end sabe que é ela, então ela está autenticada. Mesmo assim, ela não pode ver os pedidos do Bruno, nem mudar o preço de um produto, que é trabalho de um funcionário da loja. Para essas ações, ela não está autorizada, e o back-end responde 403.

> [!question] 10. O back-end também pede
> Durante o `POST /pedidos`, o back-end da loja pede ao banco o preço do produto e pede ao gateway que cobre o cartão. Nessas duas conversas, ele é cliente ou servidor? Isso contradiz a definição de back-end?
>
> > [!success]- Resposta
> > Nas duas, ele é cliente: é ele quem pede. Não contradiz nada. Back-end é o código que roda no servidor, e cliente e servidor são papéis numa conversa, como a aula 1.1 mostrou. Para o front-end, o back-end é servidor. Para o banco e para o gateway, é cliente.

## De onde vêm as palavras

- **[[glossario/back-end|Back-end]]** e **[[glossario/front-end|front-end]]**: do inglês *back*, "de trás", *front*, "da frente", e *end*, "ponta, extremidade". A ponta da frente e a ponta de trás de um sistema. Em inglês, quando é substantivo, escreve-se em geral separado, *the back end*, e com hífen quando vem antes de outro nome, *a back-end developer*. Em português, ficou com hífen. É a mesma ideia do restaurante, que em inglês tem o *front of house*, o salão, e o *back of house*, a cozinha.
- **[[glossario/endpoint|Endpoint]]**: do inglês *end*, "ponta", e *point*, "ponto": o ponto na ponta. Na geometria, é a extremidade de um segmento de reta. Numa API, é o lugar onde a conversa chega.
- **[[glossario/autenticacao|Autenticar]]**: de **autêntico**, do grego *authentikós*, "original, verdadeiro", de *authéntēs*, "quem age por conta própria, o autor". Autenticar é conferir que algo é verdadeiro: que o pedido veio mesmo de quem diz.
- **Autorizar**: do latim medieval *auctōrizāre*, de *auctor*, "autor, fiador, quem garante", que vem de *augēre*, "aumentar, fazer crescer". O mesmo *auctor* deu **autor** e **autoridade**. Autorizar é alguém com autoridade dar a permissão.
- **Validar**: do latim *validus*, "forte, firme", de *valēre*, "ter força, valer". Validar é conferir que o dado vale.
- **Negócio**: do latim *negōtium*, que junta *nec*, "não", e *ōtium*, "ócio, descanso": o que não é descanso, a ocupação, o trabalho. A regra de negócio é a regra do trabalho da empresa.

> [!tip] Para guardar
> - **Back-end** é o código que roda no servidor: regras de negócio, dados e segurança. **Front-end** é o código que roda no navegador ou no aplicativo: a tela e a interação. O que separa os dois é **onde o código roda**.
> - Os dois conversam por requisição e resposta, em HTTP, quase sempre com JSON. O front-end pede; o back-end responde.
> - O código do front-end **vai para o usuário**, e qualquer um lê pelo F12. O do back-end **nunca sai do servidor**. Por isso, segredos e regras que importam ficam só no back-end.
> - **Node.js** não é uma linguagem: é o programa que roda JavaScript fora do navegador.
> - Os trabalhos do back-end: expor **endpoints** (método + caminho), receber e **validar**, aplicar as **regras de negócio**, ler e gravar no **banco de dados**, **autenticar** (quem é) e **autorizar** (o que pode), conversar com outros serviços e devolver a resposta.
> - **Validar** é conferir se o dado está bem escrito, olhando só o pedido. A **regra de negócio** depende do resto do sistema, como o estoque.
> - Num pedido: autenticar (401), validar (400, 404), conferir o estoque (409), aplicar as regras, gravar e responder (201). Quem pode recusar vem primeiro, e gravar vem por último.
> - O preço e o nome do cliente **não vêm do front-end**: o preço vem do banco, e quem é o cliente vem do token.
> - Dados num array somem quando o servidor para. Para durar, precisam de um banco de dados.

Fontes: MDN: [Introduction to the server side](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Introduction), [Client-Server overview](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/First_steps/Client-Server_overview), [201 Created](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/201), [400 Bad Request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/400), [401 Unauthorized](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/401), [403 Forbidden](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/403), [409 Conflict](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/409), [422 Unprocessable Content](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/422), [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch), [Number.isInteger()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger) · Node.js: [http](https://nodejs.org/api/http.html), [Anatomy of an HTTP Transaction](https://nodejs.org/en/learn/modules/anatomy-of-an-http-transaction) · curl: [man page](https://curl.se/docs/manpage.html) · Chrome DevTools: [Sources panel](https://developer.chrome.com/docs/devtools/sources) · Wiktionary: [back end](https://en.wiktionary.org/wiki/back_end), [front end](https://en.wiktionary.org/wiki/front_end), [endpoint](https://en.wiktionary.org/wiki/endpoint), [authentic](https://en.wiktionary.org/wiki/authentic), [αὐθέντης](https://en.wiktionary.org/wiki/%E1%BC%80%CF%85%CE%B8%CE%AD%CE%BD%CF%84%CE%B7%CF%82), [auctor](https://en.wiktionary.org/wiki/auctor), [validus](https://en.wiktionary.org/wiki/validus), [negotium](https://en.wiktionary.org/wiki/negotium)
