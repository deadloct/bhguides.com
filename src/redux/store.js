import { configureStore } from "@reduxjs/toolkit"

import calcSlice from "./calcSlice"
import gallerySlice from "./gallerySlice"
import guidesSlice from "./guidesSlice"
import videoSlice from "./videoSlice"

export default configureStore({
    reducer: {
        calc: calcSlice,
        gallery: gallerySlice,
        guides: guidesSlice,
        videos: videoSlice,
    },
});
