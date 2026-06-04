import { useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./index.module.css";

const REPO_URL = "https://github.com/deadloct/bhguides.com";

function formatDate(iso) {
    const d = new Date(`${iso}T00:00:00`);
    if (isNaN(d)) {
        return iso;
    }

    return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

export default function Changelog() {
    const [commits, setCommits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(false);

    useEffect(() => {
        async function load() {
            try {
                // Revalidate against the ETag rather than trusting the CDN's
                // 10-minute cache, so a fresh deploy shows up immediately.
                const resp = await fetch("/changelog.json", { cache: "no-cache" });
                if (!resp.ok) {
                    throw new Error(`bad response status ${resp.status}`);
                }

                setCommits(await resp.json());
            } catch (e) {
                console.error(e);
                setErr(true);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    // Group commits by date, preserving the (newest-first) order from git.
    const groups = useMemo(() => {
        const byDate = [];
        const index = new Map();

        for (const commit of commits) {
            if (!index.has(commit.date)) {
                const group = { date: commit.date, commits: [] };
                index.set(commit.date, group);
                byDate.push(group);
            }

            index.get(commit.date).commits.push(commit);
        }

        return byDate;
    }, [commits]);

    return (
        <Container maxWidth="md" className={styles["wrapper"]}>
            <h2>Changelog</h2>

            {loading && <p className={styles["status"]}>Loading&hellip;</p>}

            {!loading && err && (
                <p className={styles["status"]}>Unable to load the changelog right now.</p>
            )}

            {!loading && !err && groups.length === 0 && (
                <p className={styles["status"]}>No changes recorded yet.</p>
            )}

            {groups.map((group) => (
                <section key={group.date} className={styles["day"]}>
                    <h3 className={styles["date"]}>{formatDate(group.date)}</h3>
                    <ul className={styles["commits"]}>
                        {group.commits.map((commit) => (
                            <li key={commit.hash} className={styles["commit"]}>
                                <div className={styles["subject"]}>{commit.subject}</div>
                                {commit.body && <div className={styles["body"]}>{commit.body}</div>}
                                <div className={styles["meta"]}>
                                    <a
                                        href={`${REPO_URL}/commit/${commit.hash}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles["hash"]}
                                    >
                                        {commit.short}
                                    </a>
                                    <span className={styles["author"]}>{commit.author}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </Container>
    );
}
