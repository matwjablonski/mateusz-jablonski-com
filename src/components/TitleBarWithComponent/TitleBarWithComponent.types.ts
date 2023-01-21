import { Document } from '@contentful/rich-text-types';
import { ReactElement } from "react";

export enum TitleBarType {
    BASIC = 'basic',
    REVERT = 'revert'
}

export interface TitleBarWithComponentProps {
    title: ReactElement;
    text: string | Document;
    type?: TitleBarType; 
    capitalize?: boolean;
}
