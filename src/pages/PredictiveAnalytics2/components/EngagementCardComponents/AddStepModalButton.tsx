import UIButton from "@/components/ui/UIButton";

const AddStepModalButton = (props:any) => {
    const { showModal } = props;
  return (
    <div className="md:w-fit w-full mx-auto flex flex-col justify-center items-center pt-[10px] pb-[10px] mt-[24px]">
      <UIButton
        background="#fff"
        color="#C847E8"
        text="Add Step"
        borderColor="#C847E8"
        onClick={showModal}
      />
    </div>
  );
};

export default AddStepModalButton;
