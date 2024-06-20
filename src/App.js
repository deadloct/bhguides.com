import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";

// import useMediaQuery from '@mui/material/useMediaQuery';

import Home from "./components/Home";

function App() {
    
    // Enable light/dark toggle: uncommon useMediaQuery above and add useMemo
    // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    })
        
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Home /> 
        </ThemeProvider>
    );
}

export default App;
