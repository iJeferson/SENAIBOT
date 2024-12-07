import { FaDatabase } from "react-icons/fa";
import { Container } from "../../components/container";
import { Link } from "react-router-dom";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "Email é obrigatório"),
  password: z.string().min(6, "O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: FormData) => {
    console.log("Dados do formulário:", data);
    // Aqui você pode implementar o login, por exemplo, com Firebase ou API própria
  };

  return (
    <main className=" bg-gray-900 ">

    <Container>
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
        {/* Logo */}
        <Link to="/">
            {" "}
            <span className="flex items-center justify-center mb-4">
              <FaDatabase size={40} color="yellow" className="mr-2" />
              <h1 className="uppercase font-bold text-4xl text-white hover:text-slate-300 transition-all duration-300">
              SEN<span className="text-blue-400">AI</span>BOT
              </h1>
            </span>
          </Link>

        {/* Formulário */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white w-full max-w-md p-8 rounded-lg shadow-md"
        >
          <h2 className="text-2xl text-center font-semibold text-gray-800 mb-4">
            Acesse sua conta
          </h2>

          <div className="mb-4">
            <Input
              type="email"
              placeholder="Digite seu email"
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>

          <div className="mb-4">
            <Input
              type="password"
              placeholder="Digite sua senha"
              name="password"
              error={errors.password?.message}
              register={register}
              
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Acessar
          </button>
        </form>

        {/* Link para cadastro */}
        <Link
          to="/register"
          className="text-white hover:underline text-base"
        >
          Ainda não possui uma conta? Cadastre-se
        </Link>
      </div>
    </Container>
    
    </main>
  );
}
