/* eslint-disable react-hooks/rules-of-hooks */
import { Envelope, LockKey } from "phosphor-react";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().nonempty("Senha necessária"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function loginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
  };

  return (
    <div className="m-auto">
      <h1 className="font-univers font-bold text-5xl text-violet-600 mb-4 text-center">
        Login
      </h1>

      <form
        action="submit"
        className="gap-2 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor="email" className="font-univers  text-violet-600">
            {" "}
            E-mail
          </label>
          <div className="border rounded p-2 flex gap-2 items-center w-fit bg-zinc-50">
            <Envelope className="size-5 text-zinc-600" />
            <input
              type="text"
              placeholder="daniel.savio@treetech.com.br"
              className="outline-none border-solid bg-transparent text-zinc-600 placeholder-zinc-500 w-56"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <span className="text-red-600">{errors.email.message}</span>
          )}
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
              placeholder="************"
              className="outline-none border-solid  text-zinc-600 placeholder-zinc-500 w-56"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <span className="text-red-600">{errors.password.message}</span>
          )}
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
