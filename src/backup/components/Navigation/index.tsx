import React from "react";
import { NavigationWrap } from "./index.style";
import { Link } from "react-router-dom";
import type { NavItem } from "../../types/navigation";

interface NavigationProps {
  navItems: NavItem[];
  onNavHover: (
    centerColor?: [number, number, number],
    edgeColor?: [number, number, number]
  ) => void;
  onNavHoverLeave: () => void;
  onNavClick: (
    centerColor?: [number, number, number],
    edgeColor?: [number, number, number]
  ) => void;
  onClusterToggle: () => void;
  isNavOpen: boolean;
  setNavOpen: (open: boolean) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  navItems,
  onNavHover,
  onNavHoverLeave,
  onNavClick,
  onClusterToggle,
  isNavOpen,
  setNavOpen,
}) => {
  const toggleMenu = () => {
    onClusterToggle();
    setNavOpen(!isNavOpen);
    console.log("토글 메뉴 클릭");
  };

  const handleNavClick = (
    centerColor?: [number, number, number],
    edgeColor?: [number, number, number]
  ) => {
    setNavOpen(false);
    onNavClick(centerColor, edgeColor);
  };

  return (
    <NavigationWrap>
      {isNavOpen && <div className="nav-overlay" onClick={toggleMenu} />}
      <div className={`nav-panel${isNavOpen ? " open" : ""}`}>
        <nav>
          <ul>
            {navItems.map((item) => (
              <li
                key={item.key}
                onClick={() => handleNavClick(item.centerColor, item.edgeColor)}
                onMouseEnter={() =>
                  onNavHover(item.centerColor, item.edgeColor)
                }
                onMouseLeave={onNavHoverLeave}
              >
                <Link to={item.key}>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </NavigationWrap>
  );
};

export default Navigation;
