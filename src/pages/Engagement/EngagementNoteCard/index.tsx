// EngagementNotesCard.tsx
import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import EditnoteModal from "./editNotesModal";


const EngagementNotesCard = (props: any) => {
  const { note, engagementId, setIsNotesLoading, heading,notesChanges ,engagementIdsObject} =
    props;

    console.log(notesChanges);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
    {engagementIdsObject?.notes && (
      <div className="w-full bg-gray-50 rounded-xl border border-slate-300 p-5 mb-6 relative">
      {/* Top-right edit icon */}
      <TbEdit
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 cursor-pointer"
        size={20}
        onClick={() => setIsModalOpen(true)}
      />

      {/* Notes content */}
      <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
        {note || "No notes available for this engagement."}
      </div>

      {/* Modal component */}
      <EditnoteModal
        engagementId={engagementId}
        setIsNotesLoading={setIsNotesLoading}
        heading={heading}
        setNotificationProps={null}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
    )}
    </>
  );
};

export default EngagementNotesCard;
