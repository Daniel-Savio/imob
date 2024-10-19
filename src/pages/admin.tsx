import AddForm from "@/components/addForm";
import AdminImovelList from "@/components/adminImovelList";
import { motion } from "framer-motion";
import { Plus, X } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface adminState {
  state: boolean;
  setAddedImovelState: (state: boolean) => void;
}

export default function Admin() {
  const navigate = useNavigate();
  const [addedImovelState, setAddedImovelState] = useState<boolean>();
  const [isOpen, setisOpen] = useState<boolean | undefined>(false);

  const variants = {
    open: { scale: 1, opacity: 1 },
    closed: { display: "none", scale: 0 },
  };
  useEffect(() => {
    if (window.localStorage.getItem("id") !== "Daniel Pinheiro") {
      navigate("/");
    }
  }, []);

  const AddedImovelContext = createContext({
    addedImovelState,
    setAddedImovelState,
  });

  if (addedImovelState) {
    setAddedImovelState(false);
  }

  return (
    <AddedImovelContext.Provider
      value={{ addedImovelState, setAddedImovelState }}
    >
      <div className=" bg-zinc-100 flex flex-col h-screen items-center w-full overflow-hidden p-3 text-zinc-600">
        <h1 className="text-3xl text-blue-500 mt-10 font-bold">Admin</h1>
        <motion.div
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.3 }}
          variants={variants}
          onClick={() => {
            setisOpen(!isOpen);
          }}
          className="absolute top-0 w-full z-50 bg-slate-600 bg-opacity-80 p-2 flex justify-center h-full"
        >
          <div className="overflow-visible relative w-10/12 bg-slate-100 p-4 rounded-sm h-[full] m-auto shadow-2xl">
            <div
              onClick={() => {
                setisOpen(!isOpen);
              }}
              className="absolute top-1 right-5 rounded-full bg-blue-600 p-1 shadow-sm cursor-pointer text-slate-50"
            >
              <X size={24} />
            </div>
            <AddForm addedImovelState={setAddedImovelState}></AddForm>
          </div>
        </motion.div>

        <div className="">
          <AdminImovelList></AdminImovelList>
        </div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            setisOpen(!isOpen);
          }}
          className=" fixed bottom-16 p-2 bg-blue-600 text-slate-50 rounded-full cursor-pointer"
        >
          <Plus size={32} weight="bold" />
        </motion.div>
      </div>
    </AddedImovelContext.Provider>
  );
}
