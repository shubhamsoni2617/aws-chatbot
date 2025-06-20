const quarterMapping: { [key: number]: string } = {
    1: "Jan-Mar",
    2: "Jan-Mar",
    3: "Jan-Mar",
    4: "Apr-Jun",
    5: "Apr-Jun",
    6: "Apr-Jun",
    7: "Jul-Sep",
    8: "Jul-Sep",
    9: "Jul-Sep",
    10: "Oct-Dec",
    11: "Oct-Dec",
    12: "Oct-Dec",
};

export const getCurrentQuarterString = () => {
const currentMonth = new Date().getMonth() + 1;
const currentQuarterString = quarterMapping[currentMonth];
return currentQuarterString;
}

const quarterMappingNumeric: { [key: number]: string } = {
    1: "Q1",
    2: "Q1",
    3: "Q1",
    4: "Q2",
    5: "Q2",
    6: "Q2",
    7: "Q3",
    8: "Q3",
    9: "Q3",
    10: "Q4",
    11: "Q4",
    12: "Q4",
};

export const getCurrentQuarterNumericString = () => {
    const currentMonth = new Date().getMonth() + 1;
    return quarterMappingNumeric[currentMonth]; // Returns "Q1", "Q2", etc.
};

export const getCurrentQuarterNumber = () => {
    const currentMonth = new Date().getMonth() + 1;
    return Math.ceil(currentMonth / 3); // Returns 1, 2, 3, or 4
};

export const getLastQuarterString = () => {
    const currentQuarter = getCurrentQuarterNumber();
    const lastQuarter = currentQuarter === 1 ? 4 : currentQuarter - 1;
    return `Q${lastQuarter}`;// Returns "Q1", "Q2", etc
};

export const getLastQuarterNumber = () => {
    const currentQuarter = getCurrentQuarterNumber();
    return currentQuarter === 1 ? 4 : currentQuarter - 1; // Returns 1, 2, 3, or 4
};

export const moveFirstToLast = <T>(arr: T[]): T[] => {
    if (arr.length === 0) return arr; // Return empty array if there's nothing to move
    return [...arr.slice(1), arr[0]]; // Moves first element to last
  };