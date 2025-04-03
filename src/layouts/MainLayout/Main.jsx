import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
//import NavbarModerator from "../../components/Navbar.Moderator";
// import "./Main.css";

const Main = () => {
  return (
    <div>
      <Navbar />
      {/* <NavbarModerator /> */}
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
