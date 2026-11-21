# Instruções para o Codex: aulas do Jardim Digital

Este repositório é o jardim digital do Luiz (Quartz, publicado no GitHub Pages). Quando ele colar uma aula de um curso, você escreve o resumo dela aqui, **sempre do mesmo jeito**. Estas regras vêm de correções reais que ele fez. Leia tudo antes de escrever e confira a lista do fim antes de commitar.

## Quem é o leitor

Um iniciante que está aprendendo a programar, em português do Brasil. O chefe dele programa, e ele compara o curso com o que vê no trabalho. Ele **pergunta sobre cada termo ou trecho de código que a aula usa sem explicar**. Por isso: passo a passo, exemplo concreto, nada condensado.

## Onde cada coisa fica

- Curso atual: `content/programacao/protocolos-da-web/` (trilha de back-end). O curso anterior, `logica-de-programacao`, tem a mesma estrutura.
- A página do curso (`index.md`) lista todos os módulos e todas as aulas. Aula sem resumo aparece como texto simples; aula pronta vira link.
- Uma pasta por módulo: `modulo-N/`, com `index.md` e as aulas `MM-slug.md`. O número da aula é a posição dela no módulo. Slug sem acento, em minúsculas, com hífens.
- Título da aula: `"N.M Título"` (ex.: `"2.3 HTTP não tem memória: o que significa ser stateless"`). O número fica no título porque o explorador ordena por título.
- Frontmatter da aula: `title` e `tags` (`protocolos-da-web` e o assunto, ex.: `http`).
- Termos novos vão em `content/glossario/<slug>.md`.
- Ao terminar uma aula: transforme o texto simples em link **nos dois lugares**: no `index.md` do curso e no `modulo-N/index.md`. Módulo novo ganha `modulo-N/index.md` com título `"Módulo N – Nome"`, `cssclasses: [sem-listagem]`, uma introdução curta e a lista numerada, e o cabeçalho dele no índice do curso também vira link.
- Se mover uma aula, ponha o caminho antigo em `aliases` para a URL antiga redirecionar.

## Como escrever o resumo

1. **Com as suas palavras.** Não copie nem fique colado no texto da aula. Ele disse: "n precisa ser totalmente igual".
2. Abra ligando com a aula anterior ("Na aula 2.1, ..."). Cite outras aulas como "aula 2.4" e, quando der, com wikilink.
3. Definição principal num callout: `> [!abstract] Definição` com a frase central em **negrito**.
4. Exemplos concretos, de preferência código ou mensagens reais, e analogias do dia a dia (`> [!example] Título`). Termine as analogias dizendo onde elas deixam de valer.
5. Dúvidas profundas vão em `> [!info]` (ou `> [!info]-` quando recolhido). Dicas finais em `> [!tip] Para guardar`.
6. **Leia a aula procurando termos que ela nunca introduziu** (ele reclamou de "coleção", "roadmap", "framework" sem explicação). Cada um ganha uma seção curta na aula **e** uma entrada no glossário.
7. **Conceito novo precisa de base e de "quando usar".** Antes de usar algo que o curso ainda não ensinou, mostre num exemplo minúsculo com os dois lados visíveis, ligue a uma analogia que o curso já tem e diga quando usar. Quando houver uma regra (ex.: o sinal de `a - b`), dê o motivo, não só uma tabela.
8. **Código com método ou idioma ainda não ensinado** (`.replace`, `x || ""`, `req.on("data")`): explique linha por linha, com uma tabela de valores. Ele pergunta cada um.
9. **Atalhos de notação** como `pedaço <- nome (nota)`: explique como ler, uma peça por vez, e refaça como tabela com cabeçalho (pedaço / nome / o que faz). Quando a aula chama uma coisa por dois nomes, diga qual é o nome da parte e qual é o que ela contém, e mostre um contraexemplo.
10. **Definições em par ficam paralelas**: use o mesmo verbo nos dois lados (ex.: "onde o código roda"). Ao apontar uma ferramenta (DevTools etc.), diga exatamente **o que ela mostra e em que ordem**; ele cola a tela e não sabe qual bloco é qual.
11. **Não invente expressão que soa como termo técnico.** Diga a coisa simples com um exemplo. Evite negações retóricas que podem ser lidas ao pé da letra ("a versão X não resolve Y" quando quer dizer "resolve, por outro caminho"): diga o que o código faz.
12. Só JavaScript e Python quando houver código. **Sem pseudocódigo e sem comparação com Excel/planilha.** Nas aulas do protocolo, os exemplos práticos usam `curl.exe` (no PowerShell do Windows, `curl` é apelido do `Invoke-WebRequest`), o DevTools (aba Network) e Node.js (`node:net`, `http`).
13. **Corrija a página**, não só a resposta no chat: quando ele apontar uma confusão, o texto da aula é que muda.
14. Quando ele compara a aula com algo do trabalho (ex.: "o chefe usa break"), explique o que o jargão quer dizer (break = breakpoint), diferencie de conceitos do curso com nome parecido e, se o assunto só foi citado de passagem, acrescente uma seção de verdade na aula.

### Seção "Treine" (todas as aulas)

Cada exercício precisa **se bastar**: o código/enunciado vai dentro do próprio callout. Nunca escreva "com a escada lá de cima". A resposta fica recolhida logo abaixo da pergunta, sem bloco de gabaritos separado. Formato exato:

```markdown
## Treine

Tente responder antes de abrir a resposta, logo abaixo de cada pergunta.

> [!question] 1. Pergunta curta
> Enunciado, com o código aqui dentro se houver.
>
> > [!success]- Resposta
> > Texto da resposta.
```

Há uma linha `>` em branco antes do callout aninhado. Código de várias linhas vai em bloco formatado, não em uma linha só. **Não sugira treino de decorar** ("apague e reescreva sem consultar"): ele já tenta antes de abrir a resposta e consultar a sintaxe é normal. Prefira problemas novos, de enunciado curto, em que ele divide o trabalho sozinho.

### Fechamento da aula

Termine com `## De onde vêm as palavras` (ou deixe as origens na entrada do glossário) e com o `> [!tip] Para guardar`.

## Glossário (`content/glossario/`)

Toda entrada nova tem **exatamente** esta forma (veja `glossario/crlf.md`):

```markdown
---
title: Nome do termo
---

> [!abstract] Definição
> **Definição em uma frase.** Complemento.

Parágrafo curto de contexto. Ver a aula [[programacao/protocolos-da-web/modulo-2/01-slug|2.1 Título]].

## De onde vem a palavra

Etimologia explicada em português (idioma de origem, sentido original, como chegou à informática).

Fontes: [Nome](url) · [Nome](url)
```

- **A seção "De onde vem a palavra" e a linha "Fontes:" são obrigatórias.** Ele gosta das etimologias.
- **Confira a etimologia na web**, não de memória. O Wiktionary costuma funcionar (o etymonline bloqueia). Para termos técnicos, cite também RFC/MDN. Se a origem for só um nome comercial ou sigla, diga isso com as fontes.
- Antes de criar, procure se o termo já existe (`ls content/glossario`). Nas aulas novas, **linke** as entradas antigas e as expanda; não crie duplicatas.
- Todo termo técnico que aparece pela primeira vez na aula ganha wikilink: `[[glossario/cabecalho|cabeçalho]]`.

## Armadilhas de formatação (já deram problema)

- **Link com alias dentro de tabela: escape o pipe.** Em tabela, o `|` separa colunas e quebra o link. Escreva `[[glossario/cookie\|Cookie]]`, com barra invertida antes do `|`. Fora de tabela, `[[glossario/cookie|Cookie]]` continua certo. Antes de commitar, confira: `grep -n '^|.*\[\[[^]]*[^\\]|' <arquivos>` não deve achar nada.

- **Nada de `$` no texto corrido.** O Quartz lê o trecho entre dois `$` como fórmula e embaralha. Escreva "200 reais" ou ponha o valor entre crases. Depois do build, `grep -c 'class="katex'` no HTML gerado deve dar 0.
- **Nada de markdown dentro de alias de wikilink.** `[[pagina|texto **negrito**]]` mostra os `**` literais. Ponha o link numa palavra simples e o negrito fora.
- **Fim de linha LF**, não CRLF. No Windows a ferramenta de escrever grava CRLF: antes de commitar, rode `sed -i 's/\r$//' arquivo.md` (ou grave com `newline="\n"` se usar Python) e confira com `git diff --stat` que o arquivo não inteiro aparece como alterado.
- Links entre aulas usam o caminho completo: `[[programacao/protocolos-da-web/modulo-2/01-a-anatomia-de-uma-requisicao-http|aula 2.1]]`.
- Código de exemplo precisa ser verdadeiro: se a aula diz que o corpo tem 55 bytes, confira (`Buffer.byteLength`). Não deixe números inventados.

## Publicar

Depois de escrever (e **só depois** de checar a lista abaixo): commit e push na `main`, para o GitHub Pages publicar. O Luiz também commita de outra máquina.

```
git add -A
git commit -m "Adiciona a aula N.M, <assunto em poucas palavras>"
git pull --rebase origin main
git push origin main
```

(O `pull` vem **depois** do commit: com mudanças não commitadas ele falha.) Mensagens de commit em português, sem acento é aceito, no passado ou imperativo curto, como as do histórico (`Adiciona aula sobre HTTP stateless`, `Explica sessões e adiciona termos ao glossário`). Em caso de `refs/heads/main` corrompida ("your current branch appears to be broken"), não apague nada: avise o Luiz.

## Checklist antes de commitar

- [ ] Título `"N.M ..."`, tags, abertura ligando à aula anterior.
- [ ] Definição em `[!abstract]`; exemplos concretos; termos novos explicados.
- [ ] Todo termo que a aula usa sem explicar ganhou seção e glossário.
- [ ] Seção **Treine** no formato exato, exercícios autossuficientes, respostas recolhidas.
- [ ] Cada entrada nova do glossário tem Definição, **De onde vem a palavra** e **Fontes**.
- [ ] Aula virou link **no índice do curso e no `modulo-N/index.md`**.
- [ ] Sem `$` no texto, sem markdown em alias de wikilink, arquivos em LF.
- [ ] Sem pseudocódigo/Excel; código só em JS/Python (e `curl`, Node nos exemplos de protocolo).
- [ ] Números e códigos de exemplo conferidos.
- [ ] Commit, `pull --rebase`, push.
