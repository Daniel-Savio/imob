import AddForm from "@/components/addForm";
import AdminImovelList from "@/components/adminImovelList";
import { createContext, useState } from "react";
import { toast } from "sonner";

export interface adminState {
  state: boolean;
  setAddedImovelState: (state: boolean) => void;
}

export default function Admin() {
  const [addedImovelState, setAddedImovelState] = useState<boolean>();
  const AddedImovelContext = createContext({
    addedImovelState,
    setAddedImovelState,
  });

  if (addedImovelState) {
    toast("Imovel adicionaod com sucesso!");
    setAddedImovelState(false);
  }

  return (
    <AddedImovelContext.Provider
      value={{ addedImovelState, setAddedImovelState }}
    >
      <div className=" bg-gradient-to-tl from-indigo-300 to-zinc-50 flex flex-col gap-10 items-center w-full m- min-h-screen p-3 text-zinc-600">
        <h1 className="text-3xl text-violet-500 mt-10 font-bold">Admin</h1>

        <fieldset className=" shadow-lg max-h-[400px] w-[90%] mt-5  overflow-scroll bg-gradient-to-br from-indigo-100 to-zinc-50 p-10 rounded-md">
          <legend className="px-2 text-2xl font-bold ">
            Adicionar Imóvel{" "}
          </legend>
          <AddForm addedImovelState={setAddedImovelState}></AddForm>
        </fieldset>
        <div className="max-w-full">
          <AdminImovelList></AdminImovelList>
        </div>
      </div>
    </AddedImovelContext.Provider>
  );
}
