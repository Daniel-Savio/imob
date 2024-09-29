import { z } from "zod";

const addSchema = z.object({
    imagens: z
        .instanceof(FileList)
        .refine((list) => list.length, "Insira ao menos uma imagem do imóvel")
        .transform((list) => {
            const fileList: File[] = [];
            for (let i = 0; i < list.length; i++) {
                fileList.push(list[i]);
            }
            return fileList;
        }),
    preco: z
        .string()
        .min(1, { message: "O imóvel necessita de um preço" })
        .regex(/^\d{1,3}(\.\d{3})*(,\d{2})?$/),
    estado: z.string().min(1, { message: "Selecione um estado" }),
    cidade: z.string().min(1, { message: "Selecione um cidade" }),
    bairro: z.string().min(1, { message: "Qual o bairro do imóvel?" }),
    logradouro: z.string().min(1, { message: "Qual o endereço do imóvel?" }),
    numero: z.string().min(1, { message: "Número deve ser inteiro" }),
    cep: z.string().regex(/^\d{5}-\d{3}$/),
    tipo: z.string().min(1, { message: "Qual o tipo do imóvel?" }),
    geral: z.string().min(1, { message: "Preencha este campo" }),
    desc: z.string().min(1, { message: "Descreva o imóvel" }),
});

export default addSchema