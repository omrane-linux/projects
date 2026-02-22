import { useCallback } from "react";
import { Link, useLocation } from "react-router";

// Import your icons
import {
  CalenderIcon,
  GridIcon,
  HorizontaLDots,
  ListIcon,
  UserCircleIcon,
} from "../icons";
import { useSidebar } from "../context/SidebarContext";

// --- EDIT YOUR SIDEBAR NAMES HERE ---
const navItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <GridIcon />,
  },
  {
    name: "Expense Tracker",
    path: "/expense-tracker",
    icon: <CalenderIcon />,
  },
  {
    name: "Ai Recommendation",
    path: "/ai-recommendation",
    icon: <UserCircleIcon />,
  },
  {
    name: "Stocks ",
    path: "/stocks",
    icon: <ListIcon />,
  },


];

const AppSidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen
          ? "w-[290px]"
          : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
      >
        <Link to="/" className="flex items-center gap-2">
          {isExpanded || isHovered || isMobileOpen ? (
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              AiFinVerse
            </span>
          ) : (
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500 text-white font-bold text-lg">
              A
            </span>
          )}
        </Link>
      </div>
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${!isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "justify-start"
                  }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HorizontaLDots className="size-6" />
                )}
              </h2>

              <ul className="flex flex-col gap-4">
                {navItems.map((nav) => (
                  <li key={nav.name}>
                    <Link
                      to={nav.path}
                      className={`menu-item group ${isActive(nav.path)
                        ? "menu-item-active"
                        : "menu-item-inactive"
                        }`}
                    >
                      <span
                        className={`menu-item-icon-size ${isActive(nav.path)
                          ? "menu-item-icon-active"
                          : "menu-item-icon-inactive"
                          }`}
                      >
                        {nav.icon}
                      </span>
                      {(isExpanded || isHovered || isMobileOpen) && (
                        <span className="menu-item-text">{nav.name}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AppSidebar;