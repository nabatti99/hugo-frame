import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HomeState } from "./type";

export const setFrameBlobUrlCase: CaseReducer<HomeState, PayloadAction<string | undefined>> = (state, action) => {
    state.frameBlobUrl = action.payload;
};

export const setAvatarBlobUrlCase: CaseReducer<HomeState, PayloadAction<string | undefined>> = (state, action) => {
    state.avatarBlobUrl = action.payload;
};
