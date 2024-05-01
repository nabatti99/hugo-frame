import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { HomeState } from "./type";

export const setFrameUrlCase: CaseReducer<HomeState, PayloadAction<string | undefined>> = (state, action) => {
    state.frameUrl = action.payload;
};

export const setAvatarUrlCase: CaseReducer<HomeState, PayloadAction<string | undefined>> = (state, action) => {
    state.avatarUrl = action.payload;
};
