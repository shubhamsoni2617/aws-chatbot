// import { Button } from "antd";
// import { MdCompare } from "react-icons/md";
import AIBulb from "../../assets/svg/ai-bulb.svg";
import starPlus from "../../assets/svg/star-plus.svg";
import lineChartDown from "../../assets/line-chart-down-02.svg";
import { memo } from "react";
// import CompareModal from "@/screens/CompareModal/CompareModal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Popover } from "antd";
import { CiCircleInfo } from "react-icons/ci";
import { PiMapPinLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setGlobeView } from "@/store/reducers/user";
import { useAppSelector } from "@/store/hooks";
import InfoContentPopOver from "./infoContentPopOver";

type Props = {
  children: any;
  classes: string;
  heading?: string | React.ReactElement;
  predictedValue?: number | string;
  companyAverage?: number | string;
  compareModalDateReciever?: (data: DateData) => void; // Function type
};

type InfoHeadingKey =
  | "Revenue Per Employee"
  | "Revenue per Employee"
  | "Retention Rate"
  | "First Year Retention Rate"
  | "Internal Mobility Rate"
  | "Turnover Rate"
  | "Absenteeism Rate"
  | "Cost of Vacancy"
  | "Turnover Cost"
  | "Performance Deficit"
  | "Absenteeism Cost";

interface DateData {
  selectedPeriod: string;
  startDate: string;
  endDate: string;
  

}


// const useIsPredictiveAnalytics = () => {
//   const location = useLocation();
//   return location.pathname.includes("predictive-analytics");
// };

const CardWrapper = memo((props: Props) => {
  const {
    children,
    classes,
    heading,
    predictedValue,
    companyAverage,
    // compareModalDateReciever,
  } = props;
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  // const isPredictiveAnalytics = useIsPredictiveAnalytics();
  const isReportsPage = location.pathname.startsWith("/reports");
  const isViewDetails = window.location.href.includes("ViewDetails");
  const { showGlobe } = useAppSelector(store => store.userData)
  // const graph = searchParams.get("graph");
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  // console.log("Loication in files", location.pathname);
  // const closeModal = () => {
  //   setIsModalOpen(false);
  // };

  // const handleApply = ({ selectedPeriod, startDate, endDate }: DateData) => {
  //   if (compareModalDateReciever) {
  //     compareModalDateReciever({ selectedPeriod, startDate, endDate }); // Call the function
  //   }
  // };

  const navigate = useNavigate();
  const handleAIBuldClick = () => {
    console.log("heading of the graph is", heading);
    const headingText = typeof heading === "string" ? heading : "";
    navigate(
      `/predictive-analytics?graph=${encodeURIComponent(
        headingText
      )}&parentPage=${encodeURIComponent(location.pathname)}`
    );
  };

  const content = (
    <div>
      <div className="text-[#c847e8]">AI Impact</div>
    </div>
  );

  // console.log(
  //   "graph type",
  //   typeof heading === "string" && heading.includes("World Map")
  // );
  return (
    <div
      className={`${classes} bg-white ${
        !isReportsPage ? "shadow-sm rounded-xl" : ""
      } p-[20px]`}
      style={
        isViewDetails ? { boxShadow: "0px 0px 8px 0px #00000014" } : undefined
      }
    >
      {!heading ? null : (
        <div className="flex justify-between items-center mb-[16px] h-[20px]">
          <div
            className="text-base font-semibold font-inter text-dark font-600 text-[16px] text-[#1e293b] h-[19px] flex flex-row justify-center items-center gap-[8px]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {heading}

            <Popover placement="topLeft" content={<InfoContentPopOver heading={heading as InfoHeadingKey} />}>
              <CiCircleInfo
                size={20}
                className="infoIcon"
                style={{ zIndex: 2 }}
              />
            </Popover>
          </div>
          <div className="flex space-x-2">
            {/* {isReportsPage && (
              <Button className="!bg-secondary h-5 px-2 " onClick={openModal}>
                <div className="text-white text-xxs font-medium hidden sm:hidden md:visible lg:flex xl:visible 2xl:visible z-[1]">
                  Compare
                </div>
                <div className="mt-[2px] mb-[2px] ml-[8px] mr-[8px] lg:mr-[0px]">
                  <MdCompare className="text-white text-sm" size="16px" />
                </div>
              </Button>
            )} */}
            {searchParams.get("graph") ? (
              <></>
            ) : (
              // isPredictiveAnalytics && (
              typeof heading === "string" &&
              !heading.includes("World Map") ? (!isReportsPage &&(
                <Popover content={content} trigger="hover">
                  <img
                    src={AIBulb}
                    onClick={handleAIBuldClick}
                    // title="AI Impact"
                    style={{ zIndex: 1 }}
                    className="cursor-pointer"
                  />
                </Popover>
                )) : (
                showGlobe && location.pathname === "/" &&
                <Popover content={<div>World Map View</div>} trigger="hover" >
                  <div className="bg-white p-[10px] rounded-xl cursor-pointer hover:bg-[#f3f4f6] transition-all duration-200 " onClick={() => {
                  dispatch(setGlobeView(false));
                  }}>
                  <PiMapPinLight size={24} color="#c847e8" />
                  </div>
                </Popover>
                )
              // )
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col text-xs">
        {!companyAverage ? null : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-[6px]">
              <img src={lineChartDown} />
              <span
                className="text-dark font-inter font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Company Average
              </span>
            </div>
            <span
              className="text-dark font-inter font-regular"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {companyAverage}
            </span>
          </div>
        )}

        {!predictedValue ? null : (
          <div className="flex items-center justify-between mt-[8px]">
            <div className="flex items-center space-x-[6px]">
              <img src={starPlus} />
              <span
                className="text-secondary font-medium"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Predicted Value
              </span>
            </div>
            <span
              className="text-secondary font-regular"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {predictedValue}
            </span>
          </div>
        )}
      </div>
      <div className={`relative ${typeof heading === "string" && heading.includes("World Map") ? 'h-full' : 'h-[calc(100%-90px)]'} mt-[16px] pb-[20px] w-full`}>
        {children}
      </div>
      {/* <div className="mt-[16px] pb-[20px]">{children}</div> */}

      {/* Render CompareModal outside the button click */}
      {/* {isModalOpen && (
        <div className="modal-overlay">
          <CompareModal onClose={closeModal} onApply={handleApply} />
        </div>
      )} */}
    </div>
  );
});

export default CardWrapper;
