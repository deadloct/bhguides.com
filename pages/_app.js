import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useEffect, useState } from 'react';
import '../styles/globals.css';

import { ThemeContext } from '../src/context/theme';
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import HashRedirect from "../src/components/HashRedirect";

function MyApp({ Component, pageProps }) {
    const [themeMode, setThemeMode] = useState('dark');

    const toggleTheme = () => setThemeMode(m => m === 'dark' ? 'light' : 'dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', themeMode);
    }, [themeMode]);

    const theme = useMemo(() => createTheme({
        palette: {
            mode: themeMode,
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 1000,
                lg: 1200,
                xl: 1536,
            },
        },
    }), [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <HashRedirect />
                    <Header />
                    <main style={{ flex: 1 }}>
                        <Component {...pageProps} />
                    </main>
                    <Footer />
                </div>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default MyApp;
