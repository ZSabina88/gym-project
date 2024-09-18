import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/DispatchHook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../shared/Buttons/Button";
import { UserPageValidationSchema } from "../../utils/ValidationsSchemas/validations";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { changeUserInfo } from "../../features/Users/SingleUser/SingleUserAction";
import SuccessDialog from "../../shared/Dialogs/SuccessDialog";
import ErrorDialog from "../../shared/Dialogs/ErrorDialog";
import { UserInfo } from "../../features/Users/SingleUser/SingleUserType";
import { useToggle } from "../../hooks/useToggle";
import { clientTargets, clientActivities } from "../../utils/targetactivity";

const UpdateUserinfoForm: React.FC<{ userInfo: UserInfo | null }> = ({
  userInfo,
}) => {
  const [isTextFieldFocused, setIsTextFieldFocused] = useState(false);
  const [isSelect1Focused, setIsSelect1Focused] = useState(false);
  const [isSelect2Focused, setIsSelect2Focused] = useState(false);

  const [isModalOpen, setIsModalOpen] = useToggle(false);

  const textFieldRef = useRef<HTMLInputElement>(null);
  const selectRef1 = useRef<HTMLSelectElement>(null);
  const selectRef2 = useRef<HTMLSelectElement>(null);

  const { error, loading } = useAppSelector((state) => state.changeUserInfo);
  const dispatch = useAppDispatch();

  const handleSubmit = (values: UserInfo) => {
    dispatch(changeUserInfo(values)).then(() => {
      setIsModalOpen();
    });
  };

  const handleBlur = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(false);
  };

  const handleFocus = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(true);
  };

  const handleModalClose = () => {
    setIsModalOpen();
    window.location.reload();
  };

  return (
    <>
      <div className="mt-16">
        <Formik
          initialValues={{
            name: userInfo?.name || "",
            target: userInfo?.target || "",
            activity: userInfo?.activity || "",
          }}
          validationSchema={UserPageValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form>
              <div className="mb-4">
                <Field
                  as={TextField}
                  name="name"
                  label={isTextFieldFocused ? "Your Name" : userInfo?.name}
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
                  onFocus={() => handleFocus(setIsTextFieldFocused)}
                  onBlur={() => handleBlur(setIsTextFieldFocused)}
                  inputRef={textFieldRef}
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
                    "& .MuiOutlinedInput-notchedOutline legend span": {
                      paddingRight: "0px",
                      marginRight: "4.5ch",
                    },
                    "& .MuiFormLabel-root span": {
                      display: "none",
                    },
                  }}
                >
                  <InputLabel>
                    {isSelect1Focused ? "Your Target" : userInfo?.target}
                  </InputLabel>
                  <Field
                    as={Select}
                    name="target"
                    label="Target"
                    onFocus={() => handleFocus(setIsSelect1Focused)}
                    onBlur={() => handleBlur(setIsSelect1Focused)}
                    inputRef={selectRef1}
                    sx={{
                      "& .MuiSelect-select": {
                        textAlign: "left",
                      },
                    }}
                  >
                    {clientTargets.map((target) => (
                      <MenuItem key={target.id} value={target.value}>
                        {target.target}
                      </MenuItem>
                    ))}
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
                    "& .MuiOutlinedInput-notchedOutline legend span": {
                      paddingRight: "0px",
                      marginRight: "-3.5ch",
                    },
                    "& .MuiFormLabel-root span": {
                      display: "none",
                    },
                  }}
                >
                  <InputLabel>
                    {isSelect2Focused ? "Your Activity" : userInfo?.activity}
                  </InputLabel>
                  <Field
                    as={Select}
                    name="activity"
                    label="Preferred Activity"
                    onFocus={() => handleFocus(setIsSelect2Focused)}
                    onBlur={() => handleBlur(setIsSelect2Focused)}
                    inputRef={selectRef2}
                    sx={{
                      "& .MuiSelect-select": {
                        textAlign: "left",
                      },
                    }}
                  >
                    {clientActivities.map((activity) => (
                      <MenuItem key={activity.id} value={activity.value}>
                        {activity.activity}
                      </MenuItem>
                    ))}
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
                  className={`w-[160px] mt-8 px-6 py-3 rounded-lg text-black cursor-pointer transition-all duration-300 bg-customGreen animate-bg-success ${
                    loading ? "bg-blue-500 animate-scale-up" : ""
                  }`}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {!error && !loading && (
        <SuccessDialog
          openModal={isModalOpen}
          handleCloseModal={handleModalClose}
          title="Success!"
          message="Your information has been updated successfully."
        />
      )}
      {error && (
        <ErrorDialog
          message={error}
          openErrorModal={isModalOpen}
          handleCloseErrorModal={setIsModalOpen}
        />
      )}
    </>
  );
};

export default UpdateUserinfoForm;
