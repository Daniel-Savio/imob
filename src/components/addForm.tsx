import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { createId } from "@paralleldrive/cuid2";

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

import addSchema from "@/schemas/addFormSchema";
import submitImovelSchema from "@/schemas/submitImovelSchema";
import { apiUrl } from "@/utils";
import { toast } from "sonner";
export interface AddedImovelType {
  addedImovelState: (state: boolean) => void;
}

export default function AddForm({ addedImovelState }: AddedImovelType) {
  const [stateFilter, setStateFilter] = useState<string | undefined>(undefined); //Handle the state filter
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined); // Handle the Combobox filter
  const [cityList, setCityList] = useState<string[]>(["Selecione um estado"]); //seleciona uma cidade com base no estado selecionado
  const [generalFilter, setGeneralFilter] = useState<string | undefined>(
    undefined
  );
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);

  type AddFormInputs = z.infer<typeof addSchema>;
  type SubmitImovelType = z.infer<typeof submitImovelSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddFormInputs>({
    resolver: zodResolver(addSchema),
    defaultValues: {
      preco: "10000",
      cep: "12970000",
    },
  });
  const files = watch("imagens");
  const correctedCep = watch("cep").replace(/(\d{5})(\d{3})/, "$1-$2");
  const correctedPreco = watch("preco")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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

  async function onSubmit(formData: AddFormInputs) {
    const newFileNames: string[] = [];

    formData.imagens.forEach((imagem: File) => {
      const extensao = imagem.name.match(/\.\w+$/); //A interrogação é apenas para confirmar que o objeto não irá ser nulo
      const newName = `${createId()}${extensao?.at(0)}`;
      newFileNames.push(newName);
    });

    const submitData: SubmitImovelType = {
      imagens: newFileNames,
      bairro: formData.bairro,
      cep: formData.cep,
      cidade: formData.cidade,
      desc: formData.desc,
      estado: formData.estado,
      geral: formData.geral,
      logradouro: formData.logradouro,
      numero: formData.numero,
      preco: formData.preco,
      tipo: formData.tipo,
    };

    const response = axios.post(apiUrl + "upload", submitData.imagens);
    const sendImageLinks: string[] = (await response).data;

    let index = 0;
    console.log(sendImageLinks[index]);

    sendImageLinks.forEach(async (link) => {
      await axios.put(link, formData.imagens[index]);
      index++;
    });

    const imovelSubmited = await axios.post(apiUrl + "imovel", submitData);
    if (imovelSubmited) {
      addedImovelState(true);
      toast("Imovel adicionado com sucesso");
    }
  }

  return (
    <div className="text-zinc-600 w-full ">
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="items-center w-full text-center md:text-left overflow-auto h-[600px]"
      >
        <div className="gap-2 flex flex-col  w-full justify-around md:items-start md:block ">
          <fieldset className="border-t-2 border-blue-500 flex flex-col gap-2  p-2 items-center w-full md:items-start">
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

            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Bairro
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
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

            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Endereço
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
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

            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Número
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
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

            <section className="w-full">
              <label htmlFor="" className="font-bold">
                CEP
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
                <Mailbox className="size-5 text-zinc-600" />
                <input
                  value={correctedCep}
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

          <fieldset className="border-t-2 border-blue-500 flex flex-col gap-2 p-2 w-full items-center md:items-start">
            <legend className="border-solid p-2 text-xl font-bold">
              Geral
            </legend>
            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Fotos
              </label>
              <div className="rounded flex gap-2 items-center w-full bg-zinc-50 border-dashed border-zinc-400 border-2">
                <label
                  htmlFor="image"
                  className="w-full h-full text-center cursor-pointer"
                >
                  <Image className="size-16 m-auto text-zinc-400" />
                  {files && files.length > 0 ? (
                    <span className="m-auto text-zinc-400">
                      {" "}
                      Arquivos selecionados: {files.length}{" "}
                    </span>
                  ) : (
                    <span className="m-auto text-zinc-400">
                      {" "}
                      Selecione as fotos do imovel
                    </span>
                  )}
                </label>

                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  multiple
                  className="hidden outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                  {...register("imagens")}
                />
              </div>

              {files && files.length > 0 && (
                <div className="flex flex-col gap-px overflow-scroll max-h-24">
                  {Array.from(files).map((file) => {
                    return (
                      <span className="text-sm text-zinc-400">{file.name}</span>
                    );
                  })}
                </div>
              )}
            </section>
            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Preço
              </label>
              <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
                <Money className="size-5 text-zinc-600" />
                <input
                  value={correctedPreco}
                  type="text"
                  placeholder="100.000"
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

            <section className="w-full">
              <label htmlFor="" className="font-bold">
                Descrição
              </label>
              <div className="border rounded flex p-2 items-center justify-center w-full h-fit bg-zinc-50">
                <textarea
                  className="h-fit shadow-md"
                  cols={30}
                  rows={9}
                  {...register("desc")}
                />
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
        </div>

        <button
          className="p-2 rounded-sm flex mt-4 mx-auto bg-blue-500 max-h-fit font-semibold text-zinc-50"
          type="submit"
        >
          <FloppyDisk size={22} />
          Salvar imóvel
        </button>
      </form>
    </div>
  );
}
