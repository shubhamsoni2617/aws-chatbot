import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "@/components/LoginComponents/Input";
import Button from "@/components/LoginComponents/Button";
import FormGroup from "@/components/LoginComponents/FormGroup";
import AuthLayout from "@/components/LoginComponents/AuthLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { changePassword } from "@/store/actions";
// import Notification from "@/components/Notification";
import { setLocalData } from "@/utils/localStorage";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  new_password: Yup.string()
    .matches(
      /^.*(?=.{7,})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 7 characters, one uppercase letter, and one number"
    )
    .required("New password is required"),
  confirm_password: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("new_password")], "Passwords don't match"),
});

const ChangePasswordNewUser: React.FC = () => {
  // type NotificationType = "success" | "info" | "warning" | "error";
  const navigate = useNavigate();

  // const [notificationProps, setNotificationProps] = useState({
  //   visible: false,
  //   type: "info" as NotificationType,
  //   title: "",
  //   message: "",
  // });

  const dispatch = useAppDispatch();
  const { isLoadingChangePassword } = useAppSelector(
    (store) => store.changePassword
  );
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const handleSkpiButton = () => {
    setLocalData('temp_password', {
        temp_password: 0,
      });
      window.location.reload();
  }

  const handleChangePassword = (values: any) => {
    const payload = new FormData();
    payload.append("current_password", values.current_password);
    payload.append("new_password", values.new_password);
    payload.append("new_password_confirmation", values.confirm_password);

    dispatch(changePassword(payload))
      .unwrap()
      .then((res) => {
        // setNotificationProps({
        //   visible: true,
        //   type: res?.error ? "warning" : "success",
        //   title: res?.status,
        //   message: res?.message,
        // });
        toast.success(res?.message);

        if (!res?.error) {
          handleLogout();
          //   navigate("/");
        }
      });
  };

  return (
    <AuthLayout heading="Change Password">
      <div className="reset-password-wrapper">
        <Formik
          initialValues={{
            // current_password: "",
            new_password: "",
            confirm_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleChangePassword(values)}
        >
          {({ errors, touched }) => (
            <Form className="styled-form">
              <FormGroup>
                <Field
                  id="current_password"
                  name="current_password"
                  render={({ field }: any) => (
                    <Input
                      id="current_password"
                      name="current_password"
                      placeholder="Current Password"
                      type="password"
                      className={`form-control`}
                      {...field}
                    />
                  )}
                />
                {/* <ErrorMessage
                  name="current_password"
                  component="div"
                  className="invalid-feedback"
                /> */}
              </FormGroup>
              <FormGroup>
                <Field
                  id="new_password"
                  name="new_password"
                  render={({ field }: any) => (
                    <Input
                      id="new_password"
                      name="new_password"
                      placeholder="New Password"
                      type="password"
                      className={`form-control ${
                        errors.new_password && touched.new_password
                          ? "is-invalid"
                          : ""
                      }`}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  name="new_password"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  id="confirm_password"
                  name="confirm_password"
                  render={({ field }: any) => (
                    <Input
                      id="confirm_password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      type="password"
                      className={`form-control ${
                        errors.confirm_password && touched.confirm_password
                          ? "is-invalid"
                          : ""
                      }`}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  name="confirm_password"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>
              <Button
                loading={isLoadingChangePassword}
                type="primary"
                htmlType="submit"
                className="rounded-full bg-[#c847e8] text-white w-[100%] no-hover text-[16px] font-[500] mt-[20px] pt-[10] pb-[10px] pl-[24px] pr-[24px]"
              >
                Change Password
              </Button>
              <Button
                loading={isLoadingChangePassword}
                type="primary"
                // htmlType="submit"
                onClick={handleSkpiButton}
                className="rounded-full bg-[#fff] text-[#c847e8] border-[#c847e8] w-[100%] text-[16px] font-[500] mt-[20px] pt-[10] pb-[10px] pl-[24px] pr-[24px]"
              >
                Skip
              </Button>
            </Form>
          )}
        </Formik>

        {/* <Notification
          {...notificationProps}
          onClose={() =>
            setNotificationProps({ ...notificationProps, visible: false })
          }
        /> */}
      </div>
    </AuthLayout>
  );
};

export default ChangePasswordNewUser;
