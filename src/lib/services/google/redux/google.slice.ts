import { createSlice } from "@reduxjs/toolkit";
import { setGApiClientCase } from "./google.reducers";
import { SERVICE_NAME } from "../constants";

const initialState: GoogleState = {
    gApiClient: null,
};

// Create redux slice
export const googleSlice = createSlice({
    name: SERVICE_NAME,
    initialState,
    reducers: {
        setGApiClient: setGApiClientCase,
    },
});

// Export actions
export const { setGApiClient } = googleSlice.actions;

// Export reducer
export const googleReducer = googleSlice.reducer;
