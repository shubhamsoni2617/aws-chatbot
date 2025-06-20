import { useAppSelector } from "@/store/hooks"
import InfoComponent from "./InfoComponent"

const HeadingKeyReports = (props:any) => {
    const {currentQuarter} = props;
    const {profileData} = useAppSelector(store => store?.profile)
    return(
        <div
            // className="[font-family:'Plus_Jakarta_Sans',sans-serif]"
            className=""
            style={{
              fontWeight: 700,
              fontSize: "20px",
              color: "#1e293b",
            }}
          >
            {profileData?.["organization"]?.["name"]} Quarterly HR Report
            <div className="flex md:flex-row flex-col mt-[16px] md:gap-[40px] gap-[8px]">
              <InfoComponent heading="Report Period" details={currentQuarter} />
              <InfoComponent
                heading="Prepared By:"
                details={String(profileData?.["user"]?.["name"])}
              />
            </div>
          </div>
    )
}

export default HeadingKeyReports;