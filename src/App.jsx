import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/produtos") // <- aqui está seu json-server
      .then((res) => res.json())
      .then((data) => setProductsList(data))
      .catch((err) => console.error("Erro ao buscar produtos:", err));
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        {/* Agora o Header vai receber os produtos do JSON */}
        <Header setSearchTerm={setSearchTerm} productsList={productsList} />
        <Routes>
          <Route
            path="/"
            element={
              <Home searchTerm={searchTerm} productsList={productsList} />
            }
          />
          <Route path="/produto/:id" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
