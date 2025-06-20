import React, { useEffect, useState } from "react";
import { Spin, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useAppSelector } from "@/store/hooks";
import { tableDataHelper } from "./tableDataHelper";


interface DataType {
  key: React.Key;
  firstName: string;
  surname: string;
  position: string;
  department: string;
  country: string;
  license: string;
  roles: string;
  permission: string;
  access: string;
}

interface TableUserAndTeamProps {
  selectedRow: (selectedRows: React.Key[]) => void;
  selectedLastActive: any;
  selectedStatus: any;
}

const TableUserAndTeam: React.FC<TableUserAndTeamProps> = ({
  selectedRow,
  selectedLastActive,
  selectedStatus,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);
  const {
    organizationUsersData,
    isOrganizationUsersLoading,
    // recentUserList,
    // inactiveUsersList,
    deactivatedUsersList,
    pendingInvitesUsersList,
    inviteBouncedUsersList,
    // usersIn2FAList,
    inviteAccecptedUsersList,
    isDeleteLoading
  } = useAppSelector((store) => store.userData);

  const { selectedCountryCodeFilter, showAllUsers } = useAppSelector(
    (store) => store.userAndTeams
  );
  const [data, setData] = useState<DataType[]>([]);
  // const dispatch = useAppDispatch();
  // const orgID = profileData?.organization_id
  // const {profileData} = useAppSelector((store) => store.profile);
  // useEffect(() => {
  //   dispatch(getUsers({organization_id: profileData?.["organization"]?.["id"]}));
  // },[])

  useEffect(() => {
    const setTableData = async () => {
      const tableData = await tableDataHelper(
        organizationUsersData,
        selectedLastActive,
        selectedStatus,
        // recentUserList,
        // inactiveUsersList,
        deactivatedUsersList,
        pendingInvitesUsersList,
        inviteBouncedUsersList,
        // usersIn2FAList,
        inviteAccecptedUsersList
      );
      console.log(
        selectedCountryCodeFilter,
        showAllUsers,
        "selectedCountryCodeFilter"
      );

      // if(showAllUsers){
      //   setData(tableData)

      //   // return;
      // }
      // else {
      if (selectedCountryCodeFilter) {
        setData(
          tableData?.filter(
            (elem: any) => elem.country === selectedCountryCodeFilter
          )
        );
      } else {
        if (showAllUsers) {
          setData(tableData);
        } else setData([]);
      }
      // console.log(tableData?.filter((elem:any) => elem.country === selectedCountryCodeFilter))
      // }
    };

    setTableData();
  }, [
    organizationUsersData,
    selectedCountryCodeFilter,
    selectedLastActive,
    selectedStatus,
  ]);

  const ColHeading = (props: any) => {
    const { heading, dataIndex } = props;
    const isCurrentSorted = sortedColumn === dataIndex;

    return (
      <div className="font-600 text-[12px] flex flex-row justify-between">
        <div>{heading}</div>
        <div className="flex flex-col">
          <IoIosArrowUp
            color={
              isCurrentSorted && sortOrder === "ascend" ? "#000" : "#cbd5e1"
            }
          />
          <IoIosArrowDown
            color={
              isCurrentSorted && sortOrder === "descend" ? "#000" : "#cbd5e1"
            }
          />
        </div>
      </div>
    );
  };

  const handleColumnSort = (dataIndex: string) => {
    if (sortedColumn === dataIndex) {
      setSortOrder(
        sortOrder === "ascend"
          ? "descend"
          : sortOrder === "descend"
          ? null
          : "ascend"
      );
      setSortedColumn(sortOrder === "descend" ? null : dataIndex);
    } else {
      setSortedColumn(dataIndex);
      setSortOrder("ascend");
    }
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("Selected Row Keys Changed:", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    selectedRow(newSelectedRowKeys);
  };

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Rows",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
          selectedRow(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Rows",
        onSelect: (changeableRowKeys) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
          selectedRow(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: <ColHeading heading="First Name" dataIndex="firstName" />,
      dataIndex: "firstName",
      width: 120,
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("firstName"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Surname" dataIndex="surname" />,
      dataIndex: "surname",
      width: 120,
      sorter: (a, b) => a.surname.localeCompare(b.surname),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("surname"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Position" dataIndex="position" />,
      dataIndex: "position",
      width: 120,
      sorter: (a, b) => a.position.localeCompare(b.position),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("position"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Department" dataIndex="department" />,
      dataIndex: "department",
      width: 120,
      sorter: (a, b) => a.department.localeCompare(b.department),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("department"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Country" dataIndex="country" />,
      dataIndex: "country",
      width: 120,
      sorter: (a, b) => a.country.localeCompare(b.country),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("country"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="License" dataIndex="license" />,
      dataIndex: "license",
      width: 120,
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Roles" dataIndex="roles" />,
      dataIndex: "roles",
      width: 120,
      sorter: (a, b) => a.roles.localeCompare(b.roles),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("roles"),
      }),
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Permission" dataIndex="permission" />,
      dataIndex: "permission",
      width: 120,
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
    {
      title: <ColHeading heading="Access" dataIndex="access" />,
      dataIndex: "access",
      width: 120,
      render: (text) => <div className="font-[400] text-[12px]">{text}</div>,
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("Table Params:", pagination, filters, sorter, extra);
  };

  return (
    <Spin spinning={isOrganizationUsersLoading || isDeleteLoading}>
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        onChange={onChange}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
      />
    </Spin>
  );
};

export default TableUserAndTeam;
