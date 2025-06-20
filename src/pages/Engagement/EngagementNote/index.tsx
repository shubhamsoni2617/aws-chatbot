// import Notification from "@/components/Notification";
import UIButton from "@/components/ui/UIButton";
import {
  getEngagement,
  // getEngagementAssignedTasks,
  updateEngagementNote,
} from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCurrentQuarterNumericString } from "@/utils/helper/CurrentQuarterGraphHelper";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";

const EngagementNote = (props: any) => {
  const {
    engagementId,
    setIsNotesLoading,
    heading,
    closeModal,
    setNotesChangged,
  } = props;
  const [textAreaValue, setTextAreaValue] = useState("");
  const dispatch = useAppDispatch();

  const { profileData } = useAppSelector((store) => store.profile);
  const { selectedLocationIds } = useAppSelector(
    (store) => store.userData as any
  );
  const currentYear = new Date().getFullYear();

  const handleAddNote = async () => {
    setIsNotesLoading(true);

    const formdata = new FormData();
    formdata.append("engagement_id", engagementId);
    formdata.append("notes", textAreaValue);

    const response = await dispatch(updateEngagementNote(formdata)) as any;
console.log("reload verification",response?.payload?.status)
    if (response?.payload?.status === 200) {

      console.log("reload verification")
      toast.success(response?.payload?.data?.message);
      setTextAreaValue("");
      
      dispatch(
        getEngagement({
          org_id: profileData?.["organization"]?.["id"],
          location_id: JSON.stringify(selectedLocationIds),
          kpi: heading,
          quarter: `${getCurrentQuarterNumericString() + " " + currentYear}`,
        })
      );
      closeModal();
      
    } else {
      toast.error("Something went wrong, please try again.");
      closeModal();
    }

    setNotesChangged((prev: any) => !prev);
    setIsNotesLoading(false);
  };

  return (
    <div className="flex flex-col gap-[30px] justify-center items-center ">
      <TextArea
        showCount
        maxLength={100}
        onChange={(e: any) => setTextAreaValue(e.target.value)}
        value={textAreaValue}
        placeholder="Add Note"
        className="!border !border-gray-300 focus:!border-[#C847E8] focus-within:!border-[#C847E8] focus:!ring-0 active:!border-[#C847E8] active:!ring-0 h-[172px]"
        style={{ minHeight: "172px", padding: "8px 1px" }}
        // aria-expanded={false}
      />
      <div className="md:w-fit w-full mx-auto flex flex-col justify-center items-center">
        <UIButton
          text="Add Note"
          color="#fff"
          background="#c847e8"
          borderColor="#c847e8"
          onClick={() => handleAddNote()}
        />
      </div>
    </div>
  );
};

export default EngagementNote;
