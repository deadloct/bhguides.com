import { createSlice } from "@reduxjs/toolkit";
import data from "./guides.json";

export const guidesSlice = createSlice({
    name: "guides",
    initialState: {
        "index": [...data.index],
        "guides": {...data.guides},
    },
    reducers: {},
});

export default guidesSlice.reducer;
