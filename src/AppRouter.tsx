import { HashRouter, Routes, Route } from "react-router-dom";
import BasicLayout from "./layout/BasicLayout";
import Home from "./containers/Home";
import Career from "./containers/Career";
import Project from "./containers/Project";
import Contact from "./containers/Contact";

import { useEffect } from "react";
import CustomCursor from "./components/CustomCursor";

const AppRouter = () => { 
  const basename = import.meta.env.VITE_BASENAME || "";

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <HashRouter basename={basename}>
      <CustomCursor />
      <BasicLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/career" element={<Career />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BasicLayout>
    </HashRouter>
  );
};

export default AppRouter;
