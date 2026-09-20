import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";


export function UnauthorizedPage(){
    return(
        <main>
            <div className="text-center">
                
                <h1 className="text-3xl font-bold">
                    Access Denied
                </h1>

                <p className="text-muted-foreground">
                    You do not have permission to access this page.
                </p>
            </div>

            <Button>
                <Link to="/dashboard">
                    Return to dashboard 
                </Link>
            </Button>
        </main>
    )
}

