import UIButton from "@/components/ui/UIButton";

const AssignTaskButton = (props: any) => {
  const { assignedTaskArray, isEngagementAssignedTasksLoading, setAddTaskIsModalOpen } = props;
  const handleAssignTask = () => {
    setAddTaskIsModalOpen(true);
  };
  return (
    <>
      {assignedTaskArray?.length === 0 && !isEngagementAssignedTasksLoading && (
        <div className="md:w-fit w-full mx-auto flex flex-col justify-center items-center mt-[24px]">
          <UIButton
            text="Assign Task"
            background="#c847e8"
            color="#fff"
            borderColor="#c847e8"
            onClick={() => handleAssignTask()}
          />
        </div>
      )}
    </>
  );
};

export default AssignTaskButton;
