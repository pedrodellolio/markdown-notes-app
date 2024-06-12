import { Entry, EntryType } from "../models/entry";
import { Stores, addData, deleteData, getStoreData, updateData } from "./db";

export async function getEntries() {
  try {
    const entries = await getStoreData<Entry>(Stores.Entries);
    if (entries) {
      entries.sort((a, b) => {
        if (a.type !== b.type) {
          return a.type === EntryType.FOLDER ? -1 : 1;
        }
        return a.name.localeCompare(b.name);
      });
    }
    return entries;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
  }
}

export async function getFileById(id: string) {
  try {
    const result = await getStoreData<Entry>(Stores.Entries, id);
    return result[0];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
  }
}

export async function createEntry(entry: { name: string; type: EntryType }) {
  try {
    await addData<Entry>(Stores.Entries, {
      ...entry,
      id: crypto.randomUUID(),
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
  }
}

export async function updateEntry(entry: Entry) {
  try {
    await updateData<Entry>(Stores.Entries, entry.id, entry);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
  }
}

export async function deleteEntry(id: string) {
  try {
    await deleteData(Stores.Entries, id);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
  }
}
