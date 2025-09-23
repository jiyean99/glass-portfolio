import React from "react";
import { HamburgerButtonWrap } from "./index.style";

interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

const HamburgerButton: React.FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <HamburgerButtonWrap
      className={`hamburger-btn${isOpen ? " open" : ""}`}
      onClick={onToggle}
      aria-label={isOpen ? "Close Navigation" : "Toggle Navigation"}
    >
      <div className="hamburger-btn-elem">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </HamburgerButtonWrap>
  );
};

export default HamburgerButton;
