import Pics from "../Pics";
import VideoList from "../VideoList";
import styles from "./index.module.css";

export default function BillyIdolsCorner() {
    return (
        <div className={styles["wrapper"]}>
            <section key="videos">
                <h2>Videos</h2>
                <VideoList />
            </section>

            <section key="pics" className={styles["pics"]}>
                <h2>Pics</h2>
                <Pics />
            </section>
        </div>
    );
}
