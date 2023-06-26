import { createContext, useState } from "react"

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    

    return (
        <LoginContext.Provider value={{ isLogin, setIsLogin, id, setId, username, setUsername }} >
            {children}
        </LoginContext.Provider>
    )
}

export {LoginContext, LoginProvider}


