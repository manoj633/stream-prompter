import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your pages
import HomePage from "./pages/HomePage/HomePage";
import TeleprompterPage from "./pages/TeleprompterPage/TeleprompterPage";
import HowItWorksPage from "./pages/HowItWorksPage/HowItWorksPage";
import UseCasesPage from "./pages/UseCasesPage/UseCasesPage";
import BlogDetailsPage from "./pages/BlogDetails/BlogDetailsPage";
import BlogListPage from "./pages/BlogListPage/BlogListPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teleprompter" element={<TeleprompterPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/use-cases" element={<UseCasesPage />} />
        <Route path="/bloglist" element={<BlogListPage />} />
        <Route path="/blog" element={<BlogDetailsPage />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
