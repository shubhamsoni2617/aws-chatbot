// import worldMap from "@highcharts/map-collection/custom/world.geo.json"; /* Preserved for future default world map functionality */

// Helper function to transform map data
export function transformData(data: any) {
  if (!data || !data?.features) return [];
  return data?.features?.map((item: any) => ({
    "hc-key": item?.properties?.["hc-key"],
    name: item?.properties?.name,
    color: "#CDC2D6",
  }));
}

// Data mapping object for filter tracking
export const mapInnerFilterDataToOuterFilter: Record<string, any> = {
  filterByCountry: null,
  filterByState: null,
  filterByAddress: null,
};

// Custom tooltip formatter function
export function tooltipFormatter(this: any) {
  const point = this?.point;
  const tooltipContent = `
  <div style="padding: 12px; max-width: 360px; font-family: Inter; font-size: 12px; line-height: 1.4; background-color: #fff;borderRadius: 8px ">
<div style="
  font-family: Inter;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: 0px;
  vertical-align: middle;
  color: rgba(30, 41, 59, 0.6);
  margin-bottom: 6px;
  word-break: break-word;
  white-space: normal;
  overflow-wrap: anywhere;
">      ${point.tooltipName || point.name || "Unknown Location"}
    </div>
    <div style="font-weight: 400; word-break: break-word; white-space: normal; overflow-wrap: anywhere; color: #1E293B;">
      ${point.description || ""}
    </div>
  </div>`;
  return tooltipContent;
}
