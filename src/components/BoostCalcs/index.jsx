import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Subheader from '../Subheader';
import SimpleIFCalc from '../ItemFind/simple-if-calc';
import StandardIFCalc from '../ItemFind/standard-if-calc';
import ExperienceCalc from '../Experience/experience-calc';
import CaptureRate from '../CaptureRate';

import styles from '../ItemFindCapRateWrapper/index.module.css';

const navItems = {
    'simple-if': 'Simple IF',
    'item-find': 'Item Find',
    'experience': 'Experience',
    'cap-rate': 'Cap Rate',
};

function Disclaimer() {
    const [open, setOpen] = useState(true);

    if (!open) {
        return null;
    }

    return (
        <Alert
            severity="warning"
            variant="outlined"
            onClose={() => setOpen(false)}
            sx={{ mb: 2, fontSize: '1.2rem' }}
        >
            For guidance only — bhguides is not responsible for the accuracy of the numbers produced by this calculator.
        </Alert>
    );
}

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

function ExperiencePage() {
    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <ExperienceCalc />
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
                This calculator was ported from <a href="https://jsfiddle.net/dchzwg90/">Archangel/Cherubim&apos;s awesome jsfiddle</a>. 
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
    'item-find': CompleteIFPage,
    'experience': ExperiencePage,
    'cap-rate': CapRatePage,
};

export default function BoostCalcs({ activeTab }) {
    const activePage = activeTab in pages ? activeTab : 'simple-if';
    const ActiveComponent = pages[activePage];

    return (
        <>
            <Subheader navItems={navItems} activeKey={activePage} basePath="/boost-calcs" />
            <Container maxWidth="md" sx={{ mt: 2 }}>
                <Disclaimer />
            </Container>
            <ActiveComponent />
        </>
    );
}
