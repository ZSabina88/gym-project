import { useEffect } from "react";
import profilePic from "../../assets/profile.svg";
import { useAppDispatch, useAppSelector } from "../../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/Auth/AuthSLice";
import { fetchUser } from "../../features/Users/SingleUser/SingleUserAction";
import UpdateUserinfoForm from "../../components/UpdateUserinfoForm/UpdateUserinfoForm";


const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.login);
  const { user, error } = useAppSelector((state) => state.user);


  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const userInfo = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Target", value: user?.target },
    { label: "Activity", value: user?.activity },
  ];

  useEffect(() => {
    if (!userToken) {
      navigate("/");
    }
  }, [userToken, navigate]);

  const handleLogout = () => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch(logout());
      navigate("/");
    }
  };

  return (
    <section className="flex flex-col sm:flex-row p-4 w-full">
      <div className="w-full p-4 flex flex-col items-center sm:w-1/4 sm:items-start">
        <h2 className="text-xl text-start font-semibold mb-4 border-l-4 border-customGreen px-4 py-6">
          General Information
        </h2>
        <button
          onClick={handleLogout}
          className="w-[120px] bg-white mt-6 text-xl text-black px-4 py-4 border border-black rounded-lg cursor-pointer transition-colors duration-300 hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="w-full p-4 flex flex-col items-center sm:w-1/2 sm:max-w-[700px] sm:items-start sm:block p-4">
        <div className="flex items-center">
          <div className="w-16 h-16">
            <img
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col justify-center ml-8">
            {userInfo.map((info, index) => (
              <p key={index} className="px-2 py-1">
                {info.label}:&emsp;{info.value && info.value}
              </p>
            ))}
          </div>
        </div>
      <UpdateUserinfoForm />
      </div >
    </section>
  );
};

export default UserPage;
