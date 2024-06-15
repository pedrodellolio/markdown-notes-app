import { Entry, EntryType } from "../models/entry";
import { getDefaultContent } from "../util/util";

const DB_NAME = "db";
const version = 1;

export enum Stores {
  Users = "users",
  Entries = "entries",
}

export const initDB = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, version);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(Stores.Entries)) {
        const store = db.createObjectStore(Stores.Entries, { keyPath: "id" });
        store.createIndex("name", "name", { unique: false });
      }
    };

    request.onsuccess = () => {
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const getStoreData = <T>(
  storeName: Stores,
  key?: string
): Promise<T[]> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const getRequest = store.getAll(key);
      getRequest.onsuccess = () => {
        resolve(getRequest.result);
      };
    };

    request.onerror = () => {
      resolve([]);
    };
  });
};

export const getStoreDataByIndex = <T>(
  storeName: Stores,
  indexName: string,
  indexValue: string
): Promise<T[]> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, version);
    
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);
      const index = store.index(indexName);
      const getRequest = index.getAll(indexValue);

      getRequest.onsuccess = () => {
        resolve(getRequest.result);
      };

      getRequest.onerror = () => {
        resolve([]);
      };
    };

    request.onerror = () => {
      resolve([]);
    };
  });
};

export const addData = <T>(
  storeName: string,
  data: T
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const addRequest = store.add(data);

      addRequest.onsuccess = () => {
        resolve(data);
      };

      addRequest.onerror = () => {
        resolve(addRequest.error?.message || "Unknown error");
      };
    };

    request.onerror = () => {
      resolve(request.error?.message || "Unknown error");
    };
  });
};

export const deleteData = (
  storeName: string,
  key: string
): Promise<boolean> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const deleteRequest = store.delete(key);

      deleteRequest.onsuccess = () => {
        resolve(true);
      };

      deleteRequest.onerror = () => {
        resolve(false);
      };
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};

export const updateData = <T>(
  storeName: string,
  key: string,
  newData: Partial<T>
): Promise<T | string | null> => {
  return new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, version);

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);
      const getRequest = store.get(key);

      getRequest.onsuccess = () => {
        const data = getRequest.result;

        if (data) {
          const updatedData = { ...data, ...newData };
          const putRequest = store.put(updatedData);

          putRequest.onsuccess = () => {
            resolve(updatedData);
          };

          putRequest.onerror = () => {
            resolve(putRequest.error?.message || "Unknown error");
          };
        } else {
          resolve("No data found with the given key");
        }
      };

      getRequest.onerror = () => {
        resolve(getRequest.error?.message || "Unknown error");
      };
    };

    request.onerror = () => {
      resolve(request.error?.message || "Unknown error");
    };
  });
};

export const firstTimeRegistered = async () => {
  const dbInitialized = await initDB();

  if (dbInitialized) {
    const entries = await getStoreData<Entry>(Stores.Entries);
    if (entries.length === 0) {
      await addData(Stores.Entries, {
        id: crypto.randomUUID(),
        name: "Getting Started",
        type: EntryType.FILE,
        content: getDefaultContent(),
      } as Entry);
    }
  } else {
    console.error("Failed to initialize the database.");
  }
};
