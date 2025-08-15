import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";
import Guides from "../Guides";
import RNGME from "../RNGME";
import Tools from "../Tools";
import TurnRateCalc from "../TurnRateCalc";
import FamiliarCalc from "../FamiliarCalc";

export default function Home() {
    return (
        <HashRouter>
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
