import { Dispatch, ReactNode, createContext, useState } from "react";

interface PreferencesContextData {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<React.SetStateAction<boolean>>;
}

interface Props {
  children: ReactNode;
}

const PreferencesContext = createContext<PreferencesContextData>(
  {} as PreferencesContextData
);
export const PreferencesProvider = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <PreferencesContext.Provider value={{ isMenuOpen, setIsMenuOpen }}>
      {children}
    </PreferencesContext.Provider>
  );
};
export default PreferencesContext;
