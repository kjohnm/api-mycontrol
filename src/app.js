// src/app.js

// Importa o Express
import express from "express";

// Importa middlewares externos
import cors from "cors";

// Importa rotas do usuário (que já estão separadas no arquivo routes)
import userRoutes from "./routes/user.routes.js";

// Cria a aplicação Express
const app = express();

/**
 * Lista de origens permitidas para acessar a API.
 * Isso é útil para ambientes de desenvolvimento e produção.
 */
const allowedOrigins = [
	"http://localhost:3000", // Ambiente de testes local
	"http://localhost:5173", // Front-end rodando com Vite, por exemplo
	"http://localhost:5555", // Inseri também o do prisma Studio para alguns testes
	"https://seusite.com.br", // Origem de produção (opcional)
];

/**
 * Configurações do middleware CORS.
 * A função origin permite apenas chamadas vindas das origens da lista acima.
 * O uso de !origin garante que ferramentas como Postman também consigam acessar.
 */
const corsOptions = {
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true); // Permite acesso
		} else {
			callback(new Error("Não permitido pelo CORS")); // Bloqueia outras origens
		}
	},
	methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
	credentials: true, // Permite envio de cookies/autenticação, se necessário
};

/**
 * Middleware para permitir que o servidor receba JSON no corpo das requisições.
 */
app.use(express.json());

/**
 * Middleware CORS (Cross-Origin Resource Sharing) com configurações personalizadas.
 * Isso garante que apenas origens confiáveis possam consumir a API.
 */
app.use(cors(corsOptions));

/**
 * Rotas principais da aplicação.
 * Tudo que começa com /users será tratado pelas rotas de usuários.
 */
app.use("/users", userRoutes);

// Exporta a app configurada para que o server.js possa usá-la
export default app;
