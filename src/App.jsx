import { useState } from "react";
import "./App.css";
import Navbar from "./components/Header/Navbar";

function App() {
  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-white dark:bg-slate-900 flex flex-col justify-center transition-all ease-in duration-200">
        <h1 className="text-black text-left md:text-center text-5xl dark:text-white">This is dark mode</h1>
        <p className="text-slate-950 text-left md:text-center dark:text-white">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam ex,
          nostrum quae nulla culpa commodi quo ipsam molestias unde facere.
        </p>
      </div>
    </>
  );
}

export default App;
