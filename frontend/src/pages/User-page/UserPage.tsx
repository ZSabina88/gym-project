

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from "../../shared/Buttons/button";
import profilePic from "../../assets/profile.svg";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/Auth/AuthSLice";
import { fetchUser } from "../../features/Users/SingleUserSLice";
// import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
// import { useUserById } from "../../hooks/useUserById";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  target: Yup.string().required("Required"),
  activity: Yup.string().required("Required"),
});

const UserPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userToken } = useAppSelector((state) => state.login);
  const { user, loading, error } = useAppSelector((state) => state.user);
  console.log(user);



  // const userIdFromToken = getUserIdFromToken();
  // const user = useUserById(userIdFromToken || "");
  // const user = users.find((user) => user.id === userIdFromToken);
  // console.log(user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);


  const handleSubmit = (values: {
    name: string;
    target: string;
    activity: string;
  }) => {
    console.log("User data updated", values);
  };

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
    <div className="flex flex-col sm:flex-row p-4 w-full">
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
          
          {/* {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {user.length > 0 ?
            user.map((item) => (
              <div className="ml-5 pt-1" key={item.id}>
                <p>{item.name}</p>
                <p>{item.email}</p>
              </div>
            )) :
            <div className="ml-5 pt-1">
              <p>User name</p>
              <p>User email</p>
            </div>
          } */}
          {/* <div className="ml-5 pt-1"> */}
          {/* {user ? <p>{user.name}</p> : <p>User name</p>}
            {user ? <p>{user.email}</p> : <p>User email</p>} */}
          {/* </div> */}
        </div>
        <div className="mt-16">
          <Formik
            initialValues={{ name: "", target: "", activity: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors }) => (
              <Form>
                <div className="mb-4">
                  <Field
                    as={TextField}
                    name="name"
                    label="Your Name"
                    variant="outlined"
                    fullWidth
                    autoComplete="off"
                    helperText={<ErrorMessage name="name" />}
                    error={Boolean(errors.name)}
                    style={{ marginBottom: "24px" }}
                    InputLabelProps={{ style: { color: "black" } }}
                    sx={{
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#9EF300",
                      },
                    }}
                  />
                </div>

                <div className="mb-4">
                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "black",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#9EF300",
                      },
                    }}
                  >
                    <InputLabel>Your Target</InputLabel>
                    <Field
                      as={Select}
                      name="target"
                      label="Target"
                      sx={{
                        "& .MuiSelect-select": {
                          textAlign: "left",
                        },
                      }}
                    >
                      <MenuItem value="lose_weight">Lose Weight</MenuItem>
                      <MenuItem value="gain_weight">Gain Weight</MenuItem>
                    </Field>
                    <ErrorMessage
                      name="target"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </FormControl>
                </div>

                <div className="mb-4 mt-8">
                  <FormControl
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "black",
                      },
                      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: "#9EF300",
                      },
                    }}
                  >
                    <InputLabel>Preferred Activity</InputLabel>
                    <Field
                      as={Select}
                      name="activity"
                      label="Preferred Activity"
                      sx={{
                        "& .MuiSelect-select": {
                          textAlign: "left",
                        },
                      }}
                    >
                      <MenuItem value="gym">Gym</MenuItem>
                      <MenuItem value="yoga">Yoga</MenuItem>
                      <MenuItem value="cycling">Cycling</MenuItem>
                    </Field>
                    <ErrorMessage
                      name="activity"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </FormControl>
                </div>

                <div className="flex justify-end w-full">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-customGreen mt-8 text-black px-6 py-3 rounded-lg cursor-pointer transition-colors duration-300 hover:bg-green-700"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserPage;