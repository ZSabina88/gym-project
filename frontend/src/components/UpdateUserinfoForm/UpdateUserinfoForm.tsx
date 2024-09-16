// import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/authHooks";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Button from "../../shared/Buttons/button";
import { UserPageValidationSchema } from "../../shared/ValidationsSchemas/validations";
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

const UpdateUserinfoForm: React.FC = () => {
    // const [saving, setSaving] = useState(false);
    // const [success, setSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useToggle(false);

    const { error, loading } = useAppSelector((state) => state.changeUserInfo);
    const dispatch = useAppDispatch();


    const handleSubmit = (values: UserInfo) => {
        dispatch(changeUserInfo(values))
            .then(() => {
                setIsModalOpen();
            })
    };

    // const handleSubmit = (values: UserInfo) => {
    //     setSaving(true);
    //     dispatch(changeUserInfo(values))
    //         .then(() => {
    //             setSuccess(true);
    //             setIsModalOpen();
    //         })
    //         .finally(() => {
    //             setSaving(false);
    //             setTimeout(() => setSuccess(false), 2000);
    //         });
    // };

    const handleModalClose = () => {
        setIsModalOpen();
        window.location.reload();
    };

    return (
        <>
            <div className="mt-16">
                <Formik
                    initialValues={{ name: "", target: "", activity: "" }}
                    validationSchema={UserPageValidationSchema}
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
                                        {clientTargets.map((target) => (
                                            <MenuItem key={target.id} value={target.value}>{target.target}</MenuItem>
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
                                        {clientActivities.map((target) => (
                                            <MenuItem key={target.id} value={target.value}>{target.target}</MenuItem>
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
                                    className={`w-[160px] mt-8 px-6 py-3 rounded-lg text-black cursor-pointer transition-all duration-300 bg-green-500 animate-bg-success ${loading
                                        && "bg-blue-500 animate-scale-up"
                                        }`}
                                // className={`w-[160px] mt-8 px-6 py-3 rounded-lg text-black cursor-pointer transition-all duration-300 ${saving
                                //     ? "bg-blue-500 animate-scale-up"
                                //     : success
                                //         ? "bg-green-500 animate-bg-success"
                                //         : "bg-customGreen hover:bg-green-700"
                                //     }`}
                                >
                                    {/* {saving ? "Saving..." : success ? "Saved!" : "Save Changes"} */}
                                    {loading ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <SuccessDialog
                openModal={isModalOpen}
                handleCloseModal={handleModalClose}
                title="Success!"
                message="Your information has been updated successfully."
            />
            {error &&
                <ErrorDialog
                    message={error}
                    openErrorModal={isModalOpen}
                    handleCloseErrorModal={setIsModalOpen}
                />
            }
        </>
    );
}

export default UpdateUserinfoForm;
