import AddStepModalButton from "./AddStepModalButton";
import EngagementSteps from "./EngagementSteps";
import Header from "./Header";

const EngagementCard = (props: any) => {
  const { heading, showModal } = props;
  return (
    <div className="bg-white shadow-[0px_0px_8px_0px_#00000014] rounded-xl p-[20px]">
      <Header />
      <EngagementSteps heading={heading} />
      <AddStepModalButton showModal={showModal} />
    </div>
  );
};

export default EngagementCard;
