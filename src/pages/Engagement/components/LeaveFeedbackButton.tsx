import UIButton from "@/components/ui/UIButton";

const LeaveFeedbackButton = (props:any) => {
    const{isTaskCompleted, showModal} = props
    return(
        <>
        {isTaskCompleted && (
            <div className="md:w-fit w-full mx-auto flex flex-col justify-center items-center mt-[30px] mb-[20px]">
              <UIButton
                text={"Leave Feedback"}
                background={"#fff"}
                color={"#c847e8"}
                borderColor="#C847E8"
                onClick={showModal}
              />
            </div>
          )}
        </>
    )
}

export default LeaveFeedbackButton;