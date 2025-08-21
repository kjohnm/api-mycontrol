// Importa o Prisma Client gerado no seu path correto
import { PrismaClient } from "../../../api_back_mycontrol/generated/prisma/index.js";

// Instancia o Prisma uma única vez
const prisma = new PrismaClient();

// Exporta para uso global
export default prisma;
