// import profileImage from "../../assets/logo.png";
import { LuPanelLeftOpen } from "react-icons/lu";
import { PiBellSimpleThin } from "react-icons/pi";
import { useAppSelector } from "@/store/hooks";
import { ReactNode } from "react";
// import { useNavigate } from "react-router-dom";
import { Avatar, Skeleton } from "antd";
import { TbBellFilled } from "react-icons/tb";

type Props = {
  heading: string;
  toggleSideBarVis: () => void;
  children: ReactNode;
  noUserName?: boolean;
};

const Header = ({
  heading,
  toggleSideBarVis,
  children,
  noUserName = false,
}: Props) => {
  const { profileData, profileLoading } = useAppSelector(
    (store) => store.profile
  );

  // const navigate = useNavigate();
  // const handleHeadingNavigation = () => {
  //   // window.location.replace("/");
  //   navigate("/");
  // };

  const userName = profileData?.["user"]?.["name"] || "";
  const firstName = userName.split(" ")[0];
  const post = profileData?.["permissions"]?.["pages"]?.[0]?.["name"] || "";
  // const profilePicture =
  //   profileData?.["user"]?.["profile_picture"] || profileImage;
  // const profilePicture = profileImage;

  return (
    <div>
      <header className="w-full pt-3 pb-3 md:pl-[40px] md:pr-[40px] pl-[16px] pr-[16px] h-20 flex flex-row items-center justify-between sticky top-0 z-10 bg-background">
        {/* Heading */}
        <Skeleton
          active
          loading={profileLoading}
          paragraph={{ rows: 1 }}
          className="w-[100px]"
        >
          {/* {!profileLoading && ( */}
            <span
              className="text-xl whitespace-nowrap text-ellipsis text-[24px] overflow-hidden font-[600] hidden lg:block text-[#471e68]"
              // onClick={handleHeadingNavigation}
            >
              {noUserName
                ? heading
                : firstName && <div>Welcome, {firstName}</div>}
            </span>
          {/* )} */}
        </Skeleton>

        {/* </Skeleton> */}

        {/* Sidebar Toggle (Mobile) */}
        <div className="lg:hidden">
          <div className="h-[32px] w-[32px] rounded-full flex justify-center items-center bg-white p-[6px]">
            <LuPanelLeftOpen
              className="w-8 h-8 cursor-pointer"
              size={21}
              strokeWidth="1"
              onClick={toggleSideBarVis}
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            {/* Notification Icon */}
            {/* Visible until lg, hidden on lg and above */}
            <div className="block lg:hidden bg-white rounded-full h-[40px] w-[40px] mr-[16px] flex items-center justify-center cursor-pointer">
              <PiBellSimpleThin size={20} strokeWidth={2} />
            </div>

            {/* Hidden until lg, visible on lg and above */}
            <div className="hidden lg:flex bg-white rounded-full h-[40px] w-[40px] mr-[16px] items-center justify-center cursor-pointer">
              <TbBellFilled size={20} strokeWidth={2} color="#898989" />
            </div>

            {/* Profile Picture */}
            {/* <img
              className="rounded-full h-[40px] w-[40px]"
              src={profilePicture}
              alt="Profile"
            /> */}
            <Avatar className="h-[40px] w-[40px] rounded-full bg-[#f4d9fa] text-[#c847e8] text-[25px]">
              {userName[0]}
            </Avatar>

            {/* User Info */}
            <div className="ml-[8px]">
              <span className="text-sm whitespace-nowrap text-ellipsis overflow-hidden hidden lg:block">
                {userName}
              </span>
              <div className="overflow-hidden hidden lg:block text-[10px] font-[400] text-[#00000099]">
                {post}
              </div>
            </div>
          </div>
        </div>
      </header>

      <hr className="mt-0" />

      <div className="flex flex-col">
        <div className="order-1 xl:order-2">{children}</div>
        <div className={`order-2 xl:order-1 ${noUserName && "md:hidden"}`}>
          {/* Page Heading */}
          {heading && (
            <div className="md:pl-[40px] pl-[16px] font-semibold text-[16px] font-[600] md:pt-[16px] md:pb-[16px] py-[8px] md:mt-0 mt-[16px]">
              {heading}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
