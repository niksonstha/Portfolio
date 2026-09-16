import { BrowserRouter, Route, Routes } from "react-router-dom";

import useLenis from "./hooks/useLenis";

import Home from "./pages/Home";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  useLenis();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects/:slug" element={<ProjectCaseStudy />} />
    </Routes>
  );
}

export default App;
