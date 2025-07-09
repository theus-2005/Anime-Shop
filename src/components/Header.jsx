import logo from "/images/logo.png";
import loginImg from "/images/login.png";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function Header({ setSearchTerm, productsList = [] }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const navigate = useNavigate();

  const handleLogoClick = () => {
    setSearchTerm("");
    setSearchText("");
    setShowDropdown(false);
    navigate("/");
  };

  const suggestions =
    searchText.length >= 2 && productsList.length > 0
      ? productsList
          .filter((produto) =>
            produto.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .slice(0, 5)
      : [];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchText(value);
    setShowDropdown(value.length >= 2);
  };

  const handleSuggestionClick = (produto) => {
    setSearchText(produto.name);
    setSearchTerm(produto.name);
    setShowDropdown(false);
    navigate("/");
  };

  const handleSearch = (e) => {
    const isClick = !e.key;
    const isEnter = e.key === "Enter";

    if (isClick || isEnter) {
      setSearchTerm(searchText);
      setShowDropdown(false);
      navigate("/");
    }
  };

  const handleMouseEnter = () => {
    setIsSearchOpen(true);
  };

  const handleMouseLeave = () => {
    if (searchText === "" && !isInputFocused) {
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="w-screen h-20 bg-red-800 flex items-center px-6 relative z-50">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          src={logo}
          alt="Logo"
          className="h-16 w-16 object-contain cursor-pointer"
          onClick={handleLogoClick}
        />
      </div>

      {/* Título centralizado */}
      <div className="flex-1 text-center">
        <h1 className="text-white text-2xl font-bold">
          Anime Shop
        </h1>
      </div>

      {/* Área da busca + login */}
      <div className="flex items-center gap-3 relative flex-shrink-0">
        {/* Área de busca separada */}
        <div 
          className="relative flex items-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex items-center">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              onKeyPress={handleSearch}
              onFocus={() => {
                setIsSearchOpen(true);
                setIsInputFocused(true);
                if (searchText.length >= 2) setShowDropdown(true);
              }}
              onBlur={() => {
                setIsInputFocused(false);
                setTimeout(() => {
                  setShowDropdown(false);
                  if (searchText === "") {
                    setIsSearchOpen(false);
                  }
                }, 200);
              }}
              placeholder="Buscar produtos..."
              className={`px-4 py-2 bg-white text-black border-none outline-none transition-all duration-300 ease-in-out ${
                isSearchOpen ? "w-64 opacity-100 rounded-l-full" : "w-0 opacity-0"
              }`}
              style={{
                minWidth: isSearchOpen ? "256px" : "0px"
              }}
            />
            <button
              onClick={handleSearch}
              className="bg-white px-3 py-2 rounded-full hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
            >
              <Search size={20} className="text-red-800" />
            </button>
          </div>

          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-50">
              <div className="p-2 bg-gray-50 text-xs text-gray-600 border-b rounded-t-lg">
                Sugestões (Enter para buscar)
              </div>
              {suggestions.map((produto) => (
                <div
                  key={produto.id}
                  onClick={() => handleSuggestionClick(produto)}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center gap-3 last:rounded-b-lg"
                >
                  <img
                    src={produto.image}
                    alt={produto.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      {produto.name}
                    </span>
                    <span className="text-sm text-green-600">
                      {formatPrice(produto.price)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {showDropdown && (
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
          )}
        </div>

        {/* Botão de login separado */}
        <button
          onClick={() => navigate("/login")}
          className="w-10 h-10 rounded-full overflow-hidden border-2 border-white bg-red-500 !important"
          title="Login"
        >
          <img
            src={loginImg}
            alt="Login"
            className="w-full h-full object-cover"
          />
        </button>
        
      </div>
    </header>
  );
}