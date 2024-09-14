import { useEffect, useState } from "react";
import { TextField, CircularProgress } from "@mui/material";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../../../shared/Buttons/button";
import { useAppDispatch, useAppSelector } from "../../../hooks/authHooks";
import { useNavigate } from "react-router-dom";
import { AuthFormProps } from "../types";
import { userLogin } from "../../../features/Auth/AuthActions";
import { loginValidationSchema } from "../../../shared/ValidationsSchemas/validations";
import ErrorDialog from "../../../shared/Dialogs/ErrorDialog";
import { LoginPayload } from "../../../features/Auth/AuthTypes";
import LoginToggleLink from "../../../shared/LoginToggleLink/LoginToggleLink";

const Login: React.FC<AuthFormProps> = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, userToken } = useAppSelector((state) => state.login);

  useEffect(() => {
    if (userToken) {
      navigate("/user");
    }
  }, [navigate, userToken]);

  const handleLogin = async (
    values: LoginPayload,
    { resetForm }: { resetForm: FormikHelpers<LoginPayload>["resetForm"] }
  ) => {
    try {
      await dispatch(userLogin(values)).unwrap();
      resetForm();
    } catch (err) {
      setOpenErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, errors }) => (
          <Form>
            <div className="mb-6 w-[350px] md:w-[440px] flex flex-start">
              <p className="font-light text-customGray">Welcome Back</p>
            </div>
            <h2 className="mb-6 font-medium flex flex-start text-2xl">
              Log In to Your Account
            </h2>
            <div></div>
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
            {loading && (
              <div className="flex justify-center">
                <CircularProgress sx={{ color: "#9EF300" }} />
              </div>
            )}
            <div className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                children={isSubmitting ? "Logging in..." : "Log in"}
                className="rounded-lg w-full bg-customGreen py-3 mb-6 text-black hover:bg-green-300"
              ></Button>
            </div>
            <LoginToggleLink
              text="Don’t have an Account?"
              linkText="CREATE NEW ACCOUNT"
              onClick={toggleForm ?? (() => { })}
            />
          </Form>
        )}
      </Formik>

      {/* Error Modal */}
      <ErrorDialog
        message="Invalid email or password. Please try again."
        openErrorModal={openErrorModal}
        handleCloseErrorModal={handleCloseErrorModal}
      />
    </>
  );
};

export default Login;
