import { useEffect } from "react";
import styles from "../style/Loader.module.css";

export default function Loader({ onFinish }) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish(); // hide loader after 3 seconds
        }, 3000);

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <div className={styles.loader}>
            <img
                src="/assets/logo.gif"
                alt="Loading..."
                className={styles.loaderGif}
            />
        </div>
    );
}
