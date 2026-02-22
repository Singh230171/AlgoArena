import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";

import SortingVisualizer from "./components/sorting/SortingVisualizer";
import SearchVisualizer from "./components/searching/SearchVisualizer";
import GraphVisualizer from "./components/graph/GraphVisualizer";
import DPVisualizer from "./components/dp/DPVisualizer";
import GreedyVisualizer from "./components/greedy/GreedyVisualizer";
import BacktrackingVisualizer from "./components/backtracking/BacktrackingVisualizer";
import TreeVisualizer from "./components/tree/TreeVisualizer";
import MathVisualizer from "./components/mathematical/MathVisualizer";

import RaceMode from "./components/race/RaceMode";
import FAQ from "./components/FAQ";
import ErrorBoundary from "./components/ErrorBoundary";

/*
  Project: Algorithm Visualization Platform
  Owner: Surya (Shuryansh Singh)
*/

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="sorting/:algorithm" element={<SortingVisualizer />} />
            <Route path="searching/:algorithm" element={<SearchVisualizer />} />
            <Route path="graph/:algorithm" element={<GraphVisualizer />} />
            <Route
              path="dynamic-programming/:algorithm"
              element={<DPVisualizer />}
            />
            <Route
              path="greedy-algorithm/:algorithm"
              element={<GreedyVisualizer />}
            />
            <Route
              path="backtracking/:algorithm"
              element={<BacktrackingVisualizer />}
            />
            <Route
              path="tree-algorithms/:algorithm"
              element={<TreeVisualizer />}
            />
            <Route
              path="mathematical-algorithms/:algorithm"
              element={<MathVisualizer />}
            />

            <Route path="race-mode" element={<RaceMode />} />
            <Route path="faq" element={<FAQ />} />

            {/* fallback */}
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;