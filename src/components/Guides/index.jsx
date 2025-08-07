import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HashLink } from 'react-router-hash-link';
import Container from '@mui/material/Container';

import styles from "./index.module.css";
import Search from "./search";
import Lightbox from "./lightbox";
import Markdown from "./markdown";

import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArticleIcon from '@mui/icons-material/Article';
import CancelIcon from '@mui/icons-material/Cancel';
import ImageIcon from '@mui/icons-material/Image';
import LaunchIcon from '@mui/icons-material/Launch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function Guides() {
    const guides = useSelector((state) => state.guides.guides);
    const guideIndex = useSelector((state) => state.guides.index);

    const categories = useMemo(() => ({...guides}), [guides]); // Just use redux for initial state
    const search = useMemo(() => new Search(categories), [categories]);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [lightboxFile, setLightboxFile] = useState("");
    const [markdownVisible, setMarkdownVisible] = useState(false);
    const [markdownFile, setMarkdownFile] = useState("");
    const [markdownName, setMarkdownName] = useState("");

    useEffect(() => {
        const parts = window.location.hash.split("#")
        if (parts.length > 2) {
            const el = document.getElementById(parts[parts.length - 1]);
            if (el) el.scrollIntoView();
        }
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
    }, [categories, search, searchTerm]);

    const openLightbox = attachment => {
        setLightboxFile(attachment.filename);
        setLightboxVisible(true);
    };
    const hideLightbox = () => setLightboxVisible(false);

    const openMarkdown = attachment => {
        setMarkdownFile(attachment.filename);
        setMarkdownName(attachment.filename);
        setMarkdownVisible(true);
    };
    const hideMarkdown = () => setMarkdownVisible(false);

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

    function builds(guide) {
        if (guide.builds && guide.builds.length) {
            return <div><em>Builds:</em> {guide.builds.join(", ")}</div>;
        }

        return "";
    }

    function attachment(item, i) {
        switch (item.attachmenttype) {
            case "image":
                return (
                    <li key={`item-${i}`} className={`${styles["attachment-item"]} ${styles["attachment-item-img"]}`} onClick={() => openLightbox(item)}>
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
                    <li key={`item-${i}`} className={`${styles["attachment-item"]} ${styles["attachment-item-markdown"]}`} onClick={() => openMarkdown(item)}>
                        <ArticleIcon /> 
                        <span className={styles["att-name"]}>{item.filename}</span>
                        <span className={styles["att-type"]}>(markdown/text)</span>
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
            
            default:
                return "";
        }
    }

    function attachments(guide) {
        if (!guide.attachments) {
            return ""
        }

        return <ul>{guide.attachments.map(attachment)}</ul>;
    }

    function renderGuide(guide, i, isSearch) {
        let cat = "";
        if (isSearch && guide.categoryName) {
            cat = <div><em>Category:</em> {guide.categoryName}</div>;
        }

        return (
            <li key={`${key(guide.name)}-${i}`} className={styles["guide-item"]}>
                <div className={styles["guide-name"]}>{guide.name}</div>
                {obsolete(guide)}
                {fams(guide)}
                {builds(guide)}
                {cat}
                {attachments(guide)} 
            </li>
        );
    }

    function renderGuidesForCategory(catID, cat, i, hasParent) {
        const header = hasParent ?
            (<h3 id={`${catID}`}>{cat.webname}</h3>) : 
            (<h2 id={`${catID}`}>{cat.webname}</h2>); 

        let results;
        if (cat.guides.length > 0) {
            results = (<ul>{cat.guides.map((g, i) => renderGuide(g, i, cat.isSearch))}</ul>);
        } else {
            results = cat.isSearch ?
                <p>There are no matched guides for your search.</p> :
                <p>There are no guides in this category"</p>;
        }

        return (
            <div key={`${catID}-${i}`}>
                {header} 
                <div className={styles["category-description"]}>{cat.description}</div>
                {results}
            </div>
        );
    }

    function renderCategoriesForIndex(indexEntry, i, depth = 0) {
        if (!indexEntry.children) {
            return renderGuidesForCategory(indexEntry.id, categories[indexEntry.id], i, depth > 0);
        }

        return (
            <div key={`${indexEntry.id}-${i}`}>
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
        const items = guideIndex 
            .map((item, i) => {
                const anchor = item.id;
                const name = item.name || categories[anchor].webname;
                let children;
                if (item.children && item.children.length > 0) {
                    children = item.children.map((child, i) => {
                        const anchor = child.id;
                        const name = child.name || categories[anchor].webname;
                        return <li className={styles["toc-child"]} key={`toc-${i}`}><HashLink to={`#${anchor}`}>{name}</HashLink></li>;
                    });
                }

                return (
                    <li key={`toc-${i}`}>
                        <HashLink to={`#${anchor}`}>{name}</HashLink>
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
                {renderTableOfContents(guideIndex)}
                {...guideIndex.map((indexEntry, i) => renderCategoriesForIndex(indexEntry, i))}
            </>
        );
    }    

    return (
        <Container key="guides" className={styles["wrapper"]} maxWidth="md">
            <header>
                <div className={styles["search-wrapper"]}>
                    <input type="text" placeholder="Enter search term" id="search" onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className={`${styles["bubble"]} ${styles["ext-link-risk"]}`}>
                    <WarningAmberIcon />
                    <div className={styles["bubble-message"]}>
                        Please be aware that any external links found on this site or within the guides lead to third-party websites
                        that are not managed or monitored by bhguides.com. We cannot guarantee their safety or reliability.
                        Visit these links at your own discretion and risk.
                    </div>
                    <WarningAmberIcon />
                </div>
            </header> 
            <section className={styles["content"]}>
                <div className={styles["searchResults"]} id="searchResults">
                    {render()} 
                </div>
            </section>
            <footer>
                <h2>Credits</h2>
                <p><strong>Guide Authors:</strong> 3riko, 5Rupees, a_poor_ninja, Adhesive81, AlbacorePrism, Alysias, Antomanz, Ballbreaker, Barlooow1987, BillyIdol, Bisamratte, Bitverse_Andy, Blanquiito, Captain_Crunchie, ChubbyDaemon, Chuck, Colb, Commander, Crow, CyberMuffin, DarkHand6, Dispel1, Dracaris, Dude_WTF, EdwardGenius, Ee, Eliealsamaan85, Ember, Equilibrandt, FergusFerret, fohpo, Fr3sTy7, Fyra, Gagf, Gavx, Goku, Goolmuddy, Gylgymesh, Hæl (aka Hael on this page), Huen11, iiTicTac, Infermis, ItsMBSCastillo, JDizzle, JDtheGreat, Jermoshua, JoeBu, John_Hatten2, josiah_4, kruste, Lqd, Maddbz, ManBearPig, MaxBrand99, McSploosh, Melody (Choco), Mentle88, MrRager, Mochi, Neflarian, n1ghtmaree, Olivernoko, Orcaaa, PAINisGOD93, PocketApple8104, PrimeDyze, RoastyChicken, ShawnBond, Sizz, Smolder, Special_Delivery, Talisman, Tarnym, Techno, Toad, Tolton, TooT, TrippyAfro, UnseenAxes, Vanterio, VesaN, Winter, WRLD_EATR, Youreprettycute, ZENICKS, and ZombieSlayer13</p>
                <p><strong>Idea for Original Guides Discord Bot:</strong> Trogburn</p>
                <p><strong>Coding:</strong> BillyIdol • <a href="https://github.com/deadloct/bhguides.com">Source on GitHub</a></p>
                <p><strong>Initial Data Aggregation:</strong> BillyIdol, ShawnBond, Trogdor, and ZombieSlayer13</p>
                <p><strong>Honorable Mentions:</strong> Hip224, Robskino</p>
                <p>Thanks to anybody else that helped but was not mentioned because I forgot!</p>
            </footer>
            <div className={styles["back-home"]}><HashLink to={"#top"}><ArrowCircleUpIcon fontSize="large" /></HashLink></div>
            <Lightbox visible={lightboxVisible} file={lightboxFile} hide={hideLightbox} />
            <Markdown visible={markdownVisible} file={markdownFile} name={markdownName} hide={hideMarkdown} />
        </Container>
    );
}