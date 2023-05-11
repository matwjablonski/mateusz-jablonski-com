import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from './Breadcrumbs.module.scss';
import { useTranslations } from '../../hooks/useTranslations';

type Breadcrumbs = {
    pageTitle?: string;
}

const Breadcrumbs: FC<Breadcrumbs> = ({ pageTitle }) => {
    const { pathname } = useRouter();
    const { t } = useTranslations();

    const pathsArray = pathname.split('/');
    const breadcrumbsItems = pathsArray.length > 2 ? pathsArray.splice(0, pathsArray.length - 1) : pathsArray;

    const mapBreadcrumbs = (name: string) => {
        switch (name) {
            case 'contact':
                return t.BREADCRUMBS.CONTACT;
            case 'about':
                return t.BREADCRUMBS.ABOUT;
            case 'workshops':
                return  t.BREADCRUMBS.WORKSHOPS;
            case 'book':
                return t.BREADCRUMBS.BOOKS;
            case 'docs':
                return t.BREADCRUMBS.DOCS;
            default:
                return name;
        }
    }

    return (
        <ul className={styles.breadcrumbs}>
            {
                breadcrumbsItems.map((breadcrumb, i) => <li className={styles.item} key={`breadcrumb-${breadcrumb}`}>
                        <Link href={`/${breadcrumb}`}>
                            { breadcrumb ? mapBreadcrumbs(breadcrumb) : 'Jabłoński' }
                        </Link>
                        { (i !== breadcrumbsItems.length - 1 || pageTitle) && <span className={styles.separator}>/</span>}
                    </li>
                )
            }
            {pageTitle && <li className={styles.item} key={`breadcrumb-${pageTitle}`}>
                {pageTitle}
            </li>}
        </ul>
    );
}

export default Breadcrumbs;
