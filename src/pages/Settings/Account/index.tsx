import { Button, Switch } from "antd";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";
import ResetPassswordModal from "./ChangePasswordModal";
import TwoFAModal from "./2FAModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getProfileData } from "@/store/actions";
import { useNavigate } from "react-router-dom";
import { PiCheck } from "react-icons/pi";

type CardProps = {
  heading: string;
  value: string;
};

const CardComponent = (props: CardProps) => {
  const { heading, value } = props;
  return (
    <div className="md:mb-8 mb-4">
      <div className="font-semibold text-sm text-gray-800">{heading}</div>

      {heading !== "Password" ? (
        <div className="text-sm font-normal text-gray-600">{value}</div>
      ) : (
        <div className="flex gap-1">
          {Array(6) // Adjust the number of dots as needed
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className="w-2.5 h-2.5 bg-purple-500 rounded-full inline-block"
              />
            ))}
        </div>
      )}
    </div>
  );
};

const Account = () => {
  const handelToggleChange = (checked: boolean) => {
    show2FAModal();
    console.log(`switch to ${checked}`);
  };

  const dispatch = useAppDispatch();
  const profilePayload = {};

  const { profileData } = useAppSelector((store) => store.profile);

  const userName: string | undefined = profileData?.["user"]?.["name"];

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] =
    useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const navigate = useNavigate();

  const getData = () => {
    dispatch(getProfileData(profilePayload));
  };

  const showChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const onChangePasswordModalClose = () => {
    setIsChangePasswordModalOpen(false);
  };

  const show2FAModal = () => {
    setIs2FAModalOpen(true);
  };

  const on2FAModalClose = () => {
    setIs2FAModalOpen(false);
  };
  const gettingData = () => {
    getData();
  };

  const handleForgetPassword = () => {
    localStorage.removeItem("token"); // Clear the token from local storage
    navigate("/forgot-password"); // Redirect to login page
    window.location.reload(); // Reload the page
  };

  // console.log("In Accounts code ..........",profileData);

  return (
    <div className="md:grid md:grid-cols-[1fr_2fr]">
      <div className="md:col-span-2">
        <div className="text-lg font-bold text-gray-800">Account</div>
        <div className="font-normal text-sm">
          You can change your profile details here seamlessly.
        </div>
      </div>

      <hr className="col-span-2 my-5" />

      <div className="font-semibold text-sm">Personal Information</div>
      <div>
        <div className="md:grid md:grid-cols-[1fr_2fr] mt-[32px] md:mt-[0px]">
          <CardComponent
            heading="First Name"
            value={(userName ?? "").split(" ")[0]}
          />
          <CardComponent
            heading="Last Name"
            value={(userName ?? "").split(" ").slice(1).join(" ")}
          />
        </div>

        <CardComponent heading="Date of Birth" value="December 01, 1997" />
        <CardComponent heading="Phone number" value="xxx-xxx-xxxx" />
        <div className="grid grid-cols-[1fr_0.5fr]">
          <CardComponent
            heading="Country, Address"
            value="123 Kensington High Street, Apartment 15B, South Building, Kensington Gardens, London, W8 7RS, United Kingdom"
          />
          <div></div>
        </div>
      </div>

      <hr className="col-span-2 mb-5" />

      <div className="font-semibold text-sm">Login</div>
      <div className="mt-[32px] md:mt-[0px]">
        <CardComponent
          heading="Email"
          value={
            profileData?.["user"]?.["email"]
              ? profileData?.["user"]?.["email"]
              : ""
          }
        />
        <div className="grid grid-cols-[1fr_0.5fr]">
          <CardComponent heading="Password" value="" />
          <HiOutlinePencilAlt
            className="mt-2.5"
            size={20}
            style={{
              strokeWidth: 1,
            }}
            color="#1e293b"
            onClick={showChangePasswordModal}
          />
          <div
            className="text-base font-normal text-purple-500"
            onClick={handleForgetPassword}
          >
            Forgot Password?
          </div>
        </div>
      </div>

      <hr className="col-span-2 my-8" />

      <div className="font-semibold text-sm">Security</div>
      <div>
        <CardComponent
          heading="Two-Factor Authentication (2FA) Setup"
          value="Two-factor authentication adds an extra layer of security to your account. Every time you log in, you will need to enter a one-time password sent to your email."
        />
        <Switch
          checked={profileData?.["user"]?.["two_factor_enabled"]}
          onChange={handelToggleChange}
        />{" "}
        {/* Loading Parameter will be applied */}
      </div>

      <div className="col-start-2 mt-6 mb-8 flex gap-4 justify-end">
        <Button className="btn-cancel rounded-[20px] pl-[24px] min-h-[40px] pr-[24px] pt-[10px] pb-[10px]">
          Cancel
          <RxCross2 />
        </Button>

        <Button className="btn-save rounded-[20px] bg-[#c847e8] min-h-[40px] text-[#fff] pl-[24px] pr-[24px] pt-[10px] pb-[10px]">
          Save Settings <PiCheck size={18} />
        </Button>
      </div>

      <ResetPassswordModal
        isModalOpen={isChangePasswordModalOpen}
        onClose={onChangePasswordModalClose}
      />
      <TwoFAModal
        isModalOpen={is2FAModalOpen}
        onClose={on2FAModalClose}
        gettingData={gettingData}
        is2FAEnabled={profileData?.["user"]?.["two_factor_enabled"]}
      />
    </div>
  );
};

export default Account;
