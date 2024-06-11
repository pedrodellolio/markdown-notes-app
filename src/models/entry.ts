export interface Entry {
  id: string;
  name: string;
  content?: string;
  type: EntryType;
}

export enum EntryType {
  FILE,
  FOLDER,
}
