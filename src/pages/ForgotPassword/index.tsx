import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

// import api from '../../Util/api';

import Input from "../../components/LoginComponents/Input";

import FormGroup from "../../components/LoginComponents/FormGroup";

import "./ForgotPassword.css";
import AuthLayout from "@/components/LoginComponents/AuthLayout";
import { Button } from "antd";
import { forgotPassword } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Notification from "@/components/Notification";

const ForgottenPassword: React.FC = () => {
  //   const [showResponse, setShowResponse] = useState(false);

  //   const handleOnSubmit = async (
  //     values: { email: string },
  //     { resetForm, setSubmitting, setFieldError }: any
  //   ) => {
  //     try {
  //       await api.auth.forgotPassword(values);
  //       resetForm();
  //       setShowResponse(true);
  //     } catch (err: any) {
  //       setFieldError('email', err.response.data.message);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   };

  type NotificationType = "success" | "info" | "warning" | "error";
  const navigate = useNavigate();

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const dispatch = useAppDispatch();
  const { isLoadingForgotPassword } = useAppSelector(
    (store) => store.forgotPassword
  );

  // useEffect(() => {
  //     getData();
  // }, []);

  // const getData = () => {
  //     const payload = {};
  //     dispatch(forgotPassword(payload));
  // }

  const sendMail = (values: any) => {
    const payload = new FormData();
    payload.append("email", values.email);

    dispatch(forgotPassword(payload))
      .unwrap()
      .then((res) => {
        setNotificationProps({
          visible: true,
          type: res?.error ? "warning" : "success",
          title: res?.message?.message,
          message: res?.errors?.email,
        });

        

        if (!res?.error) {
          navigate("/reset-password"); // Navigate to the desired route
        }
        console.log(res);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email is invalid").required("Email is required"),
  });

  return (
    <AuthLayout heading="Forgot Password?">
      <div className="forgotten-password-wrapper">
        <div className="forgotPasswordInfo">
          Please enter your email address below, and we’ll send you reset
          instructions.
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            sendMail(values);
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

              {/* Resetting mail sent notification */}
              {/* {showResponse && (
                <div className="response-message">
                  We have sent you an e-mail containing your password reset code.
                </div>
              )} */}
              <Button
                loading={isLoadingForgotPassword}
                type="primary"
                htmlType="submit"
                className=" rounded-full bg-[#c847e8] text-white w-[100%] no-hover text-[16px] font-[500] mt-[20px] pt-[10px] pb-[10px] pl-[24px] pr-[24px]"
              >
                Send Reset Instructions
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

        <div className="login-link" style={{ marginTop: "24px" }}>
          <Link to="/">
            <b style={{ color: "#000", fontWeight: "400", fontSize: "16px" }}>
              Back to Log in
            </b>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgottenPassword;
