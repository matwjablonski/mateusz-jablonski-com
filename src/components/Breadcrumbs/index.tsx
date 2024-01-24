import React, { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useTranslations } from '../../hooks/useTranslations';
import { BreadcrumbsList, Item, Separator } from './ui';

type Breadcrumbs = {
    pageTitle?: string;
    dark?: boolean;
}

const Breadcrumbs: FC<Breadcrumbs> = ({ pageTitle, dark}) => {
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
        <BreadcrumbsList>
            {
                breadcrumbsItems.map((breadcrumb, i) => <Item key={`breadcrumb-${breadcrumb}`} reverse={dark}>
                        <Link href={`/${breadcrumb}`}>
                            { breadcrumb ? mapBreadcrumbs(breadcrumb) : 'Jabłoński' }
                        </Link>
                        { (i !== breadcrumbsItems.length - 1 || pageTitle) && <Separator>/</Separator>}
                    </Item>
                )
            }
            {pageTitle && <Item key={`breadcrumb-${pageTitle}`} reverse={dark}>
                {pageTitle}
            </Item>}
        </BreadcrumbsList>
    );
}

export default Breadcrumbs;
