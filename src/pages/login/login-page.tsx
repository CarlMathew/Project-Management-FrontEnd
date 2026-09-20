import {
  useState,
  type FormEvent,
} from "react";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom"


import { Button } from "@/components/ui/button";

import { TriangleAlert } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/auth-context";

interface LocationState {
  from?: {
    pathname?: string;
  }
}


export function LoginPage(){
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    isAuthenticated,
    isInitializing,
  } = useAuth();
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const state = location.state as LocationState | null
  const destination = state?.from?.pathname ?? "/dashboard"

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("")
    setIsSubmitting(true);

    try {
      await login({
        email,
        password
      })
      navigate(destination, {replace: true})
    } catch {
      setErrorMessage("Invalid Email or Password")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isInitializing){
    return null;
  }

  if (isAuthenticated){
    return <Navigate to="/dashboard" replace/>
  }

  return (
    <main 
      className="flex flex-col min-h-screen 
      items-center justify-center bg-muted/30 p-4 gap-5"
    >
      {errorMessage && (
        <p className="flex items-center  gap-2 bg-red-500 px-4 py-1 rounded shadow-sm ">
          <TriangleAlert /> 
          <span className="text-white text-sm font-semibold"> {errorMessage} </span>
        </p>
      )}
      <Card className="w-90 max-w-md">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          
          <CardDescription>
            Enter your credentials to continue.
          </CardDescription>
  
        </CardHeader>

        <CardContent>
          <form
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="space-y-2">
              <Label htmlFor="email">
                Email
              </Label>

              <Input 
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input 
                id="password"
                type="password"
                autoComplete="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                className=""
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </main>
  )

}