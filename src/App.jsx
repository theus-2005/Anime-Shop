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
    // Carrega os produtos do arquivo db.json na pasta public
    const loadProducts = async () => {
      try {
        const response = await fetch('/Anime-Shop/db.json');
        const data = await response.json();
        setProductsList(data.produtos);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        // Fallback para dados estáticos em caso de erro
        const fallbackProducts = [
          {
            id: 1,
            name: "Death Note",
            price: 40000000000000.00,
            description: "Caderno que quem tiver o nome escrito morrerá.",
            image: "/images/Products/death-note.jpg"
          },
          {
            id: 2,
            name: "Esferas do Dragão",
            price: 1000000000000000.00,
            description: "Esferas que te dão o poder de realizar quase qualquer desejo com apenas algumas limitações",
            image: "/images/Products/esferas-do-dragao.jpg"
          },
          {
            id: 3,
            name: "Pokébola",
            price: 5000.00,
            description: "Esfera utilizada para capturar pokémons.",
            image: "/images/Products/pokebola.jpg"
          }
        ];
        setProductsList(fallbackProducts);
      }
    };

    loadProducts();
  }, []);

  return (
    <Router basename="/Anime-Shop">
      <div className="min-h-screen">
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