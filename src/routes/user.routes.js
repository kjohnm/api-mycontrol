// Importa o roteador do Express
import express from "express";

// Importa os controladores responsáveis por lidar com cada rota
import {
	createUser,
	getUsers,
	updateUser,
	deleteUser,
} from "../controllers/user.controller.js";

// Cria uma instância de router
const router = express.Router();

// Rota para criar um novo usuário
router.post("/", createUser);

// Rota para buscar usuários (com filtros, paginação e ordenação)
router.get("/", getUsers);

// Rota para atualizar um usuário específico por ID
router.put("/:id", updateUser);

// Rota para deletar um usuário específico por ID
router.delete("/:id", deleteUser);

// Exporta o router para ser usado no server.js
export default router;
