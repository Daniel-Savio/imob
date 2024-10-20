import "./App.css";
import { Toaster } from "@/components/ui/sonner";
import { HomeIcon, LockKeyhole } from "lucide-react";

// import IconBg from "../public/Icon-bg.png"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/locked";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import Admin from "./pages/admin";
import { Buildings } from "phosphor-react";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <header className=" fixed top-0 flex justify-center w-full align-middle text-zinc-600">
        <Tabs
          className="relative block justify-center text-center w-full"
          defaultValue="home"
        >
          <div className="flex gap-2 m-auto w-fit align-bottom">
            <Buildings className="w-10 h-10 mt-auto ml-2" weight="bold" />
            <h1 className="flex text-nowrap mt-auto text-xl font-bold">
              Daniel Pinheiro Corretagem
            </h1>
          </div>
          <TabsList className=" flex bg-transparent w-full gap-4 justify-center">
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
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/locked" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </section>
    </BrowserRouter>
  );
}

export default App;
