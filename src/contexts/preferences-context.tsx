import { Dispatch, ReactNode, createContext, useState } from "react";

interface PreferencesContextData {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<React.SetStateAction<boolean>>;
  isContextOpen: boolean;
  setIsContextOpen: Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}

const PreferencesContext = createContext<PreferencesContextData>(
  {} as PreferencesContextData
);
export const PreferencesProvider = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isContextOpen, setIsContextOpen] = useState(false);

  return (
    <PreferencesContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, isContextOpen, setIsContextOpen }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
export default PreferencesContext;
