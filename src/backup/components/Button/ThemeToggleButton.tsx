import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { toggleMode } from "../../store/themeSlice";
import { ThemeToggleButtonWrap } from "./index.style";

const ThemeToggleButton: React.FC = () => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleMode());
  };

  return (
    <ThemeToggleButtonWrap
      className={`theme-toggle-btn ${mode === "dark" ? "dark" : "light"}`}
      onClick={handleToggle}
      aria-label="Toggle theme"
    >
      <span className="icon"></span>
    </ThemeToggleButtonWrap>
  );
};

export default ThemeToggleButton;
