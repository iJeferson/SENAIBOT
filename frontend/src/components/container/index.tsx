import { ReactNode } from "react";
export function Container({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-7xl min-h-screen mx-auto px-4 rounded-xl">{children}</div>;
}