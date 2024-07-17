import { createSlice } from "@reduxjs/toolkit";
import options from "./calcOptions.json";

export const calcSlice = createSlice({
    name: "calc",
    initialState: {
        options,
    },
    reducers: {},
});

export default calcSlice.reducer;
