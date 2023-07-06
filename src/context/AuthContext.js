import { useContext, createContext, useEffect, useState, useLayoutEffect } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "../config/firebase";
import { LoginContext } from "./LoginProvider"; // t
import authenApi from "../apis/authenApi"; // t
import storageService from "../apis/storage"; // t

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const { isLogin, setIsLogin, admin, setAdmin } = useContext(LoginContext); // t

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .catch((error) => {
                if (error.code === 'auth/popup-closed-by-user') {
                    // Handle the case when the user closes the popup
                    setError(error);
                    // Show an error message or provide feedback to the user
                    console.log('Authentication popup closed by the user.');
                } else {
                    // Handle other authentication errors
                    console.log('Error:', error);
                }
            });
    };

    const logout = () => {
        signOut(auth).then(() => {
            // storageService.removeAccessToken();
            setUser(null);
            // setIsLogin(false);
            // setAdmin(null);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setUser(user);
            } else {
                console.log("No user is signed in.");
            }

            return () => {
                unsubscribe();
            }
        })
    }, []);

    return (
        <AuthContext.Provider value={{ googleSignIn, logout, user, error, setError }}>
            {children}
        </AuthContext.Provider>
    );
}

// export const UserAuth = () => {
//     return useContext(AuthContext);
// }
export { AuthContext, AuthContextProvider };

// .then((result) => {
            //     const credential = GoogleAuthProvider.credentialFromResult(result);
            //     const token = credential.accessToken;
            //     const user = result.user;
            //     console.log(user);
            // }).catch((error) => {
            //     const errorCode = error.code;
            //     const errorMessage = error.message;
            //     const email = error.email;
            //     const credential = GoogleAuthProvider.credentialFromError(error);
            //     console.log(errorCode, errorMessage, email, credential);
            // });