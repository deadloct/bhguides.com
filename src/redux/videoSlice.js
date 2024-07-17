import { createSlice } from "@reduxjs/toolkit";
import db from "./videos.json";

export const videoSlice = createSlice({
    name: "videos",
    initialState: {
        db,
        currentVideo: {},
        showExcluded: false,
    },
    reducers: {
        selectVideo: (state, action) => {
            state.currentVideo = action.payload;
        },
        setShowExcluded: (state, action) => {
            state.showExcluded = action.payload;
        },
    },
});

export const { selectVideo } = videoSlice.actions;

export default videoSlice.reducer;
