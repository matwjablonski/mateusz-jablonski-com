import { ReactElement } from "react";

export enum TitleBarType {
    BASIC = 'basic',
    REVERT = 'revert'
}

export interface TitleBarWithComponentProps {
    title: ReactElement;
    text: string;
    type?: TitleBarType; 
    capitalize?: boolean;
}
