/* eslint-disable react-hooks/rules-of-hooks */
import { Combobox } from "@/components/ui/combobox";
import types from "../assets/types";
import React, { useEffect, useState } from "react";
import { Popover, PopoverContent } from "@/components/ui/popover";
// import { FilterIcon } from "lucide-react";
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
    <div className=" text-zinc-600 h-screen bg-[url('https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-8161.jpg')] bg-cover pt-20 px-2 flex flex-col items-center">
      <div className="absolute bottom-10 md:right-24 z-10  ">
        <Popover>
          {/* <PopoverTrigger className="p-2 rounded-full bg-blue-700 flex justify-center md:w-[90px] items-center z-1">
            <FilterIcon className="text-zinc-50 md:size-8"></FilterIcon>
          </PopoverTrigger> */}

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
      <section className="flex flex-col text-center justify-center w-full mt-8  overflow-scroll">
        <ImovelList></ImovelList>
      </section>
      <footer className="flex flex-col justify-center">
        <strong className="text-center">CRECI: 237714</strong>
        <p>All Rights Reserved to: Daniel Pinheiro</p>
      </footer>
    </div>
  );
};

export default home;
