import styles from './MetaItem.module.scss';

const MetaItem = ({ title, value }) => (
    <div className={styles.metaItem}>
        <h3 className={styles.metaTitle}>{title}</h3>
        <div className={styles.metaValue}>{value}</div>
    </div>
)

export default MetaItem;
