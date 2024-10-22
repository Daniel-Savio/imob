import { Imovel } from "@/schemas/imovelScheema";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "@/utils";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Spinner } from "phosphor-react";
import PublicImovelCard from "./ui/publicImovelCard";

// Função para buscar dados
const fetchImoveis = async () => {
  const { data } = await axios.get<Imovel[]>(apiUrl);
  return data;
};

export default function AdminImovelList() {
  // Usando o React Query para lidar com a requisição
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
      <>
        <h1>Carregando imóveis</h1>
        <Spinner className="animate-spin h-10 w-10 my-24 mx-auto"></Spinner>
      </>
    );
  }

  if (error) {
    return <div>Erro ao carregar imóveis</div>;
  }

  return (
    <ScrollArea className="flex flex-wrap justify-center max-h-screen overflow-y-scroll w-full pb-72">
      {list?.map((imovel) => (
        <div key={imovel.id} className="m-2">
          <PublicImovelCard imovelId={imovel.id} />
        </div>
      ))}
    </ScrollArea>
  );
}
