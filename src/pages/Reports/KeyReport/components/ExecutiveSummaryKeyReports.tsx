import Heading from "./Heading"
import TextString from "./TextString"

const ExecutiveSummaryKeyReports = (props:any) => {
    const {reportsRecommendation} = props;
    return(
        <div className="mt-[44px]">
          <Heading heading="Executive Summary" color="#1e293b" />
          <div style={{ marginTop: "16px" }} />
          <TextString data={reportsRecommendation?.[0]?.["summary"]} />
        </div>
    )
}

export default ExecutiveSummaryKeyReports;