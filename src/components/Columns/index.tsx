import cx from 'classnames';
import { ReactNode } from 'react';
import styles from "./Columns.module.scss";

interface ColumnsProps {
    children: ReactNode;
    flexSizes?: [number, number];
}

const Columns = ({ children, flexSizes }: ColumnsProps) => {
    return <div className={cx(styles.columns, flexSizes && styles[`flexSizes${flexSizes.join('')}`])}>{children}</div>
}

export default Columns;
