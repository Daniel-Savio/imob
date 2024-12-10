import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { motion } from "framer-motion";
import { ChevronRight, CircleX, LogIn, Logs, MapPin } from "lucide-react";
import { House, WhatsappLogo } from "phosphor-react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

export default function MainFrame() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const variants = {
    open: { x: 0, opacity: 1 },
    closed: { display: "none", x: "100%" },
  };

  return (
    <section className="relative min-h-screen bg-cover bg-[url('https://danielpinheiro-corretor.store/iPad.png')]">
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className="flex fixed right-0 w-96 h-screen z-50 md:hidden backdrop-blur-md bg-opacity-50 bg-imobWhite"
      >
        <aside
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="flex justify-center cursor-pointer items-center w-8 border-r-2 h-full bg-imobWhite"
        >
          <ChevronRight />
        </aside>
        <div className="relative flex flex-col p-5 text-center w-full gap-4">
          <CircleX
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="absolute cursor-pointer top-5 right-5 text-imobPrimary h-8 w-8"
          />
          <Link to="/" className="hover:text-imobPrimary hover:underline">
            Home
          </Link>
          <Link
            to="/imoveis/Aluguel/"
            className="hover:text-imobPrimary hover:underline"
          >
            Aluguel
          </Link>
          <Link
            to="/imoveis/Venda/"
            className="hover:text-imobPrimary hover:underline"
          >
            Venda
          </Link>
          <Button
            className="flex gap-1"
            onClick={() => {
              navigate("/locked");
            }}
          >
            <LogIn className="w-4 h-4" /> Admin
          </Button>
        </div>
      </motion.div>
      <header className="flex w-full gap-1 justify-between backdrop-blur-md bg-white bg-opacity-60 p-2">
        <div className="flex gap-1 items-center pl-5">
          <House className="h-8 w-8 text-imobPrimary"></House>
          <h1 className="text-lg font-semibold">Daniel Pinheiro Corretor</h1>
        </div>
        <div className="hidden md:flex gap-5 items-center pr-5">
          <Link to="/" className="hover:text-imobPrimary hover:underline">
            Home
          </Link>
          <Link
            to="/imoveis/Aluguel"
            className="hover:text-imobPrimary hover:underline"
          >
            Aluguel
          </Link>
          <Link
            to="/imoveis/Venda"
            className="hover:text-imobPrimary hover:underline"
          >
            Venda
          </Link>
          <Button
            className="flex gap-1"
            onClick={() => {
              navigate("/locked");
            }}
          >
            <LogIn className="w-4 h-4" /> Admin
          </Button>
        </div>
        <Logs
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="cursor-pointer h-8 w-8 md:hidden text-imobPrimary"
        />
      </header>

      <ScrollArea className="min-h-[100vh] relative  p-5">
        <Outlet></Outlet>
      </ScrollArea>

      <footer className="md:flex z-0 justify-center gap-10 bg-white bg-opacity-60 p-2 px-5 backdrop-blur-md">
        <div className="font-bold">
          <p>All Rights Reserved to: Daniel Pinheiro</p>
          <p>CRECI: 237714</p>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <p className="font-bold">Entre em contato conosco</p>
            <p className="text-muted-foreground flex">
              De pronto atendimento para melhor te auxiliar
              <MapPin className="hidden ml-2 md:block" />
            </p>
          </div>
          <Separator
            className="h-full w-1 bg-muted-foreground"
            orientation="vertical"
          ></Separator>
          <a
            className="w-full flex justify-center"
            href={`whatsapp://send?text=Bom dia Daniel. \n Teconheci pelo site, consegue me ajudar? &phone=+5511941776334`}
          >
            <Button className="px-3 py-1 bg-blue-600 text-slate-50 rounded-md gap-2">
              <WhatsappLogo size={16} />
              Falar com o vendedor
            </Button>
          </a>
        </div>
      </footer>
    </section>
  );
}
