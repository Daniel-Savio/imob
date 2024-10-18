/* eslint-disable react-hooks/rules-of-hooks */
import { Combobox } from "@/components/ui/combobox";
import types from "../assets/types";
import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterIcon } from "lucide-react";
import { StatesCombobox } from "@/components/specific/statesCombobox";
import brazilianStates from "@/assets/states";
import brazilianCities from "@/assets/cities";
import ImovelList from "@/components/imovelList";

const home: React.FC = () => {
  const [generalFilter, setGeneralFilter] = useState<string | undefined>(
    undefined
  );
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const [stateFilter, setStateFilter] = useState<string | undefined>(undefined);
  const [cityFilter, setCityFilter] = useState<string | undefined>(undefined);
  const [cityList, setCityList] = useState<string[]>(["Selecione um estado"]);

  useEffect(() => {
    let cities = ["Selecione um estado"];
    brazilianCities.estados.forEach((estado) => {
      if (estado.nome === stateFilter) cities = estado.cidades;
      setCityList(cities);
    });
  }, [stateFilter]);

  return (
    <div className=" text-zinc-600 h-screen bg-[url('https://img.freepik.com/vetores-gratis/estilo-de-fundo-branco-textura-elegante_23-2148432200.jpg?w=1380&t=st=1729217077~exp=1729217677~hmac=ede31c1c617b859ed0a00cafed97fdd527c1d1fcf7908cf75a41b29d2206ef2f')] bg-cover pt-20 px-2 flex flex-col items-center">
      <div className="absolute bottom-10 md:right-24 z-10  ">
        <Popover>
          <PopoverTrigger className="p-2 rounded-full bg-blue-700 flex justify-center md:w-[90px] items-center z-1">
            <FilterIcon className="text-zinc-50 md:size-8"></FilterIcon>
          </PopoverTrigger>

          <PopoverContent className="flex flex-col items-center bg-gradient-to-tl from-blue-200 to-zinc-50 md:mr-4">
            <h1 className="font-bold text-lg">Localidade</h1>

            <div className="text-left w-full">
              <h2>Estado</h2>
              <StatesCombobox
                placeholderValue="Todos"
                list={brazilianStates.UF}
                getValue={setStateFilter}
                value={stateFilter}
              ></StatesCombobox>
            </div>

            <div className="text-left w-full">
              <h2>Cidade</h2>
              <Combobox
                placeholderValue="Tudo"
                list={cityList}
                getValue={setCityFilter}
                value={cityFilter}
              ></Combobox>
            </div>

            <h1 className="font-bold text-lg mt-5">Tipos de imóvel</h1>

            <div className="text-left w-full">
              <h2>O que você procura ?</h2>
              <Combobox
                placeholderValue="Todos"
                list={types.general}
                getValue={setGeneralFilter}
                value={generalFilter}
              />
            </div>

            <div className="text-left w-full">
              <h2>O que você prefere ?</h2>
              <Combobox
                placeholderValue="Tudo"
                list={types.types}
                getValue={setTypeFilter}
                value={typeFilter}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <h1 className="text-2xl font-bold">Daniel Pinheiro Corretagem</h1>
      <section className="flex flex-col text-center justify-center w-full mt-8 mb-5 overflow-scroll">
        <ImovelList></ImovelList>
      </section>
    </div>
  );
};

export default home;
