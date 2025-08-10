import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Home from "./components/Home";
import { setTheme } from './redux/themeSlice';

function App() {
    const dispatch = useDispatch();
    const themeMode = useSelector(state => state.theme.mode);

    // Initialize theme attribute on mount
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    const theme = useMemo(() => createTheme({
        palette: {
            mode: themeMode,
        },
    }), [themeMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Home /> 
        </ThemeProvider>
    );
}

export default App;
