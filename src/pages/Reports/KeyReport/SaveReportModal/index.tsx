import { Input, Modal } from "antd";
import "./SaveReport.css";
type Props = {
  isModalOpen: boolean,
  handleOk: () => void,
  handleCancel: () => void,
  setReportName: any,
}

const SaveReportModal = ({ isModalOpen, handleOk, handleCancel ,setReportName}: Props) => {

  return (
    <Modal
      title=""
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      cancelButtonProps={{
        style: {
          color: "#C847E8",
          borderRadius: "20px",
          borderColor: "#C847E8",
        },
      }}
      okButtonProps={{
        style:{
            color: '#fff',
            backgroundColor:'#C847E8',
            borderRadius:"20px"
        }
      }}
      okText="Save"
    >
      <div className="SaveReportModalTitle">Save Report</div>

      <div className="SaveReportSubTitle">
        Your report is almost ready to be saved!
      </div>
      <span style={{ marginLeft: "5px", marginRight: "5px" }}>
        Please give it a unique and descriptive name to help you identify it
        later.
      </span>

      <Input
        placeholder="Enter Report Name"
        style={{
          marginTop: "25px",
        }}
        onChange={(e:any) => {
          setReportName(e.target.value)
          // console.log(e.target.value)
        }}
      />
    </Modal>
  );
};

export default SaveReportModal;
