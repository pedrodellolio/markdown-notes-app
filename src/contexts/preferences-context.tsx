import { Mode } from "@/models/mode";
import { Dispatch, ReactNode, createContext, useState } from "react";

interface PreferencesContextData {
  isMenuOpen: boolean;
  mode: Mode;
  isContextOpen: boolean;
  setIsMenuOpen: Dispatch<React.SetStateAction<boolean>>;
  setIsContextOpen: Dispatch<React.SetStateAction<boolean>>;
  nextMode: () => void;
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
  const [mode, setMode] = useState<Mode>(Mode.INSERT);

  const nextMode = () => {
    setMode((prevMode) =>
      prevMode === Mode.PREVIEW ? Mode.INSERT : Mode.PREVIEW
    );
  };

  return (
    <PreferencesContext.Provider
      value={{
        isMenuOpen,
        isContextOpen,
        mode,
        setIsContextOpen,
        setIsMenuOpen,
        nextMode,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};
export default PreferencesContext;
