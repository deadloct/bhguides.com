import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import styles from "./markdown.module.css";

import CancelIcon from '@mui/icons-material/Cancel';

const ErrFetchFailure = `Unfortunately there was an error retrieving the markdown guide. Contact BillyIdol!`;

export default function MarkdownModal({ file, name, visible, hide }) {
    const [body, setBody] = useState("");
    const [err, setErr] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);

    const full = `/guide-files/${file}`;

    useEffect(() => {
        async function loadMarkdown() {
            if (!visible) {
                return;
            }

            // Reset state when modal opens
            setLoading(true);
            setBody("");
            setErr("");
            setTitle("");

            try {
                const resp = await fetch(full);
                if (!resp.ok) {
                    throw new Error("bad response status " + resp.status);
                }

                const body = await resp.text();
                setBody(body);
                setTitle(name);
            } catch(e) {
                console.error(e);
                setErr(ErrFetchFailure);
            } finally {
                setLoading(false);
            }
        }

        loadMarkdown();
    }, [full, name, visible]);

    if (!visible) {
        return;
    }

    if (loading) {
        return (
            <Modal className={styles["modal"]} open={visible} onClose={hide}>
                <div className={styles["wrapper"]}>
                    <div className={styles["close"]}><CancelIcon /></div>
                    <div className={styles["loading-container"]}>
                        <CircularProgress />
                        <p>Loading...</p>
                    </div>
                </div>
            </Modal>
        );
    }

    if (err) {
        return (
            <Modal className={styles["modal"]} open={visible} onClose={hide}>
                <div className={styles["wrapper"]}>
                    <div className={styles["close"]}><CancelIcon /></div>
                    <h2>Error</h2>
                    <p>{err}</p>
                </div>
            </Modal>
        );
    }

    return (
        <Modal className={styles["modal"]} open={visible} onClose={hide}>
            <div className={styles["wrapper"]}>
                <div className={styles["close"]} onClick={hide}><CancelIcon /></div>
                <Markdown>{body}</Markdown>
            </div>
        </Modal>
    );
}