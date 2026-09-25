import { AppLogo } from "@/components/layout/app-logo";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";
import { Separator } from "@/components/ui/separator";

export function AppSidebar(){
    return (
        <aside
            className="
                fixed inset-y-0 left-0 z-30 hidden w-64 border-r 
                bg-background md:flex md:flex-col
            "
        >
            <div className="flex h-16 items-center px-5">
                <AppLogo />
            </div>


            <div className="flex-1 overflow-y-auto p-4">
                <SidebarNavigation />
            </div>

            <div className="border-t p-4">
                <p className="text-xs text-muted-foreground">
                    Project Management Thesis
                </p>
            </div>
        </aside>
    )
}