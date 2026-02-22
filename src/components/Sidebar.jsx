import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import useAlgorithmStore from "../store/algorithmStore";

/*
  Sidebar
  Owner: Surya (Shuryansh Singh)
*/

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    algorithmCategories,
    setCurrentAlgorithm,
    setArraySize,
    generateNewArray,
  } = useAlgorithmStore();

  const handleAlgorithmSelect = (category, algorithm) => {
    const categoryPath = category.toLowerCase().replace(/\s+/g, "-");
    const algorithmPath = algorithm.toLowerCase().replace(/\s+/g, "-");

    setCurrentAlgorithm(algorithm);
    setArraySize(50);
    generateNewArray();

    navigate(`/${categoryPath}/${algorithmPath}`);
  };

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen pt-28 p-4 overflow-y-auto
      border-r border-sky-500/20
      bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
      shadow-lg shadow-sky-500/10
      scrollbar scrollbar-track-gray-900/40 scrollbar-thumb-sky-500/50
      hover:scrollbar-thumb-sky-400"
    >
      {Object.entries(algorithmCategories).map(([category, algorithms]) => (
        <div key={category} className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            {category}
          </h3>

          <div className="space-y-1">
            {algorithms.map((algorithm) => {
              const isActive = location.pathname.includes(
                algorithm.toLowerCase().replace(/\s+/g, "-")
              );

              return (
                <button
                  key={algorithm}
                  onClick={() =>
                    handleAlgorithmSelect(category, algorithm)
                  }
                  className={`relative w-full px-3 py-2 text-left rounded-lg border transition-all
                    ${
                      isActive
                        ? "bg-sky-600/20 text-white border-sky-500/40"
                        : "bg-gray-900/60 text-slate-400 border-slate-800 hover:bg-gray-800/60"
                    }
                    focus:outline-none focus:ring-2 focus:ring-sky-400`}
                >
                  {/* subtle hover animation only */}
                  <motion.span
                    className="block"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {algorithm}
                  </motion.span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;