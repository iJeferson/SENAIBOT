import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

import { Container } from "../../components/container";
import { Input } from "../../components/input";

import toast from "react-hot-toast";
import { FaDatabase } from "react-icons/fa";

const schema = z.object({
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "Email é obrigatorio"),
  password: z.string().min(6, "O campo senha é obrigatorio"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }
    handleLogout();
  }, []);

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("LOGADO COM SUCESSO");
        console.log(user);
        toast.success("Logado com sucesso!");
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log("ERRO AO LOGAR");
        console.log(err);
        toast.error("Erro ao fazer o login")
      });
  }

  return (
    <main className="bg-gray-900 ">

    <Container>
      <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
        {/* Logo */}
        <Link to="/login">
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
