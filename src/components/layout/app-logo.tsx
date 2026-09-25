import { FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

export function AppLogo(){
    return (
        <Link
            to="/dashboard"
            className="flex items-center gap-3"
        >
            <div 
                className="flex size-9 items-center justify-center rounded-lg
                            bg-primary text-primary-foreground" 
            >
                <FolderKanban className="size-5"/>
            </div>

            <div className="leading-tight">
                <p className="font-semibold">
                    ProjectFlow
                </p>

                <p className="text-xs text-muted-foreground">
                    Project Management
                </p>
            </div>
        </Link>
    )
}