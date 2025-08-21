// Importa a instância do Prisma Client
import prisma from "../prisma/client.js";

/**
 * Cria um novo usuário no banco de dados.
 */
export async function createUserService(data) {
	return prisma.user.create({ data });
}

/**
 * Busca usuários com filtros opcionais, ordenação e paginação.
 */
export async function getUsersService(query) {
	const { name, email, age, sortBy, order, page } = query;

	const filters = {};
	if (name)
		filters.name = {
			contains: name,
			mode: "insensitive", // case-insensitive
		};
	if (email) filters.email = email;
	if (age) filters.age = Number.parseInt(age);

	// Paginação
	const pageSize = 20;
	const currentPage = Math.max(Number.parseInt(page) || 1, 1);
	const skip = (currentPage - 1) * pageSize;

	// Ordenação
	const sortField = sortBy || "createdAt";
	const sortDirection = order === "asc" ? "asc" : "desc";

	return prisma.user.findMany({
		where: filters,
		skip,
		take: pageSize,
		orderBy: { [sortField]: sortDirection },
	});
}

/**
 * Atualiza um usuário existente.
 */
export async function updateUserService(id, data) {
	// Verifica se o usuário existe antes
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) return null;

	return prisma.user.update({
		where: { id },
		data,
	});
}

/**
 * Deleta um usuário existente.
 */
export async function deleteUserService(id) {
	// Verifica se o usuário existe
	const user = await prisma.user.findUnique({ where: { id } });
	if (!user) return false;

	await prisma.user.delete({ where: { id } });
	return true;
}
