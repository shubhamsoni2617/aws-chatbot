import { Button } from "antd";

type UserAndTeamButtonProps = {
  icon: any;
  text: string;
  backgroundcolor: string | number;
  textcolor: string;
  borderColor: string;
  onClick: any;
};

const UserAndTeamButtonComponent = (props: UserAndTeamButtonProps) => {
  const { icon, text, backgroundcolor, textcolor, borderColor, onClick } =
    props;

  return (
    <Button
      style={{
        // background: "#C847E8",
        background: backgroundcolor,
        borderRadius: "20px",
        color: textcolor,
        fontSize: "14px",
        fontWeight: "400",
        padding: "10px 24px",
        borderColor: borderColor,
        width: "100%",
      }}
      onClick={onClick}
    >
      {icon}
      {text}
    </Button>
  );
};

export default UserAndTeamButtonComponent;