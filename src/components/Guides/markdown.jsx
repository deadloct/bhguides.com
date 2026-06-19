import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import styles from "./markdown.module.css";

import CancelIcon from '@mui/icons-material/Cancel';
import ShareIcon from '@mui/icons-material/Share';

const ErrFetchFailure = `Unfortunately there was an error retrieving the markdown guide. Contact BillyIdol!`;

export default function MarkdownModal({ file, name, visible, hide, onShare }) {
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
                    <div className={styles["close"]} onClick={hide}><CancelIcon /></div>
                    <div className={styles["loading-container"]}>
                        <CircularProgress color="inherit" />
                        <p>Setting the type&hellip;</p>
                    </div>
                </div>
            </Modal>
        );
    }

    if (err) {
        return (
            <Modal className={styles["modal"]} open={visible} onClose={hide}>
                <div className={styles["wrapper"]}>
                    <div className={styles["close"]} onClick={hide}><CancelIcon /></div>
                    <h2 className={styles["error-title"]}>Stop the presses</h2>
                    <p>{err}</p>
                </div>
            </Modal>
        );
    }

    return (
        <Modal className={styles["modal"]} open={visible} onClose={hide}>
            <div className={styles["wrapper"]}>
                <div className={styles["toolbar"]}>
                    {onShare && (
                        <button type="button" className={styles["icon-btn"]} onClick={onShare} aria-label="Copy link to this guide" title="Copy link to this guide"><ShareIcon /></button>
                    )}
                    <button type="button" className={styles["icon-btn"]} onClick={hide} aria-label="Close" title="Close"><CancelIcon /></button>
                </div>
                <article className={styles["article"]}>
                    <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
                </article>
            </div>
        </Modal>
    );
}