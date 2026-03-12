# 🏆 Rank-set API

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)

> API RESTful robusta desenvolvida com NestJS e MongoDB para gestão de rankings, desafios e partidas entre jogadores.

---

## 📄 Sobre o Projeto

O **Rank-set** é um sistema de gerenciamento de competições que controla desde o cadastro de jogadores até a realização de desafios e computação de resultados de partidas. 

### 🛠️ Decisão Arquitetural: Monolito para Microsserviços
Este projeto foi concebido estrategicamente como um **monolito modular**. É importante destacar que esta implementação atual funciona como uma base sólida para uma **futura transição para arquitetura de microsserviços**. 

A estrutura de domínios foi desenhada de forma independente para que cada módulo (Player, Category, Challenge, Match) possa ser extraído e isolado com o mínimo de refatoração, permitindo que a aplicação evolua para um ambiente distribuído e escalável conforme a necessidade.

---

## ✨ Funcionalidades

### 👥 Gestão de Jogadores (Players)
- Cadastro de jogadores com validação de campos únicos (E-mail e Telefone).
- Listagem otimizada com suporte a paginação.

### 📁 Categorias
- Organização de jogadores por níveis competitivos.
- Definição de eventos e valores de pontuação específicos por categoria.
- Atribuição e remoção dinâmica de jogadores aos rankings.

### ⚔️ Desafios (Challenges)
- Sistema de solicitação de desafios entre jogadores.
- Controle de ciclo de vida completo: `PENDING`, `ACCEPTED`, `ACCOMPLISHED`, etc.
- Validação de integridade: garante que apenas jogadores da mesma categoria se enfrentem.

### 🎾 Partidas (Matches)
- Registro de resultados de confrontos e pontuação por sets.
- Vinculação automática com desafios aceitos.
- Histórico completo de performance por jogador e categoria.

---

## 🛠️ Tecnologias e Arquitetura

A aplicação utiliza uma estrutura modular baseada em Injeção de Dependência, focada em separação de responsabilidades:

- **Core:** NestJS 11 (Arquitetura Modular)
- **Banco de Dados:** MongoDB com **Mongoose** (Modelagem NoSQL)
- **Validação:** `class-validator` com Pipes globais para garantir a consistência dos dados.
- **Testes Automatizados:**
  - ✅ **Testes Unitários:** Cobertura total de todos os Services em todos os módulos, garantindo a integridade das regras de negócio e facilitando migrações futuras.
- **Ferramentas de Desenvolvimento:** Arquivo `client.rest` incluso para validação rápida de fluxos e endpoints.

---

## 👨‍💻 Autor

| [<img src="https://github.com/GUSTAV0-CRUZ.png" width="100px;"/><br /><sub><b>Gustavo Cruz</b></sub>](https://github.com/GUSTAV0-CRUZ) |
| :---: |

Projeto desenvolvido por Gustavo Cruz (GUSTAV0-CRUZ).
