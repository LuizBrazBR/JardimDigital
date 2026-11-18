---
title: "2.3 HTTP não tem memória: o que significa ser stateless"
tags:
  - protocolos-da-web
  - http
---

Você entra numa loja, faz login e abre a página dos pedidos. A lista aparece sem pedir sua senha outra vez. Parece que o servidor se lembrou de você. Mas cada página pode ter sido carregada por uma requisição HTTP diferente, e o protocolo não traz uma lembrança automática da anterior. Como as duas coisas podem ser verdade?

A resposta está numa distinção importante: **o HTTP não mantém estado entre requisições; a aplicação pode manter estado e reconstruir o contexto a cada pedido**. Esse modo de funcionamento do protocolo é chamado de **stateless**, ou "sem estado".

## O servidor recebe um pedido novo

Imagine que o navegador mande estas duas requisições:

```http
POST /login HTTP/1.1
Host: api.loja.com
Content-Type: application/json

{"email": "ana@exemplo.com", "senha": "12345678"}
```

```http
GET /pedidos HTTP/1.1
Host: api.loja.com
Accept: application/json
```

Na primeira, a aplicação recebe as credenciais e pode verificar a senha. Na segunda, a URL pede pedidos, mas não há nada que identifique a Ana. O HTTP não adiciona uma etiqueta invisível dizendo "mesma pessoa do login anterior". Se a aplicação depender apenas do que chegou nessa segunda mensagem, não terá como saber de quem são os pedidos e deve recusar o acesso.

Na prática, a aplicação costuma responder ao login com alguma credencial. O cliente a apresenta de novo ao pedir os pedidos:

```http
GET /pedidos HTTP/1.1
Host: api.loja.com
Accept: application/json
Authorization: Bearer credencial-da-sessao
```

O servidor valida a credencial e então decide se pode mostrar os pedidos. Em sites, ela pode ser transportada num cookie que o navegador devolve automaticamente, de acordo com as regras daquele cookie. Em outros clientes, pode ser um token incluído no cabeçalho `Authorization`. As aulas do módulo 5 abrem esses mecanismos por dentro.

## Cookie, sessão e token não são a mesma coisa

Esses nomes aparecem juntos porque podem participar da mesma autenticação, mas designam coisas diferentes:

| Nome | O que é | Onde pode ficar |
|---|---|---|
| **Cookie** | Um mecanismo do navegador para guardar um valor e enviá-lo em requisições compatíveis | O valor fica no navegador; pode ser um ID de sessão ou até um token |
| **Sessão** | Dados que a aplicação associa a uma visita autenticada, como o usuário e o prazo de validade | Em memória, num banco, num cache compartilhado ou noutro armazenamento do servidor |
| **Token** | Uma credencial apresentada pelo cliente; pode ser um identificador aleatório ou carregar dados assinados | Normalmente o cliente o guarda e envia; a aplicação pode ou não manter um registro dele no servidor |

### Quando o valor é um ID de sessão

Um fluxo comum é o servidor criar um valor aleatório, como `8f3a2c`, e guardar uma associação no armazenamento de sessões:

```text
ID recebido: 8f3a2c  ──>  sessão: usuária Ana, validade até 18:00
```

O navegador pode guardar `8f3a2c` num cookie e enviá-lo em pedidos seguintes. O servidor procura esse ID no armazenamento para descobrir a quem pertence a sessão. Nesse modelo, **o cookie não contém a sessão inteira**: ele carrega a chave que permite encontrá-la.

### Quando o valor é um token assinado

Outra opção é um token autocontido, como um JWT. Ele pode carregar informações chamadas *claims*, por exemplo um identificador de usuário e um prazo de validade, acompanhadas de uma assinatura. O servidor verifica a assinatura com uma chave e confere se o token ainda é válido. Em geral, isso não é descriptografia: um JWT assinado costuma ser codificado para transporte e assinado para detectar alterações, mas seu conteúdo não fica secreto só por causa da assinatura.

Com esse modelo, o servidor pode identificar o usuário sem consultar uma tabela de sessões a cada pedido. Ainda pode consultar o banco para buscar os pedidos da pessoa, verificar permissões ou checar se o token foi revogado. Também existem tokens opacos, que parecem sequências aleatórias e precisam ser consultados num armazenamento para descobrir a que sessão ou usuário correspondem.

Em qualquer modelo, o cliente guarda e reapresenta a credencial. A aplicação decide se guarda um registro correspondente no servidor e como valida o valor. **Cookie não significa automaticamente sessão no banco; token não significa automaticamente JWT; e assinatura não é o mesmo que criptografia.**

> [!example] A biblioteca e o marcador
> A cada visita à biblioteca, a pessoa da entrada recebe um pedido novo. Se você disser apenas "quero levar este livro", ela não sabe se você tem cadastro nem quais livros estão emprestados. Um cartão de biblioteca permite consultar seu cadastro: o cartão não é o cadastro inteiro, é uma referência para encontrá-lo.
>
> A credencial enviada na requisição funciona como esse cartão. O HTTP carrega a mensagem; a aplicação interpreta o cartão e consulta o estado que mantém. A comparação tem um limite: um servidor pode guardar mais contexto durante a própria conexão, mas isso não faz o HTTP associar automaticamente pedidos separados.

## Stateless não quer dizer "o servidor não guarda nada"

Esse é o engano mais comum. **Sem estado é uma característica do protocolo entre requisições; não uma proibição para a aplicação guardar dados.** A loja continua tendo contas, pedidos, carrinhos e sessões. Esses dados podem estar num banco ou em outro armazenamento. O servidor pode usar a credencial recebida para localizar o estado correto.

Também não significa que todas as requisições precisam repetir todos os dados. O cliente pode enviar um identificador curto, como um token ou um ID de sessão. A aplicação usa esse valor para buscar o restante. O ponto é que cada requisição precisa trazer informação suficiente para ser entendida sem depender de uma lembrança implícita do HTTP.

## Um pedido, três servidores

Suponha que a loja cresça e passe a usar três servidores atrás de um **balanceador de carga**. É um componente que recebe o tráfego destinado à aplicação e encaminha cada conexão ou requisição a um dos servidores disponíveis, por exemplo para dividir o trabalho e continuar atendendo quando um servidor fica indisponível:

```text
Navegador ── pedido A ──> Servidor 1
Navegador ── pedido B ──> Servidor 3
Navegador ── pedido C ──> Servidor 2
```

Se o login só tiver sido anotado na memória do Servidor 1, o pedido seguinte pode ser encaminhado ao Servidor 3, que nunca viu aquela memória. O usuário parecerá desconectado. Uma aplicação pode resolver isso de algumas formas: compartilhar o armazenamento de sessões entre os servidores, enviar um token assinado que todos consigam validar, ou configurar o balanceador para manter o cliente no mesmo servidor. Cada escolha tem custos e detalhes próprios.

O estilo stateless facilita essa distribuição quando cada servidor consegue validar a requisição e acessar os mesmos dados necessários. Não elimina a necessidade de banco, sessão ou coordenação; evita que o protocolo exija uma conversa anterior guardada na memória de um servidor específico.

> [!info] E a conexão persistente?
> No HTTP/1.1, o cliente pode reutilizar uma conexão TCP para várias requisições. Isso economiza o trabalho de abrir conexões repetidamente. Cada requisição continua sendo uma mensagem separada; a conexão, por si só, não é uma credencial de login nem identifica o usuário para a aplicação.
>
> **Conexão persistente não quer dizer que o corpo está sendo enviado em chunks.** Quer dizer que a conexão TCP continua disponível para mais mensagens. *Chunked transfer encoding* é um mecanismo específico do HTTP/1.1 para delimitar o corpo em partes; HTTP/2 usa frames, e HTTP/3 também organiza dados em frames sobre QUIC. São camadas e mecanismos diferentes.

## Pense como o servidor

Para cada requisição, faça a pergunta: **que informação chegou nesta mensagem e que informação a aplicação precisa consultar?** Isso separa três coisas que costumam se misturar:

| Informação | Onde pode estar | Exemplo |
|---|---|---|
| O que o cliente quer agora | Na requisição | `GET /pedidos` |
| Qual usuário está fazendo o pedido | Em uma credencial enviada pelo cliente | Cookie de sessão ou `Authorization` |
| Quais pedidos pertencem ao usuário | Nos dados da aplicação | Banco de dados da loja |

O HTTP transporta a requisição. A aplicação combina o pedido, a identidade reconhecida e os dados armazenados para produzir a resposta.

## Treine

Tente prever o que o servidor sabe antes de abrir cada resposta.

> [!question] 1. O pedido sem crachá
> Ana enviou `POST /login` com a senha correta. Logo depois, o cliente envia `GET /pedidos`, sem cookie, sem token e sem outro identificador. O HTTP informa que é Ana? O que uma API que exige autenticação deve fazer?
>
> > [!success]- Resposta
> > Não. São requisições independentes, e a segunda não leva uma credencial que a relacione à Ana. A API deve negar o acesso, normalmente com `401 Unauthorized`.

> [!question] 2. O servidor tem memória?
> A aplicação grava a sessão de Ana num armazenamento compartilhado. Isso contradiz a ideia de HTTP stateless?
>
> > [!success]- Resposta
> > Não. Stateless descreve como o HTTP trata requisições, não proíbe a aplicação de guardar dados. Na próxima requisição, o cliente apresenta uma identificação e a aplicação pode consultar a sessão nesse armazenamento.

> [!question] 3. Cookie quer dizer que a sessão está no navegador?
> O navegador envia `Cookie: sessao=8f3a2c`. A sessão completa e os dados dos pedidos estão necessariamente dentro desse cookie?
>
> > [!success]- Resposta
> > Não. Muitas vezes o cookie contém só um ID aleatório. O servidor usa esse ID para localizar a sessão num armazenamento próprio. O cookie é guardado no navegador; a sessão pode ficar no servidor.

> [!question] 4. A conexão continua aberta
> O navegador mantém a conexão TCP aberta e envia outro pedido por ela. O servidor pode deduzir que o novo pedido veio de quem fez login antes?
>
> > [!success]- Resposta
> > Não apenas por isso. A conexão persistente reaproveita o transporte, mas não identifica automaticamente o usuário para a aplicação. O servidor precisa de uma credencial ou de outro contexto de autenticação que a aplicação reconheça.

> [!question] 5. O balanceador trocou de servidor
> O balanceador encaminhou o login de Ana ao Servidor 1, que guardou a sessão apenas na própria memória. Depois encaminhou `GET /pedidos` ao Servidor 2. Por que Ana pode parecer desconectada? Dê uma solução que compartilhe a sessão e outra que evite depender dessa sessão local.
>
> > [!success]- Resposta
> > O balanceador distribuiu as mensagens e o Servidor 2 não conhece a memória privada do Servidor 1. A aplicação pode guardar as sessões num armazenamento compartilhado ou usar um token assinado que o Servidor 2 também consiga validar. Outra possibilidade é o balanceador manter a afinidade com o Servidor 1.

> [!question] 6. Precisa descriptografar?
> Um cliente envia um JWT assinado. O servidor sempre precisa descriptografá-lo para descobrir o usuário?
>
> > [!success]- Resposta
> > Não necessariamente. Um JWT assinado costuma ter conteúdo codificado, não criptografado. O servidor verifica a assinatura e lê os *claims*. Se o token for opaco, o servidor não consegue descobrir o usuário pelo conteúdo e consulta um armazenamento. Em ambos os casos, pode consultar o banco para buscar os dados da pessoa.

> [!question] 7. O token é o pedido?
> Na requisição `GET /pedidos` com `Authorization: Bearer ...`, o token contém necessariamente a lista de pedidos?
>
> > [!success]- Resposta
> > Não. O token serve para identificar ou autenticar o cliente segundo as regras da aplicação. A lista pode continuar no banco; o servidor usa a identidade reconhecida para consultá-la.

> [!question] 8. Quem sabe o quê?
> Associe cada informação ao lugar mais adequado: o caminho `/pedidos`, o ID de sessão e os produtos comprados por Ana.
>
> > [!success]- Resposta
> > `/pedidos` vai na requisição e indica o recurso pedido. O ID de sessão também pode vir na requisição e permite à aplicação reconhecer a sessão. Os produtos comprados são dados da aplicação, normalmente guardados num banco ou serviço de armazenamento.

> [!question] 9. Uma aplicação totalmente stateless?
> Uma equipe diz: "Nossa API é stateless, então não usamos banco de dados nem guardamos conta de usuário." A conclusão faz sentido?
>
> > [!success]- Resposta
> > Não. Uma API pode usar bancos e manter dados persistentes mesmo tratando cada requisição sem depender de memória implícita entre elas. Stateless não significa "sem dados".

> [!tip] Para guardar
> - **Stateless**: o HTTP não associa automaticamente uma requisição à anterior.
> - A aplicação pode manter contas, pedidos e sessões em bancos ou outros armazenamentos.
> - Cookie é um recipiente no navegador; pode carregar um ID de sessão ou um token. A sessão pode ficar num armazenamento do servidor.
> - Um token assinado pode ser validado sem consultar um registro de sessão; um token opaco precisa ser associado a dados no servidor.
> - O balanceador encaminha o tráfego. Sessões compartilhadas ou tokens verificáveis ajudam qualquer servidor a reconhecer o cliente.
> - Conexão TCP persistente economiza conexões; não é transmissão em chunks e não substitui a credencial de aplicação.

