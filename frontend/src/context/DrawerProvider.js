import { createContext, useContext, useState } from "react";

const DrawerContext = createContext();

const DrawerProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <DrawerContext.Provider value={{ isOpen, handleToggle, onClose }}>
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context)
    throw new Error("You are using the drawer Context outside the provider");
  return context;
};

export { DrawerProvider, useDrawerContext };
