import { useState } from "react";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../../../shared/Buttons/button";
import { AuthFormProps } from "../types";
import { useAppDispatch, useAppSelector } from "../../../hooks/authHooks";
import { userSignup } from "../../../features/Auth/AuthActions";
import { signupValidationSchema } from "../../../shared/ValidationsSchemas/validations";
import SuccessDialog from "../../../shared/Dialogs/SuccessDialog";

const SignUp: React.FC<AuthFormProps> = ({ toggleForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.signup);

  const handleSignUp = (values: any) => {
    dispatch(userSignup(values));
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (toggleForm) {
      toggleForm();
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          target: "",
          activity: "",
        }}
        validationSchema={signupValidationSchema}
        onSubmit={handleSignUp}
      >
        {({ values, isSubmitting, errors, handleChange }) => (
          <Form>
            <div className="mb-6 w-[350px] md:w-[440px] flex flex-start">
              <p className="font-light text-customGray">Welcome!</p>
            </div>
            <h2 className="mb-6 font-medium flex flex-start text-2xl">
              Create Your Account
            </h2>
            <div>
              <Field
                as={TextField}
                name="name"
                label="Your Name"
                value={values.name}
                onChange={handleChange}
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
            <Field
              as={TextField}
              name="email"
              label="Email"
              value={values.email}
              onChange={handleChange}
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
              value={values.password}
              onChange={handleChange}
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
            <div>
              <FormControl fullWidth style={{ marginBottom: "24px" }}>
                <InputLabel>Target</InputLabel>
                <Field
                  as={Select}
                  name="target"
                  onChange={handleChange}
                  label="Target"
                  value={values.target}
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

              <FormControl fullWidth style={{ marginBottom: "24px" }}>
                <InputLabel>Preferred Activity</InputLabel>
                <Field
                  as={Select}
                  name="activity"
                  value={values.activity}
                  onChange={handleChange}
                  label="Preferred Activity"
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
            {(error as string | null) && (
              <p className="mb-4 text-red-600">{error as React.ReactNode}</p>
            )}
            {loading && <p className="mb-4 text-blue-600">Loading</p>}
            <div className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                children={isSubmitting ? "Signing up..." : "Sign up"}
                className="rounded-lg w-full bg-customGreen py-3 mb-6 text-black hover:bg-green-300"
              />
            </div>

            <h2 className="mb-6">
              Already have an Account?{" "}
              <a
                href="#"
                onClick={toggleForm}
                className="text-black font-bold underline cursor-pointer"
              >
                LOG IN
              </a>
            </h2>
          </Form>
        )}
      </Formik>

      <SuccessDialog
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        title="Congratulations!"
        message="You have successfully signed up. "
        message2="Now you can log in to your account."
      />
    </>
  );
};

export default SignUp;
