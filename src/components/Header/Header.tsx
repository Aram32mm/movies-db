import { Link, useLocation } from "react-router-dom";
import { ROUTES } from "../../routes/constants";
import classNames from "classnames";
import { useState } from "react";
import { ReactComponent as BurgerIcon} from '../../assets/burger.svg';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { id: 1, name: "Home", path: ROUTES.HOME },
    { id: 2, name: "Popular", path: ROUTES.POPULAR },
    { id: 3, name: "Top Rated", path: ROUTES.TOP_RATED },
    { id: 4, name: "Now Playing", path: ROUTES.NOW_PLAYING },
    { id: 5, name: "My Favorites", path: ROUTES.FAVORITES },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <nav className={`px-4 lg:px-6 py-6 dark:bg-gray-800 ${menuOpen ? 'bg-gray-800' : 'bg-white'} border-gray-200`}>
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={ROUTES.HOME}>
            <span className={`self-center text-xl font-bold whitespace-nowrap ${menuOpen ? 'text-white' : 'text-black'} dark:text-white`}>
              MOVIES DB
            </span>
          </Link>
          <div className="flex justify-end lg:hidden">
            <button
              className={`block bg-white hover:bg-red-500 rounded-md p-2`}
              id="mobile-menu-button"
              onClick={toggleMenu}
            >
              <BurgerIcon className="w-4 h-4 fill-current" />
            </button>
          </div>
        </div>
        <div
          className={`pl-12 justify-start items-center w-full lg:flex lg:order-1 ${
            menuOpen ? "block" : "hidden"
          }`}
          id="desktop-menu"
        >
          <ul className="flex mt-0 font-medium flex-row space-x-8">
            {navItems.map((item) => {
              const navClass = classNames({
                "block py-2 pr-4 pl-3 rounded bg-transparent p-0": true,
                "text-white": location.pathname !== item.path,
                "text-red-500": location.pathname === item.path,
              });
              return (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className={navClass}
                    aria-current="page"
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>


  );
};

export default Navbar;
