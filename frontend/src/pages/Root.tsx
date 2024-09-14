import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/header/header";
import SubHeader from "../components/subHeader/subHeader";

const RootLayout: React.FC = () => {
  const location = useLocation();
  const noHeaderRoutes = ["/", "/register"];

  const getSubHeaderText = () => {
    if (location.pathname.includes("/user")) {
      return "My Account";
    } else if (location.pathname.includes("/coaches")) {
      return "Coaches";
    } else if (location.pathname.includes("/admin")) {
      return "Admin";
    } else if (location.pathname.includes("/workouts")) {
      return `Hello,`;
    }
    return "";
  };

  return (
    <div className="root-layout">
      {!noHeaderRoutes.includes(location.pathname) && (
        <div>
          <Header />
          <SubHeader text={getSubHeaderText()} />
        </div>
      )}
      <main className="root-layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
