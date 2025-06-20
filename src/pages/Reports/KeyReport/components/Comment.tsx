import { Avatar } from "antd";
// import profileImage from "../../../../assets/ProfileImage.png";

const dateFormatter = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

export const Comment = (props: any) => {
  const { commentData, ifLast } = props;  // Changed from isLast to ifLast to match parent
  
  return (
    <>
      <div className="flex flex-col pl-[20px] pr-[20px] mt-[24px] mb-[24px] gap-[16px]">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row gap-[16px] justify-center items-center">
            <Avatar className="h-[60px] w-[60px] rounded-full bg-[#f4d9fa] text-[#c847e8] text-[25px]">
              {commentData?.["user_name"]?.split(" ")[0][0]}
            </Avatar>
            <div>
              <div className="font-[600] text-[14px] text-[#1e293b]">
                {commentData?.["user_name"]}
              </div>
              <div className="font-[400] text-[14px]">{commentData?.["user_email"]}</div>
            </div>
          </div>
          <div className="font-[400] text-[14px]">{dateFormatter(commentData?.["date"])}</div>
        </div>
        <div className="font-[400] text-[14px] text-[#475569]">
          {commentData?.["comment"]}
        </div>
      </div>
      {!ifLast && <hr />}
    </>
  );
};

// Code For New Design **************************************************************

// import { Avatar } from "antd";
// import { FiTrash2 } from "react-icons/fi";
// import { FiEdit } from "react-icons/fi";

// // import profileImage from "../../../../assets/ProfileImage.png";

// const dateFormatter = (dateString: string) => {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
//   const day = String(date.getDate()).padStart(2, '0');

//   return `${year}.${month}.${day}`;
// };

// export const Comment = (props: any) => {
//   const { commentData, ifLast } = props;  // Changed from isLast to ifLast to match parent
  
//   return (
//     <>
//       <div className="flex flex-col pl-[20px] pr-[20px] mt-[24px] mb-[24px] gap-[16px]">
//         <div className="flex flex-row justify-between items-start">
//           <div className="flex flex-row gap-[16px] justify-center items-center">
//             <Avatar className="h-[60px] w-[60px] rounded-full bg-[#f4d9fa] text-[#c847e8] text-[25px]">
//               {commentData?.["user_name"]?.split(" ")[0][0]}
//             </Avatar>
//             <div className="flex flex-col gap-[4px]">
//               <div className="font-[600] text-[16px] text-[#1e293b]">
//                 {commentData?.["user_name"]}
//               </div>
//               <div className="font-[400] text-[14px]">{commentData?.["user_email"]}</div>
//               <div className="font-[400] text-[14px]">{dateFormatter(commentData?.["date"])}</div>
//             </div>
            
//           </div>
//           <div className="flex flex-row gap-[24px]">
//             <FiTrash2 size={20} color="#9483b8" className="cursor-pointer" style={{strokeWidth: 1}}/>
//             <FiEdit size={20} color="#9483b8" className="cursor-pointer" style={{strokeWidth: 1}}/>
//           </div>
//         </div>
//         <div className="font-[400] text-[14px] text-[#475569]">
//           {commentData?.["comment"]}
//         </div>
//       </div>
//       {!ifLast && <hr />}
//     </>
//   );
// };

// Code For New Design **************************************************************
