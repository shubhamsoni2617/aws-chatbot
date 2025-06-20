import { Button, Input, Modal } from "antd";
import "./index.css";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getCurrentQuarterNumericString } from "@/utils/helper/CurrentQuarterGraphHelper";
import { getKeyReportComment, postKeyReportComment } from "@/store/actions";
import { getFormattedDate } from "@/utils/helper/dateCoversionHelper";
import { toast } from "react-toastify";
// import { useState } from "react";

const CommentOnReportModal = (props: any) => {
  const { isModalOpen, setComment, comment, setIsModalOpen } =
    props;
  // const [userComment, setUserComment] = useState('');
  const dispatch = useAppDispatch();
  const { profileData, orgIDRedux, userName, userEmail } = useAppSelector(
    (store) => store.profile
  );
  const handleOk = async () => {
    const today = new Date();
    const formattedDate = getFormattedDate(today);
    const formdata = new FormData();
    formdata.append("org_id", String(orgIDRedux));
    formdata.append("user_name", String(userName));
    formdata.append("user_email", String(userEmail));
    formdata.append("quarter", getCurrentQuarterNumericString());
    formdata.append("date", formattedDate);
    formdata.append("comment", comment);

    const response = await dispatch(postKeyReportComment(formdata));

    if (response?.payload?.message === "Comment saved successfully.") {
      toast.success(response?.payload?.message);
      setIsModalOpen(false);
      dispatch(
        getKeyReportComment({ org_id: profileData?.["organization"]?.["id"] })
      );
    } else {
      toast.error("Something went wrong, please try again.");
      setIsModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setComment("");
  };

  const headingOfModal = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: "17px",
        }}
      >
        Comment on Report
      </div>
    );
  };

  const { TextArea } = Input;

  return (
    // <div className="p-[20px]">
    <Modal
      title={headingOfModal()}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
      centered
      className="custom-modal"
    >
      <p className="text-[#1e293b] text-center font-[400px] text-[14px] ">
        Leave remarks on this report if you have any corrections, additional
        insights, or questions.
      </p>
      <TextArea
        placeholder="Write your comment here.."
        style={{
          // marginRight: "20px",
          minHeight: "172px",
          // minWidth:'540px',
          marginTop: "20px",
          marginBottom: "20px",
        }}
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      />
      <div className="flex justify-center gap-[8px]">
        <Button
          className="h-[37px]"
          style={{
            backgroundColor: "#fff",
            borderRadius: "40px",
            borderColor: "#c847e8",
            color: "#c847e8",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="h-[37px]"
          onClick={handleOk}
          style={{
            backgroundColor: "#c847e8",
            borderRadius: "40px",
            borderColor: "#c847e8",
            color: "#fff",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          Submit
        </Button>
      </div>
    </Modal>
    // </div>
  );
};

export default CommentOnReportModal;
