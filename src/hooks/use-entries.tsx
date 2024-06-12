import EntriesContext from "@/contexts/entries-context";
import { useContext } from "react";

const useEntries = () => {
  return useContext(EntriesContext);
};

export default useEntries;
