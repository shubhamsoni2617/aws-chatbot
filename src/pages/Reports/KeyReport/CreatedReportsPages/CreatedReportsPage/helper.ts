export const getExternalIds =  async(comparisionLocaitonId:any, locations:any) => {
    let externalIdString = "";

    // console.log("the external; id of strings is", comparisionLocaitonId)
    comparisionLocaitonId?.forEach((locationId:any, index:number) =>{
        
        const locationInfo = locations.find((location:any) => location?.id === locationId);
        
        externalIdString = externalIdString+locationInfo?.external_id;
        if(!(index===comparisionLocaitonId?.length-1)){
            externalIdString = externalIdString+','
        }
        // console.log("the external; id of strings is",index,comparisionLocaitonId.length);
        // console.log("the external; id of strings is", locationInfo?.external_id, externalIdString)
    })

    // console.log("the external; id of strings is", externalIdString);
    return externalIdString;
}

export const getDepartmentIds = async(departmentName:any, deaprtments:any) => {
    // let external_id = "";

    const currentDepartment = deaprtments.find((department:any) => department?.name === departmentName )

    return currentDepartment?.id;
}


export const transformRetentionRateForCompare = (apiData:any) => {
    console.log("afaadvadsvadsv in helper", apiData)
    return []
}