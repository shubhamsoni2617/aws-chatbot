import LoginForm from "./LoginForm";
import AuthLayout from "@/components/LoginComponents/AuthLayout";

const Login = (props: any) => {
  return (
    <AuthLayout heading="Log in">
      <LoginForm userType="company" redirect="/dashboard" {...props} />
    </AuthLayout>
  );
};

export default Login;
