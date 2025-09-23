import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import AppRouter from "./AppRouter";
import { darkTheme } from "./theme/dark.theme";
import { lightTheme } from "./theme/light.theme";
import GlobalStyle from "./styles/global.style";
import type { RootState } from "./store";

export default function App() {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isDark = mode === "dark";

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyle />
      <AppRouter />
    </ThemeProvider>
  );
}
