import { FaDatabase } from "react-icons/fa";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <div>
      <header className="  font-bold text-center bg-gray-800 text-white p-4 h-22 ">
        <nav className="flex justify-around items-center">
        <span className="flex items-center justify-center"> 
        <FaDatabase size={30} color="yellow" className="mr-2"/>
        <h1  className="uppercase text-3xl text-white hover:text-slate-300 transition-all duration-300">Sen<span className="text-blue-400">ai</span>Bot</h1>
        </span>

        <div className="flex items-center gap-4 text-2xl">
        <Link to="/historico" className="text-lg text-white hover:text-slate-300 transition-all duration-300">Histórico</Link>
        <Link to="/" className="text-lg text-white hover:text-slate-300 transition-all duration-300">Documentação</Link>        
        </div>
        </nav>
      </header>
    </div>
  );
}
