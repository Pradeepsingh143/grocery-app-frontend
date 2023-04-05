import { useState, useEffect } from "react";

function ThemeSelectBox({ options, onSelect }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [toggle, setToggle] = useState(false);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setToggle(!toggle);
    onSelect(option);
  };

  function currentThemeMode() {
    localStorage.getItem("theme")
      ? localStorage.getItem("theme") == "dark"
        ? setSelectedOption(options[1])
        : setSelectedOption(options[0])
      : setSelectedOption(options[2]);
  }

  useEffect(() => {
    currentThemeMode();
  }, []);

  return (
    <div className="relative">
      <div
        className="w-full text-lg font-medium rounded-md cursor-pointer text-accent dark:text-grey"
        onClick={() => setToggle(!toggle)}
      >
        {selectedOption ? selectedOption.icon : "Select an option"}
      </div>

      {toggle && (
        <div className="absolute -left-1 z-10 w-7 flex flex-col items-center justify-center mt-2 bg-light dark:bg-grey rounded-md shadow-lg overflow-hidden ">
          {options.map(
            (option) =>
              selectedOption?.text !== option.text && (
                <div
                  key={option.text}
                  className="py-2 px-4 text-base font-medium cursor-pointer w-fit rounded text-dark hover:bg-grey hover:dark:bg-dark_accent"
                  onClick={() => handleSelect(option)}
                >
                  {option.icon}
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
}

export default ThemeSelectBox;
