import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

/*
  Main application layout
  Owner: Surya (Shuryansh Singh)
*/

const Layout = () => {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isRaceModePage = location.pathname === "/race-mode";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex flex-1 w-full">
        {!isHomePage && !isRaceModePage && (
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <Sidebar />
          </aside>
        )}

        <main className="flex-1 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;