import React from "react";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

import CaptureRate from "../CaptureRate";
import ItemFind from "../ItemFind";

import styles from "./index.module.css";

export default function ItemFindCapRateWrapper() {
    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <ItemFind />
            <Divider />
            <CaptureRate />
            <Divider />
            <p className={styles.overview}>
                Calculators ported from <a href="https://jsfiddle.net/dchzwg90/">Archangel/Cherubim&apos;s awesome jsfiddle</a>. 
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