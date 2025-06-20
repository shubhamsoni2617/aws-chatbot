import { SlCloudUpload } from "react-icons/sl";
import DateAddressComponent from "./compoenets/dataAddressComponent";
import UserAndTeamButtonComponent from "./compoenets/userAndTeamsButton";
import { useAppSelector } from "@/store/hooks";
import { formatDateUserAndTeams } from "@/utils/helper/dateCoversionHelper";
const OrganizationInfoRow = () => {
  const { organizationName, profileData } = useAppSelector(
    (store) => store.profile
  );
  return (
    <>
      <div className="bg-white shadow-md rounded-xl mt-[-24px]">
        <div className="grid p-[20px] gap-[24px]">
          <div className="flex md:flex-row flex-col justify-between gap-[16px]">
            <div
              style={{
                fontWeight: "600",
                fontSize: "20px",
              }}
            >
              {organizationName}
            </div>
            <div className="w-full md:w-auto">
              <UserAndTeamButtonComponent
                onClick={() => {}}
                icon={<SlCloudUpload />}
                text="Upload PDF Contract"
                backgroundcolor={"#C847E8"}
                textcolor="#fff"
                borderColor="#C847E8"
              />
            </div>
          </div>
          <div className="flex justify-between md:flex-row flex-col gap-[16px]">
            <DateAddressComponent
              identifier="Start Date"
              value={
                formatDateUserAndTeams(
                  profileData?.["user"]?.["contract_info"]?.["start_date"] ??
                    ""
                ) ?? "-"
              }
            />
            <DateAddressComponent
              identifier="End Date"
              value={
                formatDateUserAndTeams(
                  profileData?.["user"]?.["contract_info"]?.["end_date"] ??
                    ""
                ) ?? "-"
              }
            />
            <DateAddressComponent
              identifier="Address"
              value={profileData?.["user"]?.["address"] ?? "-"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationInfoRow;
