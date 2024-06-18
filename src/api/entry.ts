import { Entry, EntryType } from "../models/entry";
import {
  Stores,
  addData,
  deleteData,
  getStoreData,
  getStoreDataByIndex,
  updateData,
} from "./db";

export async function getAllEntries() {
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

export async function getEntryById(id: string): Promise<Entry | undefined> {
  try {
    return (await getStoreData<Entry>(Stores.Entries, id))[0];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
    return undefined;
  }
}

export async function getEntryByName(name: string): Promise<Entry | undefined> {
  try {
    const entry = await getStoreDataByIndex<Entry>(
      Stores.Entries,
      "name",
      name
    );
    return entry[0];
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
    return undefined;
  }
}

export async function getEntryChildren(parentId?: string): Promise<Entry[]> {
  try {
    const entries = await getStoreData<Entry>(Stores.Entries);
    if (parentId === "root") return entries.filter((entry) => !entry.parentId);
    return entries.filter((entry) => entry.parentId === parentId);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
    return [];
  }
}

export async function getPath(entry: Entry): Promise<string> {
  if (!entry.parentId) {
    return `/file/${entry.id}`;
  }

  const parent = await getEntryById(entry.parentId);
  if (!parent) {
    throw new Error(`Parent entry with id ${entry.parentId} not found`);
  }

  const parentPath = await getPath(parent);
  return `${parentPath}${encodeURIComponent("/" + entry.id)}`;
}

export async function getEntryByPath(path: string) {
  const segments = path.split("/");

  let currentEntry: Entry | undefined;
  for (const segment of segments) {
    if (!currentEntry) {
      currentEntry = await getEntryById(segment);
    } else {
      const entries = await getEntryChildren(currentEntry.id);
      currentEntry = entries.find((entry) => entry.id === segment);
    }

    if (!currentEntry) {
      return undefined;
    }
  }

  return currentEntry;
}

export async function createEntry(entry: {
  name: string;
  type: EntryType;
  parentId?: string;
}) {
  try {
    await addData<Entry>(Stores.Entries, {
      id: crypto.randomUUID(),
      ...entry,
      parentId: entry.parentId,
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

export async function deleteEntry(entry: Entry) {
  try {
    const children = await getEntryChildren(entry.id);

    for (const child of children) {
      await deleteEntry(child);
    }

    await deleteData(Stores.Entries, entry.id);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Something went wrong");
    }
  }
}

// If path is made by entry name

// export async function getPath(entry: Entry): Promise<string> {
//   if (!entry.parentId) {
//     return `/file/${entry.name.replace(" ", "_")}`;
//   }

//   const parent = await getEntryById(entry.parentId);
//   if (!parent) {
//     throw new Error(`Parent entry with id ${entry.parentId} not found`);
//   }

//   const parentPath = await getPath(parent);
//   return `${parentPath}${encodeURIComponent(
//     "/" + entry.name.replace(" ", "_")
//   )}`;
// }

// export async function getEntryByPath(path: string) {
//   const segments = path.split("/").map((p) => p.replace("_", " "));

//   let currentEntry: Entry | undefined;
//   for (const segment of segments) {
//     if (!currentEntry) {
//       currentEntry = await getEntryByName(segment);
//       console.log(currentEntry);
//     } else {
//       const entries = await getEntryChildren(currentEntry.id);
//       console.log(entries);
//       currentEntry = entries.find((entry) => entry.name === segment);
//     }

//     if (!currentEntry) {
//       return null;
//     }
//   }

//   return currentEntry;
// }
