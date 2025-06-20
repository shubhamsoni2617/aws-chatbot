import { GrCloudUpload } from "react-icons/gr";
import "./Security.css";
import { Button, Spin, Table } from "antd";
import { RxCross1 } from "react-icons/rx";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSecuritySettingsData } from "@/store/actions";
import { PiCheck } from "react-icons/pi";

const Security = () => {
  const dispatch = useAppDispatch();
  const { loadingSecurity, security } = useAppSelector(
    (store) => store.settings
  );
  const { leadersList = [], departmentList = {} }: any = security || {};

  interface DataType {
    key: string;
    name: string;
    position: string;
  }

  interface DataType2 {
    key: string;
    department: string;
    hod: string;
    nestedData: { name: string; department: string }[];
  }

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  const handleExpand = (record: DataType2, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent row click from triggering
    if (expandedKeys.includes(record.key)) {
      setExpandedKeys(expandedKeys.filter((key) => key !== record.key));
    } else {
      setExpandedKeys([...expandedKeys, record.key]);
    }
  };

  // Leaders Data
  const leadersData: DataType[] = leadersList.map(
    (leader: any, index: number) => ({
      key: (index + 1).toString(),
      name: leader?.name,
      position: leader?.position,
    })
  );

  // Departments Data
  const departmentsData: DataType2[] = Object.entries(departmentList).map(
    ([key, value]: [string, any]) => ({
      key: (key + 1).toString(),
      department: value?.department,
      hod: value?.head,
      nestedData: value?.marketingList || [],
    })
  );

  type AlignType = "left" | "center" | "right";

  const departmentColumns = [
    {
      title: "Department",
      dataIndex: "department",
      render: (text: string) => <p>{text}</p>,
    },
    {
      title: "Head of Department",
      dataIndex: "hod",
      align: "left" as AlignType,
      render: (text: string, record: DataType2) => (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{text}</span>
          <span>
            {expandedKeys.includes(record.key) ? (
              <UpOutlined
                style={{ cursor: "pointer" }}
                onClick={(e) => handleExpand(record, e)}
              />
            ) : (
              <DownOutlined
                style={{ cursor: "pointer" }}
                onClick={(e) => handleExpand(record, e)}
              />
            )}
          </span>
        </div>
      ),
    },
  ];

  const nestedTable = (nestedData: { name: string; department: string }[]) => (
    <div
      style={{
        padding: "10px",
        background: "white",
      }}
    >
      <table
        className="nestedTable"
        cellSpacing="15"
        style={{
          background: "white",
        }}
      >
        <tbody className="TableBody">
          {nestedData.map((item, idx) => (
            <tr
              key={idx}
              className={`Row${idx + 1}`}
              style={{ height: "49px" }}
            >
              <td>{item.name}</td>
              <td>{item.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const payload = {};
    dispatch(getSecuritySettingsData(payload));
  };

  return (
    <div>
      {loadingSecurity ? (
        <div className="flex justify-center items-center w-full h-[calc(80vh-100px)] bg-background">
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div className="securityTable">
          <div className="security-row flex justify-between gap-[16px] items-center">
            <div className="row1col1">
              <div className="SecurityTxt">Security</div>
              <div className="SecurityTxt2">
                Manage user access and roles within the organization.
              </div>
            </div>

            <div className="flex flex-row gap-[8px]">
              <Button
                className="ExportBtn min-h-[40px]"
                style={{ padding: "10px 24px" }}
              >
                <GrCloudUpload />
                Export Data
              </Button>
              <Button
                className="SaveBtn min-h-[40px]"
                style={{ padding: "10px 24px" }}
              >
                Save
              </Button>
            </div>
          </div>

          <hr style={{ marginTop: "20px" }} />

          <div className="leaders-row">
            <div className="row2col1">
              <div className="BioDescTxt">Leaders </div>
              <div className="BioDescTxt2">(C-level Management)</div>
            </div>

            <div className="row2col2 mt-[16px] md:mt-0">
              <Table<DataType>
                columns={[
                  {
                    title: "Name",
                    dataIndex: "name",
                    render: (text) => <p>{text}</p>,
                  },
                  {
                    title: "Position",
                    dataIndex: "position",
                    align: "left",
                  },
                ]}
                dataSource={leadersData}
                bordered
                pagination={false}
                size="middle"
                className="w-full"
              />
            </div>
          </div>

          <div className="department-row">
            <div className="row2col1">
              <div className="BioDescTxt">Departments </div>
              <div className="BioDescTxt2">(C-level Management)</div>
            </div>

            <div className="row2col2-security w-full mt-[16px] md:mt-0">
              <Table<DataType2>
                className="parentTable w-full"
                columns={departmentColumns}
                dataSource={departmentsData}
                bordered
                pagination={false}
                size="middle"
                expandable={{
                  expandedRowKeys: expandedKeys,
                  expandedRowRender: (record) => nestedTable(record.nestedData),
                  rowExpandable: () => true,
                }}
                expandIconColumnIndex={-1}
              />
            </div>
          </div>

          <hr style={{ marginTop: "20px" }} />

          <div className="Buttons">
            <Button
              className="BtnSaveBtn"
              style={{ padding: "10px 24px" }}
              // onClick={handelUpdateUserData}
              // loading={isProcessing}
            >
              Save Settings <PiCheck size={18} />
            </Button>

            <Button className="BtnCancelBtn" style={{ padding: "10px 24px" }}>
              Cancel
              <RxCross1 size={18} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
