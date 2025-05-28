import { createSlice } from "@reduxjs/toolkit";
import data from "./guides.json";

// Sort guides alphabetically
Object.keys(data.guides).forEach(k => {
    data.guides[k].guides.sort((a, b) => a.name.localeCompare(b.name));
});

export const guidesSlice = createSlice({
    name: "guides",
    initialState: {
        "index": [...data.index],
        "guides": {...data.guides},
    },
    reducers: {},
});

export default guidesSlice.reducer;
