import AddForm from "@/components/forms/addForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImovelCard from "@/components/ui/imovel-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Imovel } from "@/schemas/imovelScheema";
import { apiUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { Plus } from "phosphor-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
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

  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("id") !== "Daniel Pinheiro") {
      navigate("/");
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center text-center w-full">
        <h1>
          Carregando imóveis <LoaderCircle className="animate-spin" />{" "}
        </h1>
        <br />
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Erro ao carregar imóveis</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1 className="text-3xl text-left w-full font-bold">Admin</h1>

      <div className="flex flex-wrap justify-center items-center gap-5 overflow-y-scroll w-full">
        {list?.map((imovel) => (
          <ImovelCard key={imovel.id} imovelId={imovel.id} />
        ))}
      </div>
      <Dialog>
        <DialogContent className="max-w-[95vw] p-2 rounded-sm">
          <DialogTitle>Adicionar Imóvel</DialogTitle>
          <AddForm></AddForm>
        </DialogContent>

        <DialogTrigger className="absolute bottom-28 right-10 z-30 bg-blue-600 rounded-full text-slate-50 p-2 shadow-md hover:scale-110 hover:rotate-100 transition-all">
          <Plus size={24} weight="bold" />
        </DialogTrigger>
      </Dialog>
    </div>
  );
}
