const EngagementCardDescription = (props:any) => {
    const {engagementIdsObject} = props
  return (
    <div
      style={{
        marginTop: "24px",
        marginBottom: "24px",
        color: "#475569",
        fontWeight: "400",
        fontSize: "14px",
      }}
    >
      {engagementIdsObject?.description}
    </div>
  );
};

export default EngagementCardDescription;