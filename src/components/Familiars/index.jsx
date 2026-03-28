import React, { useState } from 'react';
import Subheader from '../Subheader';
import FamiliarStats from '../FamiliarCalc/FamiliarStats';
import FamiliarPersuades from '../FamiliarCalc/FamiliarPersuades';

const navItems = {
    stats: 'Stats',
    persuades: 'Persuades',
};

const pages = {
    stats: FamiliarStats,
    persuades: FamiliarPersuades,
};

export default function Familiars() {
    const [activePage, setActivePage] = useState('stats');
    const ActiveComponent = pages[activePage];

    return (
        <>
            <Subheader navItems={navItems} activeKey={activePage} onSelect={setActivePage} />
            <ActiveComponent />
        </>
    );
}
