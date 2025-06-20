import { useAppDispatch } from "@/store/hooks";
import { setEngagementAssigntaskToNull } from "@/store/reducers/predictiveAnalytics";
import { Button } from "antd";
import { LuArrowLeft } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const BackNavigationButton = (props:any) => {
    const {peviousLocation} = props
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleReturnNavigation = () => {
        navigate("/" + peviousLocation);
        dispatch(setEngagementAssigntaskToNull());
      };
    return(
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Button
            type="text"
            className="!px-0 !bg-[#f8f8f8] !border-none !shadow-none hover:!text-[#C847E8] transition-colors flex items-center bg-transparent"
            onClick={handleReturnNavigation}
          >
            <LuArrowLeft size={20} />
            <span>Back</span>
          </Button>
        </div>
    )
}

export default BackNavigationButton;