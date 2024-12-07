import { RegisterOptions, UseFormRegister } from "react-hook-form";
interface InputProps {
  type: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  error?: string;
  ruler?:RegisterOptions
}
export function Input({ type, name, placeholder,register,error,ruler }: InputProps) {
  return (
    <div>
      <input 
      className="w-full border-2 rounded-md h-11 px-2 text-black"
      placeholder={placeholder} 
      type={type} 
      {...register(name,ruler)}
      id={name}
      />
      {error && <p className=" text-red-600">{error}</p>}
    </div>
  );
}