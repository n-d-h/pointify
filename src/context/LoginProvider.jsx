import { createContext, useState } from "react"

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [admin, setAdmin] = useState(null);    

    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin, admin, setAdmin }} >
            {children}
        </LoginContext.Provider>
    )
}

export {LoginContext, LoginProvider}


