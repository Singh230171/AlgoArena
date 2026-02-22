import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useAlgorithmStore from "../store/algorithmStore";

/*
  Mobile Sidebar
  Owner: Surya (Shuryansh Singh)
*/

const MobileSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

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

    onClose();
    navigate(`/${categoryPath}/${algorithmPath}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="absolute right-0 top-0 h-full w-[85%] max-w-sm
              bg-slate-900 p-5 overflow-y-auto shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-sky-400">
                Algorithms
              </h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              {Object.entries(algorithmCategories).map(
                ([category, algorithms]) => (
                  <div key={category}>
                    <h4 className="mb-2 text-sm font-semibold text-blue-400">
                      {category}
                    </h4>

                    <div className="space-y-1">
                      {algorithms.map((algorithm) => (
                        <button
                          key={algorithm}
                          onClick={() =>
                            handleAlgorithmSelect(category, algorithm)
                          }
                          className="block w-full text-left px-3 py-2 rounded-md
                            text-slate-300 hover:text-white
                            hover:bg-slate-800 transition-colors"
                        >
                          {algorithm}
                        </button>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;