import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HouseCover from "../assets/cover.png";
import DP from "../assets/DanielPinheiro.png";
import Building from "../assets/buildng.png";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function Home() {
  const navigate = useNavigate();
  return (
    <section className="w-full">
      <main className="relative m-5 p-8 rounded-lg shadow-md bg-imobWhite backdrop-blur-md bg-opacity-80">
        <div className=" flex flex-col z-20 gap-10 md:gap-32">
          <h1 className="font-bold text-4xl">
            Encontre um novo imóvel <br></br>para o seus lar
          </h1>
          <h3 className="text-muted-foreground text-lg">
            Opções para a família completa, <br></br>no melhores bairros e
            sempre com uma ótima vizinhança
          </h3>
          <div className="z-20 lg:max-w-[50%]  items-center flex flex-col md:flex-row gap-5 md:justify-evenly p-5 bg-slate-50 shadow-md rounded-lg">
            <Avatar className="m-auto md:m-0 border border-imobSecondary shadow-md">
              <AvatarImage className="" src={DP} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
            <div className="font-bold md:text-lg">
              <p>Conheça nossos imóveis</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 justify-between items-center">
              <div>
                <p className="font-bold">Entre em contato conosco</p>
                <p className="text-muted-foreground flex">
                  De pronto atendimento para melhor te auxiliar
                  <MapPin />
                </p>
              </div>
              <Separator
                className="h-full w-1 bg-muted-foreground"
                orientation="vertical"
              />
              <Button
                onClick={() => {
                  navigate("/imoveis");
                }}
                className="ml-5"
              >
                Conheça <ChevronRight></ChevronRight>
              </Button>
            </div>
          </div>
        </div>
        <img
          className="absolute bottom-0 right-0 z-0"
          src={HouseCover}
          alt=""
        />
      </main>

      <Separator></Separator>

      <main className="flex flex-col md:max-w-[60vw] md:flex-row md:items-center md:m-auto md:justify-around gap-5 text-center py-5">
        <div className="space-y-8 md:text-left md:space-y-24">
          <h1 className="text-3xl font-bold">
            {" "}
            Para seu futuro negócio ou empreendimento
          </h1>
          <h3 className="text-wrap text-muted-foreground text-lg font-semibold">
            Encontre o imóvel ideal para o seu negócio crescer com segurança e
            eficiência. Oferecemos opções estratégicas e bem localizadas para
            impulsionar suas operações
          </h3>
        </div>
        <img
          className="max-h-[1000px] max-w-[500px] m-auto md:m-0"
          src={Building}
          alt=""
        />
      </main>

      <Separator></Separator>
    </section>
  );
}
