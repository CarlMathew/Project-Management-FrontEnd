import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import "./index.css"
import { AppRouter } from "@/routes/app-router.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { AuthProvider } from "./contexts/auth-context.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
           <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
