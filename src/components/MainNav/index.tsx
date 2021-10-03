import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import menuData from '../../data/main-menu.json';
import Button from '../Button';
import { ButtonType } from '../Button/Button.types';
import styles from './MainNav.module.scss';

const MainNav: FunctionComponent = () => {
    return (
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {menuData.items.map(item => <li key={item.id} className={styles.item}>
              { 
                item.type === 'link' && (
                  <Link href={item.url}>
                    <a title={item.title}>
                      {item.title}
                    </a>
                  </Link>
                )
              }
              {
                item.type === 'button' && (
                  <Button.L pattern={ButtonType.RED} label={item.title} href={item.url}/>
                )
              }
            </li>)}
          </ul>
        </nav>
    )
}

export default MainNav;