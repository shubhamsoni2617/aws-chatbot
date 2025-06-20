import { createSlice } from "@reduxjs/toolkit";
import {
  saveReportData,
  getReportsData,
  getReportRecommendation,
  getReportComment,
  getKeyReportComment,
  getOverviewKeyReportComment,
} from "../actions";

const initialState = {
  // Save Report Data
  isLoadingSaveReportData: false,

  // Reports Data
  isLoadingReportsData: false,
  reportsData: null,

  //reports and start reports count
  reportsCount:null,
  starReportCount:null,

  //Recommedation Data
  isRecommendationLoading: false,
  reportsRecommendation: null,

  //Report Comments or Notes
  isNotesLoading: false,
  notes: null,

  //Key Reports Comment
  isKeyReportCommentLoading: false,
  keyReportsComment: null,

  //OverView Notes or comments Key Reports
  isOverViewKeyReportCommentLoading: false,
  overViewKeyReportsComment: null,
};

const reportsSlice = createSlice({
  name: "reportsData",
  initialState,
  reducers: {
    setNotesToNull: (state) => {
      state.notes = null;
    },
  },

  extraReducers: (builder) => {
    // Save Report Data
    builder.addCase(saveReportData.pending, (state) => {
      state.isLoadingSaveReportData = true;
    });
    builder.addCase(saveReportData.fulfilled, (state) => {
      state.isLoadingSaveReportData = false;
    });

    // Get Reports Data
    builder.addCase(getReportsData.pending, (state) => {
      state.isLoadingReportsData = true;
    });
    builder.addCase(getReportsData.fulfilled, (state, action) => {
      state.isLoadingReportsData = false;
      state.reportsData = action.payload;
      state.reportsCount = action.payload.length;
      state.starReportCount = action.payload.filter((report:any) => report.is_starred).length
    });

    //GET Recommendation Data
    builder.addCase(getReportRecommendation.pending, (state) => {
      state.isRecommendationLoading = true;
    });
    builder.addCase(getReportRecommendation.fulfilled, (state, action) => {
      state.isRecommendationLoading = false;
      state.reportsRecommendation = action.payload;
    });

    //GET Reports Commentes or Notes
    builder.addCase(getReportComment.pending, (state) => {
      state.isNotesLoading = true;
    });

    builder.addCase(getReportComment.fulfilled, (state, action) => {
      state.isNotesLoading = false;
      state.notes = action.payload;
    });
    builder.addCase(getReportComment.rejected, (state) => {
      state.isNotesLoading = false;
      state.notes = null;
    });

    //GET Key Reports Commentes

    builder.addCase(getKeyReportComment.pending, (state) => {
      state.isKeyReportCommentLoading = true;
    });
    builder.addCase(getKeyReportComment.fulfilled, (state, action) => {
      state.isKeyReportCommentLoading = false;
      state.keyReportsComment = action.payload;
    });

    //GET OverView Notes or Comments
    builder.addCase(getOverviewKeyReportComment.pending, (state) => {
      state.isOverViewKeyReportCommentLoading = true;
    });
    builder.addCase(getOverviewKeyReportComment.fulfilled, (state, action) => {
      state.isOverViewKeyReportCommentLoading = false;
      state.overViewKeyReportsComment = action.payload;
    });
    // builder.addCase(getOverviewKeyReportComment.rejected, (state) => {
    //   state.isOverViewKeyReportCommentLoading = false;
    //   state.overViewKeyReportsComment = null;
    // })
  },
});

export const { setNotesToNull } = reportsSlice.actions;
export default reportsSlice.reducer;
