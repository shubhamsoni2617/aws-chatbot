import { Button, Dropdown, MenuProps, message, Modal, Space } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import "./ShareModal.css";

const handleMenuClick: MenuProps["onClick"] = (e) => {
  message.info("Click on menu item.");
  console.log("click", e);
};

const items: MenuProps["items"] = [
  {
    label: "Emma Jackson",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Jhonson Paul",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Priya Choudhry",
    key: "3",
    icon: <UserOutlined />,
  },
  {
    label: "Rishikesh Mishra",
    key: "4",
    icon: <UserOutlined />,
  },
];

const items2: MenuProps["items"] = [
  {
    label: "Restricted",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "View Only",
    key: "2",
    icon: <UserOutlined />,
  },
  {
    label: "Editor",
    key: "3",
    icon: <UserOutlined />,
  },
];

const menuProps1 = {
  items,
  onClick: handleMenuClick,
};

const menuProps2 = {
  items: items2,
  onClick: handleMenuClick,
};

interface ShareModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const ShareModal: React.FC<ShareModalProps> = ({ isModalOpen, handleOk, handleCancel }) => {
  return (
    <Modal
      title=""
      open={isModalOpen}
      onCancel={handleCancel}
      footer={
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            style={{
              color: "#C847E8",
              borderRadius: "20px",
              borderColor: "#C847E8",
              padding:'10px 24px'
            }}
            onClick={handleCancel}
          >
            Copy Link
          </Button>
          <Button
            type="primary"
            style={{
              color: "#fff",
              backgroundColor: "#C847E8",
              borderRadius: "20px",
              padding:'10px 24px'
            }}
            onClick={handleOk}
          >
            Done
          </Button>
        </div>
      }
    >
      <div className="ShareModalTitle">Access: Sales Comparison by Country</div>

      <div className="ShareModalSubTitle">Add the users you want to share with.</div>

      <div>
        <Dropdown menu={menuProps1}>
          <Button style={{ width: "100%" }}>
            <Space>
              Share With
              <DownOutlined style={{ marginLeft: "auto" }} />
            </Space>
          </Button>
        </Dropdown>
      </div>

      <div style={{ marginTop: "10px", fontSize: "16px", fontWeight: "500" }}>
        General Access
      </div>
      <div>
        <Dropdown menu={menuProps2}>
          <Button style={{ width: "100%"}}>
            <Space>
              General Access
              <DownOutlined style={{ marginLeft: "auto" }} />
            </Space>
          </Button>
        </Dropdown>
      </div>
      <div className="shareInformationText">
      Only users with access can open the content via this link.
      </div>
    </Modal>
  );
};

export default ShareModal;
