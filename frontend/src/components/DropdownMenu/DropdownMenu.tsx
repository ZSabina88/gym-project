import { useAppDispatch, useAppSelector } from "../../hooks/DispatchHook";
import { useNavigate, Link } from "react-router-dom";
import settingIMG from "../../assets/Settings.svg";
import { logout } from "../../features/Auth/AuthSLice";

interface MenuProp {
  dropdownRef: React.RefObject<HTMLElement>
}

const DropdownMenu: React.FC<MenuProp> = ({ dropdownRef }) => {

  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(logout());
      navigate("/");
    }
  };
  return (
    <menu
      ref={dropdownRef}
      className="absolute w-[220px] right-0 mt-2 rounded border border-gray-300 p-5 bg-white z-50"
    >
      <div className="flex flex-col justify-center ml-8 text-center">
        {user ? <p className="font-semibold">{user.name}</p> : <p>User name</p>}
        {user ? <p>{user.email}</p> : <p>User email</p>}
      </div>
      <div className="mt-12 flex">
        <img src={settingIMG} className="mt-4" alt="Settings Icon" />
        <Link to="/user" className="ml-4 flex flex-col text-start">
          <span className="py-1">My Account</span>
          <span>Edit account profile</span>
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="w-[150px] py-2 bg-white mt-6 text-l text-black border border-black rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-600"
      >
        Logout
      </button>
    </menu>
  );
}

export default DropdownMenu;
