
import DefaultLayout from "../../components/DefaultLayout";
import GeoChart from "@/components/GeoChart";
import CardWrapper from "@/components/CardWrapper";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import FilterContainer from "@/components/FilterContainer";
import UIButton from "@/components/ui/UIButton";
import {
  setSelectedCountryCodeFilter,
  showAllUser,
} from "@/store/reducers/userAndTeams";
import OrganizationInfoRow from "./organizationInfoRow";
import UsersInfoRow from "./UsersInfoRow";
import UserTableRow from "./usersTableRow";
import { Spin } from "antd";


const UserAndTeam = () => {
  const {
    showAllUsers,
  } = useAppSelector((store) => store.userAndTeams);

  const {profileLoading} = useAppSelector(store => store.profile)
  


  const dispatch = useAppDispatch();

  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer
          heading="Users & Teams"
          mapDataReload={() => {}}
          noFilter
        />
      }
      heading="Users & Teams"
    >
      <Spin spinning={profileLoading}>
      <OrganizationInfoRow />
      <UsersInfoRow />
      <UserTableRow />
      <CardWrapper
        classes="relative bg-white shadow-md rounded-xl mt-[16px] pt-[30px] pb-[30px] mb-[16px] px-[20px] h-[455px]"
        heading="World Map"
      >
        <>
          {/* Overlay button */}
          {!showAllUsers && (
            <div className="absolute top-[0px] right-[30px] z-10">
              <UIButton
                text="All Users"
                color="#c847e8"
                background="#fff"
                borderColor="#c847e8"
                onClick={() => {
                  // Reset filter logic here
                  dispatch(setSelectedCountryCodeFilter(null));
                  dispatch(showAllUser(true));
                }}
              />
            </div>
          )}
          <GeoChart
          // markers={innerFilterMarkers}
          // mapData={mapDataFilterMarkers?.mapData}
          // highlightState={innerFilterHighlightedState}
          />
        </>
      </CardWrapper>
      </Spin>
    </DefaultLayout>
  );
};

export default UserAndTeam;
