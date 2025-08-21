# 📦 Simple API with Node.js & Prisma

Esta é uma API simples desenvolvida com Node.js, utilizando Prisma como ORM, e seguindo uma arquitetura organizada por responsabilidade. O projeto está versionado com Git e pronto para ser evoluído.

### Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [Yarn](https://yarnpkg.com/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Estrutura de Pastas

.
├── generated/             # Código gerado pelo Prisma
│   └── prisma/
├── prisma/
│   └── schema.prisma      # Esquema do Prisma
├── src/
│   ├── controllers/       # Controladores (lógica de controle)
│   │   └── user.controller.js
│   ├── middlewares/       # Middlewares customizados (em branco por enquanto)
│   ├── prisma/
│   │   └── client.js       # Instância do Prisma Client
│   ├── routes/            # Rotas da API
│   │   └── user.routes.js
│   ├── services/          # Lógica de negócio
│   │   └── user.service.js
│   ├── utils/             # Funções utilitárias
│   │   ├── formatters.js
│   │   └── validators.js
│   └── app.js             # Configuração principal do app
├── server.js              # Entrada do servidor
├── .gitignore
├── package.json
├── yarn.lock

### Instalação e Execução
* Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repositorio.git
cd nome-do-repositorio


* Instale as dependências
yarn install

* Configure o banco de dados

* Edite o arquivo .env com sua URL de conexão com o banco de dados:

* Execute as migrações
npx prisma migrate dev --name init

* Rode o projeto
yarn dev
A aplicação rodará por padrão em http://localhost:3000

### Exemplos de Endpoints
GET /users → Lista todos os usuários
POST /users → Cria um novo usuário
PUT /users/:id → Atualiza um usuário
DELETE /users/:id → Remove um usuário

### Convenções Adotadas
Controllers: Recebem e respondem requisições.

Services: Contêm a lógica de negócio.

Routes: Gerenciam os endpoints da API.

Prisma: A camada de ORM que acessa o banco de dados.

Utils: Funções auxiliares como validadores e formatadores.

### Scripts úteis
yarn dev        # Inicia o servidor em modo de desenvolvimento
yarn build      # Compila o projeto (caso necessário)
yarn prisma     # Executa comandos do Prisma

### Versionamento
Este projeto está versionado com o Git. Recomenda-se utilizar branches para features, hotfixes e releases.

### Autores

Projeto autoral com base em vídeo introdutório sobre APIs com Node, e ampliado com base na documentação das ferramentas/tecnologias sugeridas.