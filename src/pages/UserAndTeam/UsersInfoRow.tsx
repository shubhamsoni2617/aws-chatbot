import { useAppSelector } from "@/store/hooks";

type UserInfoProps = {
  userHeading: string;
  userCount: number;
  info: string | null;
};

const UsersInfoComponent = (props: UserInfoProps) => {
  const { userHeading, userCount, info } = props;
  return (
    <div className="flex my-[8px] lg:my-0 md:flex-col flex-row justify-between items-center col-span-6 md:col-span-3 lg:col-span-1">
      <div
        style={{
          fontWeight: "400",
          fontSize: "14px",
          color: "#475569",
        }}
      >
        {userHeading}
      </div>
      <div className="md:text-center text-end">
        <div
          style={{
            fontWeight: "600",
            fontSize: "20px",
            color: "#1E293B",
          }}
        >
          {userCount}
        </div>
        {!info && <div className="h-[19px] " />}
        <div
          // style={{
          //   fontWeight: "400",
          //   fontSize: "12px",
          //   color: "#C847E8",
          // }}
          className="font-[400] text-[12px] text-[#C847E8] cursor-pointer"
        >
          {info}
        </div>
      </div>
    </div>
  );
};

const UsersInfoRow = () => {
  const {
    recentUserList,
    inactiveUsersList,
    deactivatedUsersList,
    pendingInvitesUsersList,
    inviteBouncedUsersList,
    usersIn2FAList,
    // inviteAccecptedUsersList,
  } = useAppSelector((state) => state.userData);
  return (
    <div className="bg-white shadow-md rounded-xl mt-[20px]">
      <div className="grid grid-cols-6 p-[20px]">
        <UsersInfoComponent
          userHeading="Recent users"
          userCount={recentUserList.length}
          info={null}
        />
        <UsersInfoComponent
          userHeading="Inactive users"
          userCount={inactiveUsersList.length}
          info={"Review users"}
        />
        <UsersInfoComponent
          userHeading="Deactivated users"
          userCount={deactivatedUsersList.length}
          info={"Review users"}
        />
        <UsersInfoComponent
          userHeading="Pending invite"
          userCount={pendingInvitesUsersList.length}
          info={"Resend invites"}
        />
        <UsersInfoComponent
          userHeading="Invite bounced"
          userCount={inviteBouncedUsersList.length}
          info={null}
        />
        <UsersInfoComponent
          userHeading="Users enrolled in 2FA"
          userCount={usersIn2FAList.length}
          info={"View security center"}
        />
      </div>
    </div>
  );
};

export default UsersInfoRow;
