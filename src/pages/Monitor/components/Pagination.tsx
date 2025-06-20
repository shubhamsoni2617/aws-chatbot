import { Pagination } from "antd";

function CustomPagination(props: any) {
  const {
    activeTab,
    handleMyTasksPageChange,
    myTasksCurrentPage,
    myTasksPageSize,
    myTasksTotalItems,
    publicTasksCurrentPage,
    publicTasksPageSize,
    publicTasksTotalItems,
    handlePublicTasksPageChange
  } = props;
  return (
    <div className="mt-[23px] flex justify-between items-center bg-[#f8f8f8] w-full p-4 rounded-lg">
      <div
        className="text-[#475569]"
        style={{
          fontFamily: "Inter",
          fontWeight: 400,
          fontSize: "12px",
          lineHeight: "24px",
          letterSpacing: "0%",
          verticalAlign: "middle",
        }}
      >
        Showing{" "}
        <span style={{ fontWeight: 600 }}>
          {activeTab === "1"
            ? `${(myTasksCurrentPage - 1) * myTasksPageSize + 1}-${Math.min(
                myTasksCurrentPage * myTasksPageSize,
                myTasksTotalItems
              )}`
            : `${
                (publicTasksCurrentPage - 1) * publicTasksPageSize + 1
              }-${Math.min(
                publicTasksCurrentPage * publicTasksPageSize,
                publicTasksTotalItems
              )}`}
        </span>{" "}
        of{" "}
        <span style={{ fontWeight: 600 }}>
          {activeTab === "1" ? myTasksTotalItems : publicTasksTotalItems}
        </span>
      </div>

      {activeTab === "1" && (
        <Pagination
          current={myTasksCurrentPage}
          pageSize={myTasksPageSize}
          total={myTasksTotalItems}
          onChange={handleMyTasksPageChange}
          showSizeChanger={false}
        />
      )}

      {activeTab === "2" && (
        <Pagination
          current={publicTasksCurrentPage}
          pageSize={publicTasksPageSize}
          total={publicTasksTotalItems}
          onChange={handlePublicTasksPageChange}
          showSizeChanger={false}
        />
      )}
    </div>
  );
}

export default CustomPagination;
