import { Envelope, LockKey } from "phosphor-react";
import { Link } from "react-router-dom";

export default function loginForm() {
  return (
    <div className="m-auto">
      <h1 className="font-univers font-bold text-5xl text-violet-600 mb-4 text-center">
        Login
      </h1>

      <form action="submit" className="gap-2 flex flex-col">
        <div>
          <label htmlFor="email" className="font-univers  text-violet-600">
            {" "}
            E-mail
          </label>
          <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
            <Envelope className="size-5 text-zinc-600" />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="daniel.savio@treetech.com.br"
              className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-56"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="font-univers  text-violet-600">
            {" "}
            Senha
          </label>
          <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
            <LockKey className="size-5 text-zinc-600" />
            <input
              type="password"
              id="email"
              name="email"
              placeholder="************"
              className="outline-none border-solid  text-zinc-600 placeholder-zinc-500 w-56"
              required
            />
          </div>
        </div>
        <Link to="/admin">
          <button
            className="p-2 rounded-sm mt-4 bg-violet-500 font-semibold text-zinc-50"
            type="submit"
          >
            Login
          </button>
        </Link>
      </form>
    </div>
  );
}
