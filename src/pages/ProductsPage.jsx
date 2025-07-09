import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.produtos.find((p) => p.id === parseInt(id));
        if (!foundProduct) {
          setError(true);
          return;
        }
        setProduct(foundProduct);
      })
      .catch(() => setError(true));
  }, [id]);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setRelatedProducts(
          data.produtos.filter((p) => p.id !== parseInt(id)).slice(0, 4)
        );
      });
  }, [id]);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddComment();
    }
  };

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        Produto não encontrado!
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-gray-600 font-medium">
        Carregando...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-white">
      <div className="flex flex-col lg:flex-row gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="w-full lg:w-96 rounded-xl object-cover shadow-lg"
        />

        <div className="flex-1 space-y-4">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-2xl text-green-400 font-semibold">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-300">{product.description}</p>

          <div className="flex gap-4 mt-6">
            <button className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium">
              Comprar agora
            </button>
            <button className="bg-red-700 hover:bg-red-800 px-5 py-2 rounded-lg font-medium">
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      </div>

      {/* Comentários */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Comentários</h2>

        <div className="space-y-4 mb-6">
          {comments.map((comment, index) => (
            <div key={index} className="bg-neutral-800 p-4 rounded-lg">
              <p className="font-semibold">Usuário:</p>
              <p className="text-gray-300">{comment}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-400"
            placeholder="Digite seu comentário..."
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Comentar
          </button>
        </div>
      </div>

      {/* Produtos relacionados */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Produtos parecidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <Link
              key={p.id}
              to={`/produto/${p.id}`}
              className="bg-neutral-900 p-4 rounded-lg hover:shadow-lg transition block"
            >
              <img
                src={p.image}
                alt={p.name}
                className="rounded-md mb-3 object-cover h-48 w-full"
              />
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <p className="text-green-400">{formatPrice(p.price)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

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
