import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Header from "../Header";
import Footer from "../Footer";
import Guides from "../Guides";
import RNGME from "../RNGME";
import Tools from "../Tools";
import TurnRateCalc from "../TurnRateCalc";
import FamiliarCalc from "../FamiliarCalc";
import { updatePageMeta } from "../../utils/seo";

function SEOUpdater() {
    const location = useLocation();
    
    useEffect(() => {
        updatePageMeta(location.pathname);
    }, [location.pathname]);
    
    return null;
}

export default function Home() {
    return (
        <HashRouter>
            <SEOUpdater />
            <Header />
            <Routes>
                <Route path="/" element={<Guides />} />
                <Route path="/item-find" element={<Tools />} />
                <Route path="/turn-rate" element={<TurnRateCalc />} />
                <Route path="/familiar-calc" element={<FamiliarCalc />} />
                <Route path="/rng-me" element={<RNGME />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
};
