import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Icon.png";
import profileIMG from "../../assets/profile.svg";
import notifIMG from "../../assets/notification.svg";
import settingIMG from "../../assets/Settings.svg";

const Header: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdownVisibility = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  const handleLogout = () => {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="text-black py-4 px-10 w-full relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full">
          <div className="text-2xl font-bold flex">
            <img src={Logo} alt="EnergyX Logo" />
            <span className="ml-4 text-black">EnergyX</span>
          </div>
          <nav className="flex gap-5 ml-24">
            <Link
              to="/workouts"
              className="text-black text-lg no-underline hover:underline hover:decoration-customGreen hover:underline-offset-8"
            >
              Workouts
            </Link>
            <Link
              to="/coaches"
              className="text-black text-lg no-underline hover:underline hover:decoration-customGreen hover:underline-offset-8"
            >
              Coaches
            </Link>
            <Link
              to="/admin"
              className="text-black text-lg no-underline hover:underline hover:decoration-customGreen hover:underline-offset-8"
            >
              Admin
            </Link>
          </nav>
        </div>
        <div className="flex gap-4">
          <Link to="/user">
            <img
              src={notifIMG}
              alt="Notification"
              className="w-[25px] h-[25px]"
            />
          </Link>
          <div
            onClick={toggleDropdownVisibility}
            className="relative cursor-pointer"
          >
            <img src={profileIMG} alt="Profile" className="w-[25px] h-[25px]" />
            {isDropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute w-[220px] right-0 mt-2 rounded border border-gray-300 p-5 bg-white z-50"
              >
                <p>name</p>
                <p>email</p>
                <div className="mt-12 flex">
                  <img src={settingIMG} className="mt-4" alt="Settings Icon" />
                  <Link to="/user" className="ml-4 flex flex-col text-start">
                    <span>My Account</span>
                    <span>Edit account profile</span>
                  </Link>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-[150px] py-2 bg-white mt-6 text-l text-black border border-black rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
