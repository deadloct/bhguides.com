import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Subheader from '../Subheader';
import SimpleIFCalc from '../ItemFind/simple-if-calc';
import StandardIFCalc from '../ItemFind/standard-if-calc';
import CaptureRate from '../CaptureRate';

import styles from '../ItemFindCapRateWrapper/index.module.css';

const navItems = {
    'simple-if': 'Simple IF',
    'complete-if': 'Complete IF',
    'cap-rate': 'Cap Rate',
};

function SimpleIFPage() {
    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <SimpleIFCalc />
            <Credits />
        </Container>
    );
}

function CompleteIFPage() {
    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <StandardIFCalc />
            <Credits />
        </Container>
    );
}

function CapRatePage() {
    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <CaptureRate />
            <Credits />
        </Container>
    );
}

function Credits() {
    return (
        <>
            <p className={styles.overview}>
                Calculators ported from <a href="https://jsfiddle.net/dchzwg90/">Archangel/Cherubim&apos;s awesome jsfiddle</a>. 
            </p> 
            <p className={styles.suboverview}>
                Credits to pixelbxss for finding some critical issues with the site and for making suggestions, iWushock for sharing the jsfiddle, Uber-gecko for asking for it, skye666 for making an awesome spreadsheet calculator that I used for ages, and everybody in [DÀRK] for being super rad.
            </p>
            <p className={styles.signature}>
                --BillyIdol
            </p>
        </>
    );
}

const pages = {
    'simple-if': SimpleIFPage,
    'complete-if': CompleteIFPage,
    'cap-rate': CapRatePage,
};

export default function BoostCalcs() {
    const [activePage, setActivePage] = useState('simple-if');
    const ActiveComponent = pages[activePage];

    return (
        <>
            <Subheader navItems={navItems} activeKey={activePage} onSelect={setActivePage} />
            <ActiveComponent />
        </>
    );
}
