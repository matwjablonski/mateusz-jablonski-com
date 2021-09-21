import { ReactElement } from "react";

export interface TitileBarWithCounterProps {
    title: ReactElement,
    text: string;
    nextItemName: string,
    days: number;
}
