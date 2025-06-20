
import authReducer from "./auth";
import profileReducer from "../reducers/profile";
import userData from './user';
import companyPerformanceData from './companyPerformanceReducer';
import financialImpactReducer from './financialImpact';
import createReportreducer from './createReport';
import reportsReducer from './reportsReducer';
import changeTwoFA from './auth';
import changePasswordReducer from './auth'
import settingsReducer from "./settings";
import updateProfile from './updateProfile';
import forgotPasswordReducer from "./auth";
import resetPasswordReducer from "./auth";
import predictiveAnalyticsReducer from "./predictiveAnalytics";
import monitorReducer from "./monitorReducer";
import userAndTeams from "./userAndTeams";

const rootReducer = {
  auth: authReducer,
  profile: profileReducer,
  userData :userData,
  companyPerformanceData: companyPerformanceData,
  financiaImpact: financialImpactReducer,
  createReport: createReportreducer,
  reportsData: reportsReducer,
  changeTwoFA: changeTwoFA,
  changePassword: changePasswordReducer,
  settings: settingsReducer,
  updateProfile: updateProfile,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
  predictiveAnalytics : predictiveAnalyticsReducer,
  monitor: monitorReducer,
  userAndTeams: userAndTeams,
}

export default rootReducer;


// import authReducer from "./auth";
// import companyPerformanceReducer from "./companyPerformance";
// import reportsReducer from "./reports";
// import financialImpactReducer from "./financialImpact"
// import settingsReducer from "./settings";
// import companyPerformancePrectiveAnalyticsReducer from "./companyPerformancePredictiveAnalytics"
// import financialImpactPredictiveAnalyticsReducer from "./financialImpactPredictiveAnalytics"
// import forgotPasswordReducer from "./auth";
// import resetPasswordReducer from "./auth";
// import profileReducer from "./profile";
// import changePasswordReducer from './auth'
// import changeTwoFA from './auth';
// import updateProfile from './updateProfile';
// import adminLogin from './adminLogin';
// import employeeData from './employeeData'
// import userData from './user'

// const rootReducer = {
//   auth: authReducer,
//   companyPerformance: companyPerformanceReducer,
//   reports: reportsReducer,
//   financiaImpact: financialImpactReducer,
//   settings: settingsReducer,
//   companyPerformancePrectiveAnalytics: companyPerformancePrectiveAnalyticsReducer,
//   financialImpactPredictiveAnalytics: financialImpactPredictiveAnalyticsReducer,
//   forgotPassword: forgotPasswordReducer,
//   resetPassword: resetPasswordReducer,
//   profile: profileReducer,
//   changePassword: changePasswordReducer,
//   changeTwoFA: changeTwoFA,
//   updateProfile: updateProfile,
//   adminLogin: adminLogin,
//   employeeData: employeeData,
//   userData :userData,
// }

// export default rootReducer;