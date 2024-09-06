import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../../../shared/Buttons/button";
import { useAppDispatch, useAppSelector } from "../../../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import * as Yup from "yup";
import { AuthFormProps } from "../types";
import { userLogin } from "../../../features/Auth/AuthActions";

const Login: React.FC<AuthFormProps> = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, userToken } = useAppSelector((state) => state.login);

  useEffect(() => {
    if (userToken) {
      console.log("login success");
      navigate('/user')
    };
  }, [navigate, userToken]);

  const handleLogin = async (
    values: any,
    { resetForm }: { resetForm: FormikHelpers<any>["resetForm"] }
  ) => {
    try {
      await dispatch(userLogin(values)).unwrap();
      resetForm();
      navigate("/user");
    } catch (err) {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  // const decodedData = jwtDecode("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="mb-6 w-[350px] md:w-[440px] flex flex-start">
              <p className="font-light text-customGray ">Welcome Back</p>
            </div>
            <h2 className="mb-6 font-medium flex flex-start text-2xl">
              Log In to Your Account
            </h2>
            <div>
              {loginError && (
                <div className="mb-4 text-red-600 text-start">{loginError}</div>
              )}
              {loading && (
                <div className="mb-4 text-red-600 text-start">Loading...</div>
              )}
            </div>
            <Field
              as={TextField}
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              autoComplete="off"
              helperText={<ErrorMessage name="email" />}
              error={Boolean(errors.email)}
              style={{ marginBottom: "24px" }}
              InputLabelProps={{ style: { color: "black" } }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#9EF300",
                  },
              }}
            />
            <Field
              as={TextField}
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              variant="outlined"
              fullWidth
              autoComplete="off"
              helperText={<ErrorMessage name="password" />}
              error={Boolean(errors.password)}
              style={{ marginBottom: "24px" }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? (
                        <VisibilityOff sx={{ color: "black" }} />
                      ) : (
                        <Visibility sx={{ color: "black" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ style: { color: "black" } }}
              sx={{
                "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#9EF300",
                  },
              }}
            />
            {error as string | null && <p className="mb-4 text-red-600">{error as React.ReactNode}</p>}
            {loading && <p className="mb-4 text-red-600">Loading...</p>}
            <div className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                children={isSubmitting ? "Logging in..." : "Log in"}
                className="rounded-lg w-full bg-customGreen py-3 mb-6 text-black hover:bg-green-300"
              ></Button>
            </div>

            <h2 className="mb-6">
              Don’t have an Account?{" "}
              <a
                href="#"
                onClick={toggleForm}
                className="text-black font-bold underline cursor-pointer"
              >
                CREATE NEW ACCOUNT
              </a>
            </h2>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Login;
