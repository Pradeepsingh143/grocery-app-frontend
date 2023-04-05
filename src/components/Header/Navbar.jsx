import { useState, useEffect } from "react";
import {
  BsFillMoonFill,
  BsFillSunFill,
  BsWindowDesktop,
  BsSearch,
  BsFillTelephoneFill,
} from "react-icons/bs";
import { MdOutlineAccountCircle, MdMenu } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import ThemeSelectBox from "./ThemeSelectBox";
import axios from "../../api/axios";

const Navbar = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const themeOptions = [
    {
      icon: <BsFillSunFill />,
      text: "light",
    },
    {
      icon: <BsFillMoonFill />,
      text: "dark",
    },
    {
      icon: <BsWindowDesktop />,
      text: "system",
    },
  ];

  function onWindowMatches() {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && darkQuery.matches)
    ) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatches();

  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;

      default:
        localStorage.removeItem("theme");
        onWindowMatches();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      } else {
        element.classList.remove("dark");
      }
    }
  });

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/collection/get");
      setCategory(data.collection);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error?.message);
    }
  };

  const handleClick = () => {
    if (category.length === 0) {
      fetchCategories();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/api/product/search/${searchTerm}/${selectedCategory}`
      );
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="text-xs text-dark dark:text-light bg-light dark:bg-dark">
      <div className="header-top-wrapper border-b dark:border-dark_secondary">
        <div className="container mx-auto px-4 py-2 grid justify-center text-center sm:grid-cols-2 sm:gap-2 sm:py-4">
          <div className="sm:justify-self-start">
            <h3>
              Working Time: <strong>Mon-Sat:8:00-21:00</strong>
            </h3>
          </div>
          <div className="sm:justify-self-end">
            <ul className="hidden sm:flex list-none sm:gap-4 sm:leading-4 sm:opacity-80">
              <li className="border-r pr-2 border-dark dark:border-light">
                My Account
              </li>
              <li className="border-r pr-2 border-dark dark:border-light">
                About Us
              </li>
              <li className="border-r pr-2 border-dark dark:border-light">
                Contact
              </li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-search-area border-b dark:border-dark_secondary">
        <div className="container mx-auto hidden sm:grid grid-cols-6 items-center p-4">
          <div className="logo justify-self-start text-2xl col-span-2">
            website logo
          </div>
          <div className="search-bar flex h-10 items-stretch justify-self-center col-span-2">
            <select
              value={selectedCategory}
              onClick={handleClick}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
              className="bg-grey w-32 md:w-auto rounded-l px-4 border-r dark:bg-dark_secondary dark:text-light focus:outline-none"
            >
              <option value="">All Categories</option>
              {loading
                ? Array(4)
                    .fill()
                    .map((_, index) => <option key={index}>Loading...</option>)
                : category.map((item) => (
                    <option className="py-2" key={item._id} value={item.name}>
                      {item.name}
                    </option>
                  ))}
            </select>
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              required
              className="px-4 w-32 md:w-auto bg-grey dark:bg-dark_secondary placeholder:dark:text-light placeholder:dark:opacity-60 focus:outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              disabled={searchTerm && selectedCategory ? false : true}
              onClick={handleSearch}
              className="bg-primary text-light dark:text-dark dark:bg-dark_accent px-4 rounded-r"
            >
              <BsSearch />
            </button>
          </div>
          <div className="hidden lg:flex justify-self-end gap-3 col-span-1">
            {themeOptions.map((opt) => (
              <button
                key={opt.text}
                onClick={() => setTheme(opt.text)}
                className={`rounded-full text-base ${
                  theme === opt.text && "text-accent dark:text-dark_accent"
                } transition ease-in duration-200`}
              >
                {opt.icon}
              </button>
            ))}
          </div>
          <div
          className="lg:hidden col-span-1 justify-self-end pr-3"
          >
            <ThemeSelectBox options={themeOptions} onSelect={(option)=>setTheme(option.text)}/>
          </div>
          <div className="icons flex gap-5 text-xl justify-self-end col-span-1">
            <AiOutlineHeart />
            <AiOutlineShoppingCart />
            <MdOutlineAccountCircle />
          </div>
        </div>
      </div>
      {/* nav menu for large devices */}
      <div className="header-nav-menu hidden sm:block bg-primary dark:bg-dark_secondary">
        <div className="container mx-auto grid grid-cols-4 items-stretch overflow-hidden">
          {/* menu for large display */}
          <nav className="col-span-3 pl-4 justify-self-start self-center overflow-hidden w-full">
            <ul className="flex text-sm text-light overflow-x-auto whitespace-nowrap scrollbar-hide items-center max-h-10 w-full leading-10 cursor-all-scroll dark:text-light">
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer pr-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
              <li className="dark:brightness-90 dark:hover:brightness-100 cursor-pointer px-4">
                Menu Item
              </li>
            </ul>
          </nav>
          {/* call to action */}
          <div className="callToAction flex items-center justify-end py-4 pr-4 text-sm text-light dark:text-dark justify-self-end self-center col-span-1 gap-2 bg-primary pl-5 brightness-125 text-right shadow-xl overflow-hidden dark:bg-dark_accent dark:brightness-100">
            <BsFillTelephoneFill />
            +2340923092
          </div>
        </div>
      </div>
      {/* nav menu for small devices */}
      <div className="header-mobile-menu flex sm:hidden bg-primary dark:bg-dark_secondary">
        <div className="container mx-auto grid grid-flow-col col-auto py-2 px-4 justify-between items-center">
          <div className="logo">
            <h1 className="text-xl">logo</h1>
          </div>
          <div
            className="hamburger flex items-center gap-5 text-2xl"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <ThemeSelectBox options={themeOptions} onSelect={(option)=>setTheme(option.text)}/>
            <MdMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
