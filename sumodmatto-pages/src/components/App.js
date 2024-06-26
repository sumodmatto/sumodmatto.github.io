import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import BlogPage from "../pages/BlogPage";
import WebAppPage from "../pages/WebAppPage";
import "../styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/webapp" element={<WebAppPage />} />
          <Route path="/" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
