import { Link, useLocation } from "react-router-dom";

import { ROUTES } from "../../routes/constants";
import classNames from "classnames";

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);
  const navItems = [
    { id: 1, name: "Home", path: ROUTES.HOME },
    { id: 2, name: "Popular", path: ROUTES.POPULAR },
    { id: 3, name: "Top Rated", path: ROUTES.TOP_RATED },
    { id: 4, name: "Now Playing", path: ROUTES.NOW_PLAYING },
    { id: 5, name: "My Favorites", path: ROUTES.FAVORITES },
  ];

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to={ROUTES.HOME}>
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              MOVIES DB
            </span>
          </Link>
          <div
            className="justify-between items-center flex w-auto order-1"
            id="mobile-menu-2"
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
