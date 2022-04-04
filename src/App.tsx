import { ThemeProvider } from "@mui/material";
import React from "react";
import { useRoutes } from "react-router";
import "./App.css";
import routes from "./router";
import theme from "./themes";

function App() {
  let element = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      <div>
        <h1>Route Objects Example</h1>

        {element}
      </div>
    </ThemeProvider>
  );
}

export default App;
