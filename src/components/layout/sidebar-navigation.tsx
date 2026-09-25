import { NavLink } from "react-router-dom";

import { navigationItems } from "@/config/navigation";
import { useAuth } from "@/contexts/auth-context";
import { cn } from "@/lib/utils"

interface SidebarNavigationProps {
    onNavigate?: () => void;
}

export function SidebarNavigation({
    onNavigate
}: SidebarNavigationProps){
    
    const { hasRole } = useAuth();

    const visibleItems = navigationItems.filter((item) => {
        if (!item.allowedRoles){
            return true
        }

        return hasRole(...item.allowedRoles);
    })

    return (
        <nav className="space-y-1">
            {visibleItems.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.href}
                        to={item.href}
                        onClick={onNavigate}
                        className={ ( {isActive}) => 
                            cn(
                                "flex items-center gap-3 rounded-md px-3 py-2",
                                "text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : [
                                        "text-muted-foreground",
                                        "hover:bg-muted",
                                        "hover: text-foreground"
                                    ]
                            )
                        }
                    >

                        <Icon className="h-4 w-4 shrink-0"/>
                        <span>{item.label}</span>
                    </NavLink>
                )
            })}
        </nav>
    )

}