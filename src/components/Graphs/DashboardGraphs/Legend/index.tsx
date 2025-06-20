// import { useAppSelector } from "@/store/hooks";

const Legend = ({year, comparisonYear}:{year:any, comparisonYear:any}) => {

  const legendItems = []

  if(year){
    legendItems.push({ year: `${year}-${(year%100) + 1}`, color: "#A5B4FF" })
  }
  
  if(comparisonYear){
    legendItems.push({year: `${comparisonYear}-${(comparisonYear%100) + 1}`, color: "#fbc748" })
  }
  legendItems.push({year: "Predicted", color: "#C847E8" })
  
  // const legendItems = [
  //   { year: retentionRate?.["historic_data"]?.["0"]?.["year"], color: "#A5B4FF" }, // Color for 2023
  //   { year: retentionRate?.["historic_data"]?.["1"]?.["year"], color: "#FCC439" }, // Color for 2024
  //   { year: "Predicted", color: "#C847E8" }, // Color for predicted
  // ];

  return (
    <div style={styles.legendContainer}>
      {legendItems.map((item) => (
        <div key={item.year} style={styles.legendItem}>
          <div style={{ ...styles.colorBox, backgroundColor: item.color }} />
          <span style={styles.legendText}>{item.year}</span>
        </div>
      ))}
    </div>
  );
};

const styles = {
  legendContainer: {
    display: "flex",
    justifyContent: "space-around", // Space items evenly across the width
    alignItems: "center",
    width: "100%", // Make the container full width
    // margin: "0 0", // Adjust margin as needed/
    marginTop:'5px'
  },
  legendItem: {
    display: "flex",
    alignItems: "center",
    margin: "0 15px", // Space between legend items
  },
  colorBox: {
    width: 8,
    height: 8,
    borderRadius: "50%", // Makes the color box circular
    marginRight: 10, // Space between the color box and text
  },
  legendText: {
    fontSize: 14, // Adjust text size as needed
    color:"#615e83",
    fontFamily:"Inter",
  },
};

export default Legend;

