import { Document } from "@contentful/rich-text-types";

export interface Author {
    me?: boolean;
    name: string;
    shortBiography?: Document;  
    description?: Document;
    website?: string;
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
}