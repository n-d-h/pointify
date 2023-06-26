import { useContext, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { LoginContext } from "../../context/LoginProvider";
import storageService from "../../apis/storage";
import jwtDecode from "jwt-decode";


function Protected({ children }) {

    const { setIsLogin, setId } = useContext(LoginContext);

    useEffect(() => {
        var token = storageService.getAccessToken();
        // const tokenDecode = jwtDecode(token);
        // console.log(convertTimestampToDate(tokenDecode.exp));
        if (token) {
            const tokenDecode = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000);
            // const currentTime = new Date();
            if (currentTime > tokenDecode.exp) {
                storageService.removeAccessToken();
                setIsLogin(false);
                <Link to="/sign-in" />;
            }
            else {
                setIsLogin(true);
                token = jwtDecode(token);
                console.log(token);
                // setId(id);
            }
        } else {
            setIsLogin(false);
            <Link to="/sign-in" />;
        }
    }, [])
    return children;
}

export default Protected;

