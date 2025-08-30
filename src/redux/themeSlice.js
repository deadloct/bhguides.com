import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  // Light mode disabled - always return dark
  return 'dark';
};

const initialState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('bhguides-theme', state.mode);
        document.documentElement.setAttribute('data-theme', state.mode);
      }
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('bhguides-theme', state.mode);
        document.documentElement.setAttribute('data-theme', state.mode);
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;