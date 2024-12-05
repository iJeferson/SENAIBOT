import { FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <header className="  font-bold text-center bg-gray-900 text-white p-4 h-22 ">
        <nav className="flex justify-around items-center">
          <Link to="/">
            {" "}
            <span className="flex items-center justify-center">
              <FaDatabase size={30} color="yellow" className="mr-2" />
              <h1 className="uppercase text-3xl text-white hover:text-slate-300 transition-all duration-300">
              SEN<span className="text-blue-400">AI</span>BOT
              </h1>
            </span>
          </Link>
          <div className="flex items-center gap-4 text-base">
            <a
              href="https://github.com/iJeferson/tcc-rpa-update"
              target="_blank"
              className="text-lg text-white hover:text-slate-300 transition-all duration-300"
            >
              Documentação
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
}
