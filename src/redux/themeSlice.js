import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  return 'dark';
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        document.documentElement.setAttribute('data-theme', state.mode);
      }
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;