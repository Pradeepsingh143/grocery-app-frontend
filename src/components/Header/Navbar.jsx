import { useState, useEffect } from "react";
import { BsFillMoonFill, BsFillSunFill, BsWindowDesktop } from "react-icons/bs";
import axios from "../../api/axios";

const Navbar = (props) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (category.length === 0) {
      fetchCategories();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/product/search/${searchTerm}/${selectedCategory}`);
      setSearchResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <header className="text-xs text-dark dark:text-light">
      <div className="header-top-wrapper border-b">
        <div className="container mx-auto px-4 py-3 grid justify-center text-center sm:grid-cols-2 sm:gap-2 sm:py-4">
          <div className="sm:justify-self-start">
            <h3>
              Working Time: <strong>Mon-Sat:8:00-21:00</strong>
            </h3>
          </div>
          <div className="sm:justify-self-end">
            <ul className="hidden sm:flex list-none sm:gap-4 sm:leading-4 sm:opacity-80">
              <li className="border-r pr-2 border-dark">My Account</li>
              <li className="border-r pr-2 border-dark">About Us</li>
              <li className="border-r pr-2 border-dark">Contact</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="header-search-area">
        <div className="container mx-auto">
          <div className="logo">website logo</div>
          <div className="search-bar">
            <select
              value={selectedCategory}
              onClick={handleClick}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {category.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
            disabled = {searchTerm && selectedCategory ? false: true}
            onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </header>
  );
};

// {themeOptions.map((opt) => (
//   <button
//     key={opt.text}
//     onClick={() => setTheme(opt.text)}
//     className={`w-5 h-5 rounded-full text-xl leading-8 ${
//       theme === opt.text && "text-accent dark:text-dark_accent"
//     } transition ease-in duration-200`}
//   >
//     {opt.icon}
//   </button>
// ))}
export default Navbar;
