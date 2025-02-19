import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ColorContextType = {
  color: string;
  setColor: (color: string) => void;
  headerColor: string;
  setHeaderColor: (color: string) => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
}

export const ColorProvider: React.FC<ColorProviderProps> = ({ children }) => {
  const [color, setColor] = useState<string>(() => localStorage.getItem('color') || '#f5f5f5');
  const [headerColor, setHeaderColor] = useState<string>(() => localStorage.getItem('headerColor') || '#adc6ff');

  useEffect(() => {
    localStorage.setItem('color', color);
  }, [color]);

  useEffect(() => {
    localStorage.setItem('headerColor', headerColor);
  }, [headerColor]);

  return (
    <ColorContext.Provider value={{ color, setColor, headerColor, setHeaderColor }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColor = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }
  return context;
};

