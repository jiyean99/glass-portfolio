import { useRef, useState } from "react";

import { projects } from "./data/projects";
import { blogPosts } from "./data/blogPosts";

import GardenCanvas from "./components/three/GardenCanvas";
import Navbar from "./components/layout/Navbar";
import GardenCursor from "./components/ui/GardenCursor";
import BloomHint from "./components/ui/BloomHint";

import HeroSection from "./components/sections/HeroSection";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import WritingSection from "./components/sections/WritingSection";
import ContactSection from "./components/sections/ContactSection";

import { useProjects } from "./hooks/useProjects";
import { useThemeClasses } from "./hooks/useThemeClasses";
import type { Theme } from "./types/portfolio";
import { useScrolled } from "./hooks/useScrolled";

const App = () => {
  const [theme, setTheme] = useState<Theme>("dark");
  const [plantsCount, setPlantsCount] = useState(0);
  const [hasClicked, setHasClicked] = useState(false);
  const scrolled = useScrolled({ threshold: 80 });

  const cursorRef = useRef<HTMLDivElement>(null);

  const {
    filterOptions,
    activeFilter,
    setActiveFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    currentProjects,
  } = useProjects(projects);

  const ui = useThemeClasses(theme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleBloom = () => setPlantsCount((prev) => prev + 1);
  const handleFirstBloom = () => setHasClicked(true);

  return (
    <div className={`${ui.appShell} ${ui.appTheme}`}>

      <GardenCanvas
        theme={theme}
        cursorRef={cursorRef}
        onBloom={handleBloom}
        onFirstBloom={handleFirstBloom}
      />

      <GardenCursor theme={theme} cursorRef={cursorRef} />

      <BloomHint
        visible={!hasClicked && plantsCount === 0}
        pointBg={ui.pointBg}
        pointBorder={ui.pointBorder}
        pointColor={ui.pointColor}
      />

      <Navbar
        theme={theme}
        scrolled={scrolled}
        plantsCount={plantsCount}
        pointColor={ui.pointColor}
        onToggleTheme={toggleTheme}
      />

      <HeroSection theme={theme} pointColor={ui.pointColor} />

      <AboutSection
        theme={theme}
        pointColor={ui.pointColor}
        pointBorder={ui.pointBorder}
        glassBase={ui.glassBase}
      />

      <ExperienceSection
        theme={theme}
        pointColor={ui.pointColor}
        pointBg={ui.pointBg}
        pointBorder={ui.pointBorder}
        glassBase={ui.glassBase}
      />

      <ProjectsSection
        theme={theme}
        pointColor={ui.pointColor}
        pointBg={ui.pointBg}
        pointBorder={ui.pointBorder}
        pointFilterActive={ui.pointFilterActive}
        glassProject={ui.glassProject}
        filterOptions={filterOptions}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        currentProjects={currentProjects}
      />

      <WritingSection
        theme={theme}
        pointColor={ui.pointColor}
        pointBg={ui.pointBg}
        glassBase={ui.glassBase}
        blogPosts={blogPosts}
      />

      <ContactSection theme={theme} pointBg={ui.pointBg} />
    </div>
  );
};

export default App;
