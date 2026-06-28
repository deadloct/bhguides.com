import React, { useEffect, useMemo, useRef, useState } from "react";
import Container from '@mui/material/Container';
import rawGuidesData from '../../redux/guides.json';

const naturalSort = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

const guidesData = rawGuidesData.guides;
Object.keys(guidesData).forEach(k => {
    guidesData[k].guides.sort((a, b) => naturalSort(a.name, b.name));
});
const guideIndexData = rawGuidesData.index;

import styles from "./index.module.css";
import Search from "./search";
import Lightbox from "./lightbox";
import Markdown from "./markdown";
import Html from "./html";

import ArticleIcon from '@mui/icons-material/Article';
import HtmlIcon from '@mui/icons-material/Html';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import LaunchIcon from '@mui/icons-material/Launch';
import WebhookIcon from '@mui/icons-material/Webhook';
import MicrosoftIcon from '@mui/icons-material/Microsoft';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function Guides() {
    const search = useMemo(() => new Search(guidesData), []);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [lightboxFile, setLightboxFile] = useState("");
    const [lightboxType, setLightboxType] = useState("image");
    const [lightboxContentType, setLightboxContentType] = useState("");
    const [markdownVisible, setMarkdownVisible] = useState(false);
    const [markdownFile, setMarkdownFile] = useState("");
    const [markdownName, setMarkdownName] = useState("");
    const [htmlVisible, setHtmlVisible] = useState(false);
    const [htmlFile, setHtmlFile] = useState("");
    const [htmlName, setHtmlName] = useState("");
    const [activeAnchor, setActiveAnchor] = useState("");
    const [disclaimerVisible, setDisclaimerVisible] = useState(true);
    const [copyToastVisible, setCopyToastVisible] = useState(false);
    const copyToastTimeout = useRef(null);

    useEffect(() => {
        const id = window.location.hash.split("#").filter(Boolean).pop();
        if (id) {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView();
        }
    }, []);

    useEffect(() => () => {
        if (copyToastTimeout.current) clearTimeout(copyToastTimeout.current);
    }, []);

    useEffect(() => {
        if (searchTerm === "") {
            setSearchResults(null);
            return;
        }

        const results = search.Find(searchTerm);
        setSearchResults({
            "webname": `Results for "${searchTerm}"`,
            "description": "",
            "guides": results,
            "isSearch": true,
        });
    }, [search, searchTerm]);

    const openLightbox = (attachment, anchor) => {
        setActiveAnchor(anchor || "");
        setLightboxFile(attachment.filename);
        setLightboxType(attachment.attachmenttype || "image");
        setLightboxContentType(attachment.contenttype || "");
        setLightboxVisible(true);
    };
    const hideLightbox = () => setLightboxVisible(false);

    const openMarkdown = (attachment, anchor) => {
        setActiveAnchor(anchor || "");
        setMarkdownFile(attachment.filename);
        setMarkdownName(attachment.filename);
        setMarkdownVisible(true);
    };
    const hideMarkdown = () => setMarkdownVisible(false);

    const openHtml = (attachment, anchor) => {
        setActiveAnchor(anchor || "");
        setHtmlFile(attachment.filename);
        setHtmlName(attachment.filename);
        setHtmlVisible(true);
    };
    const hideHtml = () => setHtmlVisible(false);

    const dismissDisclaimer = () => setDisclaimerVisible(false);


    function obsolete(guide) {
        if (guide.obsolete && guide.obsolete.length) {
            return (
                <div className={styles["obsolete"]}>
                    <div className={styles["obsolete-left"]}><CancelIcon /></div>
                    <div className={styles["obsolete-center"]}><strong>Obsolete</strong><br />{guide.obsolete}</div>
                    <div className={styles["obsolete-right"]}><CancelIcon /></div>
                </div>
            );
        }

        return "";
    }

    function fams(guide) {
        if (guide.fams && guide.fams.length) {
            return <div><em>Fams:</em> {guide.fams.join(", ")}</div>;
        }

        return "";
    }

    function key(str) {
        return str.toLowerCase().replace(/[^a-z0-9-_]/g, "");
    }

    function guideAnchor(guide, catID) {
        // An explicit `slug` in guides.json (conventionally prefixed with the
        // category id) pins a stable link across renames; otherwise derive one
        // from the category and guide name.
        if (guide.slug) {
            return key(guide.slug);
        }

        const cat = guide.categoryName || catID;
        return `${key(cat)}-${key(guide.name)}`;
    }

    const copyGuideLink = anchor => {
        const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url);
        }

        setCopyToastVisible(true);
        if (copyToastTimeout.current) clearTimeout(copyToastTimeout.current);
        copyToastTimeout.current = setTimeout(() => setCopyToastVisible(false), 2000);
    };

    function builds(guide) {
        if (guide.builds && guide.builds.length) {
            return <div><em>Builds:</em> {guide.builds.join(", ")}</div>;
        }

        return "";
    }

    function roles(guide) {
        if (guide.roles && guide.roles.length) {
            return <div><em>Roles:</em> {guide.roles.join(", ")}</div>;
        }

        return "";
    }

    function revealedBy(guide) {
        if (guide["revealed_by"] && guide["revealed_by"].length) {
            return <div><em>Revealed by:</em> {guide["revealed_by"]}</div>;
        }

        return "";
    }

    function attachment(item, i, anchor) {
        switch (item.attachmenttype) {
            case "image":
                return (
                    <li key={`item-${i}`} className={`${styles["attachment-item"]} ${styles["attachment-item-img"]}`} onClick={() => openLightbox(item, anchor)}>
                        <ImageIcon /> 
                        <span className={styles["att-name"]}>{item.filename}</span>
                        <span className={styles["att-type"]}>{`(${item.contenttype})`}</span>
                    </li>
                );
            
            case "pdf":
                return (
                    <li key={`item-${i}`} className={styles["attachment-item"]}>
                        <PictureAsPdfIcon /> 
                        <a href={`/guide-files/${item.filename}`} target="_BLANK" rel="noreferrer">{item.filename}</a> 
                        <span className={styles["att-type"]}>{`(${item.contenttype})`}</span>
                    </li>
                );

            case "markdown":
                return (
                    <li key={`item-${i}`} className={`${styles["attachment-item"]} ${styles["attachment-item-markdown"]}`} onClick={() => openMarkdown(item, anchor)}>
                        <ArticleIcon /> 
                        <span className={styles["att-name"]}>{item.filename}</span>
                        <span className={styles["att-type"]}>(markdown/text)</span>
                    </li>
                );

            case "html":
                return (
                    <li key={`item-${i}`} className={`${styles["attachment-item"]} ${styles["attachment-item-markdown"]}`} onClick={() => openHtml(item, anchor)}>
                        <HtmlIcon />
                        <span className={styles["att-name"]}>{item.filename}</span>
                        <span className={styles["att-type"]}>(html)</span>
                    </li>
                );

            case "video":
                return (
                    <li key={`item-${i}`} className={`${styles["attachment-item"]} ${styles["attachment-item-video"]}`} onClick={() => openLightbox(item, anchor)}>
                        <SmartDisplayIcon />
                        <span className={styles["att-name"]}>{item.filename}</span>
                        <span className={styles["att-type"]}>{`(${item.contenttype || "video"})`}</span>
                    </li>
                );

            case "link":
                return (
                    <li key={`item-${i}`} className={styles["attachment-item"]}>
                        <LaunchIcon /> 
                        <a href={`${item.link}`} target="_BLANK" rel="noreferrer">{item.link}</a> 
                        <span className={styles["att-type"]}>(external link)</span>
                    </li>
                );

            case "internal-link":
                return (
                    <li key={`item-${i}`} className={styles["attachment-item"]}>
                        <WebhookIcon /> 
                        <a href={`${item.link}`}>{item.link}</a> 
                        <span className={styles["att-type"]}>(internal link)</span>
                    </li>
                );
            
            case "excel":
                return (
                    <li key={`item-${i}`} className={styles["attachment-item"]}>
                        <MicrosoftIcon /> 
                        <a href={`/guide-files/${item.filename}`} target="_BLANK" rel="noreferrer">{item.filename}</a> 
                        <span className={styles["att-type"]}>{`(${item.contenttype})`}</span>
                    </li>
                );
            
            default:
                return "";
        }
    }

    function attachments(guide, anchor) {
        if (!guide.attachments) {
            return ""
        }

        return <ul>{guide.attachments.map((item, i) => attachment(item, i, anchor))}</ul>;
    }

    function renderGuide(guide, i, isSearch, catID) {
        let cat = "";
        if (isSearch && guide.categoryName) {
            cat = <div><em>Category:</em> {guide.categoryName}</div>;
        }

        const anchor = guideAnchor(guide, catID);

        return (
            <li key={`${key(guide.name)}-${i}`} id={anchor} className={styles["guide-item"]}>
                <div className={styles["guide-name"]}>
                    <span
                        className={styles["guide-title"]}
                        onClick={() => copyGuideLink(anchor)}
                        title="Copy link to this guide"
                    >{guide.name}{guide.inTier && <WorkspacePremiumIcon titleAccess="In-Tier Clear" fontSize="small" className={styles["in-tier-icon"]} />}{guide.inFestiviflux && <AcUnitIcon titleAccess="Also available in Festiviflux Invasion" fontSize="small" className={styles["festiviflux-icon"]} />}</span>
                    <button
                        type="button"
                        className={styles["copy-link-button"]}
                        onClick={() => copyGuideLink(anchor)}
                        aria-label="Copy link to this guide"
                        title="Copy link to this guide"
                    >
                        <ContentCopyIcon fontSize="small" />
                    </button>
                </div>
                {obsolete(guide)}
                {fams(guide)}
                {builds(guide)}
                {roles(guide)}
                {revealedBy(guide)}
                {cat}
                {attachments(guide, anchor)}
            </li>
        );
    }

    function renderGuidesForCategory(catID, cat, i, hasParent) {
        const header = hasParent ? <h3 id={`${catID}`}>{cat.webname}</h3> : <h2 id={`${catID}`}>{cat.webname}</h2>;

        let results;
        if (cat.guides.length > 0) {
            // Sort guides: sticky guides first, then alphabetically by name
            const sortedGuides = [...cat.guides].sort((a, b) => {
                // If one guide is sticky and the other isn't, sticky goes first
                if (a.sticky && !b.sticky) return -1;
                if (!a.sticky && b.sticky) return 1;
                
                // If both are sticky or both are not sticky, sort alphabetically by name
                return a.name.localeCompare(b.name, undefined, { 
                    numeric: true, 
                    sensitivity: 'base' 
                })
            });
            
            results = (<ul>{sortedGuides.map((g, i) => renderGuide(g, i, cat.isSearch, catID))}</ul>);
        } else {
            results = cat.isSearch ?
                <p>There are no matched guides for your search.</p> :
                <p>There are no guides in this category</p>;
        }

        // For search results, don't show header separately - just show results directly
        if (cat.isSearch) {
            return (
                <div key={`${catID}-${i}`} className={styles["category-leaf-group"]}>
                    <h2>{cat.webname}</h2>
                    <div className={styles["category-description"]}>{cat.description}</div>
                    {results}
                </div>
            );
        }

        return (
            <div key={`${catID}-${i}`} className={styles["category-leaf-group"]}>
                {header}
                <div className={styles["category-description"]}>{cat.description}</div>
                {results}
            </div>
        );
    }

    function renderCategoriesForIndex(indexEntry, i, depth = 0) {
        if (!indexEntry.children) {
            return renderGuidesForCategory(indexEntry.id, guidesData[indexEntry.id], i, depth > 0);
        }

        return (
            <div key={`${indexEntry.id}-${i}`} className={styles["category-branch-group"]}>
                <h2 id={`${indexEntry.id}`}>{indexEntry.name}</h2>
                <ul>{
                    indexEntry.children.map((child, i) => {
                        return renderCategoriesForIndex(child, i, depth+1);
                    })
                }</ul>
            </div>
        );
    }

    function renderTableOfContents() {
        const items = guideIndexData 
            .map((item, i) => {
                const anchor = item.id;
                const name = item.name || guidesData[anchor].webname;
                let children;
                if (item.children && item.children.length > 0) {
                    children = item.children.map((child, i) => {
                        const anchor = child.id;
                        const name = child.name || guidesData[anchor].webname;
                        return <li className={styles["toc-child"]} key={`toc-${i}`}><a href={`#${anchor}`}>{name}</a></li>;
                    });
                }

                return (
                    <li key={`toc-${i}`}>
                        <a href={`#${anchor}`}>{name}</a>
                        {children !== undefined && <ul>{children}</ul>}
                    </li>
                );
            })

        return (
            <div key="toc" className={styles["table-of-contents"]}>
                <h2>Table of Contents</h2>
                <ol>{items}</ol>
            </div>
        );
    }

    function render() {
        if (searchResults !== null) {
            return renderGuidesForCategory("search-results", searchResults, 0, false);
        }

        return (
            <>
                {renderTableOfContents(guideIndexData)}
                {...guideIndexData.map((indexEntry, i) => renderCategoriesForIndex(indexEntry, i))}
            </>
        );
    }    

    return (
        <Container key="guides" className={styles["wrapper"]} maxWidth="md">
            <header>
                <p className={styles["guides-description"]}>
                    Welcome to the #1 community repository of guides for 
                    Kongregate&apos;s Bit Heroes, created by dedicated players 
                    who graciously share their knowledge and strategies. Let us all dominate the 
                    jerk Porteriuz together!
                </p>
                <div className={styles["search-wrapper"]}>
                    <input 
                        type="text" 
                        placeholder="Enter search term" 
                        id="search" 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)} 
                    />
                    {searchTerm && (
                        <button 
                            className={styles["search-clear-button"]}
                            onClick={() => setSearchTerm("")}
                            aria-label="Clear search"
                        >
                            <CloseIcon />
                        </button>
                    )}
                </div>
            </header> 
            <section className={styles["content"]}>
                <div className={styles["searchResults"]} id="searchResults">
                    {render()} 
                </div>
            </section>

            {disclaimerVisible && (
                <div className={styles["floating-disclaimer"]}>
                    <WarningAmberIcon fontSize="small" />
                    <span className={styles["disclaimer-text"]}>
                        External links lead to third-party sites. Visit at your own risk.
                    </span>
                    <button 
                        onClick={dismissDisclaimer} 
                        className={styles["disclaimer-close"]}
                        aria-label="Close disclaimer"
                    >
                        <CloseIcon fontSize="small" />
                    </button>
                </div>
            )}
            <div
                className={`${styles["copy-toast"]} ${copyToastVisible ? styles["copy-toast-visible"] : ""}`}
                role="status"
                aria-live="polite"
            >
                Guide link copied to clipboard
            </div>
            <Lightbox
                visible={lightboxVisible}
                file={lightboxFile}
                type={lightboxType}
                contentType={lightboxContentType}
                hide={hideLightbox}
                onShare={activeAnchor ? () => copyGuideLink(activeAnchor) : null}
            />
            <Markdown visible={markdownVisible} file={markdownFile} name={markdownName} hide={hideMarkdown} onShare={activeAnchor ? () => copyGuideLink(activeAnchor) : null} />
            <Html visible={htmlVisible} file={htmlFile} name={htmlName} hide={hideHtml} onShare={activeAnchor ? () => copyGuideLink(activeAnchor) : null} />
        </Container>
    );
}