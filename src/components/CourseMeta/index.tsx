import { FC } from 'react';
import { CourseMetaProps } from './CourseMeta.types';
import styles from './CourseMeta.module.scss';

const VAT_TAX = 1.23;

const CourseMeta: FC<CourseMetaProps> = ({
  days,
  costPerUser,
  currency,
}) => {

  const costBrutt = costPerUser * VAT_TAX;

  return <div className={styles.CourseMeta}>
    <div>Czas trwania warsztatów: <strong>{days}</strong> {days > 1 ? 'dni' : 'dzień'}</div>
    <div>Koszt dla uczestnika: <strong>{costPerUser} {currency} netto ({costBrutt} {currency} brutto)</strong></div>
  </div>
}

export default CourseMeta;
