import { Imovel } from "@/schemas/imovelScheema";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import axios from "axios";

import { useEffect, useState } from "react";
import ImovelCard from "./ui/imovelCard";
import { ScrollBar } from "./ui/scroll-area";

export default function AdminImovelList() {
  const [list, setList] = useState<Imovel[] | undefined>();

  useEffect(() => {
    async function getList() {
      const listData: Imovel[] = (await axios.get("http://localhost:3030/"))
        .data;

      setList(listData);
    }
    getList();
  }, []);
  console.log(list);

  return (
    <ScrollArea className="w-96 md:w-full whitespace-nowrap rounded-md border overflow-scroll">
      <div className="flex w-max space-x-4 p-4">
        {list?.map((imovel) => {
          return (
            <ImovelCard
              key={imovel.id}
              id={imovel.id}
              imagens={imovel.imagens}
              createdAt={imovel.createdAt}
              updatedAt={imovel.updatedAt}
              preco={imovel.preco}
              estado={imovel.estado}
              cidade={imovel.cidade}
              bairro={imovel.bairro}
              logradouro={imovel.logradouro}
              numero={imovel.numero}
              cep={imovel.cep}
              tipo={imovel.tipo}
              geral={imovel.geral}
              desc={imovel.desc}
            />
          );
        })}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
