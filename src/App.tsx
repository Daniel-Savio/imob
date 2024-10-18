import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import { HomeIcon, LockKeyhole } from "lucide-react";

// import IconBg from "../public/Icon-bg.png"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/locked";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import Admin from "./pages/admin";
import { Separator } from "./components/ui/separator";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <header className=" fixed top-0 flex p-2 justify-center w-full align-middle text-zinc-600">
        <Tabs className="relative flex" defaultValue="home">
          <TabsList className=" flex bg-transparent w-full gap-4 justify-around">
            <div
              id="trail"
              className="absolute -z-10 backdrop-blur-md h-8 bg-white/20 rounded-full px-40 py-5 w-full shadow-lg"
            ></div>

            <Link to="/">
              <TabsTrigger className="rounded-full  px-5" value="home">
                <HomeIcon className="h-5 w-fit" />
              </TabsTrigger>
            </Link>

            <Link to="/locked">
              <TabsTrigger className="rounded-full  px-5" value="vendor">
                <LockKeyhole className="h-5 w-fit" />
              </TabsTrigger>
            </Link>
          </TabsList>
        </Tabs>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locked" element={<About />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <footer className=" px-2 bg-blue-600 w-screen gap-2 text-slate-50 flex md:justify-center sm:justify-around">
        <p className="text-sm text-center">
          Todos os Direitos Reservados para <br />
          Daniel Pinheiro
        </p>
        <Separator orientation="vertical"></Separator>
        <p className="text-sm text-center">
          Daniel Pinheiro da Silva
          <br />
          CRECI: 237714
        </p>
      </footer>
    </BrowserRouter>
  );
}

export default App;
