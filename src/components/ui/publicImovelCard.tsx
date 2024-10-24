import { Imovel } from "@/schemas/imovelScheema";
import { apiUrl, imageStore } from "@/utils";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { WhatsappLogo, Image } from "phosphor-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { Separator } from "./separator";
import { ScrollArea, ScrollBar } from "./scroll-area";
export interface Props {
  imovelId: string;
}

const PublicImovelCard = (props: Props) => {
  const [imovel, setImovel] = useState<Imovel | undefined>(undefined);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function getImovel() {
      const imovelUrl = apiUrl + props.imovelId;
      const imovelData: Imovel = (await axios.get(imovelUrl)).data;
      setImovel(imovelData);

      setCount(api!.scrollSnapList().length);
      setCurrent(api!.selectedScrollSnap() + 1);

      api!.on("select", () => {
        setCurrent(api!.selectedScrollSnap() + 1);
        api!.selectedScrollSnap();
      });
    }
    getImovel();
  }, [api]);

  return (
    <motion.div
      className={`max-w-80 -z-1 cursor-pointer`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Dialog>
        <DialogTrigger className="text-left">
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
              {imovel?.titulo}
            </h1>
            <h2 className="text-lg ">
              {imovel?.cidade} - {imovel?.estado}
            </h2>
            <h2 className="font-bold">{imovel?.transaction}</h2>
            <h3 className="text-md underline">
              <span className="font-bold mt-2">R$: </span> {imovel?.preco}
            </h3>
          </motion.div>
        </DialogTrigger>

        <DialogContent className="w-full sm:max-w-[600px] h-[96vh] sm:max-h-[750px] justify-center gap-2 p-4 rounded-sm overflow-y-scroll">
          <DialogTitle className="text-wrap">{imovel?.titulo}</DialogTitle>
          <ScrollArea>
            <Carousel
              setApi={setApi}
              className="relative w-full rounded-sm bg-slate-100 m-auto"
            >
              <CarouselContent className="  h-fit w-fit max-h-[400px] ">
                {imovel?.imageList.map((image) => {
                  return (
                    <CarouselItem className="flex justify-center h-fit w-fit">
                      <img
                        className="max-h-[400px] my-auto"
                        src={imageStore + image}
                        alt=""
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute top-[50%] left-4" />
              <CarouselNext className="absolute top-[50%] right-4" />
            </Carousel>
            <div className="flex justify-center text-zinc-500">
              <Image className="w-6 h-6" />
              {current} / {count}
            </div>
            <h1 className="text-lg my-2">
              {imovel?.transaction}: R${imovel?.preco}
            </h1>
            <div>
              <h1 className="text-md">
                {imovel?.cidade}, {imovel?.estado}
              </h1>
              <h1 className="text-md">
                {imovel?.logradouro} - {imovel?.bairro}
              </h1>
            </div>
            <Separator />
            <br></br>
            <h1 className="text-lg ">Descrição</h1>
            <ScrollArea className="shadow-md rounded-md max-h-64 overflow-auto ">
              <pre className="bg-slate-100 font-sans text-wrap text-justify p-2 ">
                {imovel?.desc}
              </pre>
              <ScrollBar className="w-2" />
            </ScrollArea>
            <br />
            <a
              className="w-full flex justify-center"
              href={`whatsapp://send?text=Bom dia Daniel. \n Teria interesse no Imóvel em: \n- ${imovel?.cidade} -- ${imovel?.estado} \n- ${imovel?.bairro} \n \n *Id do Imóvel:* \n ${imovel?.id} &phone=+5511941776334`}
            >
              <Button className="px-3 py-1 bg-blue-600 text-slate-50 rounded-md gap-2">
                <WhatsappLogo size={16} />
                Falar com o vendedor
              </Button>
            </a>
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between mt-2">
        <a
          className="w-full flex justify-center"
          href={`whatsapp://send?text=Bom dia Daniel. \n Teria interesse no Imóvel em: \n- ${imovel?.cidade} -- ${imovel?.estado} \n- ${imovel?.bairro} \n \n *Id do Imóvel:* \n ${imovel?.id} &phone=+5511941776334`}
        >
          <Button className="px-3 py-1 bg-blue-600 text-slate-50 rounded-md gap-2">
            <WhatsappLogo size={16} />
            Falar com o vendedor
          </Button>
        </a>
      </div>
    </motion.div>
  );
};

export default PublicImovelCard;
