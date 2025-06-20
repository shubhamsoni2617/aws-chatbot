import CPandFIGraphConfig from "./CPandFIGraphConfig";
import PAGraphConfig from "./PAGraphConfig";

const GraphConfig = (props:any) => {
    const {heading, parentPage,transformedData} = props;

    if(parentPage === "/predictive-analytics-3"){
        return(
            <PAGraphConfig heading={heading} transformedData={transformedData}/>
        )
    }
    else{
        return(
            <CPandFIGraphConfig heading={heading} transformedData={transformedData}/>
        )
    }

}
export default GraphConfig