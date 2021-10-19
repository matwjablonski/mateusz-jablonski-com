import { Asset } from "contentful";

export interface HeadInterface {
    title?: string;
    description?: string;
    keywords?: string;
    image?: Asset;
}