import { createSlice } from "@reduxjs/toolkit";
import { HomeState } from "./type";
import { setAvatarUrlCase, setFrameUrlCase } from "./home.reducers";

const initialState: HomeState = {};

// Create redux slice
export const homeSlice = createSlice({
    name: "HOME_STATE",
    initialState,
    reducers: {
        setFrameUrl: setFrameUrlCase,
        setAvatarUrl: setAvatarUrlCase,
    },
});

// Export actions
export const { setFrameUrl, setAvatarUrl } = homeSlice.actions;

// Export reducer
export const homeReducer = homeSlice.reducer;
