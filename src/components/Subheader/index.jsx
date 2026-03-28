import React from 'react';
import Container from '@mui/material/Container';
import styles from './index.module.css';

export default function Subheader({ navItems, activeKey, onSelect }) {
    return (
        <div className={styles["subheader"]}>
            <Container maxWidth="md">
                <nav className={styles["subnav"]}>
                    <ul>
                        {Object.entries(navItems).map(([key, label]) => (
                            <li key={key}>
                                <button
                                    className={`${styles["subnav-link"]}${activeKey === key ? ` ${styles["active"]}` : ''}`}
                                    onClick={() => onSelect(key)}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </div>
    );
}
