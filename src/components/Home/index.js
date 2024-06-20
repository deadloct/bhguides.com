import { HashRouter, Route, Routes } from "react-router-dom";

import BillyIdolsCorner from "../BillyIdolsCorner";
import Header from "../Header";
import Footer from "../Footer";
import Guides from "../Guides";
import RNGME from "../RNGME";
import Tools from "../Tools";
import TurnRateCalc from "../TurnRateCalc";
import Video from "../Video";

export default function Home() {
    return (
        <HashRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Guides />} />
                <Route path="/item-find" element={<Tools />} />
                <Route path="/turn-rate" element={<TurnRateCalc />} />
                <Route path="/rng-me" element={<RNGME />} />
                <Route path="/billyidols-corner" element={<BillyIdolsCorner />} />
                <Route path="/video/:slug" element={<Video />} />
            </Routes>
            <Footer />
        </HashRouter>
    );
};
