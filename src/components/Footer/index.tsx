import React, { FC, FunctionComponent, memo, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Grid from '../Grid';
import menu from '../../data/footer-menu.json';
import FundsInfo from '../FundsInfo';
import logo from '../../public/logo-footer.svg'
import logoWhite from '../../public/logo-white.svg';
import FooterSocialMedia from '../FooterSocialMedia';
import { useTranslations } from '../../hooks/useTranslations';
import { Copy, CopyInner, FooterMenu, FooterMenuItem, Info, Wrapper } from './ui';

type FooterProps = {
  hideFunds?: boolean;
  hideSocialMedia?: boolean;
  dark?: boolean;
};

const Footer: FC<FooterProps> = memo(({ hideFunds, hideSocialMedia, dark }) => {
  const { t } = useTranslations();
  const date: string = useMemo(
    () => new Date().getFullYear().toString() === '2019' ? '2019' : `2019 - ${new Date().getFullYear()}`,
    [],
  );

  return (
    <Grid>
      <Wrapper>
        {!hideSocialMedia && <FooterSocialMedia dark={dark} />}
        {!hideFunds && <FundsInfo dark={dark} />}
        <Copy dark={dark}>
          <CopyInner>
            <Link
              href="/"
              aria-label={t.FOOTER.TITLE}
            >
              <Image src={dark ? (logoWhite || '/logo-white.svg') : (logo || '/logo-footer.svg')} alt="" width={114} height={24} />
            </Link>
            <Info dark={dark}>© {date} Mateusz Jabłoński. All rights reserved</Info>
          </CopyInner>
          <FooterMenu>
            {
              menu.items.map((item) => (
                  <FooterMenuItem key={item.id} dark={dark}>
                    <Link href={item.url}>
                      {t.MENU[item.title]}
                    </Link>
                  </FooterMenuItem>
                ),
              )}
          </FooterMenu>
        </Copy>
      </Wrapper>
    </Grid>
  );
});

Footer.displayName = 'Footer';

export default Footer;
