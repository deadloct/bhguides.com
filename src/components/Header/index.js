import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery'

import styles from "./index.module.css";

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';

export default function Header() {
    const [visible, setVisible] = useState(false);
    const navRef = useRef(null);

    // Pixel value matches css
    const mobile = useMediaQuery('(max-width:899px)');

    const toggle = () => mobile && setVisible(!visible);
    const blur = () => mobile && setVisible(false);
    const focus = () => mobile && setVisible(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                blur();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const headerClasses = [styles["site-header"]];
    if (mobile) {
        headerClasses.push(styles["mobile"]);
    }

    const navClass = mobile && !visible ? styles["collapsed"] : "";

    const navs = [
        {key: "calculators-guides", path: "/", text: "Guides"},
        {key: "calculators-ifcr", path: "/item-find", text: "IF/CR Calculators"},
        {key: "calculator-turnrate", path: "/turn-rate", text: "Turn Rate Calculator"},
        {key: "calculator-rngme", path: "/rng-me", text: "RNG ME"},
        {key: "billyidols-corner", path: "/billyidols-corner", text: "BillyIdol's Corner"},
    ];

    return (
        <>
            <header className={headerClasses.join(" ")}>
                <div className={styles["site-title-row"]}>
                    <h1><Link to="/">BH Guides</Link></h1>
                    <div onClick={toggle} className={styles["menu-toggle"]}>
                        {visible ?
                            <ClearIcon fontSize={"inherit"} className={styles["menu-icon"]} /> :
                            <MenuIcon fontSize={"inherit"} className={styles["menu-icon"]} />}
                    </div>
                </div>
                <nav ref={navRef} className={navClass}>
                    <ul>
                        {navs.map((nav, i) => (
                            <li key={nav.key}>
                                <Link to={nav.path} onFocus={focus} onBlur={blur} onClick={toggle}>{nav.text}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    );
}
