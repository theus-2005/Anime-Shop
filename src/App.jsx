import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>  {/* Remover o basename daqui */}
      <div className="min-h-screen">
        <Header setSearchTerm={setSearchTerm} />
        <Routes>
          <Route
            path="/"
            element={<Home searchTerm={searchTerm} />}
          />
          <Route path="/produto/:id" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}