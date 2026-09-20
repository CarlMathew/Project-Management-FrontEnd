import {Navigate, Route, Routes} from "react-router-dom"

import AppLayout  from "@/layouts/app-layout";
import AdminPage  from "@/pages/admin/admin-page";
import DashboardPage  from "@/pages/dashboard/dashboard-page";
import { LoginPage }  from "@/pages/login/login-page";
import NotFoundPage  from "@/pages/not-found-page";
import  ProjectsPage  from "@/pages/projects/projects-page";
import { ProtectedRoute } from "./protected-route";
import  TasksPage  from "@/pages/tasks/tasks-page"
import  TeamPage  from "@/pages/teams/teams-page"
import { UnauthorizedPage } from "@/pages/unauthorized-page";



export function AppRouter(){
    return (
        <Routes>
            <Route path="/login" element={ <LoginPage/> } />

            <Route path="/unauthorized" element={ <UnauthorizedPage /> } />


            <Route element={<ProtectedRoute />}>
                <Route
                    index
                    element={
                        <Navigate 
                            to="/dashboard"
                            replace
                        />
                    }
                />
                <Route 
                    path="/dashboard"
                    element={<DashboardPage />}
                />
            </Route>


            <Route 
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>


    )
}