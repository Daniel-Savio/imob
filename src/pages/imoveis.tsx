import ImovelCard from "@/components/ui/imovel-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Imovel } from "@/schemas/imovelScheema";
import { apiUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import React from "react";

const Imoveis: React.FC = () => {
  const fetchImoveis = async () => {
    const { data } = await axios.get<Imovel[]>(apiUrl);
    return data;
  };

  const {
    data: list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["imoveis"],
    queryFn: fetchImoveis,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center">
        <h1>
          Carregando imóveis <LoaderCircle className="animate-spin" />{" "}
        </h1>
        <br />
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Erro ao carregar imóveis</div>;
  }

  return (
    <div className=" text-zinc-600 px-2 flex flex-col items-center">
      <section className="flex flex-col justify-center w-full overflow-scroll">
        <div className="flex flex-wrap justify-center items-center overflow-y-scroll w-full">
          {list?.map((imovel) => (
            <div key={imovel.id} className="m-2">
              <ImovelCard visible="hidden" imovelId={imovel.id!} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Imoveis;
