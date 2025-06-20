import { Navigate, Outlet } from "react-router-dom";
import CompanyPerformance from "./pages/CompanyPerformance";
import Login from "./pages/Login";
import { getLocalData } from "./utils/localStorage";
import FinacialImpact from "./pages/FinacialImpact";
import CompanyPerformancePredictiveAnalytics from "./pages/PredictiveAnalytics2/CompanyPerformancePredictiveAnallytics";
import FinancialImpactPA from "./pages/PredictiveAnalytics2/FinancialImpactPA";

import Engagement from "./pages/Engagement";
import PredictiveAnalytics from "./pages/PredictiveAnalytics2";
import Monitor from "./pages/Monitor";
// import Reports from "./pages/Reports";
import KeyReport from "./pages/Reports/KeyReport";
import MyReports from "./pages/Reports/MyReports";
import CompanyPerformaceMetrics from "./pages/Reports/KeyReport/SeeDetails/CompanyPerformanceMatrics";
import ViewDetailsCompanyPerformace from "./pages/Reports/KeyReport/ViewDetails/CompanyPerformance";
import FinancialImpactMatrics from "./pages/Reports/KeyReport/SeeDetails/FinancialImpactMatrics";
import ViewDetailsFinancialImpact from "./pages/Reports/KeyReport/ViewDetails/FinancialImpact";
import CreatedReportsPage from "./pages/Reports/KeyReport/CreatedReportsPages/CreatedReportsPage";
import UserAndTeam from "./pages/UserAndTeam";
import ViewDetailsCreateReport from "./pages/Reports/KeyReport/CreatedReportsPages/ViewDetails";
import CreatedComparisionPage from "./pages/Reports/KeyReport/CreatedReportsPages/CreatedComparisionPage";
import Settings from "./pages/Settings";
import ForgottenPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PredictiveAnalyticsNew from "./pages/PredictiveAnalytics3";
import RiskAlert from "./pages/PredictiveAnalytics3/RiskAlert";
import CompanyPulse from "./pages/CompanyPulse";
import SavedReport from "./pages/Reports/SavedReport";
import AIChatBot from "./pages/AIChatBot";
const authToken = getLocalData("token")?.access_token;

type Route = {
  path: string;
  element: JSX.Element;
};

const Layout = () => (
  <>
    {/* <ScrollToTop /> */}
    <Outlet />
  </>
);

const publicRoutes: Route[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgottenPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <Navigate to={"/"} replace />,
  },
];

const privatRoutes: Route[] = [
  {
    path: "/",
    element: <CompanyPerformance />,
  },
  {
    path: "/financial-impact",
    element: <FinacialImpact />,
  },
  {
    path: "/predictive-analytics",
    element: <PredictiveAnalytics />,
  },
  {
    path: "/predictive-analytics-3",
    element: <PredictiveAnalyticsNew />,
  },
  {
    path: "/predictive-analytics/CompanyPerformance",
    element: <CompanyPerformancePredictiveAnalytics />,
  },
  {
    path: "/predictive-analytics/FinancialImpact",
    element: <FinancialImpactPA />,
  },
  {
    path: "/predictive-analytics/RiskAlert",
    element: <RiskAlert />,
  },
  {
    path: "/predictive-analytics/Engagement",
    element: <Engagement />,
  },
  {
    path: "/monitor",
    element: <Monitor />,
  },
  {
    path: "/key-report",
    element: <KeyReport />,
  },
  {
    path: "/my-report",
    element: <MyReports />,
  },
  {
    path: "/saved-report",
    element: <SavedReport />,
  },
  {
    path: "/reports/KeyReports",
    element: <KeyReport />,
  },
  {
    path: "/reports/MyReport",
    element: <MyReports />,
  },
  {
    path: "/reports/SeeDetails/CompanyPerformace",
    element: <CompanyPerformaceMetrics />,
  },
  {
    path: "/reports/CompanyPerformanceDetails",
    element: <ViewDetailsCompanyPerformace />,
  },
  {
    path: "/reports/SeeDetails/FinancialImpact",
    element: <FinancialImpactMatrics />,
  },
  {
    path: "/reports/FinancialImapctDetails",
    element: <ViewDetailsFinancialImpact />,
  },
  {
    path: "/reports/ViewReport",
    element: <CreatedReportsPage />,
  },
  {
    path: "/report/ViewComparison",
    element: <CreatedComparisionPage />,
  },
  {
    path: "/reports/ViewDetails",
    element: <ViewDetailsCreateReport />,
  },
  {
    path: "/user-and-team",
    element: <UserAndTeam />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/company-pulse",
    element: <CompanyPulse />,
  },
  {
    path: "/chatbot",
    element: <AIChatBot/>,
  },
  {    path: "*",
    element: <Navigate to={"/"} replace />,
  },
];
//To Do Token Expire Check
// export const routes = authToken ? privatRoutes : publicRoutes;
export const routes = [
  {
    path: "/",
    element: <Layout />, // Wrap with Layout to include ScrollToTop
    children: authToken ? privatRoutes : publicRoutes,
    // children:  publicRoutes,
  },
];
