import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { HashLink as Link } from 'react-router-hash-link';
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
    const guides = useSelector((state) => state.guides);
    const categories = useMemo(() => [...guides], [guides]); // Just use redux for initial state
    const search = useMemo(() => new Search(categories), [categories]);

    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState(categories);
    const [lightboxVisible, setLightboxVisible] = useState(false);
    const [lightboxFile, setLightboxFile] = useState("");
    const [markdownVisible, setMarkdownVisible] = useState(false);
    const [markdownFile, setMarkdownFile] = useState("");
    const [markdownName, setMarkdownName] = useState("");

    useEffect(() => {
        if (searchTerm === "") {
            setResults(categories);
            return;
        }

        const results = search.Find(searchTerm);
        const category = {
            "name": `Results for "${searchTerm}"`,
            "description": "",
            "guides": results,
            "isSearch": true,
        };
        setResults([category]);
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

    function attachment(item, index) {
        switch (item.attachmenttype) {
            case "image":
                return (
                    <li key={`item-${index}`} className={`${styles["attachment-item"]} ${styles["attachment-item-img"]}`} onClick={() => openLightbox(item)}>
                        <ImageIcon /> 
                        <span className={styles["att-name"]}>{item.filename}</span>
                        <span className={styles["att-type"]}>{`(${item.contenttype})`}</span>
                    </li>
                );
            
            case "pdf":
                return (
                    <li key={`item-${index}`} className={styles["attachment-item"]}>
                        <PictureAsPdfIcon /> 
                        <a href={`/guide-files/${item.filename}`} target="_BLANK" rel="noreferrer">{item.filename}</a> 
                        <span className={styles["att-type"]}>{`(${item.contenttype})`}</span>
                    </li>
                );

            case "markdown":
                return (
                    <li key={`item-${index}`} className={`${styles["attachment-item"]} ${styles["attachment-item-markdown"]}`} onClick={() => openMarkdown(item)}>
                        <ArticleIcon /> 
                        <span className={styles["att-name"]}>{item.filename}</span>
                        <span className={styles["att-type"]}>(markdown/text)</span>
                    </li>
                );

            case "link":
                return (
                    <li key={`item-${index}`} className={styles["attachment-item"]}>
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

    function categoryName(category) {
        return category.webname || category.name.replace("guides-", "").replace("-", " ").trim();
    }

    function categoryAnchor(category) {
        return category.isSearch ? 'search-results' : category.name;
    }

    function renderCategory(category, i) {
        const items = category.guides.map((g, i) => renderGuide(g, i, category.isSearch));
        return (
            <div key={`${categoryAnchor(category)}-${i}`}>
                <h2 id={`${categoryAnchor(category)}`}>{categoryName(category)}</h2>
                <div className={styles["category-description"]}>{category.description}</div>
                <ul>{items}</ul>
            </div>
        );
    }

    function renderTableOfContents(categories) {
        const items = categories
            .map((category, i) => {
                const anchor = categoryAnchor(category);
                const name = categoryName(category);
                return <li key={`toc-${i}`}><Link to={`/#${anchor}`}>{name}</Link></li>;
            })

        return (
            <div key="toc" className={styles["table-of-contents"]}>
                <h2>Table of Contents</h2>
                <ol>{items}</ol>
            </div>
        );
    }

    function renderCategories(categories) {
        categories.sort((a, b) => a.webname.localeCompare(b.webname));
        const rendered = categories.length && !categories[0].isSearch ? 
            [renderTableOfContents(categories)] :
            [];
        rendered.push(...categories.map(renderCategory));
        return rendered;
    }    

    return (
        <Container key="guides" className={styles["wrapper"]} maxWidth="md">
            <header>
                <div className={styles["search-wrapper"]}>
                    <input type="text" placeholder="Enter search term" id="search" onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className={`${styles["bubble"]} ${styles["ext-link-risk"]}`}>
                    <WarningAmberIcon />
                    <div className={styles["bubble-message"]}>Follow external links at your own risk</div>
                    <WarningAmberIcon />
                </div>
            </header> 
            <section className={styles["content"]}>
                <div className={styles["results"]} id="results">
                    {renderCategories(results)} 
                </div>
            </section>
            <footer>
                <h2>Credits</h2>
                <p><strong>Guide Authors:</strong> 3riko, 5Rupees, a_poor_ninja, Adhesive81, Alysias, Antomanz, Ballbreaker, BillyIdol, Bisamratte, Blanquiito, Captain_Crunchie, ChubbyDaemon, Chuck, Colb, Commander, Crow, CyberMuffin, DarkHand6, Dispel1, Dracaris, Dude_WTF, Ee, Eliealsamaan85, Ember, FergusFerret, fohpo, Fyra, Gagf, Gavx, Goku, Goolmuddy, Gylgymesh, Hæl (aka Hael in this bot), Huen11, ItsMBSCastillo, JDizzle, Jermoshua, JoeBu, John_Hatten2, josiah_4, kruste, Lqd, Maddbz, MaxBrand99, McSploosh, Melody (Choco), Mentle88, MrRager, Mochi, Neflarian, n1ghtmaree, Olivernoko, Orcaaa, PAINisGOD93, PocketApple8104, PrimeDyze, RoastyChicken, ShawnBond, Sizz, Smolder, Special_Delivery, Tarnym, Techno, Toad, Tolton, TooT, TrippyAfro, UnseenAxes, VesaN, Winter, WRLD_EATR, Youreprettycute, ZENICKS, and ZombieSlayer13</p>
                <p><strong>Idea for Original Guides Discord Bot:</strong> Trogburn</p>
                <p><strong>Coding:</strong> BillyIdol • <a href="https://github.com/deadloct/bhguides.com">Source on GitHub</a></p>
                <p><strong>Initial Data Aggregation:</strong> BillyIdol, ShawnBond, Trogdor, and ZombieSlayer13</p>
                <p><strong>Honorable Mentions:</strong> Hip224, Robskino</p>
                <p>Thanks to anybody else that helped but was not mentioned because I forgot!</p>
            </footer>
            <div className={styles["back-home"]}><Link to={"/#top"} title="Scroll to Top"><ArrowCircleUpIcon fontSize="large" /></Link></div>
            <Lightbox visible={lightboxVisible} file={lightboxFile} hide={hideLightbox} />
            <Markdown visible={markdownVisible} file={markdownFile} name={markdownName} hide={hideMarkdown} />
        </Container>
    );
}