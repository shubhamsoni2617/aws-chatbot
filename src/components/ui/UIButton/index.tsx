import { Button } from "antd";

type UIButtonProps = {
  background: string;
  color: string;
  text: string;
  borderColor: string;
  onClick: any;
};

const UIButton: React.FC<UIButtonProps> = ({
  background,
  color,
  text,
  borderColor,
  onClick,
}) => {
  return (
    <Button
      className="min-h-[37px]"
      style={{
        background,
        color,
        borderColor,
        borderRadius: "40px",
        fontWeight: "400",
        paddingTop: "10px",
        paddingBottom: "10px",
        paddingLeft: "24px",
        paddingRight: "24px",
        fontFamily: "Inter",
      }}
      onClick={onClick}
    >
      <div style={{ fontFamily: "Inter" }}>{text}</div>
    </Button>
  );
};

export default UIButton;
