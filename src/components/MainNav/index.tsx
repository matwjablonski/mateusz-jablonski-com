import React, { FunctionComponent } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import menuData from '../../data/main-menu.json';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import styles from './MainNav.module.scss';
import { useTranslations } from '../../hooks/useTranslations';
import { SearchBar } from '../SearchBar';

const MainNav: FunctionComponent<{ isMobileOpen: boolean, reverse?: boolean, }> = ({ isMobileOpen, reverse }) => {
  const { t } = useTranslations();

  return (
      <nav className={cx(styles.nav, isMobileOpen && styles.isMenuOpen)}>
        <ul className={styles.list}>
          {menuData.items.map(item => <li key={item.id} className={cx(styles.item, reverse && styles.reverse, item.type === 'search' && styles.search)}>
            { 
              item.type === 'link' && (
                <Link href={item.url} title={t.MENU[item.title]}>
                  {t.MENU[item.title]}
                </Link>
              )
            }
            {
              item.type === 'search' && (
                <SearchBar />
              )
            }
            {
              item.type === 'button' && (
                <Button.L pattern={ButtonType.RED} label={t.MENU[item.title]} href={item.url}/>
              )
            }
          </li>)}
        </ul>
      </nav>
  )
}

export default MainNav;
