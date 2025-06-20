// EditnoteModal.tsx
import { Modal } from "antd";
import EngagementNote from "../EngagementNote";

const EditnoteModal = (props: any) => {
  const {
    engagementId,
    setIsNotesLoading,
    heading,
    setNotificationProps,
    isModalOpen,
    setIsModalOpen,
  } = props;

  return (
    <Modal
      // centered
      // title={ "Edit Note"}
      title={<div className="text-center">Edit Note</div>}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      //   footer={[
      //     <Button key="close" onClick={() => setIsModalOpen(false)}>
      //       Close
      //     </Button>,
      //   ]}
      footer={null}
      centered
      // className="h-[395px] w-[580px]"
    >
      <EngagementNote
        engagementId={engagementId}
        setIsNotesLoading={setIsNotesLoading}
        heading={heading}
        setNotificationProps={setNotificationProps}
        closeModal={() => setIsModalOpen(false)}
      />
    </Modal>
  );
};

export default EditnoteModal;
