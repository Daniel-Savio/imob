import { Imovel } from "@/schemas/imovelScheema";
import { apiUrl, imageStore } from "@/utils";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { WhatsappLogo } from "phosphor-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { Separator } from "./separator";
export interface Props {
  imovelId: string;
}

const PublicImovelCard = (props: Props) => {
  const [imovel, setImovel] = useState<Imovel | undefined>(undefined);

  useEffect(() => {
    async function getImovel() {
      const imovelUrl = apiUrl + props.imovelId;
      const imovelData: Imovel = (await axios.get(imovelUrl)).data;
      setImovel(imovelData);
    }
    getImovel();
  }, []);

  return (
    <motion.div
      className={`max-w-80 -z-1 cursor-pointer`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Dialog>
        <DialogTrigger>
          <motion.div
            className="p-2 rounded-md bg-zinc-100 shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <img
              src={imageStore + imovel?.imageList[0]}
              className="w-64 h-64 rounded-md"
            />
            <h1 className="text-lg text-blue-800 font-bold text-wrap">
              {imovel?.geral} <br />
              {imovel?.tipo}
            </h1>
            <h2 className="text-lg ">
              {imovel?.cidade} - {imovel?.estado}
            </h2>
            <h3 className="text-md underline">
              <span className="font-bold mt-2">R$: </span> {imovel?.preco}
            </h3>
          </motion.div>
        </DialogTrigger>

        <DialogContent className="max-w-[400px] max-h-[750px] justify-center gap-2 p-4 rounded-sm">
          <DialogTitle>{imovel?.tipo}</DialogTitle>
          <Carousel className="max-w-96 border-blue-500 border-solid border-2 rounded-sm bg-slate-100">
            <CarouselContent className="">
              {imovel?.imageList.map((image) => {
                return (
                  <CarouselItem className="flex justify-center ">
                    <img src={imageStore + image} alt="" />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <h1 className="text-lg">R${imovel?.preco}</h1>
          <div>
            <h1 className="text-md">
              {imovel?.cidade}, {imovel?.estado}
            </h1>
            <h1 className="text-md">
              {imovel?.logradouro} - {imovel?.bairro}
            </h1>
          </div>

          <Separator />
          <h1 className="text-lg max-h-64 overflow-y-auto">Descrição</h1>
          <div className="shadow-md rounded-md">{imovel?.desc}</div>
          <br />
          <Button className="px-3 py-1 bg-green-700 text-slate-50 rounded-md gap-2">
            <WhatsappLogo size={16} />
            Falar com o corretor
          </Button>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between mt-2">
        <a
          className="w-full flex justify-center"
          href={`whatsapp://send?text=*Mensagem de teste* \n Bom dia Daniel. Teria interesse no Imóvel em: \n- ${imovel?.cidade} -- ${imovel?.estado} \n- ${imovel?.bairro} \n \n Id do Imóvel: ${imovel?.id} &phone=+5511941776334`}
        >
          <Button className="px-3 py-1 bg-green-700 text-slate-50 rounded-md gap-2">
            <WhatsappLogo size={16} />
            Falar com o vendedor
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export default PublicImovelCard;
