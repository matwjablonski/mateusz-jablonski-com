import { Entry } from "contentful";
import { HeadInterface } from "./Head.types";

export interface Article {
    head?: Entry<HeadInterface>;
    title: string;
    excerpt: any;
}