import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
import LiveTvIcon from "@mui/icons-material/LiveTv";
 
import VideoJSWrapper from "../VideoJSWrapper";
import { FormatVideoTime } from "../../utils";
import styles from "./index.module.css";

export default function Video() {
    const { slug } = useParams();

    const videos = useSelector((state) => state.videos.db);

    let v = videos.filter(item => item.slug === slug); 
    if (v.length === 0) {
        return (
            <Container maxWidth="sm">
                <h2>404: Video for URL /video/{slug} Not Found</h2>
            </Container>
        );
    }

    v = v[0];
    const d = FormatVideoTime(v.date);

    return (
        <Container className={styles["outer-container"]} maxWidth="md">
            <header className={styles.header}>
                <h1 className={styles["video-title"]}><LiveTvIcon /> {v.name}</h1>
                <div className={styles["meta"]}>
                    <div className={styles["meta-date"]}>{d}</div> 
                    {/* <div className={styles["meta-mp4"]}>
                        <a href={`video/${v.mp4}`} download={`video/${v.mp4}`}>Download Full Video <DownloadIcon /></a>
                    </div>  */}
                </div>
            </header>
            <VideoJSWrapper video={v} playerkey={`video-${v.slug}`} />
        </Container>
    );
}
