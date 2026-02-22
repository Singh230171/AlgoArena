import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAlgorithmStore from "../store/algorithmStore";
import MobileSidebar from "./MobileSidebar";

/*
  Navbar
  Owner: Surya (Shuryansh Singh)
*/

const Navbar = () => {
  const navigate = useNavigate();
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const {
    currentAlgorithm,
    searchQuery,
    setSearchQuery,
    searchAlgorithms,
    searchResults,
    setCurrentAlgorithm,
    algorithmCategories,
  } = useAlgorithmStore();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    searchAlgorithms(query);
  };

  const handleAlgorithmClick = (algorithm) => {
    const category = Object.keys(algorithmCategories).find((cat) =>
      algorithmCategories[cat].includes(algorithm)
    );

    if (!category) return;

    const categoryPath = category.toLowerCase().replace(/\s+/g, "-");
    const algorithmPath = algorithm.toLowerCase().replace(/\s+/g, "-");

    setCurrentAlgorithm(algorithm);
    setSearchQuery("");
    setShowMobileSidebar(false);

    navigate(`/${categoryPath}/${algorithmPath}`);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-slate-900 border-sky-500/20 shadow-lg">
        <div className="container flex flex-col items-center justify-between p-4 mx-auto md:flex-row">
          
          {/* Brand */}
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
                AlgoVisual
              </h1>
            </Link>
            <p className="text-sm italic text-sky-400/80">
              Learn Data Structures visually
            </p>
          </div>

          {/* Search + Button */}
          <div className="flex flex-col items-center gap-4 mt-2 md:flex-row md:mt-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search algorithms..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-64 px-4 py-2 pl-10 text-white border rounded-lg bg-gray-900/50 
                border-sky-500/20 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />

              <svg
                className="absolute w-4 h-4 text-gray-400 left-3 top-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>

              {searchQuery && (
                <div className="absolute z-10 w-full mt-2 bg-gray-800 rounded-lg shadow-lg">
                  {searchResults.map((result) => (
                    <button
                      key={result.name}
                      onClick={() => handleAlgorithmClick(result.name)}
                      className="block w-full px-4 py-2 text-left text-white hover:bg-gray-700"
                    >
                      {result.name}
                      <span className="ml-2 text-sm text-gray-400">
                        ({result.category})
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Explore Button */}
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="px-4 py-2 font-medium rounded-lg text-sky-400 border border-sky-500/30
              bg-[linear-gradient(110deg,#041b36,45%,#0c7bb8,55%,#041b36)]
              bg-[length:200%_100%] animate-shimmer
              hover:shadow-[0_0_15px_rgba(14,150,224,0.5)]
              transition-all duration-300"
            >
              {currentAlgorithm || "Explore Algorithms"}
            </button>
          </div>
        </div>
      </nav>

      <MobileSidebar
        isOpen={showMobileSidebar}
        onClose={() => setShowMobileSidebar(false)}
      />
    </>
  );
};

export default Navbar;