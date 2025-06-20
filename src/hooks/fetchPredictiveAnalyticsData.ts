import { useMemo } from 'react';

import { transformDataforPredictiveAnalytics, transformDataforPredictiveAnalyticsTempFYRR, transformRevenuePerEmployee } from '@/pages/PredictiveAnalytics2/transformHelper';
import { transformYearlyData } from '@/pages/FinacialImpact/transformHelper';

export const usePredictiveAnalytics = (data: any, periodSelected: string) => {
  // console.log("data in prdiction interval screen",  data)
  return useMemo(() => ({
    turnoverRate: transformDataforPredictiveAnalytics(
      data.turnoverRate,
      periodSelected,
      'turnover_rate'
    ),
    turnoverCost: transformDataforPredictiveAnalytics(
      data.turnoverCostData,
      periodSelected,
      'turnover_cost'
    ),
    absenteeismRate: transformDataforPredictiveAnalytics(
      data.absenteesimRate,
      periodSelected,
      'absenteeism_rate'
    ),
    absenteeismCost: transformDataforPredictiveAnalytics(
      data.absenteesimCostData,
      periodSelected,
      'absenteeism_cost'
    ),
    revenuePerEmployee: transformRevenuePerEmployee(
      data.revenuePerEmployee,
      Number(periodSelected)
    ),
    retentionRate: transformDataforPredictiveAnalytics(
      data.retentionRate,
      periodSelected,
      'retention_rate'
    ),
    firstYearRetentionRate: transformDataforPredictiveAnalyticsTempFYRR(
      data.firstYearRetentionRate,
      periodSelected,
      'retention_rate'
    ),
    internalMobilityRate: transformDataforPredictiveAnalytics(
      data.internalMobilityRate,
      periodSelected,
      'internal_mobility_rate'
    ),
    costOfVacancy: transformDataforPredictiveAnalytics(
      data.turnoverCostData,
      periodSelected,
      'cost_of_vacancy'
    ),
    performanceDeficit: transformYearlyData(
      data.
      performanceDefecitImpactData
      ,
      periodSelected,
      'total_performance_deficit'
    )
  }), [data, periodSelected]);
};