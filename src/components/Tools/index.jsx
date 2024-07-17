import React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import CaptureRateCalc from "./capture-rate-calc";
import StandardIFCalc from "./standard-if-calc";
import SimpleIFCalc from "./simple-if-calc";

import styles from "./index.module.css";

export default function Tools() {
    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <StandardIFCalc />
            <Divider />
            <SimpleIFCalc />
            <Divider />
            <CaptureRateCalc />
            <Divider />
            <p className={styles.overview}>
                Calculators ported from <a href="https://jsfiddle.net/dchzwg90/">Archangel/Cherubim's awesome jsfiddle</a>. 
            </p> 
            <p className={styles.suboverview}>
                Credits to pixelbxss for finding some critical issues with the site and for making suggestions, iWushock for sharing the jsfiddle, Uber-gecko for asking for it, skye666 for making an awesome spreadsheet calculator that I used for ages, and everybody in [DÀRK] for being super rad.
            </p>
            <p className={styles.signature}>
                --BillyIdol
            </p>
        </Container>
    )
}