import { Document } from "@contentful/rich-text-types";
import { Asset } from "contentful";

export interface Author {
    me?: boolean;
    name: string;
    shortBiography?: Document;  
    description?: Document;
    image?: Asset;
    website?: string;
    email?: string;
    github?: string;
    linkedIn?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
}