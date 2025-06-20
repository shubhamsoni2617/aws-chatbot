import React, { useState } from "react";
import { Collapse, Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import {
  IoIosTrendingUp,
  IoIosTrendingDown,
  IoIosArrowUp,
  IoIosArrowDown,
} from "react-icons/io";

import { useAppSelector } from "@/store/hooks";

import {
  getAbsenteeismCost,
  getCostOfVacancyTableData,
  // getPerformnceDeficitImpact,
  getTurnoverCostTableData,
} from "./helper";
import {
  getCurrentQuarterNumber,
  getCurrentQuarterNumericString,
} from "@/utils/helper/CurrentQuarterGraphHelper";

import '../table.css'

interface DataType {
  key: React.Key;
  matricName: string;
  previousQuarter: string;
  QoQChange: any;
  QoQValue?: string;
  nextQuarter: any;
}

const FinancialImpactMatricsTable = () => {
  const [sortedColumn, setSortedColumn] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend" | null>(null);

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

  const currentYear = new Date().getFullYear();
  const currentQuarter = getCurrentQuarterNumericString() + " " + currentYear;

  const perviousQuarterNumber =
    getCurrentQuarterNumber() === 1 ? 4 : getCurrentQuarterNumber() - 1;
  const perviousQuarter =
    "Q" +
    perviousQuarterNumber +
    " " +
    (perviousQuarterNumber === 4 ? currentYear - 1 : currentYear);

  const {
    absenteesimCostData,
    turnoverCostData,
    // performanceDefecitImpactData,
  } = useAppSelector((store) => store.financiaImpact);

  const absenteeismCostTableData = getAbsenteeismCost(absenteesimCostData);

  const turnoverCostTableData = getTurnoverCostTableData(turnoverCostData);

  const costOfVacancyTableData = getCostOfVacancyTableData(turnoverCostData);

  // const pdiTableData = getPerformnceDeficitImpact(performanceDefecitImpactData);

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
          const aValue = parseFloat(a.QoQValue || "0");
          const bValue = parseFloat(b.QoQValue || "0");
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
        compare: (a, b) =>
          parseFloat(a.nextQuarter) - parseFloat(b.nextQuarter),
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
      matricName: "Cost of Vacancy",
      previousQuarter: `${costOfVacancyTableData?.previousQuarterCostOfVacancy}`,
      QoQValue: costOfVacancyTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+costOfVacancyTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {costOfVacancyTableData?.QoQValue}%
          </div>
        </div>
      ),
      nextQuarter: `${costOfVacancyTableData?.currentQuarterCostOfVacancy}`,
    },
    {
      key: "2",
      matricName: "Turnover Cost",
      previousQuarter: `${turnoverCostTableData?.previousQuarterTurnoverCost}`,
      QoQValue: turnoverCostTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+turnoverCostTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {turnoverCostTableData?.QoQValue}%
          </div>
        </div>
      ),
      nextQuarter: `${turnoverCostTableData?.currentQuarterTurnoverCost}`,
    },
    
    // {
    //   key: "3",
    //   matricName: "Performance Defecit Impact",
    //   previousQuarter: `${pdiTableData?.previousQuarterPDI}`,
    //   QoQValue: pdiTableData?.QoQValue,
    //   QoQChange: (
    //     <div className="flex items-center gap-[12px] flex-row">
    //       {+pdiTableData?.QoQValue > 0 ? (
    //         <IoIosTrendingUp size={25} color="#28a745" />
    //       ) : (
    //         <IoIosTrendingDown size={25} color="red" />
    //       )}
    //       <div className="flex item-center justify-center">
    //         {pdiTableData?.QoQValue}%
    //       </div>
    //     </div>
    //   ),
    //   nextQuarter: `${pdiTableData?.currentQuarterPDI}`,
    // },

    {
      key: "4",
      matricName: "Absenteeism Cost",
      previousQuarter: `${absenteeismCostTableData?.previousQuarterAbsenteeismCost}`,
      QoQValue: absenteeismCostTableData?.QoQValue,
      QoQChange: (
        <div className="flex items-center gap-[12px] flex-row">
          {+absenteeismCostTableData?.QoQValue > 0 ? (
            <IoIosTrendingUp size={25} color="#28a745" />
          ) : (
            <IoIosTrendingDown size={25} color="red" />
          )}
          <div className="flex item-center justify-center">
            {absenteeismCostTableData?.QoQValue}%
          </div>
        </div>
      ),
      nextQuarter: `${absenteeismCostTableData?.currentQuarterAbsenteeismCost}`,
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
      <div className="md:block hidden">
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

export default FinancialImpactMatricsTable;
