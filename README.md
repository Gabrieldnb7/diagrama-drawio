# Site logita
A loja virtual Logita é um aplicativo web feito em Node.js que acessa a FakeStoreAPI para acessar itens de uma loja de roupas que possibilita o usuário navegar pelos produtos, se cadastrar e criar um carrinho de compras. Esta aplicação foi projetada anteriormente utilizando um modelo de diagrama C4 presente no arquivo [Diagrama.md](Diagrama.md).

## Sumário
- [Contexto](#contexto)
- [Metodologia Ágil](#metodologia-ágil)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos](#requisitos)
- [Instalação](#instalação)

## Contexto
A loja virtual Logita é um aplicativo web que acessa a base de dados de uma aplicação externa e permite ao usuário:
- Fazer login;
- Navegar por produtos;
- Visualizar detalhes e descrição dos produtos assim como um exemplo de tamanho das peças disponíveis;
- Adicionar um produto ao carrinho;
- Selecionar tamanho e quantidade de um item;
- Buscar por produtos.

## Metodologia Ágil
No projeto foi utilizada a metodologia do Scrum para o desenvolvimendo das diversas etapas do projeto. [Neste link](https://projeto-fakestore.atlassian.net/jira/software/projects/SCRUM/boards/1?atlOrigin=eyJpIjoiOTg3M2IwNGUzYTcwNDBkNTkwYjA0ODIzYTkwYzQzZWYiLCJwIjoiaiJ9) você terá acesso à pagina do Jira que contém as sprints e funções atribuidas.

## Tecnologias Utilizadas
Neste projeto foram utilizados as seguintes ferramentas e tecnologias:
- [HTML](https://www.w3schools.com/html/default.asp) : Linguagem de marcação de texto para páginas web.
- [CSS](https://www.w3schools.com/css/default.asp) : Estrutura de estilização de páginas web.
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) : Linguagem de programação para criar interação com o usuário.
- [Node.js](https://nodejs.org/en) : Framework de JavaScript para criar e estruturar nossa aplicação.
- [Express.js](https://expressjs.com/pt-br/) : Framework para Node.js que facilita a criação de rotas para a aplicação
- [Fakestore API](https://fakestoreapi.com) : API que detém os produtos utilizados em nossa aplicação.
- [Postman](https://www.postman.com) : API utilizada para testar rotas e requisições HTTP.
- [Jira](www.atlassian.com/br/software/jira) : Framework utilizado para estruturar o Scrum utilizado durante o projeto.


## Requisitos
- [Git: versão 2.45.1(na versão para Windows) ou superior](https://www.git-scm.com/downloads)
- [Ejs: versão 3.1.10 ou superior](https://www.npmjs.com/package/ejs)
- [Express: versão 4.19.2 ou superior](https://expressjs.com/en/starter/installing.html)
- [Node.js: versão 21.2.0 ou superior](https://nodejs.org/en/download/package-manager/current)

## Instalação
Após instalar todos os requisitos, para instalar a aplicação:

- Windows

1. Clone o repositório:

    ```
    git clone https://github.com/Gabrieldnb7/diagrama-drawio.git
    ```

2. Instalar dependências:
    ```
    cd lojita
    npm install
    ```

3. Iniciar a aplicação:
    ```
    cd lojita
    npm start
    ```

4. Abrindo o projeto

    Para abrir o projeto basta segurar a tecla Ctrl e clicar em http://localhost:5000 no seu terminal ou copiar o link para o seu navegador.

5. Fechando o projeto

    Para fechar o projeto basta usar o comando Ctrl + C no terminal.

## Autores
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/128320120?v=4" width=115><br><sub>Gabriel Marcos</sub>](https://github.com/Gabrieldnb7) |  [<img loading="lazy" src="https://avatars.githubusercontent.com/u/49594278?v=4" width=115><br><sub>Bianco da Costa</sub>](https://github.com/Ocnaibill) |  [<img loading="lazy" src="https://avatars.githubusercontent.com/u/77034738?v=4" width=115><br><sub>Jhon Wilker</sub>](https://github.com/jhhoker) | [<img loading="lazy" src="https://avatars.githubusercontent.com/u/142797524?v=4" width=115><br><sub>Júlia Sernagiotto</sub>](https://github.com/juhgiotto)
| :---: | :---: | :---: | :---: |