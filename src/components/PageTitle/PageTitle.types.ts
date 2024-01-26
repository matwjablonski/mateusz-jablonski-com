import { ReactNode } from 'react';

export interface PageTitleProps {
    title: string;
    description: string | ReactNode[];
    center?: boolean;
    dark?: boolean;
}
