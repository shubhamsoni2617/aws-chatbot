import { Collapse, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { IoIosTrendingUp, IoIosTrendingDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

import { useAppSelector } from "@/store/hooks";

import {
  getAbsenteeismRateTableParameters,
  getInternalMobilityRateTableData,
  getRetentionRateTableData,
  getTurnoverRateTableParameters,
} from "./helperFunction";
import {
  getCurrentQuarterNumber,
  getCurrentQuarterNumericString,
} from "@/utils/helper/CurrentQuarterGraphHelper";
import React, { useState } from "react";
import "../table.css";

interface DataType {
  key: React.Key;
  matricName: string;
  previousQuarter: string;
  QoQChange: React.ReactNode;
  QoQValue?: string; // Added QoQValue property
  nextQuarter: any;
}

const CompanyPerformanceMatricsTable = () => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

  const {
    turnoverRate,
    absenteesimRate,
    retentionRate,
    firstYearRetentionRate,
  } = useAppSelector((store) => store.companyPerformanceData);

  const currentYear = new Date().getFullYear();
  const currentQuarter = getCurrentQuarterNumericString() + " " + currentYear;

  const perviousQuarterNumber =
    getCurrentQuarterNumber() === 1 ? 4 : getCurrentQuarterNumber() - 1;
  const perviousQuarter =
    "Q" +
    perviousQuarterNumber +
    " " +
    (perviousQuarterNumber === 4 ? currentYear - 1 : currentYear);

  const turnoverTableData = getTurnoverRateTableParameters(turnoverRate);

  const absenteeismRateTableData =
    getAbsenteeismRateTableParameters(absenteesimRate);

  // const retentionRateTableData = {};
  const retentionRateTableData = getRetentionRateTableData(
    retentionRate,
    "retention_rate"
  );

  const firstYearRetentionRateTableData = getRetentionRateTableData(
    firstYearRetentionRate,
    "first_year_retention_rate"
  );
  // const firstYearRetentionRateTableData = getRetentionRateTableData(
  //   {}
  // );

  const internalMobilityRateTableData = getInternalMobilityRateTableData(
    null //TODO replace this with internal mobility rate API DATA
  );

  console.log(
    "tableData for reports check",
    isNaN(+internalMobilityRateTableData?.QoQValue)
  );
  const ColHeading = (props: any) => {
    const { heading, dataIndex } = props;
    const isCurrentSorted = sortedColumn === dataIndex;

    return (
      <div className="flex flex-row justify-between items-center">
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

  const columns: TableColumnsType<DataType> = [
    {
      title: <ColHeading heading="Metrics Name" dataIndex="matricName" />,
      dataIndex: "matricName",
      width: 200,
      sorter: (a, b) => a.matricName.localeCompare(b.matricName),
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("matricName"),
      }),
    },
    {
      title: (
        <ColHeading
          heading={`${perviousQuarter}`}
          dataIndex="previousQuarter"
        />
      ),
      dataIndex: "previousQuarter",
      width: 150,
      sorter: {
        compare: (a, b) => a.previousQuarter.localeCompare(b.previousQuarter),
        multiple: 3,
      },
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("previousQuarter"),
      }),
    },
    {
      title: <ColHeading heading="QoQ Change" dataIndex="QoQChange" />,
      dataIndex: "QoQChange",
      width: 150,
      sorter: {
        compare: (a, b) => {
          // Extract numeric values from QoQValue, handling N/A cases
          const aValue =
            a.QoQValue === "N/A" ? 0 : parseFloat(a.QoQValue || "0");
          const bValue =
            b.QoQValue === "N/A" ? 0 : parseFloat(b.QoQValue || "0");
          return aValue - bValue;
        },
        multiple: 2,
      },
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("QoQChange"),
      }),
    },
    {
      title: (
        <ColHeading
          heading={`Prediction ${currentQuarter}`}
          dataIndex="nextQuarter"
        />
      ),
      dataIndex: "nextQuarter",
      width: 150,
      sorter: {
        compare: (a, b) => {
          const aValue =
            a.nextQuarter === "N/A" ? 0 : parseFloat(a.nextQuarter);
          const bValue =
            b.nextQuarter === "N/A" ? 0 : parseFloat(b.nextQuarter);
          return aValue - bValue;
        },
        multiple: 1,
      },
      onHeaderCell: () => ({
        onClick: () => handleColumnSort("nextQuarter"),
      }),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      matricName: "Turnover Rate",
      previousQuarter: `${turnoverTableData?.previousQuarterTurnoverRate}%`,
      QoQValue: turnoverTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+turnoverTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {turnoverTableData?.QoQValue}%
          </div>
        </div>
      ),
      nextQuarter: `${turnoverTableData?.currentQuarterTurnoverRate}%`,
    },
    {
      key: "2",
      matricName: "Absenteeism Rate",
      previousQuarter: `${absenteeismRateTableData?.previousQuarterAbsenteeismRate}%`,
      QoQValue: absenteeismRateTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+absenteeismRateTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {absenteeismRateTableData?.QoQValue}%
          </div>
        </div>
      ),
      nextQuarter: `${absenteeismRateTableData?.currentQuarterAbsenteeismRate}%`,
    },
    {
      key: "3",
      matricName: "Retention Rate",
      previousQuarter: `${retentionRateTableData?.previousQuarterRetentinoRateRate}%`,
      QoQValue: retentionRateTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+retentionRateTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {retentionRateTableData?.QoQValue}%
          </div>
        </div>
      ),
      nextQuarter: `${retentionRateTableData?.currentQuarterRetentionRate}%`,
    },
    {
      key: "4",
      matricName: "First-Year Retention Rate",
      previousQuarter: `${
        firstYearRetentionRateTableData?.previousQuarterRetentinoRateRate
          ? firstYearRetentionRateTableData?.previousQuarterRetentinoRateRate +
            "%"
          : "N/A"
      }`,
      QoQValue: firstYearRetentionRateTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+firstYearRetentionRateTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {firstYearRetentionRateTableData?.QoQValue}%
          </div>
        </div>
      ),
      nextQuarter: `${
        firstYearRetentionRateTableData?.currentQuarterRetentionRate
          ? firstYearRetentionRateTableData?.currentQuarterRetentionRate + "%"
          : "N/A"
      }`,
    },
    // {
    //   key: "5",
    //   matricName: "Revenue per Employee",
    //   previousQuarter: "N/A",
    //   QoQValue: "+5.1",
    //   QoQChange: (
    //     <div className="flex items-center gap-[12px] flex-row">
    //       {/* <IoIosTrendingUp size={25} color="#28a745" /> */}
    //       <div className="h-[25px] w-[25px]"></div>
    //       <div className="flex item-center justify-center">N/A</div>
    //     </div>
    //   ),
    //   nextQuarter: "N/A",
    // },
    {
      key: "6",
      matricName: "Internal Mobility Rate",
      previousQuarter: `${
        internalMobilityRateTableData?.previousQuarterInternalMobilityoRateRate
          ? internalMobilityRateTableData?.previousQuarterInternalMobilityoRateRate
          : "N/A"
      }`,
      QoQValue: internalMobilityRateTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+internalMobilityRateTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : isNaN(+internalMobilityRateTableData?.QoQValue) ? (
            <div className="w-[25px]" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {}{" "}
            {isNaN(+internalMobilityRateTableData?.QoQValue) ? (
              <>
                {" "}
                <div>N/A</div>
              </>
            ) : (
              `${internalMobilityRateTableData?.QoQValue}%`
            )}
          </div>
        </div>
      ),
      nextQuarter: `${
        internalMobilityRateTableData?.currentQuarterInternalMobilityRate
          ? internalMobilityRateTableData?.currentQuarterInternalMobilityRate
          : "N/A"
      }`,
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <>
      {/* Desktop view */}
      <div className="md:block hidden ">
        <Table<DataType>
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={false}
          className="custom-antd-table"
          style={{
            borderRadius: "12px",
            border: "1px solid #CBD5E1",
            overflow: "hidden",
          }}
        />
      </div>

      {/* Mobile view  */}
      <div className="md:hidden block">
        <Collapse
          accordion
          className="w-full border-0"
          items={data.map((item: DataType) => ({
            key: item.key,
            label: item.matricName,
            styles: {
              header: {
                padding: "12px",
                borderRadius: 0,
                fontWeight: 600,
                backgroundColor: "rgba(203, 213, 225, 0.3)",
              },
              body: {
                border: "none",
                padding: 0,
              },
            },
            children: (
              <div className="w-full">
                <div className="grid grid-cols-2 border-b p-[12px]">
                  <div className="col-span-1 font-semibold">
                    {perviousQuarter}
                  </div>
                  <div className="col-span-1">14.5%</div>
                </div>
                <div className="grid grid-cols-2 border-b p-[12px]">
                  <div className="col-span-1 font-semibold">QoQ Change</div>
                  <div className="col-span-1">{item.QoQChange}</div>
                </div>
                <div className="grid grid-cols-2 border-b p-[12px]">
                  <div className="col-span-1 font-semibold">
                    {`Prediction ${currentQuarter}`}
                  </div>
                  <div className="col-span-1">{item.nextQuarter}</div>
                </div>
              </div>
            ),
          }))}
          expandIconPosition="start"
        />
      </div>
    </>
  );
};

export default CompanyPerformanceMatricsTable;
