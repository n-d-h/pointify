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
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [invalid, setInvalid] = useState(false); // t
    const { isLogin, setIsLogin, isLoggingIn, setIsLoggingIn, setId, username, setUsername } = useContext(LoginContext); // t

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
            setUser({});
            setIsLogin(false);
            storageService.removeAccessToken();
            setId(null);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user);
                setUser(user);
                console.log('authContext login: ', isLogin);
                console.log('authContext islogging in: ', isLoggingIn);
                if (!isLoggingIn) {
                    console.log("User is signed in but not logged in.");
                    // setIsLogin(false);
                } else {
                    console.log("User is signed in and logged in.");
                    // setIsLogin(true);
                    authenApi.signIn(user.email).then((res) => {
                        if (res.data.adminDTO !== null && res.data.partnerDTO === null) {
                            setIsLogin(true);
                            setId(res.data.adminDTO.id);
                            setUsername(res.data.adminDTO.userName);
                            setInvalid(false);
                            storageService.setAccessToken(res.data.token);
                        } else {
                            setIsLoggingIn(false);
                            setIsLogin(false);
                            setInvalid(true);
                            logout();
                        }
                    }
                    ).catch((error) => {
                        console.log(error);
                    });
                    // setId(user.uid);
                }

                if (isLogin) {
                    console.log("User is logged in.");
                    authenApi.signIn(user.email).then((res) => {
                        if (res.data.adminDTO !== null && res.data.partnerDTO === null) {
                            setId(res.data.adminDTO.id);
                            setUsername(res.data.adminDTO.userName);
                            console.log('name', username);
                        } else {
                            setIsLogin(false);
                            logout();
                        }
                    }
                    ).catch((error) => {
                        console.log(error);
                    });
                }
            } else {
                setIsLoggingIn(false);
                setIsLogin(false);
                console.log("No user is signed in.");
            }

            return () => {
                unsubscribe();
            }
        })
    }, [isLoggingIn, isLogin]);

    return (
        <AuthContext.Provider value={{ googleSignIn, logout, user, error, setError, invalid }}>
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