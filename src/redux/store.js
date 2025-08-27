import { configureStore } from "@reduxjs/toolkit"

import calcSlice from "./calcSlice"
import guidesSlice from "./guidesSlice"
import themeSlice from "./themeSlice"

export const store = configureStore({
    reducer: {
        calc: calcSlice,
        guides: guidesSlice,
        theme: themeSlice,
    },
});

export default store;
