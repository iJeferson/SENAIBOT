import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./App.tsx";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="bottom-right" reverseOrder={false} />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
