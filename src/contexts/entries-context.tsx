import { Entry, EntryType } from "@/models/entry";
import { Dispatch, ReactNode, createContext, useState } from "react";

interface EntriesContextData {
  selected?: Entry;
  renaming?: Entry;
  isCreating: {
    state: boolean;
    type: EntryType;
  };
  setSelected: Dispatch<React.SetStateAction<Entry | undefined>>;
  setRenaming: Dispatch<React.SetStateAction<Entry | undefined>>;
  setIsCreating: Dispatch<
    React.SetStateAction<{
      state: boolean;
      type: EntryType;
    }>
  >;
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
  const [isCreating, setIsCreating] = useState({
    state: false,
    type: EntryType.FILE,
  });

  return (
    <EntriesContext.Provider
      value={{
        selected,
        renaming,
        isCreating,
        setSelected,
        setRenaming,
        setIsCreating,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
export default EntriesContext;
