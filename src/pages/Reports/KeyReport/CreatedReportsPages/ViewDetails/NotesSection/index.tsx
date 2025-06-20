import { getReportComment } from "@/store/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Avatar, Spin } from "antd";
// import { Spin } from "antd";
import { useEffect } from "react";
// import { FiEdit, FiTrash2 } from "react-icons/fi";
const NotesSection = (props: any) => {
  const { reportId, heading, refreshNotes } = props;
  const dispatch = useAppDispatch();
  const { isNotesLoading } = useAppSelector((store) => store.reportsData);

  const { notes } = useAppSelector((store) => store.reportsData as any);

  useEffect(() => {
    dispatch(getReportComment({ report_id: String(reportId) }));
  }, [refreshNotes]); // safer to add dispatch in deps

  return (
    <div className="mt-[20px]">
      <h2>Notes</h2>
      {/* {isNotesLoading ? (
        <div>Loading...</div>
      ) : ( */}
      <Spin
        spinning={isNotesLoading}
        className="flex flex-row justify-center items-center"
      >
        {notes?.["comments"]
          ?.filter((item: any) => item?.kpi === heading)
          .map((item: any, index: number) => (
            <Notes
              key={index}
              name={item?.user_name}
              email={item?.email}
              date={item?.date}
              note={item?.comment}
            />
          ))}
      </Spin>
      {/* )} */}
    </div>
  );
};

export default NotesSection;


const Notes = (props: any) => {
  const { name, email, date, note } = props;
  return (
    <>
      <div className="flex flex-col pl-[20px] pr-[20px] mt-[24px] mb-[24px] gap-[16px]">
        <div className="flex flex-row justify-between items-start">
          <div className="flex flex-row gap-[16px] justify-center items-center">
            <Avatar className="h-[60px] w-[60px] rounded-full bg-[#f4d9fa] text-[#c847e8] text-[25px]">
              {name[0]}
            </Avatar>
            <div className="flex flex-col gap-[4px]">
              <div className="font-[600] text-[14px] text-[#1e293b]">
                {name}
              </div>
              <div className="font-[400] text-[14px]">{email}</div>
              {/* <div className="font-[400] text-[14px]">{date}</div> */}
            </div>
          </div>
          <div className="flex flex-row gap-[24px]">
            {/* <FiTrash2
              size={20}
              color="#9483b8"
              className="cursor-pointer"
              style={{ strokeWidth: 1 }}
            />
            <FiEdit
              size={20}
              color="#9483b8"
              className="cursor-pointer"
              style={{ strokeWidth: 1 }}
            /> */}

            <div className="font-[400] text-[14px]">{date}</div>
          </div>
        </div>
        <div className="font-[400] text-[14px] text-[#475569]">{note}</div>
      </div>
      <hr className="" />
    </>
  );
};

// Code for new design ********************************************************** 


// const NotesSection = (props: any) => {
//   const { reportId, heading, refreshNotes } = props;
//   const dispatch = useAppDispatch();
//   const { isNotesLoading } = useAppSelector((store) => store.reportsData);

//   const { notes } = useAppSelector((store) => store.reportsData as any);

//   useEffect(() => {
//     dispatch(getReportComment({ report_id: String(reportId) }));
//   }, [refreshNotes]); // safer to add dispatch in deps

//   return (
//     <div className="mt-[20px]">
//       <h2>Notes</h2>
//       {/* {isNotesLoading ? (
//         <div>Loading...</div>
//       ) : ( */}
//       <Spin
//         spinning={isNotesLoading}
//         className="flex flex-row justify-center items-center"
//       >
//         {notes?.["comments"]
//           ?.filter((item: any) => item?.kpi === heading)
//           .map((item: any, index: number) => (
//             <Notes
//               key={index}
//               name={item?.user_name}
//               email={item?.email}
//               date={item?.date}
//               note={item?.comment}
//             />
//           ))}
//       </Spin>
//       {/* )} */}
//     </div>
//   );
// };

// export default NotesSection;

// Code for new design ********************************************************** 