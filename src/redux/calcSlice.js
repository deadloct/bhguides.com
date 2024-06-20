import { createSlice } from "@reduxjs/toolkit";

const options = require("./calcOptions.json");

export const calcSlice = createSlice({
    name: "calc",
    initialState: {
        options,
    },
    reducers: {},
});

export default calcSlice.reducer;
