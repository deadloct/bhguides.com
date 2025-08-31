import React, { useEffect, useRef, useState } from "react";
import Container from '@mui/material/Container';
import Link from "next/link";
import Image from "next/image";
import useMediaQuery from '@mui/material/useMediaQuery'

import styles from "./index.module.css";

import MenuIcon from '@mui/icons-material/Menu';
import ClearIcon from '@mui/icons-material/Clear';


export default function Header() {
    const [visible, setVisible] = useState(false);
    const navRef = useRef(null);

    // Pixel value matches css
    const mobile = useMediaQuery('(max-width:1059px)');

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

    const navWrapperClasses = [styles["nav-wrapper"]];
    if (mobile && visible) {
        navWrapperClasses.push(styles["expanded"]);
    }

    const navs = [
        {key: "calculators-guides", path: "/", text: "Guides"},
        {key: "calculators-ifcr", path: "/item-find", text: "Item Find"},
        {key: "calculator-turnrate", path: "/turn-rate", text: "Turn Rate"},
        {key: "calculator-familiar", path: "/familiar-calc", text: "Fams"},
        {key: "calculator-eggs", path: "/eggs", text: "Eggs"},
    ];

    return (
        <Container key="header-container" className={styles["wrapper"]} maxWidth="md">
            <header className={headerClasses.join(" ")}>
                <div className={styles["site-title-row"]}>
                    <div className={styles["logo"]}>
                        <Link href="/">
                            <Image
                                src="/logo-text-white-640.png"
                                alt="BH Guides Logo"
                                width={640}
                                height={180}
                                sizes="(max-width: 320px) 180w, (max-width: 640px) 320w, 640w"
                            />
                            <h1>BH Guides</h1>
                        </Link>
                    </div>
                </div>

                <div className={navWrapperClasses.join(" ")}>
                    <nav ref={navRef}>
                        <ul>
                            {navs.map((nav, i) => (
                                <li key={nav.key}>
                                    <Link href={nav.path} onFocus={focus} onBlur={blur} onClick={toggle}>{nav.text}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className={styles["header-controls"]}>
                        <div onClick={toggle} className={styles["menu-toggle"]}>
                            {visible ?
                                <ClearIcon fontSize={"inherit"} className={styles["menu-icon"]} /> :
                                <MenuIcon fontSize={"inherit"} className={styles["menu-icon"]} />}
                        </div>
                    </div>
                </div>
            </header>
        </Container>
    );
}
