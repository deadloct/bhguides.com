import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

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
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Guides />} />

                <Route path="/item-find" element={<Tools />} />
                <Route path="/#/item-find" render={() => <Navigate replace to="item-find" />} />

                <Route path="/turn-rate" element={<TurnRateCalc />} />
                <Route path="/#/turn-rate" render={() => <Navigate replace to="turn-rate" />} />

                <Route path="/rng-me" element={<RNGME />} />
                <Route path="/#/rng-me" render={() => <Navigate replace to="rng-me" />} />

                <Route path="/billyidols-corner" element={<BillyIdolsCorner />} />
                <Route path="/video/:slug" element={<Video />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};
