---
title: Semântica
---

> [!abstract] Definição
> **O significado de algo.** No HTTP, é o trabalho para o qual cada método foi feito: o `GET` foi feito para ler, o `PUT` para substituir, o `DELETE` para remover.

Um "erro de semântica" é programar um método para fazer outra coisa, diferente do trabalho para o qual ele foi feito, como um `GET` que apaga dados. Não é um erro de escrita: o pedido está certo e o servidor responde normalmente. O problema aparece quando outro programa, como um [[glossario/cache|cache]] ou um [[glossario/crawler|crawler]], acredita que o método faz só o trabalho dele. Ver a aula [[programacao/protocolos-da-web/modulo-3/05-metodos-seguros-idempotentes-e-erros-comuns-de-semantica|3.5 Métodos seguros, idempotentes e erros comuns de semântica]].

## De onde vem a palavra

Do grego *sēmantikós*, "que dá sinais, significativo", de *sēmaínō*, "indicar". O termo moderno vem do francês *sémantique*, criado em 1883 pelo filólogo Michel Bréal para nomear o estudo do significado das palavras. A informática pegou o sentido emprestado: a semântica de um comando é o que ele significa, em oposição à sintaxe, que é só como ele se escreve.

Fontes: Wiktionary: [semantic](https://en.wiktionary.org/wiki/semantic), [σημαντικός](https://en.wiktionary.org/wiki/%CF%83%CE%B7%CE%BC%CE%B1%CE%BD%CF%84%CE%B9%CE%BA%CF%8C%CF%82) · IETF: [RFC 9110, seção 9: Methods](https://www.rfc-editor.org/rfc/rfc9110#section-9)
