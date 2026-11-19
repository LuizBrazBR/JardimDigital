---
title: Balanceador de carga
---

> [!abstract] Definição
> **Componente que recebe o tráfego de uma aplicação e o encaminha a um dos servidores disponíveis.**

Um balanceador pode dividir os pedidos entre servidores para distribuir o trabalho e ajudar a aplicação a continuar atendendo quando um deles falha. Por isso, pedidos seguidos de um mesmo usuário podem chegar a servidores diferentes. Ver a aula [[programacao/protocolos-da-web/modulo-2/03-http-nao-tem-memoria-stateless|2.3 HTTP não tem memória: o que significa ser stateless]].

## De onde vem a palavra

Balanceador vem de "balança", do latim vulgar *bilancia*, e este de *bilanx*, "de dois pratos" (*bi-*, "dois", mais *lanx*, "prato"): a balança de dois pratos. *Carga* vem do sentido de "peso transportado", de *load*, do inglês antigo *lād*, "caminho, jornada". O balanceador faz o que a balança faz: distribui o peso, aqui o tráfego, entre os pratos.

Fontes: Wiktionary: [balance](https://en.wiktionary.org/wiki/balance), [load](https://en.wiktionary.org/wiki/load)
