const EngagementCardHeader = (props:any) => {
    const {engagementIdsObject, number} = props;
    return(
        <div
            className="heading"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                border: "1.5px solid #ddd",
                borderColor: "#CBD5E1",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "400",
              }}
            >
              {number}
            </div>

            <div
              style={{
                marginLeft: "10px",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              {engagementIdsObject?.step_name}
            </div>
          </div>
    )
}

export default EngagementCardHeader;