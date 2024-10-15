import AddForm from "@/components/addForm";
import AdminImovelList from "@/components/adminImovelList";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { Plus } from "phosphor-react";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface adminState {
  state: boolean;
  setAddedImovelState: (state: boolean) => void;
}

export default function Admin() {
  const navigate = useNavigate();
  const [addedImovelState, setAddedImovelState] = useState<boolean>();

  useEffect(() => {
    if (window.localStorage.getItem("id") !== "Daniel Pinheiro") {
      console.log("user not indentified");
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
      <div className=" bg-gradient-to-tl from-blue-300 to-zinc-50 flex flex-col gap-10 items-center w-full m- min-h-screen p-3 text-zinc-600">
        <h1 className="text-3xl text-blue-500 mt-10 font-bold">Admin</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed bottom-10 shadow-lg rounded-full z-10">
              <Plus size={32} weight="bold" />
            </Button>
          </DialogTrigger>
          <DialogContent className=" flex flex-col max-w-5xl sm:max-w-96 md:max-w-[800px]">
            <AddForm addedImovelState={setAddedImovelState}></AddForm>
          </DialogContent>
        </Dialog>

        <div className="">
          <AdminImovelList></AdminImovelList>
        </div>
      </div>
    </AddedImovelContext.Provider>
  );
}
