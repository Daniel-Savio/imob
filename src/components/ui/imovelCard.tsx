import { Imovel } from "@/schemas/imovelScheema";
import React from "react";

const ImovelCard = (imovel: Imovel) => {
  const url =
    "https://gelkerribeiro.com.br/wp-content/uploads/2018/08/Casa_B_facahda_01-PS.jpg.webp";
  return (
    <div className="max-w-64">
      <div className="p-2 rounded-md bg-gradient-to-tl from-violet-200 to-zinc-50">
        <img src={url} className="w-64 h-64 rounded-md" />
        <h1 className="text-xl text-violet-800 font-bold text-wrap">
          {imovel.geral} <br />
          {imovel.tipo}
        </h1>
        <h2 className="text-lg font-bold">
          {imovel.cidade} - {imovel.estado}
        </h2>
      </div>
    </div>
  );
};

export default ImovelCard;
