// import Notification from "@/components/Notification";
import UIButton from "@/components/ui/UIButton";
import { addStep, getEngagement } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCurrentQuarterNumericString } from "@/utils/helper/CurrentQuarterGraphHelper";
import { Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from 'react-toastify';


// type NotificationType = "success" | "info" | "warning" | "error";
const AddStepModal = (props: any) => {
  const { isModalOpen, setIsModalOpen, heading ,indexNumber} = props;
  const currentYear = new Date().getFullYear();
  const [stepName, setStepName] = useState("");
  const [description, setDescription] = useState("");
  const { profileData } = useAppSelector((store) => store.profile);
  const {selectedLocationIds, selectedDepartmentIds} = useAppSelector((store) => store.userData)
  // console.log(profileData?.["organization"]?.["id"]);
  // const [notificationProps, setNotificationProps] = useState({
  //     visible: false,
  //     type: "info" as NotificationType,
  //     title: "",
  //     message: "",
  //   });


  const dispatch = useAppDispatch();
  const handleOk = async () => {
    const data = {
      org_id: profileData?.["organization"]?.["id"],
      step_name: stepName,
      description: description,
      quarter: `${getCurrentQuarterNumericString() +" " +currentYear}`,
      kpi: heading,
      location_ids: selectedLocationIds,
      department_id: selectedDepartmentIds,
      is_custom_step: true,
    };
    console.log(stepName, description,`${getCurrentQuarterNumericString() +" " +currentYear}`, heading);

    try {
      const response = await dispatch(addStep(data));
      // console.log("add step response", response);
      // if (response?.payload?.status === 200) {
      if (response?.payload?.message?.includes("Step added successfully")) {
        // setNotificationProps({
        //   visible: true,
        //   type: "success",
        //   title: "Success",
        //   message: "Step added successfully",
        // });
        toast.success("Step added successfully");
        
        
          setIsModalOpen(false);
          dispatch(
                getEngagement({
                  org_id: profileData?.["organization"]?.["id"],
                  location_id: JSON.stringify(selectedLocationIds),
                  kpi: heading,
                  quarter: `${getCurrentQuarterNumericString() + " " + currentYear}`,
                })
              );
  
      } else {
        // setNotificationProps({
        //   visible: true,
        //   type: "error",
        //   title: "Error",
        //   message: "Failed to Add Step. Please try again.",
        // });
        toast.warning('Failed to Add Step. Please try again');
        // console.log("Report not saved successfully:", response.payload);
      }
    } catch (error) {
      console.error("Error in handleSaveReport:", error);
      // setNotificationProps({
      //   visible: true,
      //   type: "error",
      //   title: "Error",
      //   message: "Something went wrong. Please try again later.",
      // });
      toast.error('Something went wrong. Please try again later.');
    }
    // console.log("response for add step", response)

    
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
    width={580}
    // bodyStyle={{ height: "376px" }} 
      title={
        <div
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "20px",
          }}
        >
          Add Step
        </div>
      }
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      centered={true}
      footer={null}
      okButtonProps={{
        style: {
          background: "#c847e8",
          color: "#fff",
          borderColor: "#c847e8",
          borderRadius: "40px",
          fontWeight: "400",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "24px",
          paddingRight: "24px",
          marginTop: "8px",
        },
      }}
      cancelButtonProps={{
        style: {
          background: "#fff",
          color: "#c847e8",
          borderColor: "#c847e8",
          borderRadius: "40px",
          fontWeight: "400",
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "24px",
          paddingRight: "24px",
        },
      }}
      okText="Apply"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "20px",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: "32px",
            height: "32px",
            border: "1.5px solid #ddd",
            borderColor: "#cbd5e1",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            fontWeight: "400", // Ensure padding and border are included in the element's total width and height
          }}
        >
          {indexNumber}
        </div>
        <Input
          placeholder="Enter a name for your step"
          onChange={(e: any) => setStepName(e.target.value)}
        />
      </div>
      <div>
        <TextArea
          rows={6}
          placeholder="Please describe the action you will take."
          onChange={(e:any) =>  setDescription(e.target.value)}
        />
        <div className="mt-[20px] flex flex-row justify-end gap-[8px]">
          <UIButton
            background="#fff"
            color="#c847e8"
            text="Cancel"
            borderColor="#c847e8"
            onClick={() => handleCancel()}
          />

          <UIButton
            background="#c847e8"
            color="#ffffff"
            text="Save"
            borderColor="#c847e8"
            onClick={() => handleOk()}
          />
        </div>
      </div>

      {/* <Notification
        {...notificationProps}
        onClose={() =>
          setNotificationProps({ ...notificationProps, visible: false })
        }
      /> */}
      
    </Modal>
  );
};

export default AddStepModal;
