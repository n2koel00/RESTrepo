/**Koko koodi REST tehtävää */
import React, { createContext, useContext, useState } from "react";

const CurrencyContext = createContext();

/**Komponentti tekee context providerin valuuttavalinta sovellukselle*/

export const CurrencySelection = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("eur");

  const toggleCurrency = () => {
    setSelectedCurrency((prevCurrency) =>
      prevCurrency === "usd" ? "eur" : "usd"
    );
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

/**React hook jotta koodi voidaan viedä muualle*/
export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
