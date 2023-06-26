import { useState, useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

// import { useContext, useEffect } from "react";
// import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LoginContext } from "../../context/LoginProvider";
import storageService from "../../apis/storage";
import jwtDecode from "jwt-decode";
import authenApi from "../../apis/authenApi";

const { Header: AntHeader, Content, Sider } = Layout;

function Main() {

  const { isLogin, setIsLogin, setId, setUsername } = useContext(LoginContext);
  const { googleSignIn, logout, user, error, setError } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    var token = storageService.getAccessToken();
    // const tokenDecode = jwtDecode(token);
    // console.log(convertTimestampToDate(tokenDecode.exp));
    if (token !== null) {
      const tokenDecode = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      // const currentTime = new Date();
      if (currentTime > tokenDecode.exp) {
        storageService.removeAccessToken();
        setIsLogin(false);
        if (user.name) {
          handleSignOut();
        }
        navigate('/sign-in');
      }
      else {
        setIsLogin(true);
        console.log('helo');
        // token = jwtDecode(token);
        // console.log(token);
      //   authenApi.signIn(user.email).then((res) => {
      //     // console.log(res);
      //     if (res.data.adminDTO !== null && res.data.partnerDTO === null){
      //         setId(res.data.adminDTO.id);
      //         setUsername(res.data.adminDTO.userName);
      //         console.log(res.data.adminDTO.id);
      //         navigate('/dashboard');
      //     } else {
      //       navigate('/sign-in');
      //     }
      // }
      // ).catch((error) => {
      //     console.log(error);
      // });
      }
    } else {
      if (user.name) {
        handleSignOut();
      }
      setIsLogin(false);
      navigate('/sign-in');
    }
  }, [isLogin, user.name])


  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("white");
  const [fixed, setFixed] = useState(true);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""
        } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${pathname === "rtl" ? "drawer-sidebar-rtl" : ""
          } `}
      >
        <Layout
          className={`layout-dashboard ${pathname === "rtl" ? "layout-dashboard-rtl" : ""
            }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
              }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
          }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className="content-ant">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
