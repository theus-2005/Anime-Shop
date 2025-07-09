import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/home";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsList, setProductsList] = useState([]);

  // Carregar produtos uma vez no App
  useEffect(() => {
    fetch("./db.json")
      .then((res) => res.json())
      .then((data) => setProductsList(data.produtos))
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  }, []);

  return (
    <Router>
      <div className="min-h-screen">
        <Header 
          setSearchTerm={setSearchTerm} 
          productsList={productsList} 
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home 
                searchTerm={searchTerm} 
                productsList={productsList} 
              />
            }
          />
          <Route path="/produto/:id" element={<ProductsPage />} />
        </Routes>
      </div>
    </Router>
  );
}