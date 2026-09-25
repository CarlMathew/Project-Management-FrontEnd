import {
    FolderKanban,
    LayoutDashboard,
    ListTodo,
    Settings,
    Users,
    type LucideIcon
} from "lucide-react"

export interface NavigationItem{
    label: string;
    href: string;
    icon: LucideIcon;
    allowedRoles?: string[];
}


export const navigationItems: NavigationItem[] = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        label: "Projects",
        href: "/projects",
        icon: FolderKanban
    },
    {
        label: "Tasks",
        href: "/tasks",
        icon: ListTodo
    },
    {
        label: "Teams",
        href: "/teams",
        icon: Users
    },
    {
        label: "Admin",
        href: "/admin",
        icon: Settings,
        allowedRoles: ["Admin"]
    }

]