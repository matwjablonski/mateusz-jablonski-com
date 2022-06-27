import { FC } from "react";
import styles from "./Columns.module.scss";

const Columns: FC = ({children}) => {
    return <div className={styles.columns}>{children}</div>
}

export default Columns;