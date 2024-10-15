import { Imovel } from "@/schemas/imovelScheema";
import axios from "axios";

import { useEffect, useState } from "react";
import ImovelCard from "./ui/imovelCard";

export default function AdminImovelList() {
  const [list, setList] = useState<Imovel[] | undefined>();

  useEffect(() => {
    async function getList() {
      const listData: Imovel[] = (await axios.get("http://localhost:3030/"))
        .data;

      setList(listData);
    }
    setTimeout(() => {
      getList();
    }, 800);
  }, []);

  return (
    <div className="flex flex-wrap w-full p-4 -z-1 justify-center gap-10">
      {list?.map((imovel) => {
        return <ImovelCard imovelId={imovel.id} />;
      })}
    </div>
  );
}
