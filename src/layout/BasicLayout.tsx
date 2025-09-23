import BasicLayoutWrap from "./index.style";
import Navigation from "../components/Navigation";
import LiquidBackground from "../LiquidBackground";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCluster, toggleCluster } from "../store/clusterSlice";
import HamburgerButton from "../components/Button/HamburgerButton";
import type { NavItem } from "../types/navigation";
import ThemeToggleButton from "../components/Button/ThemeToggleButton";

const navItems: NavItem[] = [
  {
    key: "/",
    label: "HOME",
    centerColor: [20, 255, 100],
    edgeColor: [150, 150, 255],
  },
  {
    key: "/career",
    label: "CAREER",
    centerColor: [255, 200, 50],
    edgeColor: [255, 100, 50],
  },
  {
    key: "/project",
    label: "PROJECT",
    centerColor: [100, 150, 255],
    edgeColor: [50, 100, 200],
  },
  {
    key: "/contact",
    label: "CONTACT",
    centerColor: [255, 100, 150],
    edgeColor: [200, 50, 100],
  },
];

const BasicLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setIsTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [bgColors, setBgColors] = useState<{
    centerColor?: [number, number, number];
    edgeColor?: [number, number, number];
  }>({});

  const [selectedColors, setSelectedColors] = useState<{
    centerColor?: [number, number, number];
    edgeColor?: [number, number, number];
  }>({});

  const [isNavOpen, setIsNavOpen] = useState(false); // 전역 상태 대체용(임시)

  const dispatch = useDispatch();

  const handleNavHover = (
    centerColor?: [number, number, number],
    edgeColor?: [number, number, number]
  ) => {
    setBgColors({ centerColor, edgeColor });
  };

  const handleNavHoverLeave = () => {
    setBgColors(selectedColors);
  };

  const handleNavClick = (
    centerColor?: [number, number, number],
    edgeColor?: [number, number, number]
  ) => {
    setSelectedColors({ centerColor, edgeColor });
    setBgColors({ centerColor, edgeColor });
    dispatch(setCluster(false));
    setIsNavOpen(false); // 클릭 후 패널 닫기
  };

  const handleClusterToggle = () => {
    dispatch(toggleCluster());
  };

  const toggleNavOpen = () => {
    setIsNavOpen((prev) => !prev);
    handleClusterToggle();
  };

  return (
    <BasicLayoutWrap $isTop={isTop}>
      <header>
        <ThemeToggleButton />
        <HamburgerButton isOpen={isNavOpen} onToggle={toggleNavOpen} />
        <Navigation
          navItems={navItems}
          onNavHover={handleNavHover}
          onNavHoverLeave={handleNavHoverLeave}
          onNavClick={handleNavClick}
          onClusterToggle={handleClusterToggle}
          isNavOpen={isNavOpen}
          setNavOpen={setIsNavOpen}
        />
      </header>
      {children}
      <LiquidBackground
        centerColor={bgColors.centerColor}
        edgeColor={bgColors.edgeColor}
      />
    </BasicLayoutWrap>
  );
};

export default BasicLayout;
