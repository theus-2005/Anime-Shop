import Products from "../components/Products";

export default function Home({ searchTerm, productsList = [] }) {

  const produtosParaMostrar = searchTerm
    ? productsList.filter((produto) =>
        produto.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : productsList;

  return (
    <div>
      {searchTerm && (
        <div className="p-4 bg-neutral-800 border-b border-neutral-700">
          <p className="text-gray-300">
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
            <p className="text-gray-300 text-lg">
              😞 Ops! Não encontramos nada para "{searchTerm}"
            </p>
            <p className="text-gray-500 mt-2">Tente buscar por outro termo</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}