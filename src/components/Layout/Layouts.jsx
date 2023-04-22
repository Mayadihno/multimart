import React from "react";
import Routers from "../../router/Routers";
import Footer from "../footer/Footer";
import Headers from "../Header/Headers";
import { useLocation } from "react-router-dom";
import AdminNav from "../../Admin/AdminNav";

const Layouts = () => {
  const location = useLocation();
  return (
    <React.Fragment>
      {location.pathname.startsWith("/dashboard") ? <AdminNav /> : <Headers />}
      <div>
        <Routers />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Layouts;
