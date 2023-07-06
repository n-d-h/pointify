import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Partners from "./pages/Partners";
import Customers from "./pages/Customers";
import MemberShips from "./pages/Memberships";
import Programs from "./pages/Programs";
// import Level from "./pages/Level";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import { useContext, useEffect } from "react";
import { LoginContext } from "./context/LoginProvider";
import storageService from "./apis/storage";
import jwtDecode from "jwt-decode";
import adminApi from "./apis/adminApi";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {

  const { setIsLogin, setAdmin, admin } = useContext(LoginContext);

  const fetchAdminInfo = async () => {
    console.log('fetchAdminInfo');
    try {
      await adminApi.getProfile()
        .then((res) => {
          setAdmin(res.data);
        })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let token = storageService.getAccessToken();
    if (token) {
      const tokenDecode = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > tokenDecode.exp) {
        storageService.removeAccessToken();
        setIsLogin(false);
        setAdmin(null);
      }
      else {
        setIsLogin(true);
        console.log('app.js');
        console.log(token);
        // call api get admin info
        fetchAdminInfo();
      }
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/sign-up" exact element={<SignUp />} />
          <Route path="/sign-in" exact element={<SignIn />} />
          <Route path="*" exact element={<Main />} >
            <Route path="dashboard" index element={<Home />} />
            <Route path="partners" element={<Partners />} />
            <Route path="customers" element={<Customers />} />
            <Route path="memberships" element={<MemberShips />} />
            <Route path="programs" element={<Programs />} />
            {/* <Route path="level" element={<Level />} /> */}
            <Route path="about" element={<About />} />
            {/* <Route path="profile" element={<Profile />} /> */}
            <Route path="/*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
