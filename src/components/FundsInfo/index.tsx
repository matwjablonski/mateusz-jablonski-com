import React, { FunctionComponent, memo } from 'react';
import Image from 'next/image';
import externalLinks from '../../data/external-sources.json';
import styles from './FundsInfo.module.scss';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import foundationLogo from '../../public/foundation-logo.png'

const FundsInfo: FunctionComponent = memo(() => (
  <section className={styles.fundsInfo}>
    <div className={styles.fundsInfoContent}>
      <p><strong>5% wpłat</strong> na <a href={externalLinks.patronite} target="_blank"
                                         rel="nofollow noreferrer noopener">Patronite</a> i ze sprzedaży kursów
        przekazuję do fundacji <a href={externalLinks.foundation} target="_blank" rel="nofollow noreferrer noopener">Radość
          z Uśmiechu</a>. Ciebie też zachęcam!</p>
      <Button.L
        pattern={ButtonType.CLEAN}
        href={`${externalLinks.foundation}#wplacam`}
        target="_blank"
        rel="nofollow noreferrer noopener"
        label="Wspomóż fundację"
      />
    </div>
    <div className={styles.img}>
      <Image src={foundationLogo || '/foundation-logo.png'} width={343} height={68} alt="Logo Fundacji Radość z Uśmiechu"/>
    </div>
  </section>
));

FundsInfo.displayName = 'FundsInfo';

export default FundsInfo;
