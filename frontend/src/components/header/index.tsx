import { FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { IoIosLogOut } from "react-icons/io";

export function Header() {
  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <div>
      <header className="  font-bold text-center bg-gray-900 text-white p-4 h-22 ">
        <nav className="flex justify-between items-center px-10">
          <Link to="/">
            {" "}
            <span className="flex items-center justify-center">
              <FaDatabase size={30} color="yellow" className="mr-2" />
              <h1 className="uppercase text-3xl text-white hover:text-slate-300 transition-all duration-300">
                SEN<span className="text-blue-400">AI</span>BOT
              </h1>
            </span>
          </Link>
          <button className="ml-auto" onClick={handleLogout}>
            <Link to="/pesquisas">
            pesquisa
            </Link>
            <IoIosLogOut title="Sair" size={35} className="hover:text-red-500 duration-300 transition-all" />
          </button>
        </nav>
      </header>
    </div>
  );
}
