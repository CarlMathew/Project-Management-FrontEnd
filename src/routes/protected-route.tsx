import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";


export function ProtectedRoute(){
    const {isAuthenticated, isInitializing} = useAuth()

    const location = useLocation()

    if (isInitializing) {
        return (
            <div className="flex min-h-screen items-center justify-center"> 
                <p className="text-sm text-muted-foreground">
                    Loading session...
                </p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <Navigate 
                to="/login"
                replace
                state={{ from: location}}
            />
        )
    }

    return <Outlet/>
}
