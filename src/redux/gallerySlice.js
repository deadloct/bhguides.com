import { createSlice } from "@reduxjs/toolkit";

const groups = require("./gallery.json");

export const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        ...groups,
    },
    reducers: {},
});

export default gallerySlice.reducer;
