const setLocalData = (keyName: string, data: any) => {
  const stringData = JSON.stringify(data);
  localStorage.setItem(keyName, stringData)
}
const getLocalData = (keyName: string) => {
  const data = localStorage.getItem(keyName)
  let parsedData = null;
  if (data) {
    parsedData = JSON.parse(data);
  }
  return parsedData;
}
export {
  setLocalData,
  getLocalData
}