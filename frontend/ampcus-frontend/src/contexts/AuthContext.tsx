import { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import decryptData from '../utils/encryptdycrpt';
import { User } from '../models/models';



interface AuthContextProps {
    user: User;
    accessToken: string;
    refreshToken: string;
    setRefreshToken: Dispatch<SetStateAction<any>>;
    logout: () => void;
    setUser: Dispatch<SetStateAction<any>>;
    setAccessToken: Dispatch<SetStateAction<any>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState(decryptData('user'));
    const [accessToken, setAccessToken] = useState(decryptData('access'));
    const [refreshToken, setRefreshToken] = useState(decryptData('refresh'));

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    };

    return (
        <AuthContext.Provider
            value={{ user, accessToken, refreshToken, setRefreshToken, logout, setUser, setAccessToken }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
