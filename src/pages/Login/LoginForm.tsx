import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import FormGroup from "@/components/LoginComponents/FormGroup";
import Button from "../../components/LoginComponents/Button";
// import Input from "../../components/LoginComponents/Input";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
// import { BsDot } from "react-icons/bs";

import "./LoginForm.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProfileData } from "@/store/actions";

import Notification from "@/components/Notification";
import { Checkbox, CheckboxProps, Input } from "antd";
import { onLogin, onVerify } from "./loginActions";

const LoginForm = () => {
  type NotificationType = "success" | "info" | "warning" | "error";

  const [notificationProps, setNotificationProps] = useState({
    visible: false,
    type: "info" as NotificationType,
    title: "",
    message: "",
  });

  const [isTwoFAVisible, setISTwoFAVisible] = useState(false);

  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const dispatch = useAppDispatch();
  const profilePayload = {};

  const { loading } = useAppSelector((store) => store.auth);

  const getData = () => {
    dispatch(getProfileData(profilePayload));
  };

  useEffect(() => {
    getData();
  }, []);

  const [passwordVisible, setPasswordVisible] = useState(false);
  // const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim("Email cannot have leading or trailing spaces")
      .email("Invalid email format")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      )
      .required("Email is required"),
    password: Yup.string()
      .trim("Password cannot contain leading/trailing spaces")
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  return (
    <div className="wrapper">
      {isTwoFAVisible ? (
        <div className="text-[14px] font-[400] items-center text-center">
          Please enter the 2FA code sent to your email to continue.
        </div>
      ) : (
        <div />
      )}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const trimmedValues = {
            email: values.email.trim(),
            password: values.password.trim(),
          };

          if (!isTwoFAVisible) {
            onLogin(trimmedValues, dispatch, setISTwoFAVisible);
          } else {
            onVerify(trimmedValues, dispatch);
          }
        }}
      >
        {({ errors, touched, values, isValid }) => (
          <Form>
            <FormGroup className="mb-[24px]">
              <Field id="email" name="email">
                {({ field }: any) => (
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    className={
                      "form-control h-[44px] font-[400] text-[16px] border-[#CBD5E1] text-[#1E293B] mb-[0px] p-[12px]" +
                      (errors.email && touched.email ? " is-invalid" : "")
                    }
                    {...field}
                  />
                )}
              </Field>
              <ErrorMessage
                name="email"
                component="div"
                className="invalid-feedback mt-[3px] text-red-500"
              />
            </FormGroup>

            <FormGroup>
              <Field id="password" name="password">
                {({ field }: any) => (
                  <div className="relative text-[#c847e8] hover:border-[#c847e8]">
                    <Input
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      suffix={
                        <span
                          className="cursor-pointer ml-[5px] text-[#64748b] text-[16px]"
                          onClick={togglePasswordVisibility}
                        >
                          {passwordVisible ? (
                            <IoEyeOutline size={24} color="#94a3b8" />
                          ) : (
                            <FaRegEyeSlash size={24} color="#94a3b8" />
                          )}
                        </span>
                      }
                      type={passwordVisible ? "text" : "password"}
                      className={
                        `form-control h-[44px] font-[400] border-[#CBD5E1] placeholder:text-[16px] placeholder-[#94A3B8] hover:border-[#c847e8] p-[12px]` +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                      style={{
                        WebkitTextSecurity: passwordVisible ? "none" : "disc",
                        color: passwordVisible? "#1E293B" :  "#c847e8",
                        // fontSize:passwordVisible ? "16px":'20px',
                        
                      }}
                      {...field}
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="password"
                component="div"
                className="invalid-feedback"
              />
            </FormGroup>

            {isTwoFAVisible ? (
              <FormGroup className="">
                <Field id="twoFACode" name="twoFACode">
                  {({ field }: any) => (
                    <div className="relative text-[#c847e8]">
                      <Input
                        id="twoFACode"
                        name="twoFACode"
                        placeholder="Enter 2FA Code"
                        style={{
                          color: "#c847e8",
                        }}
                        type={"text"}
                        className={
                          "form-control h-[44px] font-[400] text-[16px] border-[#CBD5E1] text-[#1E293B] mb-[0px]" +
                          (errors.password && touched.password
                            ? " is-invalid"
                            : "")
                        }
                        {...field}
                      />
                    </div>
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </FormGroup>
            ) : (
              <div className="mb-[0px]" />
            )}

            <div className="relative inline-block w-full">
              <Button
                className="rounded-full focus:outline-0 mt-[30px] active:!border-[#c847e8] bg-[#c847e8] text-white w-[100%] no-hover text-[16px] font-[500] pt-[10px] pb-[20px] pl-[24px] pr-[24px]"
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={!values.email || !values.password || !isValid}
              >
                {isTwoFAVisible ? "Verify" : "Log In"}
              </Button>
              {(!values.email || !values.password || !isValid) && (
                <div className="absolute top-0 left-0 w-full h-full bg-white/60 rounded-inherit pointer-events-none z-[2]" />
              )}
            </div>
          </Form>
        )}
      </Formik>

      <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      />

      <div className="loginFooter mt-[24px]">
        <Checkbox className="rememberMeCheckbox" onChange={onChange}>
          Remember me
        </Checkbox>
        <Link to="/forgot-password" className="forgot-passowrd-text">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
