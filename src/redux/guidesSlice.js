import { createSlice } from "@reduxjs/toolkit";

const guides = require("./guides.json");

export const guidesSlice = createSlice({
    name: "guides",
    initialState: [
        ...guides,
    ],
    reducers: {},
});

export default guidesSlice.reducer;
