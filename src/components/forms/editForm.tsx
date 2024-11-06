import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { createId } from "@paralleldrive/cuid2";
import brazilianStates from "@/assets/states";
import brazilianCities from "@/assets/cities";
import publicFilters from "@/assets/types";
import { useState, useEffect } from "react";
import {
  Image,
  Money,
  House,
  NumberCircleThree,
  FloppyDisk,
  Textbox,
} from "phosphor-react";
import {
  Ban,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Mailbox,
  Plus,
  Trash,
} from "lucide-react";
import imovelSchema, { Imovel } from "@/schemas/imovelScheema";
import { apiUrl, imageStore } from "@/utils";
import { toast } from "sonner";
import { OptionSwitch } from "../ui/option-switch";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { motion } from "framer-motion";

interface EditFormProps {
  imovel: Imovel;
}

export default function EditForm({ imovel }: EditFormProps) {
  const [transaction, setTransaction] = useState<string>("Venda");
  const [formStep, setFormStep] = useState(0);
  const [citiyList, setCitiyList] = useState(["cidades"]);
  const [visible, setVisible] = useState<boolean>(true);

  function nextStep() {
    setFormStep(formStep + 1);
  }
  function previousStep() {
    setFormStep(formStep - 1);
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<Imovel>({
    resolver: zodResolver(imovelSchema),
    defaultValues: {
      estado: imovel.estado,
      bairro: imovel.bairro,
      desc: imovel.desc,
      geral: imovel.geral,
      cep: imovel.cep,
      preco: imovel.preco,
      imagens: imovel.imagens,
      room: imovel.room,
      numero: imovel.numero,
      tipo: imovel.tipo,
      transaction: imovel.transaction,
      logradouro: imovel.logradouro,
      titulo: imovel.titulo,
      cidade: imovel.cidade,
    },
  });

  // eslint-disable-next-line no-empty-pattern
  const { fields, append, remove } = useFieldArray({
    control,
    name: "room",
  });

  const files = watch("imageFile");
  const estado = watch("estado");
  const correctedCep = watch("cep").replace(/(\d{5})(\d{3})/, "$1-$2");
  const correctedPreco = watch("preco")
    .replace(/\D/g, "")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  async function onSubmit(formData: Imovel) {
    toast("Editando Imóvel", {
      icon: <Info className="text-imobSecondary"></Info>,
      closeButton: true,
    });
    formData.id = imovel.id;
    formData.imagens = imovel.imagens;
    console.log(formData.imagens);
    const newFileNames: string[] = [];

    if (formData.imageFile?.length) {
      formData.imageFile?.forEach((imagem: File) => {
        if (typeof imagem === typeof "string") return;
        const extensao = imagem.name.match(/\.\w+$/); //A interrogação é apenas para confirmar que o objeto não irá ser nulo
        const newName = `${createId()}${extensao?.at(0)}`;
        newFileNames.push(newName);
        formData.imagens?.push(newName);
      });

      toast("Adicionando imagem ao imóvel:", {
        icon: <Info className="text-imobSecondary"></Info>,
        closeButton: true,
      });
      console.log(formData.imagens);

      const response = axios.post(apiUrl + "upload", newFileNames);
      const sendImageLinks: string[] = (await response).data;

      //Upload das imagens
      for (let i = 0; i < sendImageLinks.length; i++) {
        await axios
          .put(sendImageLinks[i], formData.imageFile![i], {
            headers: {
              "Content-Type": formData.imageFile![i].type, // Configura o Content-Type adequado
            },
          })
          .then(
            () => {
              toast(`Fazendo o upload da ${i + 1}° Imagem`, {
                icon: <Info className="text-imobSecondary"></Info>,
                closeButton: true,
              });
            },
            () => {
              toast(
                `Upload da imagem ${i + 1} com problema. Verifique o Storage`,
                { icon: <Ban className="text-red-500"></Ban> }
              );
            }
          );
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { imageFile, ...editData } = formData;
    console.log(formData);

    await axios
      .put(apiUrl + "imovel", editData)
      .then(
        (res) => {
          toast(
            `
             ${res.data}
            As imagens podem demorar cerca de 2 minutos para aparecerem`,
            {
              icon: <Check className="text-green-500"></Check>,
              closeButton: true,
            }
          );
        },
        (res) => {
          toast("Erro ao adicionar imóvel", {
            icon: <Ban className="text-red-500"></Ban>,
          });
          console.log(res.response.data);
        }
      )
      .finally(() => {});
  }

  useEffect(() => {
    setValue("transaction", transaction!);
    if (estado) {
      brazilianCities.estados.forEach((state) => {
        if (estado === state.nome) {
          setCitiyList(state.cidades);
        }
      });
    }
  }, [transaction, estado, setValue]);

  function addNewRoom() {
    append({ nome: "Daniel", area: "4" });
  }
  function removeRoom(index: number) {
    remove(index);
  }

  async function deleteImage(imagem: string) {
    if (!imovel.imagens?.length) return;
    console.log({ image: imagem });
    const index: number = imovel.imagens.indexOf(imagem);

    await axios.post(apiUrl + "delete-image", { image: imagem }).then(
      (res) => {
        toast(res.data, {
          icon: <Ban className="text-red-500"></Ban>,
          closeButton: true,
        });
        imovel.imagens?.splice(index, 1);
        setVisible(!visible);
      },
      (error) => {
        toast("Erro ao deletar imagem");
        console.log(error);
      }
    );
  }

  return (
    <form
      action="submit"
      onSubmit={handleSubmit(onSubmit)}
      className="items-center w-full p-2 content-center md:text-left overflow-auto h-[700px] md:h-[600px]"
    >
      <div className="flex flex-col md:items-start md:block ">
        <span>{formStep + 1}/3</span>
        <section
          id="part-one"
          className={`${formStep === 0 ? "" : "hidden"} flex flex-col gap-2`}
        >
          <h1 className="text-2xl font-semibold">Endereço</h1>
          <div className="flex h-full w-full flex-col gap-1">
            <label htmlFor="" className="font-bold">
              Estado
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <Textbox className="size-5 text-zinc-600" />

              <select
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                id="estados"
                {...register("estado")}
              >
                {brazilianStates.UF.map((state) => {
                  return (
                    <option key={state.sigla} value={state.nome}>
                      {" "}
                      {state.nome}
                    </option>
                  );
                })}
                .
              </select>
            </div>

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
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <Textbox className="size-5 text-zinc-600" />
              <select
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                id="cidades"
                {...register("cidade")}
              >
                {citiyList.map((city) => {
                  if (city === imovel.cidade)
                    return (
                      <option key={city} value={city} selected>
                        {city}
                      </option>
                    );
                  return (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  );
                })}
                .
              </select>
            </div>

            {errors.cidade && (
              <span className="text-red-500 text-sm">
                {errors.cidade.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Bairro
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <House className="size-5 text-zinc-600" />
              <input
                type="text"
                placeholder="Bairro"
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                {...register("bairro")}
              />
            </div>

            {errors.bairro && (
              <span className="text-red-500 text-sm">
                {errors.bairro.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Endereço
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <House className="size-5 text-zinc-600" />
              <input
                type="text"
                placeholder="Ex.: Rua, Avenida, Estrada, etc"
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                {...register("logradouro")}
              />
            </div>

            {errors.logradouro && (
              <span className="text-red-500 text-sm">
                {errors.logradouro.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Número
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <NumberCircleThree className="size-5 text-zinc-600" />
              <input
                type="number"
                placeholder="Ex.: 109"
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                maxLength={5}
                {...register("numero")}
              />
            </div>

            {errors.numero && (
              <span className="text-red-500 text-sm">
                {errors.numero.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="" className="font-bold">
              CEP
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <Mailbox className="size-5 text-zinc-600" />
              <input
                value={correctedCep}
                type="string"
                placeholder="Ex.: 12970-000"
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                maxLength={9}
                {...register("cep")}
              />
            </div>

            {errors.cep && (
              <span className="text-red-500 text-sm">{errors.cep.message}</span>
            )}
          </div>
          <div className="w-full flex mt-2">
            <Button type="button" className="mx-auto" onClick={nextStep}>
              Próximo
              <ChevronRight />
            </Button>
          </div>
        </section>

        <section
          id="part-two"
          className={`${formStep === 1 ? "" : "hidden"} flex flex-col gap-2`}
        >
          <h1 className="text-2xl font-semibold">Informações do Imovel</h1>
          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Título do Imovel
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <Textbox className="size-5 text-zinc-600" />
              <input
                type="text"
                placeholder="Nome desejado para aparecer no centro do Card"
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                {...register("titulo")}
              />
            </div>

            {errors.bairro && (
              <span className="text-red-500 text-sm">
                {errors.titulo?.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <p className="font-bold">Fotos Já existentes</p>
            {imovel.imagens && (
              <div className="rounded flex flex-wrap gap-8 mt-5 items-center w-full justify-center">
                {imovel.imagens?.map((imagem) => {
                  return (
                    <motion.div
                      className={`fit relative`}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        key={imagem}
                        className="max-h-24 max-w-56"
                        src={imageStore + imagem}
                        alt=""
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          deleteImage(imagem);
                        }}
                        variant={"destructive"}
                        className="hover:scale-110 transition-all hover:opacity-100 shadow-md absolute rounded-full p-3 -top-2 -left-1 z-50"
                      >
                        <Trash className="w-4"></Trash>
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full">
            <p className="font-bold">Fotos Adicionais</p>
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
                className="hidden outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                {...register("imageFile")}
              />
            </div>

            {files && files.length > 0 && (
              <div className="flex flex-col gap-px overflow-scroll max-h-24">
                {Array.from(files).map((file) => {
                  return (
                    <span key={file.name} className="text-sm text-zinc-400">
                      {file.name}
                    </span>
                  );
                })}
              </div>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Venda / Aluguel
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <p>Vender</p>
              <OptionSwitch
                onCheckedChange={(checked) => {
                  checked ? setTransaction("Aluguel") : setTransaction("Venda");
                }}
              />
              <p>Alugar</p>
            </div>
            {errors.transaction && (
              <span className="text-red-500 text-sm">
                {errors.transaction.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Preço
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <Money className="size-5 text-zinc-600" />
              <input
                value={correctedPreco}
                type="text"
                placeholder="100.000"
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                {...register("preco")}
              />
              <span>R$</span>
            </div>
            {errors.preco && (
              <span className="text-red-500 text-sm">
                {errors.preco.message}
              </span>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Descrição
            </label>
            <div className="border rounded flex p-2 items-center justify-center w-full h-fit bg-zinc-50">
              <textarea
                className="h-fit shadow-md p-2 w-full"
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
          </div>
          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Tipos gerais
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <Textbox className="size-5 text-zinc-600" />
              <select
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                {...register("tipo")}
                id="geral"
              >
                {publicFilters.general.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
                .
              </select>
            </div>
          </div>
          <div className="w-full ">
            <label htmlFor="" className="font-bold">
              Tipos específicos
            </label>
            <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
              <Textbox className="size-5 text-zinc-600" />

              <select
                className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                id="tipos"
                {...register("geral")}
              >
                {publicFilters.types.map((type) => {
                  return (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  );
                })}
                .
              </select>
            </div>
          </div>
          <div className="w-full flex mt-2">
            <Button type="button" className="mx-auto" onClick={previousStep}>
              <ChevronLeft />
              Anterior
            </Button>
            <Button type="button" className="mx-auto" onClick={nextStep}>
              Próximo
              <ChevronRight />
            </Button>
          </div>
        </section>

        <section
          id="part-three"
          className={`${formStep === 2 ? "" : "hidden"} flex flex-col gap-2`}
        >
          <h1 className="text-2xl font-semibold flex w-full justify-between">
            Cômodos
          </h1>

          {fields.map((field, index) => {
            return (
              <motion.section
                initial={{ opacity: 0, y: "10%" }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2 my-2 md:my-0"
                key={field.id}
              >
                <div className="w-full space-y-2 md:space-y-0 md:flex md:gap-2 md:items-center">
                  {/* Nome */}
                  <div>
                    <label htmlFor="" className="font-bold">
                      Nome
                    </label>
                    <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
                      <Textbox className="size-5 text-zinc-600" />
                      <input
                        type="text"
                        placeholder="Quarto, Sala, Cozinha, etc"
                        className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                        {...register(`room.${index}.nome`)}
                      />
                    </div>
                  </div>
                  {/* Area */}
                  <div>
                    <label htmlFor="" className="font-bold">
                      Área (m²)
                    </label>
                    <div className="border rounded p-2 flex gap-2 items-center w-full bg-zinc-50">
                      <Textbox className="size-5 text-zinc-600" />
                      <input
                        type="text"
                        placeholder="Quarto, Sala, Cozinha, etc"
                        className="outline-none focus:ring focus:ring-blue-300 border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-full"
                        {...register(`room.${index}.area`)}
                      />
                    </div>
                  </div>
                  {/* Apagar */}

                  <div
                    onClick={() => {
                      removeRoom(index);
                    }}
                    className="w-fit flex text-sm items-center gap-2 cursor-pointer text-red-500"
                  >
                    {" "}
                    Apagar <Trash className="w-4 h-4" />
                  </div>
                </div>

                {errors.room && (
                  <span className="text-red-500 text-sm">
                    {errors.titulo?.message}
                  </span>
                )}
                <Separator></Separator>
              </motion.section>
            );
          })}
          <div
            onClick={addNewRoom}
            className="w-fit flex text-sm items-center gap-2 cursor-pointer text-blue-500"
          >
            {" "}
            Adicionar <Plus className="w-4 h-4" />
          </div>

          <div className="w-full flex mt-2">
            <Button type="button" className="mx-auto" onClick={previousStep}>
              <ChevronLeft />
              Anterior
            </Button>
          </div>
        </section>

        {formStep === 2 && (
          <section className="flex flex-col gap-2">
            {errors.bairro && (
              <span className="text-red-500 text-sm">
                {errors.bairro?.message}
              </span>
            )}
            {errors.cep && (
              <span className="text-red-500 text-sm">
                {errors.cep?.message}
              </span>
            )}
            {errors.cidade && (
              <span className="text-red-500 text-sm">
                {errors.cidade?.message}
              </span>
            )}
            {errors.desc && (
              <span className="text-red-500 text-sm">
                {errors.desc?.message}
              </span>
            )}
            {errors.estado && (
              <span className="text-red-500 text-sm">
                {errors.estado?.message}
              </span>
            )}
            {errors.tipo && (
              <span className="text-red-500 text-sm">
                {errors.tipo?.message}
              </span>
            )}
            {errors.geral && (
              <span className="text-red-500 text-sm">
                {errors.geral?.message}
              </span>
            )}
            {errors.imageFile && (
              <span className="text-red-500 text-sm">
                {errors.imageFile?.message}
              </span>
            )}
            {errors.imagens && (
              <span className="text-red-500 text-sm">
                {errors.imagens?.message}
              </span>
            )}
            {errors.logradouro && (
              <span className="text-red-500 text-sm">
                {errors.logradouro?.message}
              </span>
            )}
            {errors.numero && (
              <span className="text-red-500 text-sm">
                {errors.numero?.message}
              </span>
            )}
            {errors.preco && (
              <span className="text-red-500 text-sm">
                {errors.preco?.message}
              </span>
            )}
          </section>
        )}
        <Button
          className="p-2 rounded-sm flex mt-4 mx-auto w-full md:w-96 max-h-fit font-semibold text-zinc-50"
          type="submit"
        >
          <FloppyDisk size={22} />
          Salvar imóvel
        </Button>

        {/* <pre> {JSON.stringify(watch(), null, 2)}</pre> */}
      </div>
    </form>
  );
}
