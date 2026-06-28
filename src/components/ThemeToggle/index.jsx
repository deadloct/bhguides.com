import React from 'react';
import { Tooltip } from '@mui/material';
import { LightMode, ModeNight } from '@mui/icons-material';

import { useTheme } from '../../context/theme';
import styles from './index.module.css';

export default function ThemeToggle() {
    const { themeMode, toggleTheme } = useTheme();
    const isDarkMode = themeMode === 'dark';

    return (
        <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
            <div className={styles['theme-toggle-container']}>
                <LightMode className={styles['sun-icon']} />
                <div
                    className={styles['toggle-switch']}
                    onClick={toggleTheme}
                    role="button"
                    tabIndex={0}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            toggleTheme();
                        }
                    }}
                >
                    <div className={`${styles['toggle-slider']} ${isDarkMode ? styles['dark'] : styles['light']}`}>
                        <div className={styles['toggle-thumb']}></div>
                    </div>
                </div>
                <ModeNight className={styles['moon-icon']} />
            </div>
        </Tooltip>
    );
}
