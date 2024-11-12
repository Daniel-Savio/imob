import ImovelCard from "@/components/ui/imovel-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Imovel } from "@/schemas/imovelScheema";
import { apiUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Building2, LoaderCircle } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DP from "../assets/DanielPinheiro.png";

const Imoveis: React.FC = () => {
  const fetchImoveis = async () => {
    const { data } = await axios.get<Imovel[]>(apiUrl);
    return data;
  };
  const { filter } = useParams();
  const {
    data: list,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["imoveis"],
    queryFn: fetchImoveis,
  });

  let filteredList = list;

  if (isLoading) {
    return (
      <div className="flex justify-center text-center">
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
  if (filter) {
    const newList: Imovel[] = [];
    list?.forEach((imovel) => {
      if (imovel.transaction === filter) newList.push(imovel);
    });
    console.log(newList);
    filteredList = newList;
  }

  return (
    <div className="px-2">
      <div className="md:flex items-center justify-evenly rounded-lg p-2 shadow-md bg-imobWhite backdrop-blur-md bg-opacity-80">
        <span className="flex gap-1 items-center">
          <Avatar className="hidden md:block m-auto md:m-0 border h-12 w-12 border-imobSecondary shadow-md">
            <AvatarImage className="" src={DP} />
            <AvatarFallback>DP</AvatarFallback>
          </Avatar>

          <h1 className="font-bold text-4xl">{filter}</h1>
        </span>

        <Separator
          className="hidden md:block h-8 bg-muted-foreground"
          orientation="vertical"
        />

        <p>Venha conhecer nossos imóveis</p>
        <Building2 className="hidden md:block text-blue-600" />
      </div>
      <div className=" text-zinc-600 px-2 mt-5 flex flex-col items-center">
        <section className="flex flex-col justify-center w-full overflow-scroll">
          <div className="flex flex-wrap justify-center items-center overflow-y-scroll w-full">
            {filteredList?.map((imovel) => (
              <div key={imovel.id} className="m-2">
                <ImovelCard visible="hidden" imovelId={imovel.id!} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Imoveis;
