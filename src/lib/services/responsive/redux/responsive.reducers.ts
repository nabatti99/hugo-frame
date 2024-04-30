import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";
import { ResponsiveState } from "./type";
import { Breakpoint } from "@radix-ui/themes/dist/cjs/props";

export const setResponsiveBreakPointsCase: CaseReducer<ResponsiveState, PayloadAction<Breakpoint[]>> = (state, action) => {
    state.breakpoints = action.payload;
};
