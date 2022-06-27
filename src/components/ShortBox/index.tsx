import { FC } from "react"
import styles from "./ShortBox.module.scss";

const ShortBox: FC<{ title: string }> = ({ title, children }) => {
    return (
        <div className={styles.shortBox}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.container}>{children}</div>
        </div>
    )
}

export default ShortBox;
