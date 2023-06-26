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
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {

  // const { setIsLogin, setId } = useContext(LoginContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   var token = storageService.getAccessToken();
  //   // const tokenDecode = jwtDecode(token);
  //   // console.log(convertTimestampToDate(tokenDecode.exp));
  //   if (token) {
  //     const tokenDecode = jwtDecode(token);
  //     const currentTime = Math.floor(Date.now() / 1000);
  //     // const currentTime = new Date();
  //     if (currentTime > tokenDecode.exp) {
  //       storageService.removeAccessToken();
  //       setIsLogin(false);
  //       navigate('/sign-in');
  //     }
  //     else {
  //       setIsLogin(true);
  //       token = jwtDecode(token);
  //       console.log(token);
  //       // setId(id);
  //     }
  //   } else {
  //     setIsLogin(false);
  //     navigate('/sign-in');
  //   }
  // }, [])


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
