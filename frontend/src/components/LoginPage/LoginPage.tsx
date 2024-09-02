import React, { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./Signup/Signup";
import loginPageBack from "../../assets/login.png"

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(() => {
    const savedState = localStorage.getItem("isLogin");
    return savedState ? JSON.parse(savedState) : true;
  });

  const toggleForm = () => {
    const newState = !isLogin;
    setIsLogin(newState);
    localStorage.setItem("isLogin", JSON.stringify(newState));
  };

  return (
    <div className="h-screen w-full px-6 md:px-12 lg:pr-24 py-16 flex flex-col md:flex-row items-center justify-center">
      <div className="flex items-center justify-center">
        {isLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <SignUp toggleForm={toggleForm} />
        )}
      </div>

      <div className="relative hidden md:block ml-36 max-w-lg  mt-8 md:mt-0">
        <img
          src={loginPageBack}
          alt="Background"
          className="w-full h-auto object-cover max-h-[80vh] mx-auto"
        />
        <div className="absolute inset-0 flex items-end justify-center mb-12 px-4">
          <span className="text-white text-lg md:text-xl lg:text-2xl font-medium shadow-md text-center md:text-left">
            “The path to triumph is paved with
            <br />
            the
            <span className="text-customGreen">strength to train hard</span> and
            the perseverance to
            <span className="text-customGreen">
              rise each time
              <br />
              you fall
            </span>
            .”
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
