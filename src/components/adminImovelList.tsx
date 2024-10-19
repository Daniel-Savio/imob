import { Imovel } from "@/schemas/imovelScheema";
import axios from "axios";

import { useEffect, useState } from "react";
import ImovelCard from "./ui/imovelCard";
import { apiUrl } from "@/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function AdminImovelList() {
  const [list, setList] = useState<Imovel[] | undefined>();

  useEffect(() => {
    async function getList() {
      const listData: Imovel[] = (await axios.get(apiUrl)).data;

      setList(listData);
    }
    setTimeout(() => {
      getList();
    });
  }, []);

  return (
    <ScrollArea className="flex flex-wrap justify-center max-h-screen overflow-y-scroll w-full pb-72">
      {list?.map((imovel) => {
        return (
          <div className="m-2">
            <ImovelCard key={imovel.id} imovelId={imovel.id} />
          </div>
        );
      })}
    </ScrollArea>
  );
}
