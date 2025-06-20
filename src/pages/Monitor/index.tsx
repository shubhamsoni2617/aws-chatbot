import DefaultLayout from "../../components/DefaultLayout";
import { useState } from "react";
import FilterContainer from "@/components/FilterContainer";
import SearchBar from "./components/SearchBar";
import MonitorTabs from "./components/MonitorTabs";
import CustomPagination from "./components/Pagination";

const Monitor = () => {
  const [searchInput, setSearchInput] = useState("");
  // States for My Assigned Tasks
  const [myTasksCurrentPage, setMyTasksCurrentPage] = useState(1);
  const [myTasksPageSize, setMyTasksPageSize] = useState(10);
  const [myTasksTotalItems, setMyTasksTotalItems] = useState(0);

  // States for Public Tasks
  const [publicTasksCurrentPage, setPublicTasksCurrentPage] = useState(1);
  const [publicTasksPageSize, setPublicTasksPageSize] = useState(10);
  const [publicTasksTotalItems, setPublicTasksTotalItems] = useState(0);

  // Update pagination section with conditional rendering based on active tab
  const [activeTab, setActiveTab] = useState("1");
  const handleMyTasksPageChange = (page: number, size?: number) => {
    setMyTasksCurrentPage(page);
    if (size) setMyTasksPageSize(size);
  };

  const handlePublicTasksPageChange = (page: number, size?: number) => {
    setPublicTasksCurrentPage(page);
    if (size) setPublicTasksPageSize(size);
  };



  return (
    <DefaultLayout
      heading="Monitor"
      FilterComponent={
        <FilterContainer heading="Monitor" mapDataReload={() => {}} noFilter />
      }
    >
      <SearchBar setSearchInput={setSearchInput} />

      <MonitorTabs
        searchInput={searchInput}
        myTasksCurrentPage={myTasksCurrentPage}
        myTasksPageSize={myTasksPageSize}
        publicTasksCurrentPage={publicTasksCurrentPage}
        publicTasksPageSize={publicTasksPageSize}
        setMyTasksCurrentPage={setMyTasksCurrentPage}
        setMyTasksPageSize={setMyTasksPageSize}
        setMyTasksTotalItems={setMyTasksTotalItems}
        setPublicTasksCurrentPage={setPublicTasksCurrentPage}
        setPublicTasksPageSize={setPublicTasksPageSize}
        setPublicTasksTotalItems={setPublicTasksTotalItems}
        setActiveTab={setActiveTab}
      />

      <CustomPagination
        activeTab={activeTab}
        handleMyTasksPageChange={handleMyTasksPageChange}
        myTasksCurrentPage={myTasksCurrentPage}
        myTasksPageSize={myTasksPageSize}
        myTasksTotalItems={myTasksTotalItems}
        publicTasksCurrentPage={publicTasksCurrentPage}
        publicTasksPageSize={publicTasksPageSize}
        publicTasksTotalItems={publicTasksTotalItems}
        handlePublicTasksPageChange={handlePublicTasksPageChange}
      />
    </DefaultLayout>
  );
};

export default Monitor;
