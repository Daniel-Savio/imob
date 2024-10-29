import AddForm from "@/components/addForm";
import ImovelCard from "@/components/ui/imovel-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Imovel } from "@/schemas/imovelScheema";
import { apiUrl } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { Plus, X } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface adminState {
  state: boolean;
  setAddedImovelState: (state: boolean) => void;
}

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
  const [addedImovelState, setAddedImovelState] = useState<boolean>();
  const [isOpen, setisOpen] = useState<boolean | undefined>(false);

  const variants = {
    open: { scale: 1, opacity: 1 },
    closed: { display: "none", y: "100%" },
  };
  useEffect(() => {
    if (window.localStorage.getItem("id") !== "Daniel Pinheiro") {
      navigate("/");
    }
  }, [addedImovelState]);

  const AddedImovelContext = createContext({
    addedImovelState,
    setAddedImovelState,
  });

  if (addedImovelState) {
    setisOpen(false);
    setAddedImovelState(false);
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center text-center">
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
    <AddedImovelContext.Provider
      value={{ addedImovelState, setAddedImovelState }}
    >
      <div className="flex flex-col justify-center items-center w-full">
        <h1 className="text-3xl text-blue-500 mt-24 font-bold">Admin</h1>
        <motion.div
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          variants={variants}
          className="absolute -top-10 w-full z-30 bg-slate-600 bg-opacity-80 sm:p-2 flex justify-center h-fit sm:h-full"
        >
          <div className="overflow-visible relative w-full h-full sm:h-fit sm:w-10/12 bg-slate-100 p-4 rounded-sm m-auto shadow-2xl">
            <div
              onClick={() => {
                setisOpen(!isOpen);
              }}
              className="absolute top-1 right-5 rounded-full bg-blue-600 p-1 shadow-sm cursor-pointer text-slate-50"
            >
              <X size={24} />
            </div>
            <AddForm addedImovelState={setAddedImovelState}></AddForm>
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-5 overflow-y-scroll w-full">
          {list?.map((imovel) => (
            <ImovelCard key={imovel.id} imovelId={imovel.id} />
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setisOpen(!isOpen);
          }}
          className=" fixed z-20 bottom-16 p-2 bg-blue-600 text-slate-50 rounded-full cursor-pointer"
        >
          <Plus size={32} weight="bold" />
        </motion.div>
      </div>
    </AddedImovelContext.Provider>
  );
}
