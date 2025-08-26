import { createSlice } from "@reduxjs/toolkit";
import data from "./guides.json";

// Natural/alphanumeric sorting function that handles numbers within strings correctly
const naturalSort = (a, b) => {
    return a.localeCompare(b, undefined, { 
        numeric: true, 
        sensitivity: 'base' 
    });
};

// Sort guides using natural/alphanumeric sorting
Object.keys(data.guides).forEach(k => {
    data.guides[k].guides.sort((a, b) => naturalSort(a.name, b.name));
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
