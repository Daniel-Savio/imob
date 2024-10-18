import { Imovel } from "@/schemas/imovelScheema";
import axios from "axios";

import { useEffect, useState } from "react";
import ImovelCard from "./ui/imovelCard";
import { apiUrl } from "@/utils";

export default function AdminImovelList() {
  const [list, setList] = useState<Imovel[] | undefined>();

  useEffect(() => {
    async function getList() {
      const listData: Imovel[] = (await axios.get(apiUrl)).data;

      setList(listData);
      console.log(listData);
    }
    setTimeout(() => {
      getList();
    });
  }, []);

  return (
    <div>
      {list?.map((imovel) => {
        return <ImovelCard key={imovel.id} imovelId={imovel.id} />;
      })}
    </div>
  );
}
