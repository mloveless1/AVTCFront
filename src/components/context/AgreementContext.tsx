import React, { createContext, useContext, useState, ReactNode } from 'react';

// Create context
interface AgreementContextType {
  isAgreed: boolean;
  setIsAgreed: (value: boolean) => void;
}

const AgreementContext = createContext<AgreementContextType | undefined>(undefined);

// Custom hook to use the agreement context
export const useAgreementContext = (): AgreementContextType => {
  const context = useContext(AgreementContext);
  if (!context) {
    throw new Error('useAgreementContext must be used within an AgreementProvider');
  }
  return context;
};

interface AgreementProviderProps {
  children: ReactNode;
}

export const AgreementProvider: React.FC<AgreementProviderProps> = ({ children }) => {
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <AgreementContext.Provider value={{ isAgreed, setIsAgreed }}>
      {children}
    </AgreementContext.Provider>
  );
};
