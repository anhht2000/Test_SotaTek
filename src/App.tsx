import { ThemeProvider } from "@mui/material";
import React from "react";
import { useRoutes } from "react-router";
import "./App.css";
import { MessageDialog } from "./common/components/Dialog";
import Loading from "./common/components/Loading";
import LookScreen from "./common/components/LockScreen";
import routes from "./router";
import theme from "./themes";

function App() {
  let element = useRoutes(routes);
  return (
    <ThemeProvider theme={theme}>
      {element}
      <Loading />
      <LookScreen />
      <MessageDialog />
    </ThemeProvider>
  );
}

export default App;
