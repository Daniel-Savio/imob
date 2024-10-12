import LoginForm from "@/components/loginForm";

export default function About() {
  return (
    <div className="h-screen bg-gradient-to-tl from-blue-300 to-zinc-50 flex flex-col items-center">
      <section className="m-auto">
        <LoginForm></LoginForm>
      </section>
    </div>
  );
}
