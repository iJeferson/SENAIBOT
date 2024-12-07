import { useContext, useEffect } from "react";
import { Container } from "../../components/container";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { auth } from "../../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";

import { FaDatabase } from "react-icons/fa";

const schema = z.object({
  name: z.string().min(1, "O campo nome é obrigatorio"),
  email: z
    .string()
    .email("Digite um email válido")
    .min(1, "Email é obrigatorio"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof schema>;

export function Register() {
  const { handleInfoUser } = useContext(AuthContext);

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

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (user) => {
        await updateProfile(user.user, {
          displayName: data.name,
        });
        handleInfoUser({
          name: data.name,
          email: data.email,
          uid: user.user.uid,
        });
        toast.success("Bem vindo ao SENAIBOT !");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        toast.error("Erro ao criar conta");
        console.log(error);
      });
  }

  return (
    <main className="bg-gray-900">
      <Container>
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-6">
          {/* Logo */}
          <Link to="/login">
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
              Crie uma conta
            </h2>

            <div className="mb-4">
              <Input
                type="text"
                placeholder="Digite seu nome completo..."
                name="name"
                error={errors.name?.message}
                register={register}
              />
            </div>

            <div className="mb-4">
              <Input
                type="email"
                placeholder="Digite seu email..."
                name="email"
                error={errors.email?.message}
                register={register}
              />
            </div>

            <div className="mb-4">
              <Input
                type="password"
                placeholder="Digite sua senha..."
                name="password"
                error={errors.password?.message}
                register={register}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-medium py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Cadastrar
            </button>
          </form>

          {/* Link para login */}
          <Link to="/login" className="text-white hover:underline text-base">
            Já possui uma conta? Faça o login
          </Link>
        </div>
      </Container>
    </main>
  );
}
