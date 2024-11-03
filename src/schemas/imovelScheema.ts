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
        .regex(/^\d{1,3}(\.\d{3})*(,\d{2})?$/),
    transaction: z.string().default("Venda"),
    titulo: z.string(),
    estado: z.string(),
    cidade: z.string(),
    bairro: z.string(),
    logradouro: z.string(),
    numero: z.string(),
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    tipo: z.string(),
    geral: z.string(),
    desc: z.string()
});

export default imovelSchema
export type Imovel = z.infer<typeof imovelSchema>