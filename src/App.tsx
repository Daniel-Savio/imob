import "./App.css";
import { HomeIcon, LockKeyhole } from "lucide-react";

// import IconBg from "../public/Icon-bg.png"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/locked";
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs";
import Admin from "./pages/admin";

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
