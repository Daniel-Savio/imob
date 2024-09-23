import AddForm from "@/components/addForm";

export default function Admin() {
  return (
    <div className=" bg-gradient-to-tl from-indigo-300 to-zinc-50 flex flex-col items-center min-h-screen p-3 text-zinc-600">
      <h1 className="text-3xl text-violet-500 mt-10 font-bold">Admin</h1>

      <fieldset className=" shadow-lg max-h-[500px] max-w-96 mt-5 w-full overflow-scroll bg-gradient-to-br from-indigo-100 to-zinc-50 p-10 rounded-sm">
        <legend className="px-2 text-2xl font-bold ">Adicionar Imóvel </legend>
        <AddForm></AddForm>
      </fieldset>
      <div className="h-1/2"></div>
    </div>
  );
}
