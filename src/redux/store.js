import { configureStore } from "@reduxjs/toolkit"

import calcSlice from "./calcSlice"
import guidesSlice from "./guidesSlice"
import themeSlice from "./themeSlice"

export default configureStore({
    reducer: {
        calc: calcSlice,
        guides: guidesSlice,
        theme: themeSlice,
    },
});
