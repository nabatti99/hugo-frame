import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";

export const setGApiClientCase: CaseReducer<GoogleState, PayloadAction<any>> = (state, action) => {
    state.gApiClient = action.payload;
};
