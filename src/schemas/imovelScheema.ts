import { z } from "zod";

const imovelSchema = z.object({
    id: z.string(),
    imageList: z.array(z.string()),
    createdAt: z.string(),
    updatedAt: z.string(),
    preco: z
        .string()
        .regex(/^\d{1,3}(\.\d{3})*(,\d{2})?$/),
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