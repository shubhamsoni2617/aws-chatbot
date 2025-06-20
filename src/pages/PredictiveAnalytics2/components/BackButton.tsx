import { LuArrowLeft } from "react-icons/lu";

const BackButton = (props: any) => {
  const { backButtonNavigate, parentPage } = props;
  return (
    <div
      style={{
        fontWeight: 500,
        fontSize: "14px",
        marginBottom: "19.5px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      }}
      className="hover:!text-[#C847E8] transition-colors"
      onClick={backButtonNavigate}
    >
      <LuArrowLeft size={24} />
      {parentPage === "/predictive-analytics-3"
        ? "Back to Predictive Analytics"
        : parentPage === "/financial-impact"
        ? "Back to Financial Impact"
        : "Back to Company Performance "}
    </div>
  );
};
export default BackButton;
