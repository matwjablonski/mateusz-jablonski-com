import React, { FunctionComponent, memo } from 'react';
import Image from 'next/image';
import externalLinks from '../../data/external-sources.json';
import styles from './FundsInfo.module.scss';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import foundationLogo from '../../public/foundation-logo.png'
import { useTranslations } from '../../hooks/useTranslations';
import { useRouter } from 'next/router';

const FundsInfo: FunctionComponent = memo(() => {
  const { t, translate } = useTranslations();
  const { locale } = useRouter();

  const {
    MESSAGE,
    INFO,
    ENCOURAGEMENT,
    HELP_ACTION_LABEL,
    LOGO_ALT,
  } = t.FOOTER.FUNDS_INFO;
  return (
    <section className={styles.fundsInfo}>
      <div className={styles.fundsInfoContent}>
        <p>{translate({ value: MESSAGE, tagName: 'strong' })}<a href={locale === 'pl' ? externalLinks.buycoffee : externalLinks.buycoffeeen} target="_blank"
                                           rel="nofollow noreferrer noopener">Buy Coffee</a>{INFO}<a href={externalLinks.foundation} target="_blank" rel="nofollow noreferrer noopener">Radość
            z Uśmiechu</a>. {ENCOURAGEMENT}</p>
        <Button.L
          pattern={ButtonType.CLEAN}
          href={`${externalLinks.foundation}#wplacam`}
          target="_blank"
          rel="nofollow noreferrer noopener"
          label={HELP_ACTION_LABEL}
        />
      </div>
      <div className={styles.img}>
        <Image src={foundationLogo || '/foundation-logo.png'} width={343} height={68} alt={LOGO_ALT}/>
      </div>
    </section>
  )
});

FundsInfo.displayName = 'FundsInfo';

export default FundsInfo;
