import { Entry, EntryType } from "@/models/entry";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface EntriesContextData {
  selected?: Entry;
  renaming?: Entry;
  creating?: CreatingProps;
  current?: Entry;
  setSelected: Dispatch<SetStateAction<Entry | undefined>>;
  setRenaming: Dispatch<SetStateAction<Entry | undefined>>;
  setCreating: Dispatch<SetStateAction<CreatingProps | undefined>>;
  setCurrent: Dispatch<SetStateAction<Entry | undefined>>;
}
interface CreatingProps {
  type: EntryType;
  folderId?: string | undefined;
}

interface Props {
  children: ReactNode;
}

const EntriesContext = createContext<EntriesContextData>(
  {} as EntriesContextData
);
export const EntriesProvider = ({ children }: Props) => {
  const [selected, setSelected] = useState<Entry>();
  const [renaming, setRenaming] = useState<Entry>();
  const [creating, setCreating] = useState<CreatingProps>();
  const [current, setCurrent] = useState<Entry>();

  return (
    <EntriesContext.Provider
      value={{
        selected,
        renaming,
        creating,
        current,
        setCurrent,
        setSelected,
        setRenaming,
        setCreating,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
export default EntriesContext;
