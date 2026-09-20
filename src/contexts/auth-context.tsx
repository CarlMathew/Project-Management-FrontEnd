import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode
} from "react";

import * as authApi from "@/api/auth-api"
import {
    clearAccessToken,
    setAccessToken
} from "@/lib/access-token"

import type {
    CurrentUser,
    LoginRequest
} from "@/types/auth"

interface AuthContextValue{
    user: CurrentUser | null;
    isAuthenticated: boolean;
    isInitializing: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
    hasRole: (...roles: string[]) => boolean;
}


const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps{
    children: ReactNode;
}


export function AuthProvider({children}: AuthProviderProps){
    
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [isInitializing, setisInitializing] = useState(true);

    const refreshUser = useCallback(async () => {
        const currentUser = await authApi.getCurrentUser();
        setUser(currentUser)
    }, [])


    const initializeSession = useCallback(async () => {
        try{
            const authentication = await authApi.refreshSession()
            setAccessToken(authentication.access_token)
            const currentUser = await authApi.getCurrentUser()
            setUser(currentUser)
        } catch {
            clearAccessToken()
            setUser(null) 
        } finally {
            setisInitializing(false)
        }        
    }, [])

    useEffect(() => {
        void initializeSession()
    }, [])

    const login = useCallback(
        async (credentials: LoginRequest) => {
            const authentication = await authApi.login(credentials)

            setAccessToken(authentication.access_token);

            await refreshUser();
        }
    , [refreshUser])

    const logout = useCallback(async () => {
        
        try {
            await authApi.logout()
        } finally{
            clearAccessToken()
            setUser(null)
        }
    }, [])


    const hasRole = useCallback(
        (...roles: string[]) => {
            
            if(!user) {
                return false;
            }

            const normalizedRoles = new Set(
                user.roles.map((role) => role.role_name.toLowerCase())
            )

            return roles.some((role) => normalizedRoles.has(role.toLowerCase()))

    }, [user])

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: user !==null,
            isInitializing,
            login,
            logout, 
            refreshUser,
            hasRole
        }), [
            user,
            isInitializing,
            login,
            logout,
            refreshUser,
            hasRole
        ]
    )

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


export function useAuth(){
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")

    }
    
    return context;
}