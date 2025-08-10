import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import { LightMode, ModeNight } from '@mui/icons-material';

import { toggleTheme } from '../../redux/themeSlice';
import styles from './index.module.css';

export default function ThemeToggle() {
    const dispatch = useDispatch();
    const themeMode = useSelector(state => state.theme.mode);
    
    const handleToggle = () => {
        dispatch(toggleTheme());
    };
    
    const isDarkMode = themeMode === 'dark';
    
    return (
        <Tooltip title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}>
            <div className={styles['theme-toggle-container']}>
                <LightMode className={styles['sun-icon']} />
                <div 
                    className={styles['toggle-switch']}
                    onClick={handleToggle}
                    role="button"
                    tabIndex={0}
                    aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggle();
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