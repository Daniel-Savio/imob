import { Imovel } from "@/schemas/imovelScheema";
import { apiUrl, imageStore } from "@/utils";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { toast } from "sonner";
import { TrashSimple } from "phosphor-react";
import { Badge } from "./badge";
import { Separator } from "./separator";
export interface Props {
  imovelId: string;
}

const ImovelCard = (props: Props) => {
  const [imovel, setImovel] = useState<Imovel | undefined>(undefined);
  const [visible, setVisible] = useState<number>(1);
  const variants = {
    normal: { scale: 1, opacity: 1 },
    deleted: { display: "none", scale: 0 },
  };

  useEffect(() => {
    async function getImovel() {
      const imovelUrl = apiUrl + props.imovelId;
      const imovelData: Imovel = (await axios.get(imovelUrl)).data;
      setImovel(imovelData);
    }
    getImovel();
  }, []);

  async function deleteImovel() {
    const deletedMessage = (await axios.delete(apiUrl + props.imovelId)).data;
    setVisible(0);

    toast(deletedMessage);
  }

  return (
    <motion.div
      className={`max-w-80 -z-10`}
      animate={visible ? "normal" : "deleted"}
      variants={variants}
      transition={{ duration: 0.3 }}
    >
      <motion.div className="relative p-2 rounded-md bg-zinc-100 shadow-lg text-left">
        <img
          src={imageStore + imovel?.imageList[0]}
          className="w-64 h-64 rounded-md m-auto"
        />
        <Separator className="m-2"></Separator>
        <div className="flex justify-between ">
          <Badge variant="outline" className="text-xs text-slate-500">
            {imovel?.id}
          </Badge>
          <Badge variant="outline" className="text-xs text-slate-500">
            {imovel?.updatedAt.slice(0, 10)}
          </Badge>
        </div>
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
      <div className="flex justify-center mt-2">
        {/* <Button
          type="button"
          className="px-3 py-1 bg-blue-700 text-slate-50 rounded-md gap-2"
        >
          <PencilSimple size={16} />
          Editar
        </Button> */}
        <Button
          variant={"destructive"}
          onClick={deleteImovel}
          className="px-3 py-1 bg-red-700 text-slate-50 rounded-md gap-2"
        >
          <TrashSimple size={16} />
          Apagar
        </Button>
      </div>
    </motion.div>
  );
};

export default ImovelCard;
