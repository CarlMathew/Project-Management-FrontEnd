import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/contexts/auth-context";

interface RoleRouteProps {
    allowedRoles: string[];
}

export function RoleRoute({
    allowedRoles
}: RoleRouteProps) {
    const {hasRole} = useAuth();

    if (!hasRole(...allowedRoles)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}