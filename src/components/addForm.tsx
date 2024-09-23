export default function AddForm() {
  return (
    <div className="m-auto">
      <h1 className="font-univers font-bold text-5xl text-violet-600 mb-4 text-center">
        Add
      </h1>

      <form action="submit" className="gap-2 flex flex-col">
        <p>add</p>

        <button
          className="p-2 rounded-sm mt-4 bg-violet-500 font-semibold text-zinc-50"
          type="submit"
        >
          Salvar imóvel
        </button>
      </form>
    </div>
  );
}
