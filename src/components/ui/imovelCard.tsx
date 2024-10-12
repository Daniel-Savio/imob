import { Imovel } from "@/schemas/imovelScheema";
import { motion } from "framer-motion";
import axios from "axios";
import { useEffect, useState } from "react";
export interface Props {
  imovelId: string;
}

const ImovelCard = (props: Props) => {
  const [imovel, setImovel] = useState<Imovel | undefined>(undefined);

  useEffect(() => {
    async function getImovel() {
      const imovelUrl = "http://localhost:3030/" + props.imovelId;
      const imovelData: Imovel = (await axios.get(imovelUrl)).data;
      setImovel(imovelData);
    }
    getImovel();
  }, []);

  return (
    <motion.div
      className="max-w-80 -z-1"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="p-2 rounded-md bg-zinc-100 shadow-lg">
        <img
          src={"https://danielpinheiro-corretor.store/" + imovel?.imageList[0]}
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
      </div>
      <div className="flex justify-between mt-2">
        <button
          type="button"
          className="px-3 py-1 bg-blue-700 text-slate-50 rounded-md"
        >
          Editar
        </button>
        <button
          type="button"
          className="px-3 py-1 bg-red-700 text-slate-50 rounded-md"
        >
          Apagar
        </button>
      </div>
    </motion.div>
  );
};

export default ImovelCard;
