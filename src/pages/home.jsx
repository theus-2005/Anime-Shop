import { useState, useEffect } from "react";
import Products from "../components/Products";

export default function Home({ searchTerm }) {
  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setProductsList(data.produtos))
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  }, []);

  const produtosParaMostrar = searchTerm
    ? productsList.filter((produto) =>
        produto.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productsList;

  return (
    <div>
      {searchTerm && (
        <div className="p-4 bg-gray-100 border-b">
          <p className="text-gray-700">
            {produtosParaMostrar.length > 0
              ? `${produtosParaMostrar.length} resultado(s) encontrado(s) para "${searchTerm}"`
              : `Nenhum resultado encontrado para "${searchTerm}"`}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4 p-6">
        {produtosParaMostrar.length > 0 ? (
          produtosParaMostrar.map((product) => (
            <Products key={product.id} product={product} />
          ))
        ) : searchTerm ? (
          <div className="w-full text-center py-12">
            <p className="text-gray-500 text-lg">
              😞 Ops! Não encontramos nada para "{searchTerm}"
            </p>
            <p className="text-gray-400 mt-2">Tente buscar por outro termo</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}