import { Descendant } from "slate";

export enum EntryType {
  FILE = "FILE",
  FOLDER = "FOLDER",
}

export interface Entry {
  id: string;
  parentId?: string;
  name: string;
  type: EntryType;
  content?: string;
}
