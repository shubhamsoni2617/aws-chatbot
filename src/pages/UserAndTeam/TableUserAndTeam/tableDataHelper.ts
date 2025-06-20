export const tableDataHelper = async (
  data: any,
  selectedLastActive: any,
  selectedStatus: any,
  // recentUserList: any,
  // inactiveUsersList: any,
  deactivatedUsersList: any,
  pendingInvitesUsersList: any,
  inviteBouncedUsersList: any,
  // usersIn2FAList: any,
  inviteAccecptedUsersList: any
) => {
  console.log(
    "in tab le helper func of userAnd teams",
    selectedLastActive,
    selectedStatus
  );
  const dummyData: any[] = await data
    ?.filter((item: any) => {
      if (!selectedLastActive || selectedLastActive === "All") {
        return true;
      }

      return (
        item?.user_status_metadata?.last_active_days_ago <=
          Number(selectedLastActive) &&
        item?.user_status_metadata?.last_active_days_ago !== null
      );
    })
    ?.map((user: any) => ({
      key: user?.id,
      firstName: `${user?.first_name}`,
      surname: `${user?.last_name}`,
      position: `${user?.position}`,
      department: `${user?.department === null ? "-" : user?.department}`,
      country: `${user?.country === null ? "-" : user?.country}`,
      license: "-",
      roles: `${user?.roles}`,
      permission: `${user?.permissions === null ? "-" : user?.permission}`,
      access: `${user?.access === null ? "-" : user?.access}`,
    }));

  const dummyDataBasedOnStatus = [];

  if (selectedStatus.includes("Deactivate")) {
    dummyDataBasedOnStatus.push(...deactivatedUsersList);
  }

  if (selectedStatus.includes("Invite Pending")) {
    dummyDataBasedOnStatus.push(...pendingInvitesUsersList);
  }

  if (selectedStatus.includes("Invite Bounced")) {
    dummyDataBasedOnStatus.push(...inviteBouncedUsersList);
  }

  if (selectedStatus.includes("Invite Accepted")) {
    dummyDataBasedOnStatus.push(...inviteAccecptedUsersList);
  }

  // Create a Map with email as key to ensure uniqueness
  const emailMap = new Map();

  // Add each user to the map with email as key
  dummyDataBasedOnStatus.forEach((user) => {
    if (user.email) {
      emailMap.set(user.email, user);
    }
  });

  // Convert map values back to array and map to match dummyData structure
  const uniqueUsers = Array.from(emailMap.values()).map((user, index) => ({
    key: index,
    firstName: `${user?.first_name || ''}`,
    surname: `${user?.last_name || ''}`,
    position: `${user?.position || ''}`,
    department: `${user?.department === null ? "-" : user?.department}`,
    country: `${user?.country === null ? "-" : user?.country}`,
    license: "-",
    roles: `${user?.roles || ''}`,
    permission: `${user?.permissions === null ? "-" : user?.permission}`,
    access: `${user?.access === null ? "-" : user?.access}`,
  }));

  console.log("unique users based on email", uniqueUsers);
  return selectedStatus.length > 0 ? uniqueUsers : dummyData || [];
};
