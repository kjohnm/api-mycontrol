// // import express from "express";
// // import { PrismaClient } from "../generated/prisma";

// // const prisma = new PrismaClient();

// // const app = express();
// // const PORT = process.env.PORT || 3000;

// // app.use(express.json());

// // const usersapp = [];

// // app.post("/users", (request, response) => {
// // 	console.log("Body request: ", request.body);

// // 	usersapp.push(request.body);
// // 	response.status(201).send("Post Ok"); // 201 -> Tudo ok, e o que foi solicitado foi criado
// // });

// // app.get("/users", (request, response) => {
// // 	//response.send("OK, FirstGet OK");
// // 	response.status(200).json(usersapp);
// // });
// // app.listen(PORT);

// import express from "express";
// import { formatName } from "./src/utils/formatters.js";

// // Importa o Prisma Client gerado no caminho personalizado para evitar o warning
// import { PrismaClient } from "../api_back_mycontrol/generated/prisma/index.js";

// // Cria a instância do Prisma Client
// const prisma = new PrismaClient();

// // Cria a instância do Express
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Adiciona middleware para permitir o uso de JSON no corpo da requisição
// app.use(express.json());

// // Rota POST para criar um novo usuário com mais validações importantes
// app.post("/users", async (req, res) => {
// 	// Desestrutura os dados do corpo da requisição (JSON enviado pelo cliente)
// 	const { name, email, age } = req.body;

// 	try {
// 		// Verifica se todos os campos foram enviados
// 		if (!name || !email || age === undefined) {
// 			return res.status(400).json({
// 				error: "Todos os campos são obrigatórios: nome, e-mail e idade.",
// 			});
// 		}

// 		// Cria um novo usuário no banco usando Prisma
// 		const user = await prisma.user.create({
// 			data: {
// 				name: formatName(name), // nome do usuário já com formatação
// 				email, // e-mail do usuário
// 				age: Number.parseInt(age), // converte o valor de idade para número (caso venha como string)
// 			},
// 		});

// 		// Se o usuário for criado com sucesso, retorna status 201 (Created) com os dados do usuário
// 		return res.status(201).json(user);
// 	} catch (error) {
// 		// Mostra o erro completo no console para facilitar a depuração
// 		console.error("Erro ao criar usuário:", error);

// 		// Verifica se o erro é do tipo "violação de chave única" (por exemplo, e-mail duplicado)
// 		if (
// 			error.code === "P2002" && // Código de erro do Prisma para dados duplicados
// 			error.meta?.target?.includes("email") // Garante que o erro foi causado pelo campo `email`
// 		) {
// 			// Retorna status 400 (Bad Request) com mensagem personalizada
// 			return res.status(400).json({ error: "E-mail já cadastrado" });
// 		}

// 		// Se o erro for de outro tipo, retorna status 500 (erro interno do servidor)
// 		return res.status(500).json({ error: "Erro ao criar usuário" });
// 	}
// });

// // Rota de Post para criação do usuário
// // app.post("/users", async (req, res) => {
// // 	try {
// // 		const { name, email, age } = req.body;

// // 		// Cria o usuário no banco via Prisma
// // 		const newUser = await prisma.user.create({
// // 			data: { name, email, age },
// // 		});

// // 		// Retorna o novo usuário criado com 201 para confirmar que é caso de criação
// // 		res.status(201).json(newUser);
// // 	} catch (error) {
// // 		console.error("Erro ao criar usuário:", error);
// // 		res.status(500).json({ error: "Erro interno do servidor." });
// // 	}
// // });

// // Atualiza um usuário existente com base no ID informado na URL
// app.put("/users/:id", async (req, res) => {
// 	const { id } = req.params; // ID passado como parâmetro na URL
// 	const { name, age, email } = req.body; // Novos dados enviados no corpo da requisição

// 	try {
// 		// Verifica se o usuário existe antes de atualizar
// 		const userExists = await prisma.user.findUnique({ where: { id } });

// 		if (!userExists) {
// 			return res.status(404).json({ error: "Usuário não encontrado." });
// 		}

// 		// Atualiza o usuário com os novos dados
// 		const updatedUser = await prisma.user.update({
// 			where: { id },
// 			data: { name, age, email },
// 		});

// 		// Retorna o usuário atualizado
// 		res.status(200).json(updatedUser);
// 	} catch (error) {
// 		console.error("Erro ao atualizar usuário:", error);
// 		res.status(500).json({ error: "Erro interno ao atualizar usuário." });
// 	}
// });

// // Remove um usuário do banco de dados com base no ID
// app.delete("/users/:id", async (req, res) => {
// 	const { id } = req.params; // ID passado na URL

// 	try {
// 		// Verifica se o usuário existe antes de tentar deletar
// 		const userExists = await prisma.user.findUnique({ where: { id } });

// 		if (!userExists) {
// 			return res.status(404).json({ error: "Usuário não encontrado." });
// 		}

// 		// Remove o usuário do banco
// 		await prisma.user.delete({ where: { id } });

// 		// Resposta indicando deletado com sucesso. Usando 204 para identificar que não há corpo na mensagem, mas poderia usar outra opção
// 		//res.status(204).send(); // Sem conteúdo (No Content)

// 		//No caso abaixo usaria 200
// 		res.status(200).json({ message: "Usuário deletado com sucesso." });
// 	} catch (error) {
// 		console.error("Erro ao deletar usuário:", error);
// 		res.status(500).json({ error: "Erro interno ao deletar usuário." });
// 	}
// });

// // Rota GET para listar usuários com filtros, ordenação e paginação
// app.get("/users", async (req, res) => {
// 	try {
// 		// Extrai os parâmetros da query string
// 		const { name, email, age, sortBy, order, page } = req.query;

// 		// Monta dinamicamente os filtros (só inclui campos não undefined)
// 		const filters = {};
// 		if (name)
// 			filters.name = {
// 				contains: name,
// 				mode: "insensitive", // ignora maiúsculas/minúsculas
// 			};
// 		if (email) filters.email = email;
// 		if (age) filters.age = Number.parseInt(age); // converte string para número

// 		// Define o número fixo de usuários por página
// 		const pageSize = 8;

// 		// Página atual (converte para número e garante mínimo de 1)
// 		const currentPage = Math.max(Number.parseInt(page) || 1, 1);

// 		// Calcula quantos registros devem ser ignorados
// 		const skip = (currentPage - 1) * pageSize;

// 		// Define a ordenação (se fornecida), com fallback
// 		const sortField = sortBy || "createdAt";
// 		const sortDirection = order === "asc" ? "asc" : "desc"; // padrão: desc

// 		// Consulta os usuários com os filtros, paginação e ordenação
// 		const users = await prisma.user.findMany({
// 			where: filters, // filtros dinâmicos
// 			skip: skip, // ignora registros anteriores à página
// 			take: pageSize, // quantidade por página
// 			orderBy: {
// 				[sortField]: sortDirection, // campo e direção da ordenação
// 			},
// 		});

// 		// Caso nenhum usuário seja encontrado
// 		if (users.length === 0) {
// 			return res.status(200).json({
// 				message:
// 					"Está ok, mas nenhum usuário foi encontrado com os filtros informados.",
// 			});
// 		}

// 		console.log("Usuários encontrados:", users);

// 		// Retorna a lista de usuários
// 		res.status(200).json(users);
// 	} catch (error) {
// 		console.error("Erro ao buscar usuários:", error);
// 		res.status(500).json({ error: "Erro ao buscar usuários" });
// 	}
// });

// // // Rota GET para listar usuários com ou sem filtros passados via query
// // app.get("/users", async (req, res) => {
// // 	try {
// // 		// Extrai os parâmetros da query string
// // 		const { name, email, age } = req.query;

// // 		// Monta dinamicamente o filtro (só inclui campos que não são undefined)
// // 		const filters = {};

// // 		if (name)
// // 			filters.name = {
// // 				contains: name,
// // 				mode: "insensitive", // ignora letras maiúsculas/minúsculas
// // 			};
// // 		if (email) filters.email = email;
// // 		// Converte idade para número, se vier como string
// // 		if (age) filters.age = Number.parseInt(age);

// // 		// Busca os usuários com ou sem filtros
// // 		const users = await prisma.user.findMany({ where: filters });

// // 		// Verifica se encontrou algum resultado, se não encontrar emite o status 200, pois houve sucesso, mas poderia ser 404 (not found)
// // 		if (users.length === 0) {
// // 			return res.status(200).json({
// // 				message:
// // 					"Está ok, mas nenhum usuário foi encontrado com os filtros informados.",
// // 			});
// // 		}
// // 		console.log("c.log usuarios filtrados:", users);

// // 		// Retorna os resultados
// // 		res.status(200).json(users);
// // 	} catch (error) {
// // 		console.error("Erro ao buscar usuários:", error);
// // 		res.status(500).json({ error: "Erro ao buscar usuários" });
// // 	}
// // });

// // // Rota GET mais completa para buscar usuários com filtros, paginação e ordenação
// // app.get("/users", async (req, res) => {
// //     try {
// //       // Extrai filtros e parâmetros de controle da query string
// //       const { name, email, age, skip, take, orderBy, direction } = req.query;

// //       // Cria objeto de filtros dinamicamente
// //       const filters = {};

// //       // Se o campo name foi enviado, usa busca parcial (contains)
// //       if (name) {
// //         filters.name = {
// //           contains: name,
// //           mode: "insensitive", // ignora letras maiúsculas/minúsculas
// //         };
// //       }

// //       // Se o campo email foi enviado, filtra exatamente (poderia usar contains também)
// //       if (email) {
// //         filters.email = email;
// //       }

// //       // Se age foi enviado e for número válido, converte e filtra
// //       if (age && !isNaN(parseInt(age))) {
// //         filters.age = parseInt(age);
// //       }

// //       // Define parâmetros de paginação
// //       const skipValue = parseInt(skip) || 0;      // pular quantos registros
// //       const takeValue = parseInt(take) || 10;     // quantos registros trazer

// //       // Define campo de ordenação e direção (asc/desc)
// //       const orderField = orderBy || "createdAt";  // campo padrão: createdAt
// //       const orderDir = direction === "asc" ? "asc" : "desc"; // padrão: desc

// //       // Consulta ao banco com os parâmetros definidos
// //       const users = await prisma.user.findMany({
// //         where: filters,
// //         skip: skipValue,
// //         take: takeValue,
// //         orderBy: { [orderField]: orderDir },
// //       });

// //       // Retorna os resultados
// //       res.status(200).json(users);

// //     } catch (error) {
// //       console.error("Erro ao buscar usuários:", error);
// //       res.status(500).json({ error: "Erro ao buscar usuários" });
// //     }
// //   });

// // Inicia o servidor na porta 3000 (ou outra de sua escolha)
// app.listen(PORT, () => {
// 	console.log("Servidor rodando em http://localhost:3000");
// });

// server.js após inclusão de parte de código no app.js

// Importa a aplicação já configurada
import app from "./src/app.js";

// Define a porta do servidor (usa a variável de ambiente ou padrão 3000)
const PORT = process.env.PORT || 3000;

/**
 * Inicia o servidor escutando na porta definida.
 * Isso é separado da configuração da aplicação (que está no app.js).
 */
app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
