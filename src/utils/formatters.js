/**
 * Função para formatar um nome, deixando a primeira letra de cada palavra maiúscula
 * Ex: "ana lúcia fernandes" => "Ana Lúcia Fernandes". Obs.: Seria possível fazer sem formatar
 * bastava apenas remover a formatação e passar o nome diretamente no body
 */
export function formatName(nome) {
	return nome
		.toLowerCase() // Converte tudo para minúsculas primeiro
		.split(" ") // Divide o nome em palavras, usando espaço como separador
		.map(
			(palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1), // Primeira letra maiúscula + resto da palavra
		)
		.join(" "); // Junta as palavras de volta com espaço
}
