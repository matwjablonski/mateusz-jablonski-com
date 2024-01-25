import React, { FunctionComponent, memo } from 'react';
import Image from 'next/image';
import externalLinks from '../../data/external-sources.json';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import foundationLogo from '../../public/foundation-logo.png'
import { useTranslations } from '../../hooks/useTranslations';
import { useRouter } from 'next/router';
import { ContentBox, ImageBox, Wrapper } from './ui';

const FundsInfo: FunctionComponent<{ dark?: boolean }> = memo(({ dark }) => {
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
    <Wrapper dark={dark}>
      <ContentBox>
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
      </ContentBox>
      <ImageBox>
        <Image src={foundationLogo || '/foundation-logo.png'} width={343} height={68} alt={LOGO_ALT}/>
      </ImageBox>
    </Wrapper>
  )
});

FundsInfo.displayName = 'FundsInfo';

export default FundsInfo;
