// Importa as funções do service que lidam com a lógica de acesso ao banco
import {
	createUserService,
	getUsersService,
	updateUserService,
	deleteUserService,
} from "../services/user.service.js";

// Importa função auxiliar para formatar o nome
import { formatName } from "../utils/formatters.js";
import { isValidEmail } from "../utils/validattors.js";

/**
 * Controlador para criar um novo usuário.
 * Faz validações básicas e chama o service.
 */
export async function createUser(req, res) {
	const { name, email, age } = req.body;

	// Valida se os campos obrigatórios estão presentes
	if (!name || !email || age === undefined) {
		return res.status(400).json({
			error: "Todos os campos são obrigatórios: nome, e-mail e idade.",
		});
	}

	// Valida o formato do e-mail
	if (!isValidEmail(email)) {
		return res.status(400).json({ error: "E-mail inválido." });
	}

	try {
		// Chama o service, formatando o nome e convertendo a idade
		const user = await createUserService({
			name: formatName(name),
			email,
			age: Number.parseInt(age),
		});

		// Retorna o usuário criado com status 201
		res.status(201).json(user);
	} catch (error) {
		console.error("Erro ao criar usuário:", error);

		// Se for erro de e-mail duplicado (P2002), responde de forma amigável
		if (error.code === "P2002" && error.meta?.target?.includes("email")) {
			return res.status(400).json({ error: "E-mail já cadastrado" });
		}

		// Para outros erros, retorna erro genérico
		res.status(500).json({ error: "Erro ao criar usuário" });
	}
}

/**
 * Controlador para buscar usuários com filtros, ordenação e paginação.
 */
export async function getUsers(req, res) {
	try {
		// Chama o service passando os parâmetros da query string
		const users = await getUsersService(req.query);

		// Se nenhum usuário for encontrado, retorna mensagem informativa
		if (users.length === 0) {
			return res.status(200).json({
				message:
					"Está ok, mas nenhum usuário foi encontrado com os filtros informados.",
			});
		}

		// Caso contrário, retorna os usuários encontrados
		res.status(200).json(users);
	} catch (error) {
		console.error("Erro ao buscar usuários:", error);
		res.status(500).json({ error: "Erro ao buscar usuários" });
	}
}

/**
 * Controlador para atualizar um usuário por ID.
 */
export async function updateUser(req, res) {
	try {
		// Extrai e formata os dados de entrada
		const updatedData = { ...req.body };

		// Se o nome estiver presente, aplica a formatação
		if (updatedData.name) {
			updatedData.name = formatName(updatedData.name);
		}

		// Chama o serviço de atualização
		const user = await updateUserService(req.params.id, updatedData);

		// Retorna erro 404 se o usuário não for encontrado
		if (!user) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Sucesso: retorna o usuário atualizado
		res.status(200).json(user);
	} catch (error) {
		console.error("Erro ao atualizar usuário:", error);

		/**
		 * Trata erro específico do Prisma quando uma chave única (como email) é violada.
		 * O código 'P2002' indica violação de unique constraint.
		 */
		if (error.code === "P2002" && error.meta?.target?.includes("email")) {
			return res
				.status(400)
				.json({ error: "Este e-mail já está em uso por outro usuário." });
		}

		// Outros erros genéricos
		res.status(500).json({ error: "Erro ao atualizar usuário." });
	}
}

/**
 * Controlador para deletar um usuário por ID.
 */
export async function deleteUser(req, res) {
	try {
		// Chama o service passando o ID
		const success = await deleteUserService(req.params.id);

		// Se o usuário não existir, responde com 404
		if (!success) {
			return res.status(404).json({ error: "Usuário não encontrado." });
		}

		// Responde com sucesso
		res.status(200).json({ message: "Usuário deletado com sucesso." });
	} catch (error) {
		console.error("Erro ao deletar usuário:", error);
		res.status(500).json({ error: "Erro ao deletar usuário." });
	}
}
