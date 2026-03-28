import React from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import styles from './index.module.css';

export default function Subheader({ navItems, activeKey, basePath }) {
    const keys = Object.keys(navItems);
    const defaultKey = keys[0];

    return (
        <div className={styles["subheader"]}>
            <Container maxWidth="md">
                <nav className={styles["subnav"]}>
                    <ul>
                        {Object.entries(navItems).map(([key, label]) => (
                            <li key={key}>
                                <Link
                                    href={key === defaultKey ? basePath : `${basePath}/${key}`}
                                    className={`${styles["subnav-link"]}${activeKey === key ? ` ${styles["active"]}` : ''}`}
                                >
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </Container>
        </div>
    );
}
