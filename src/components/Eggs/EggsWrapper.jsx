import React, { useState } from 'react';
import Subheader from '../Subheader';
import EggCalculator from './EggCalculator';
import EggCracker from './EggCracker';

const navItems = {
    calculator: 'Calculator',
    cracker: "Crack 'em",
};

const pages = {
    calculator: EggCalculator,
    cracker: EggCracker,
};

export default function EggsWrapper() {
    const [activePage, setActivePage] = useState('calculator');
    const ActiveComponent = pages[activePage];

    return (
        <>
            <Subheader navItems={navItems} activeKey={activePage} onSelect={setActivePage} />
            <ActiveComponent />
        </>
    );
}
