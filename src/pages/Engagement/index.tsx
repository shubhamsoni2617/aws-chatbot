import { Spin } from "antd";
import { useLocation } from "react-router-dom";
import TableEngagement from "./TableEngagement";
import { useEffect, useState } from "react";
import LeaveFeedbackModal from "./LeaveFeedbackModal";
import DefaultLayout from "@/components/DefaultLayout";
import { useAppSelector } from "@/store/hooks";
import AssignTaskModal from "./AssignTaskModal";
import EngagementNote from "./EngagementNote";
import FilterContainer from "@/components/FilterContainer";
import EngagementNotesCard from "./EngagementNoteCard";
import BackNavigationButton from "./components/BackNavigationButton";
import EngagementCardHeader from "./components/EngagementCardHeader";
import EngagementCardDescription from "./components/EngagementCardDescription";
import AssignTaskButton from "./components/AssignTaskButton";
import LeaveFeedbackButton from "./components/LeaveFeedbackButton";

const Engagement = () => {
  const location = useLocation();
  const number = location.state?.number;
  const topic = location.state?.topic;
  const peviousLocation = location.state?.peviousLocation;
  const kpi = location.state?.kpi;
  const [notesChanges, setNotesChanged] = useState(false);
  const engagementId = location.state?.engagementId;
  const { engagementAssignedTasksData, isEngagementAssignedTasksLoading } =
    useAppSelector((store) => store.predictiveAnalytics);
  console.log("engagement testing for kpi", engagementAssignedTasksData);
  const assignedTaskArray =
    engagementAssignedTasksData?.["assigned_task"] || [];

  const [engagementIdsObject, setEngagementIdsObject] = useState<any>();
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const { engagementData } = useAppSelector(
    (store) => store.predictiveAnalytics as any
  );

  const { isEngagementLoading } = useAppSelector(
    (store) => store.predictiveAnalytics
  );

  useEffect(() => {
    const obj = engagementData?.engagement_data?.find(
      (item: any) => item?.engagement_id === engagementId
    );
    setEngagementIdsObject(obj);
  }, [engagementData, notesChanges]);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNotesLoading, setIsNotesLoading] = useState(false);

  console.log(isNotesLoading);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [isAddTaskModalOpen, setAddTaskIsModalOpen] = useState(false);

  return (
    <DefaultLayout
      FilterComponent={
        <FilterContainer heading="" mapDataReload={() => {}} noFilter />
      }
      noUserName
      heading="Engagement"
    >
      <Spin
        spinning={isEngagementLoading}
        // size="large"
      >
        <BackNavigationButton peviousLocation={peviousLocation} />
        <div className="bg-white shadow-[0_0_8px_0_#00000014] rounded-xl mt-[24px] p-[20px] flex flex-col justify-center">
          <EngagementCardHeader
            engagementIdsObject={engagementIdsObject}
            number={number}
          />

          <EngagementCardDescription
            engagementIdsObject={engagementIdsObject}
          />

          <EngagementNotesCard
            note={engagementIdsObject?.notes}
            engagementId={engagementId}
            setIsNotesLoading={setIsNotesLoading}
            heading={engagementData?.kpi}
            notesChanges={notesChanges}
            engagementIdsObject={engagementIdsObject}
            // closeModal={null}
          />

          {!engagementIdsObject?.notes && (
            <EngagementNote
              engagementId={engagementId}
              setIsNotesLoading={setIsNotesLoading}
              heading={engagementData?.kpi}
              setNotesChanged={setNotesChanged}
              closeModal={null}
            />
          )}

          <TableEngagement
            engagementId={engagementId}
            setIsTaskCompleted={setIsTaskCompleted}
          />

          <AssignTaskButton
            assignedTaskArray={assignedTaskArray}
            isEngagementAssignedTasksLoading={isEngagementAssignedTasksLoading}
            setAddTaskIsModalOpen={setAddTaskIsModalOpen}
          />

          <LeaveFeedbackButton
            isTaskCompleted={isTaskCompleted}
            showModal={showModal}
          />

          <AssignTaskModal
            taskName={topic}
            engagementId={engagementId}
            isModalOpen={isAddTaskModalOpen}
            setIsModalOpen={setAddTaskIsModalOpen}
            kpi={kpi}
          />

          {isTaskCompleted && (
            <LeaveFeedbackModal
              isModalOpen={isModalOpen}
              handleOk={handleOk}
              handleCancel={handleCancel}
              number={number}
              topic={topic}
              engagementId={engagementId}
            />
          )}
        </div>
      </Spin>
    </DefaultLayout>
  );
};

export default Engagement;
