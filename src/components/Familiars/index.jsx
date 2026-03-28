import React from 'react';
import Subheader from '../Subheader';
import FamiliarStats from '../FamiliarCalc/FamiliarStats';
import FamiliarPersuades from '../FamiliarCalc/FamiliarPersuades';

const navItems = {
    stats: 'Stats',
    persuades: "Why won't you love me?",
};

const pages = {
    stats: FamiliarStats,
    persuades: FamiliarPersuades,
};

export default function Familiars({ activeTab }) {
    const activePage = activeTab in pages ? activeTab : 'stats';
    const ActiveComponent = pages[activePage];

    return (
        <>
            <Subheader navItems={navItems} activeKey={activePage} basePath="/familiar-calc" />
            <ActiveComponent />
        </>
    );
}
