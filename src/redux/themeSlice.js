import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  if (typeof window === 'undefined') {
    return 'dark'; // Default for SSR
  }
  
  const savedTheme = localStorage.getItem('bhguides-theme');
  if (savedTheme) {
    return savedTheme;
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  
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