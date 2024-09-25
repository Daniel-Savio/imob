import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import brazilianStates from "@/assets/states";
import brazilianCities from "@/assets/cities";
import types from "@/assets/types";

import { StatesCombobox } from "./specific/statesCombobox";
import { Combobox } from "./ui/combobox";
import { useState, useEffect } from "react";
import {
  Image,
  Money,
  House,
  NumberCircleThree,
  FloppyDisk,
} from "phosphor-react";
import { Mailbox } from "lucide-react";

export default function AddForm() {
  const [stateFilter, setStateFilter] = useState<string | undefined>(undefined); //Handle the state filter
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined); // Handle the Combobox filter
  const [cityList, setCityList] = useState<string[]>(["Selecione um estado"]); //seleciona uma cidade com base no estado selecionado

  const [generalFilter, setGeneralFilter] = useState<string | undefined>(
    undefined
  );
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  const addSchema = z.object({
    imagem: z.string(),
    preco: z
      .string()
      .nonempty({ message: "O imóvel necessita de um preço" })
      .regex(/^\d{1,3}(\.\d{3})*(,\d{2})?$/),
    estado: z.string().nonempty({ message: "Selecione um estado" }),
    cidade: z.string().nonempty({ message: "Selecione um cidade" }),
    bairro: z.string().nonempty({ message: "Qual o bairro do imóvel?" }),
    logradouro: z.string().nonempty({ message: "Qual o endereço do imóvel?" }),
    numero: z.string().nonempty({ message: "Número deve ser inteiro" }),
    cep: z
      .string()
      .regex(/^\d{5}-\d{3}$/)
      .transform((cep) => {
        return cep.replace(/(\d{5})?/, "$1-");
      }),
    tipo: z.string().nonempty({ message: "Qual o tipo do imóvel?" }),
    geral: z.string().nonempty({ message: "Preencha este campo" }),
    desc: z.string().nonempty({ message: "Descreva o imóvel" }),
  });

  type AddFormInputs = z.infer<typeof addSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AddFormInputs>({
    resolver: zodResolver(addSchema),
  });

  useEffect(() => {
    let cities = ["Selecione um estado"];
    brazilianCities.estados.forEach((estado) => {
      if (estado.nome === stateFilter) cities = estado.cidades;
      setCityList(cities);
    });

    setValue("estado", stateFilter!);
    setValue("cidade", cityFilter!);
    setValue("tipo", typeFilter!);
    setValue("geral", generalFilter!);
  }, [stateFilter, cityFilter, typeFilter, generalFilter, setValue]);

  function onSubmit(data: AddFormInputs) {
    console.log(data);
  }

  return (
    <div className="text-zinc-600 w-full">
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="items-center text-center md:text-left"
      >
        <div className="gap-2 flex flex-col items-center md:items-start md:flex-row md:gap-10 ">
          <fieldset className="border-t-2 border-violet-500 flex flex-col gap-2 p-2 items-center md:items-start">
            <legend className="border-solid p-2 text-xl font-bold">
              Geral
            </legend>
            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Fotos
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
                <Image className="size-5 text-zinc-600" />
                <input
                  type="text"
                  placeholder=""
                  className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                  {...register("imagem")}
                />
              </div>

              {errors.imagem && (
                <span className="text-red-500 text-sm">
                  {errors.imagem.message}
                </span>
              )}
            </section>
            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Preço
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
                <Money className="size-5 text-zinc-600" />
                <input
                  type="text"
                  placeholder="10.000,00"
                  className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                  {...register("preco")}
                />
                <span>R$</span>
              </div>
              {errors.preco && (
                <span className="text-red-500 text-sm">
                  {errors.preco.message}
                </span>
              )}
            </section>

            <section>
              <label htmlFor="" className="font-bold">
                Descrição
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
                <textarea cols={30} rows={4} {...register("desc")} />
              </div>

              {errors.desc && (
                <span className="text-red-500 text-sm">
                  {errors.desc.message}
                </span>
              )}
            </section>

            <div className="flex w-full flex-col gap-1">
              <label htmlFor="" className="font-bold">
                Tipos gerais
              </label>
              <Combobox
                placeholderValue="Todos"
                list={types.general}
                getValue={setGeneralFilter}
                value={generalFilter}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="" className="font-bold">
                Tipos específicos
              </label>
              <Combobox
                placeholderValue="Todos"
                list={types.types}
                getValue={setTypeFilter}
                value={typeFilter}
              />
            </div>
          </fieldset>

          <fieldset className="border-t-2 border-violet-500 flex flex-col gap-2 p-2 items-center md:items-start">
            <legend className="border-solid p-2 text-xl font-bold">
              Endereço
            </legend>
            <div className="flex w-full flex-col gap-1">
              <label htmlFor="" className="font-bold">
                Estado
              </label>
              <StatesCombobox
                placeholderValue="Todos"
                list={brazilianStates.UF}
                getValue={setStateFilter}
                value={stateFilter}
              />

              {errors.estado && (
                <span className="text-red-500 text-sm">
                  {errors.estado.message}
                </span>
              )}
            </div>

            <div className="flex w-full flex-col gap-1">
              <label htmlFor="" className="font-bold">
                Cidade
              </label>
              <Combobox
                placeholderValue="Tudo"
                list={cityList}
                getValue={setCityFilter}
                value={cityFilter}
              />
              {errors.cidade && (
                <span className="text-red-500 text-sm">
                  {errors.cidade.message}
                </span>
              )}
            </div>

            <section>
              <label htmlFor="" className="font-bold">
                Bairro
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
                <House className="size-5 text-zinc-600" />
                <input
                  type="text"
                  placeholder="Bairro"
                  className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                  {...register("bairro")}
                />
              </div>

              {errors.bairro && (
                <span className="text-red-500 text-sm">
                  {errors.bairro.message}
                </span>
              )}
            </section>

            <section>
              <label htmlFor="" className="font-bold">
                Endereço
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
                <House className="size-5 text-zinc-600" />
                <input
                  type="text"
                  placeholder="Ex.: Rua, Avenida, Estrada, etc"
                  className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                  {...register("logradouro")}
                />
              </div>

              {errors.logradouro && (
                <span className="text-red-500 text-sm">
                  {errors.logradouro.message}
                </span>
              )}
            </section>

            <section>
              <label htmlFor="" className="font-bold">
                Número
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
                <NumberCircleThree className="size-5 text-zinc-600" />
                <input
                  type="number"
                  placeholder="Ex.: 109"
                  className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                  maxLength={5}
                  {...register("numero")}
                />
              </div>

              {errors.numero && (
                <span className="text-red-500 text-sm">
                  {errors.numero.message}
                </span>
              )}
            </section>

            <section>
              <label htmlFor="" className="font-bold">
                CEP
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
                <Mailbox className="size-5 text-zinc-600" />
                <input
                  type="string"
                  placeholder="Ex.: 12970-000"
                  className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                  maxLength={9}
                  {...register("cep")}
                />
              </div>

              {errors.cep && (
                <span className="text-red-500 text-sm">
                  {errors.cep.message}
                </span>
              )}
            </section>
          </fieldset>
        </div>

        <button
          className="p-2 rounded-sm flex mt-4 mx-auto bg-violet-500 max-h-fit font-semibold text-zinc-50"
          type="submit"
        >
          <FloppyDisk size={22} />
          Salvar imóvel
        </button>
      </form>
    </div>
  );
}
