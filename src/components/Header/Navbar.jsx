import { useState, useEffect } from "react";
import { BsFillMoonFill, BsFillSunFill, BsWindowDesktop } from "react-icons/bs";

const Navbar = (props) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  console.log(darkQuery);
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
  return (
    <header className="bg-slate-900 dark:bg-slate-800">
      <div className="container mx-auto items-center grid grid-cols-3">
        <div className="logo justify-self-start">webiste logo</div>
        <nav className="navigation justify-self-end">
          <ul className="list-none flex space-x-10">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="flex space-x-3 justify-self-end">
          {themeOptions.map((opt) => (
            <button
              key={opt.text}
              onClick={() => setTheme(opt.text)}
              className={`w-5 h-5 rounded-full text-xl leading-8 ${
                theme === opt.text && "text-amber-600"
              } transition ease-in duration-200`}
            >
              {opt.icon}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
