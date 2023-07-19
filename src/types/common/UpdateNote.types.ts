import { Document } from "@contentful/rich-text-types";

export interface UpdateNote {
  date: Date;
  note: Document;
}
