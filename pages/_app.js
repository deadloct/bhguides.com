import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from "@mui/material/CssBaseline";
import { useMemo, useEffect } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { store } from '../src/redux/store';
import '../styles/globals.css';
import '../src/index.css';

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import HashRedirect from "../src/components/HashRedirect";
import { setTheme } from '../src/redux/themeSlice';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <AppContent Component={Component} pageProps={pageProps} />
        </Provider>
    );
}

function AppContent({ Component, pageProps }) {
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
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <HashRedirect />
                <Header />
                <main style={{ flex: 1 }}>
                    <Component {...pageProps} />
                </main>
                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default MyApp;