import { z } from "zod";

const imovelSchema = z.object({
    id: z.string().optional(),
    imagens: z.array(z.string()).optional(),
    imageFile: z.instanceof(FileList)
        .refine((list) => list.length, "Insira ao menos uma imagem do imóvel")
        .transform((list) => {
            const fileList: File[] = [];
            for (let i = 0; i < list.length; i++) {
                fileList.push(list[i]);

            }
            return fileList;

        }).optional(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
    preco: z
        .string()
        .min(3, "O preço necessita de ao menos 3 dígitos")
        .regex(/^\d{1,3}(\.\d{3})*(,\d{2})?$/, "O valor está incorreto"),
    transaction: z.string().default("Venda"),
    titulo: z.string().min(5, "Inisra um Título para o imóvel"),

    estado: z.string().min(3, "Qual o estado do Imóvel?"),
    cidade: z.string().min(3, "Qual a cidade do Imóvel?"),
    bairro: z.string().min(3, "Qual o bairro do Imóvel"),
    logradouro: z.string().min(3, "Qual o endereço do Imóvel?"),
    numero: z.string().min(1, "O imóvel necessita de um número"),
    cep: z.string().regex(/^\d{5}-\d{3}$/, "O CEP está incorreto"),
    tipo: z.string(),
    geral: z.string(),
    desc: z.string().min(5, "Descreva o imóvel"),
    room: z.array(z.object({
        nome: z.string(),
        area: z.string().optional()

    })).optional()
});

export default imovelSchema
export type Imovel = z.infer<typeof imovelSchema>