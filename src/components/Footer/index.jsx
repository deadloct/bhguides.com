import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import GitHubIcon from '@mui/icons-material/GitHub';
import { Container, Grid } from '@mui/material';
import styles from "./index.module.css";

export default function Footer() {
    const [latestCommit, setLatestCommit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestCommit = async () => {
            try {
                const response = await fetch('https://api.github.com/repos/deadloct/bhguides.com/commits?per_page=1');
                const commits = await response.json();
                if (commits && commits.length > 0) {
                    setLatestCommit(commits[0]);
                }
            } catch (error) {
                console.error('Failed to fetch latest commit:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestCommit();
    }, []);

    const navs = [
        {key: "calculators-guides", path: "/", text: "Guides"},
        {key: "calculators-ifcr", path: "/item-find", text: "Item Find"},
        {key: "calculator-turnrate", path: "/turn-rate", text: "Turn Rate"},
        {key: "calculator-familiar", path: "/familiar-calc", text: "Fams"},
        {key: "calculator-eggs", path: "/eggs", text: "Eggs"},
    ];


    const d = !latestCommit ? new Date() : new Date(latestCommit.commit.committer.date);

    return (
        <footer className={styles["site-footer"]}>
            <Container maxWidth="md">
                <Grid container columns={10} spacing={2} className={styles["footer-content"]}>
                    <Grid item xs={10} sm={4}>
                        <div className={styles["footer-nav"]}>
                            <ul>
                                <li key="title"><strong>Site Navigation</strong></li>
                                {navs.map((nav, i) => (
                                    <li key={nav.key}>
                                        <Link href={nav.path}>{nav.text}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={10} sm={6}>
                        <div className={styles["footer-github"]}>
                            <div className={styles["github-container"]}>
                                {loading ? (
                                    <div className={styles["loading-badge"]}>Loading...</div>
                                ) : latestCommit ? (
                                        <div className={styles["commit-container"]}>
                                            <div className={styles["commit-header"]}>
                                                <GitHubIcon className={styles["github-icon"]} />
                                            </div>
                                            <div className={styles["commit-message"]}>
                                                <strong>Most Recent Change</strong>
                                                <br />
                                                {latestCommit.commit.message}
                                                <br />
                                                <a href={latestCommit.html_url} className={styles["commit-date"]} target="_blank" rel="noopener noreferrer">{d.toLocaleString()}</a>
                                                &nbsp;&ndash;&nbsp;
                                                <a href="https://github.com/deadloct/bhguides.com/commits/master/" className={styles["changelog-link"]}>Full Changelog</a>
                                            </div>
                                        </div>
                                ) : (
                                    <div className={styles["error-badge"]}>Unable to load commit</div>
                                )}
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div className={styles["footer-logo"]}>
                <Link href="https://vgen.co/pixltoast">
                    <p>
                        <Image
                            src="/pixltoast/bhguides_logo.gif"
                            alt="logo by pixltoast"
                            title="logo by pixltoast"
                            width={222}
                            height={222}
                        />
                    </p>
                    <p>Logo by pixltoast! Click to view their other awesome work.</p>
                </Link>
            </div>
            <p className={styles["non-affiliation"]}>This site is <strong>not</strong> affiliated with Monumental, Kongregate, or Juppiomenz.</p>
        </footer>
    );
}
