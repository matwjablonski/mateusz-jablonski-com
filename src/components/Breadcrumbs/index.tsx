import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import styles from './Breadcrumbs.module.scss';

const Breadcrumbs = () => {
    const { pathname } = useRouter();

    const pathsArray = pathname.split('/');
    const breadcrumbsItems = pathsArray.length > 2 ? pathsArray.splice(0, pathsArray.length - 1) : pathsArray;

    return (
        <ul className={styles.breadcrumbs}>
            {
                breadcrumbsItems.map((breadcrumb, i) => <li className={styles.item} key={`breadcrumb-${breadcrumb}`}>
                        <Link href={`/${breadcrumb}`}>
                            <a>
                                { breadcrumb ? breadcrumb : 'Jabłoński' }
                            </a>
                        </Link>
                        { i !== breadcrumbsItems.length - 1 && <span className={styles.separator}>/</span>}
                    </li>
                )
            }
        </ul>
    );
}

export default Breadcrumbs;
