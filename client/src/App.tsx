import { createTheme } from "@mui/material/styles";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { themeSettings } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import Dashboard from "@/scenes/dashboard";
import Predictions from "./scenes/predictions";
import Authorisation from "./scenes/auth";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <>
      <BrowserRouter>
        <div className="app">
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box width="100%" height="100%" padding="1rem 2rem 4 rem 2rem">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/auth" element={<Authorisation />} />
                <Route path="/predictions" element={<Predictions />} />
              </Routes>
            </Box>
          </ThemeProvider>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
