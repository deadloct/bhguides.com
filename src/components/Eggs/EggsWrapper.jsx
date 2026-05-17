import React from 'react';
import Subheader from '../Subheader';
import EggCalculator from './EggCalculator';
import EggCracker from './EggCracker';

const navItems = {
    cracker: "Crack 'em",
    calculator: 'Calculator',
};

const pages = {
    cracker: EggCracker,
    calculator: EggCalculator,
};

export default function EggsWrapper({ activeTab }) {
    const activePage = activeTab in pages ? activeTab : 'cracker';
    const ActiveComponent = pages[activePage];

    return (
        <>
            <Subheader navItems={navItems} activeKey={activePage} basePath="/eggs" />
            <ActiveComponent />
        </>
    );
}
