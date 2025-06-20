import { Button } from "antd";
import { HiOutlinePencil } from "react-icons/hi";

const CommentOnReportButton = (props: any) => {
  const { showModal } = props;

  return (
    <div className="mt-[44px] flex flex-row gap-[16px] justify-center items-center">
      <Button
        className="h-[40px] w-full md:w-fit"
        style={{
          background: "#fff",
          color: "#c847e8",
          borderColor: "#c847e8",
          borderRadius: "40px",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "16.94px",
          padding: "10px 24px",
        }}
        onClick={showModal}
      >
        <HiOutlinePencil size={20} />
        Comment on Report
      </Button>
    </div>
  );
};

export default CommentOnReportButton;
