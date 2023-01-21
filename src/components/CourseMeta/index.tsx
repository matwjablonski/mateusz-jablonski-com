import { FC } from 'react';
import cx from 'classnames';
import { CourseMetaProps } from './CourseMeta.types';
import styles from './CourseMeta.module.scss';

const CourseMeta: FC<CourseMetaProps> = ({
  icon,
  label,
  value,
  valueBelow,
}) => {

  return <div className={styles.CourseMeta}>
    <div className={styles.content}>
          <div>
              <h3 className={styles.subtitle}>{label}</h3>
              <h2 className={cx(styles.title, valueBelow && styles.smaller)} title={value}>{value}</h2>
              {valueBelow && <small className={styles.valueBelow}>{valueBelow}</small>}
          </div>
          <div className={styles.calendarIcon}>
              {icon}
          </div>
      </div>
  </div>
}

export default CourseMeta;
