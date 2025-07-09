export default function Products({ product }) {
  // Função para formatar preços grandes
  function formatPrice(price) {
    if (price >= 1e30) return `R$ ${(price / 1e30).toFixed(1)}N`;
    if (price >= 1e27) return `R$ ${(price / 1e27).toFixed(1)}O`;
    if (price >= 1e24) return `R$ ${(price / 1e24).toFixed(1)}Sp`;
    if (price >= 1e21) return `R$ ${(price / 1e21).toFixed(1)}Sx`;
    if (price >= 1e18) return `R$ ${(price / 1e18).toFixed(1)}Qt`;
    if (price >= 1e15) return `R$ ${(price / 1e15).toFixed(1)}Qd`;
    if (price >= 1e12) return `R$ ${(price / 1e12).toFixed(1)}T`;
    if (price >= 1e9) return `R$ ${(price / 1e9).toFixed(1)}B`;
    if (price >= 1e6) return `R$ ${(price / 1e6).toFixed(1)}M`;
    if (price >= 1e3) return `R$ ${(price / 1e3).toFixed(1)}K`;
    return `R$ ${price.toFixed(2)}`;
  }

  const formattedPrice = formatPrice(product.price);
  const fullPrice = `R$ ${product.price.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  return (
    <a
      className="block w-[23%] bg-neutral-900 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow text-decoration-none"
      href={`/produto/${product.id}`}
    >
      <div className="aspect-square bg-neutral-800 rounded-md mb-3 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <h2 className="text-white font-semibold text-lg mb-2 line-clamp-2">
        {product.name}
      </h2>
      <p
        className="text-green-400 font-bold text-xl cursor-help"
        title={fullPrice}
      >
        {formattedPrice}
      </p>
    </a>
  );
}
