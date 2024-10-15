import { Imovel } from "@/schemas/imovelScheema";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiUrl } from "@/utils";
import PublicImovelCard from "./ui/publicImovelCard";

export default function ImovelList() {
  const [list, setList] = useState<Imovel[] | undefined>();

  useEffect(() => {
    async function getList() {
      const listData: Imovel[] = (await axios.get(apiUrl)).data;

      setList(listData);
    }
    setTimeout(() => {
      getList();
    }, 500);
  }, []);

  return (
    <div className="flex flex-wrap p-4 justify-center gap-8 ">
      {list?.map((imovel) => {
        return <PublicImovelCard imovelId={imovel.id} />;
      })}
    </div>
  );
}
