import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../../assets/Icon.png";
import profileIMG from "../../assets/profile.svg";
import notifIMG from "../../assets/notification.svg";
import settingIMG from "../../assets/Settings.svg";
import CloseIcon from "@mui/icons-material/Close";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { logout } from "../../features/Auth/AuthSLice";
import { useAppDispatch } from "../../hooks/authHooks";
import { useNavigate } from "react-router-dom";

interface JwtPayloadType extends JwtPayload {
  "cognito:groups"?: string[];
  email?: string;
}

const Header: React.FC = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //route start
  const [roleState, setRoleState] = useState<string | undefined>("");
  const [userMail, setUserMail] = useState<string | undefined>("");
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    if (token) {
      const decodedData = jwtDecode<JwtPayloadType>(token);
      const role = decodedData["cognito:groups"]?.[0];
      const userEmail = decodedData.email;
      setRoleState(role);
      setUserMail(userEmail);
    }
  }, []);

  //route end

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdownVisibility = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(logout());
      navigate("/");
    }
  };

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

  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 15,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
  };

  const links = [
    { title: "Workouts", url: "/workouts" },
    { title: "Coaches", url: "/coaches" },
  ];

  return (
    <header className="text-black py-4 px-10 w-full relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-full">
          <div className="text-2xl font-bold flex">
            <img src={Logo} alt="EnergyX Logo" className="w-10" />
            <span className="ml-4 text-black hidden md:inline">EnergyX</span>
          </div>
          <nav className="hidden sm:flex gap-5 ml-24">
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
            {roleState?.includes("ADMINGroup") && (
              <Link
                to="/admin"
                className="text-black text-lg no-underline hover:underline hover:decoration-customGreen hover:underline-offset-8"
              >
                Admin
              </Link>
            )}
          </nav>
        </div>
        <div className="flex gap-4">
          <Link to="/user">
            <img
              src={notifIMG}
              alt="Notification"
              className="w-[45px] h-[25px]"
            />
          </Link>
          <div
            onClick={toggleDropdownVisibility}
            className="relative cursor-pointer"
          >
            <img src={profileIMG} alt="Profile" className="w-[45px] h-[25px]" />
            {isDropdownVisible && (
              <div
                ref={dropdownRef}
                className="absolute w-[220px] right-0 mt-2 rounded border border-gray-300 p-5 bg-white z-50"
              >
                <p>name</p>
                {userMail ? (
                  <p className="break-all text-ellipsis max-w-[200px] overflow-hidden">
                    {userMail}
                  </p>
                ) : (
                  <p>email</p>
                )}
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
          {/* Mobile Menu Button */}
          <button className="sm:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <FaTimes className="text-2xl font-light" />
            ) : (
              <FaBars className="text-2xl " />
            )}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          className="absolute  top-0 left-0 w-screen h-screen bg-white z-40 flex flex-col items-center justify-center"
          variants={menuVariants}
          style={{ backgroundColor: "#9EF300" }}
          initial="closed"
          animate="opened"
        >
          <div className="absolute right-5 top-5">
            <CloseIcon
              fontSize="large"
              sx={{
                color: "black",
                fontSize: "60px",
              }}
              onClick={toggleMenu}
            />
          </div>
          <nav className="flex flex-col items-center gap-8 text-lg">
            {links.map((link, index) => (
              <motion.div
                key={link.title}
                variants={linkVariants}
                custom={index}
                initial="hidden"
                animate="visible"
                className="mt-16"
              >
                <Link
                  to={link.url}
                  onClick={toggleMenu}
                  className="text-black text-4xl no-underline hover:underline hover:decoration-customGreen hover:underline-offset-8"
                >
                  {link.title}
                </Link>
              </motion.div>
            ))}

            {roleState?.includes("ADMINGroup") && (
              <motion.div
                variants={linkVariants}
                custom={links.length}
                initial="hidden"
                animate="visible"
                className="mt-16"
              >
                <Link
                  to="/admin"
                  onClick={toggleMenu}
                  className="text-black text-4xl no-underline hover:underline hover:decoration-customGreen hover:underline-offset-8"
                >
                  Admin
                </Link>
              </motion.div>
            )}

            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <img src={Logo} alt="EnergyX Logo" className="w-16 mt-16" />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
