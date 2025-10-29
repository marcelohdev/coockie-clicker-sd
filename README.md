# 🍪 Cookie Clicker - Projeto de Sistemas Distribuídos

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)

Este projeto é um clone do clássico jogo *Cookie Clicker*, desenvolvido como um projeto prático para a disciplina de Sistemas Distribuídos.

O diferencial deste clone é sua arquitetura: o front-end é um jogo web estático (HTML/CSS/JS) que se comunica com um back-end *serverless* na **AWS** para persistir a pontuação do jogador na nuvem.

![Gif do Jogo](https://github.com/user-attachments/assets/7627344b-28ed-4599-9545-2fba435c3ed9)

## ✨ Funcionalidades

Este projeto implementa as principais mecânicas do Cookie Clicker:

* **Clicar no Cookie:** A mecânica central de ganhar cookies por clique.
* **Loja de Itens:**
    * Compre "Cursores" e "Avós" para aumentar sua produção.
    * **Custo Progressivo:** O preço de cada item aumenta em 15% a cada compra, como no jogo original.
* **Geração Passiva (CPS):** Os itens comprados geram cookies automaticamente a cada segundo.
* **Painel de Construções:** A coluna central lista todos os itens que você já comprou e suas respectivas quantidades.
* **Feedback Visual ("Juice"):**
    * Números flutuantes "+1" aparecem a cada clique.
    * Uma "aura" pulsante emana do cookie principal.
    * Animação de "clique" (escala) no cookie.
    * Botões da loja ficam desabilitados (visualmente e funcionalmente) se o jogador não tiver cookies suficientes.
* **Integração Back-end (AWS):**
    * A pontuação do jogador é enviada para um endpoint da **AWS API Gateway** a cada clique.
    * Uma função **AWS Lambda** processa e salva a pontuação (provavelmente em um banco DynamoDB).
    * O front-end exibe mensagens de status ("Salvo na nuvem!", "Erro de rede...") com base na resposta da API.

## 🚀 Tecnologias Utilizadas

### Front-End
* **HTML5:** Estrutura semântica do jogo.
* **CSS3:** Estilização avançada com Flexbox, animações (`@keyframes`) e pseudo-elementos (`::before`) para criar o visual inspirado na versão Steam.
* **JavaScript (ES6+):**
    * Manipulação do DOM para toda a interatividade.
    * Lógica do jogo (cálculo de custos, CPS, loop de jogo com `setInterval`).
    * Comunicação com o back-end usando a `Fetch API` (chamadas assíncronas).

### Back-End (Arquitetura Serverless)
* **AWS API Gateway:** Cria e gerencia o endpoint HTTP RESTful que o front-end consome.
* **AWS Lambda:** Executa a lógica de back-end (receber a pontuação, processar, salvar no banco) sem a necessidade de gerenciar servidores.
* **(Sugerido) AWS DynamoDB:** Um banco de dados NoSQL gerenciado, ideal para salvar o estado do jogo (pontuação, itens) de forma rápida e escalável.

## ⚙️ Como Executar

### 1. Front-End

Como é um projeto web estático, o front-end é simples de executar:
1.  Clone este repositório: `git clone https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git`
2.  Abra o arquivo `index.html` em qualquer navegador web moderno (Chrome, Firefox, Edge).

### 2. Back-End (Obrigatório para salvar)

O jogo *funcionará* localmente, mas mostrará "Erro de rede" no console, pois a variável `apiUrl` no `main.js` aponta para um endpoint que só existe na sua conta AWS.

Para que a funcionalidade de salvar funcione, você precisa configurar seu próprio back-end:

1.  **Crie sua infraestrutura na AWS** (API Gateway, Lambda e, opcionalmente, DynamoDB).
2.  Faça o deploy da sua função Lambda.
3.  Obtenha a **URL de Invocação** (Invoke URL) da sua API Gateway.
4.  Abra o arquivo `main.js`.
5.  Substitua a URL de exemplo pela sua URL real:

    ```javascript
    // main.js
    // --- CONFIGURAÇÃO ---
    const apiUrl = 'https://SUA_URL_DA_API_GATEWAY_[AQUI.amazonaws.com/jogo](https://AQUI.amazonaws.com/jogo)'; 
    // --- FIM DA CONFIGURAÇÃO ---
    ```

## 🎓 Contexto do Projeto

Este jogo foi desenvolvido como um projeto prático para a disciplina de **Sistemas Distribuídos**. O objetivo principal era projetar e implementar um sistema onde um cliente (o jogo no navegador) consome serviços de um back-end desacoplado e escalável na nuvem, demonstrando na prática os conceitos de arquitetura de microsserviços e *serverless computing*.
