import { useContext } from "react";
import PreferencesContext from "../contexts/preferences-context";

const usePreferences = () => {
  return useContext(PreferencesContext);
};

export default usePreferences;
