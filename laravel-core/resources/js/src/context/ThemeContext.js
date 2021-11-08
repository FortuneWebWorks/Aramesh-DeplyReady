import React, { useState, createContext, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [light, setLight] = useState(true);

  useEffect(() => {
    const app = document.getElementById('app');
    if (!app.classList.contains(light ? 'light' : 'dark')) {
      app.classList.remove(light ? 'dark' : 'light');
      app.classList.add(light ? 'light' : 'dark');
    }
  }, [light]);

  return (
    <ThemeContext.Provider value={{ light, setLight }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
