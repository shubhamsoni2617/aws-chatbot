import { AppDispatch } from "@/store";
import { userLogin } from "@/store/actions";
import { toast } from "react-toastify";

export const onLogin = async (
  values: any,
  dispatch: AppDispatch,
  // setNotificationProps: (props: { visible: boolean; type: string; title: string; message: string }) => void,
  setISTwoFAVisible: (visible: boolean) => void
) => {
  const payload = new FormData();
  payload.append("email", values.email);
  payload.append("password", values.password);

  try {
    const res = await dispatch(userLogin(payload)).unwrap();

    if (res.error) {
      // setNotificationProps({
      //   visible: true,
      //   type: "warning",
      //   title: res?.status || "Warning",
      //   message: res?.message || "Something went wrong",
      // });
      toast.warning(res?.message);
    }

    if (res?.userId && !res.access_token) {
      setISTwoFAVisible(true);
    }

    if (res.access_token) {
      window.location?.reload();
    }
  } catch (err: any) {
    // setNotificationProps({
    //   visible: true,
    //   type: "error",
    //   title: "Login Failed",
    //   message: err?.message || "Unable to log in.",
    // });
    toast.error(err?.message);
  }
};

export const onVerify = async (
  values: any,
  dispatch: AppDispatch,
  // setNotificationProps: (props: { visible: boolean; type: string; title: string; message: string }) => void
) => {
  const payload = new FormData();
  payload.append("email", values.email);
  payload.append("password", values.password);
  payload.append("two_factor_code", values.twoFACode);

  try {
    const res = await dispatch(userLogin(payload)).unwrap();

    if (res.error) {
      // setNotificationProps({
      //   visible: true,
      //   type: "warning",
      //   title: res?.status || "Warning",
      //   message: res?.message || "Something went wrong",
      // });
      toast.warning(res?.message);
    }

    if (res.access_token) {
      window.location?.reload();
    }
  } catch (err: any) {
    // setNotificationProps({
    //   visible: true,
    //   type: "error",
    //   title: "Login Failed",
    //   message: err?.message || "Unable to log in.",
    // });
    toast.error(err?.message || "Unable to log in.");
  }
};