import { createSlice } from "@reduxjs/toolkit";
import groups from "./gallery.json";

export const gallerySlice = createSlice({
    name: "gallery",
    initialState: {
        ...groups,
    },
    reducers: {},
});

export default gallerySlice.reducer;
