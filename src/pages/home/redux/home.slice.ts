import { createSlice } from "@reduxjs/toolkit";
import { HomeState } from "./type";
import { setAvatarBlobUrlCase, setFrameBlobUrlCase } from "./home.reducers";

const initialState: HomeState = {};

// Create redux slice
export const homeSlice = createSlice({
    name: "HOME_STATE",
    initialState,
    reducers: {
        setFrameBlobUrl: setFrameBlobUrlCase,
        setAvatarBlobUrl: setAvatarBlobUrlCase,
    },
});

// Export actions
export const { setFrameBlobUrl, setAvatarBlobUrl } = homeSlice.actions;

// Export reducer
export const homeReducer = homeSlice.reducer;
