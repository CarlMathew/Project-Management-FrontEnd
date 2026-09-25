import { AppLogo } from "@/components/layout/app-logo";
import { SidebarNavigation } from "@/components/layout/sidebar-navigation";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet"

interface MobileSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function MobileSidebarProps({
    open,
    onOpenChange
}: MobileSidebarProps) {
    return (
        <Sheet 
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="left"
                className="w-72 p-0"
            >
                <SheetHeader className="border-b px-5 py-4 text-left">
                    <SheetTitle className="sr-only">
                        Application Navigation
                    </SheetTitle>
                    <AppLogo />
                </SheetHeader>

                <div className="p-4">
                    <SidebarNavigation 
                        onNavigate={() => onOpenChange(false)}
                    />
                </div>

            </SheetContent>
        </Sheet>
    )
}


