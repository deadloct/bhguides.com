import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import styles from "./markdown.module.css";

import CancelIcon from '@mui/icons-material/Cancel';

const ErrFetchFailure = `Unfortunately there was an error retrieving the HTML guide. Contact BillyIdol!`;

// Container class the guide's CSS gets scoped under. The fragment still lives in
// the light DOM (so the site's styles cascade into it), but any rules the guide
// author writes are rewritten to only match inside this container.
const SCOPE_CLASS = "guide-scope";

// Rewrite every selector in the guide's <style> blocks so they're confined to
// the guide container and can't leak into the rest of the site.
function scopeHtml(raw) {
    if (typeof document === "undefined") {
        return raw;
    }

    const template = document.createElement("template");
    template.innerHTML = raw;

    template.content.querySelectorAll("style").forEach((styleEl) => {
        styleEl.textContent = scopeCss(styleEl.textContent, `.${SCOPE_CLASS}`);
    });

    return template.innerHTML;
}

function scopeCss(css, scope) {
    // Let the browser parse the CSS via the CSSOM. A non-matching media keeps
    // the rules from ever applying globally while we read them back.
    const probe = document.createElement("style");
    probe.media = "not all";
    probe.textContent = css;
    document.head.appendChild(probe);

    let out = css;
    try {
        out = serializeRules(probe.sheet.cssRules, scope);
    } catch (e) {
        console.error("failed to scope guide css", e);
    } finally {
        probe.remove();
    }

    return out;
}

function serializeRules(rules, scope) {
    let out = "";

    for (const rule of rules) {
        if (rule.type === CSSRule.STYLE_RULE) {
            const selectors = rule.selectorText
                .split(",")
                .map((sel) => `${scope} ${sel.trim()}`)
                .join(", ");
            out += `${selectors} { ${rule.style.cssText} }\n`;
        } else if (rule.type === CSSRule.MEDIA_RULE || rule.type === CSSRule.SUPPORTS_RULE) {
            const at = rule.type === CSSRule.MEDIA_RULE ? "media" : "supports";
            out += `@${at} ${rule.conditionText} {\n${serializeRules(rule.cssRules, scope)}}\n`;
        } else {
            // keyframes, font-face, imports, etc. — leave untouched.
            out += `${rule.cssText}\n`;
        }
    }

    return out;
}

export default function HtmlModal({ file, name, visible, hide }) {
    const [body, setBody] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);

    const full = `/guide-files/${file}`;

    useEffect(() => {
        async function loadHtml() {
            if (!visible) {
                return;
            }

            // Reset state when modal opens
            setLoading(true);
            setBody("");
            setErr("");

            try {
                const resp = await fetch(full);
                if (!resp.ok) {
                    throw new Error("bad response status " + resp.status);
                }

                const text = await resp.text();
                setBody(scopeHtml(text));
            } catch(e) {
                console.error(e);
                setErr(ErrFetchFailure);
            } finally {
                setLoading(false);
            }
        }

        loadHtml();
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
                <div className={styles["close"]} onClick={hide}><CancelIcon /></div>
                <article
                    className={`${styles["article"]} ${SCOPE_CLASS}`}
                    dangerouslySetInnerHTML={{ __html: body }}
                />
            </div>
        </Modal>
    );
}
