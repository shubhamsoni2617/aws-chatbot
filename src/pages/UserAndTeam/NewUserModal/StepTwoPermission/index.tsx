import { Button, Collapse, CollapseProps } from "antd";
import HowToSetAccess from "./HowToSetAccess";
import PermissionTemplate from "./PermissionTemplate";
// import UIButton from "@/components/ui/UIButton";
import { useRef } from "react";

const StepTwoPermission = (props: any) => {
  const { setStep, email, formData, setNotificationProps, handleOk, setEmail } =
    props;
  const permissionTemplateRef = useRef<any>(null);
  const text = `
  Permission
`;
  const LabelForCollapse = (props: any) => {
    const { text } = props;
    return <div className="font-[700] text-[16px]">{text}</div>;
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: <LabelForCollapse text="Choose how to set access" />,
      children: <HowToSetAccess />,
    },
    {
      key: "2",
      label: <LabelForCollapse text="Choose a permission template" />,
      children: (
        <PermissionTemplate
          formData={formData}
          ref={permissionTemplateRef}
          email={email}
          setNotificationProps={setNotificationProps}
          handleOk={handleOk}
          setEmail={setEmail}
          setStep={setStep}
        />
      ),
    },
    {
      key: "3",
      label: <LabelForCollapse text="Choose permissions" />,
      children: <p>{text}</p>,
    },
  ];

  const handleCancelClick = () => {
    // setStep(1);
    setEmail(null);
    // Reset other necessary states
    if (permissionTemplateRef.current?.resetAll) {
      permissionTemplateRef.current.resetAll();
    }
    handleOk();
  };

  return (
    <div>
      <div className="mt-4px font-[600] text-[14px]">Permissions</div>
      <div className="flex justify-center font-[600] text-[14px] text-[#1e293b]">
        Set up user access level
      </div>
      <div className="flex justify-center text-center text-[14px] font-[400] text-[#1e293b]">
        Assign a seat to give users access to features. Narrow down that access
        with permissions.
      </div>
      <div className="flex justify-center mt-[24px] mb-[24px] font-[600] text-[16px] text-[#c847e8]">
        {email}
      </div>
      <Collapse defaultActiveKey={["1"]} ghost items={items} />
      <div className="w-full flex justify-center items-center mt-[24px] gap-[16px]">
        <Button
          type="default"
          className="w-[94px] h-[37px] rounded-full border border-[#c847e8] text-[#c847e8] px-[24px] py-[10px] hover:text-[#c847e8] hover:border-[#c847e8]"
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={() => {
            permissionTemplateRef.current?.handleNextClick();
          }}
          className="w-[80px] h-[37px] rounded-full border border-[#c847e8] bg-[#c847e8] text-white px-[24px] py-[10px] hover:bg-[#c847e8] hover:border-[#c847e8] hover:text-white"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default StepTwoPermission;
