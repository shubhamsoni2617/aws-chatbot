import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Input from "../../components/LoginComponents/Input";
import Button from "../../components/LoginComponents/Button";
import FormGroup from "../../components/LoginComponents/FormGroup";

// import { resetPassword } from '../../Actions/auth.actions';

import "./ResetPassword.css";
import AuthLayout from "@/components/LoginComponents/AuthLayout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { resetPassword } from "@/store/actions";
import Notification from "@/components/Notification";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  reset_code: Yup.number().required("Reset code is required"),
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

const ResetPassword: React.FC = () => {
  type NotificationType = "success" | "info" | "warning" | "error";
  const navigate = useNavigate();

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const dispatch = useAppDispatch();
  const { isLoadingResetPassword } = useAppSelector(
    (store) => store.resetPassword
  );

  const handelResetPassword = (values: any) => {
    const payload = new FormData();
    payload.append("email", values.email);
    payload.append("reset_token", values.reset_code);
    payload.append("password", values.new_password);
    payload.append("password_confirmation", values.confirm_password);

    dispatch(resetPassword(payload))
      .unwrap()
      .then((res) => {
        // setNotificationProps({
        //     visible: true,
        //     type:  res?.error ? "warning" : "success",
        //     title: res?.status,
        //     message: res?.message,
        //   });
        toast.success(res?.message);

        if (!res?.error) {
          navigate("/login"); // Navigate to the desired route
        }

        console.log(res);
      });
  };

  return (
    <AuthLayout heading="Reset Password">
      <div className="reset-password-wrapper">
        <Formik
          initialValues={{
            email: "",
            reset_code: "",
            new_password: "",
            confirm_password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handelResetPassword(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="styled-form">
              <FormGroup>
                <Field
                  id="email"
                  name="email"
                  render={({ field }: any) => (
                    <Input
                      id="email"
                      name="email"
                      placeholder="Enter Email Address"
                      type="email"
                      className={`form-control ${
                        errors.email && touched.email ? "is-invalid" : ""
                      }`}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>
              <FormGroup>
                <Field
                  id="reset_code"
                  name="reset_code"
                  render={({ field }: any) => (
                    <Input
                      id="reset_code"
                      name="reset_code"
                      placeholder="Reset Code"
                      className={`form-control ${
                        errors.reset_code && touched.reset_code
                          ? "is-invalid"
                          : ""
                      }`}
                      {...field}
                    />
                  )}
                />
                <ErrorMessage
                  name="reset_code"
                  component="div"
                  className="invalid-feedback"
                />
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
              {/* {showResponse && <div className="response-message">{showResponse}</div>} */}
              <Button
                loading={isLoadingResetPassword}
                type="primary"
                htmlType="submit"
                className="rounded-full bg-[#c847e8] text-white w-[100%] no-hover text-[16px] font-[500] mt-[20px] pt-[10] pb-[10px] pl-[24px] pr-[24px]"
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>

        <Notification
          {...notificationProps}
          onClose={() =>
            setNotificationProps({ ...notificationProps, visible: false })
          }
        />

        {/* <div className="login-link">
          <div>Know your password?</div>
          <Link to="/">
            <b className="login-link-text">Login Here</b>
          </Link>
        </div> */}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
