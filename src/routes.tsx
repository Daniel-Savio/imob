import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import About from "./pages/locked";
import Admin from "./pages/admin";
import MainFrame from "./layout/main-frame";
import Imoveis from "./pages/imoveis";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainFrame />}>
          <Route path="/" element={<Home />} />
          <Route path="/locked" element={<About />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/imoveis/:filter" element={<Imoveis />} />
          <Route path="/imoveis/" element={<Imoveis />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
