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
    <div className=" text-zinc-600 h-screen bg-gradient-to-tl from-indigo-300 to-zinc-50  pt-20 px-2 flex flex-col items-center">
      <Popover>
        <PopoverTrigger className="rounded-full bg-violet-500 p-2 ">
          <FilterIcon className="text-zinc-50"></FilterIcon>
        </PopoverTrigger>

        <PopoverContent className="flex flex-col items-center bg-gradient-to-tl from-indigo-200 to-zinc-50">
          <h1 className="font-bold text-lg">Localidade</h1>

          <div className="text-left">
            <h2>Estado</h2>
            <StatesCombobox
              placeholderValue="Todos"
              list={brazilianStates.UF}
              getValue={setStateFilter}
              value={stateFilter}
            ></StatesCombobox>
          </div>

          <div className="text-left">
            <h2>Cidade</h2>
            <Combobox
              placeholderValue="Tudo"
              list={cityList}
              getValue={setCityFilter}
              value={cityFilter}
            ></Combobox>
          </div>

          <h1 className="font-bold text-lg mt-5">Tipos de imóvel</h1>

          <div className="text-left">
            <h2>O que você procura ?</h2>
            <Combobox
              placeholderValue="Todos"
              list={types.general}
              getValue={setGeneralFilter}
              value={generalFilter}
            />
          </div>

          <div className="text-left">
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
      <section className="text-left w-full mt-8">
        <h1 className="text-xl text-left ">
          Imóveis em:
          <strong className="font-bold">
            {cityFilter ? " " + cityFilter : " Selecione uma localidade"}
          </strong>{" "}
        </h1>
        <h2 className="text-lg flex">
          <strong className="font-bold mr-4"> Filtros: </strong>
          {generalFilter ? ` ${generalFilter} ` : " "}
          {typeFilter}
        </h2>
      </section>
    </div>
  );
};

export default home;
