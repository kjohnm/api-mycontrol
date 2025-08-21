/**
 * Valida se o e-mail tem um formato válido.
 * Usa uma expressão regular simples para validar estrutura de e-mails.
 *
 * Retorna true se o e-mail for válido, false caso contrário.
 */
export function isValidEmail(email) {
	// Regex para validar e-mails: simples, mas cobre a maioria dos casos reais
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
