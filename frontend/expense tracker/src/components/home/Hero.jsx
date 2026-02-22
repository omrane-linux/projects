import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const openMenu = document.getElementById("open-menu");
    const closeMenu = document.getElementById("close-menu");
    const navLinks = document.getElementById("mobile-navLinks");

    const openMenuHandler = () => {
      navLinks.classList.remove("-translate-x-full");
      navLinks.classList.add("translate-x-0");
    };

    const closeMenuHandler = () => {
      navLinks.classList.remove("translate-x-0");
      navLinks.classList.add("-translate-x-full");
    };

    if (openMenu) openMenu.addEventListener("click", openMenuHandler);
    if (closeMenu) closeMenu.addEventListener("click", closeMenuHandler);

    return () => {
      if (openMenu) openMenu.removeEventListener("click", openMenuHandler);
      if (closeMenu) closeMenu.removeEventListener("click", closeMenuHandler);
    };
  }, []);

  return (
    <section className="flex flex-col items-center text-white text-sm bg-black min-h-screen relative overflow-hidden">
      {" "}
      <svg
        className="absolute -z-10 w-screen -mt-40 md:mt-0"
        width="1440"
        height="676"
        viewBox="0 0 1440 676"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="-92"
          y="-948"
          width="1624"
          height="1624"
          rx="812"
          fill="url(#a)"
        />
        <defs>
          <radialGradient
            id="a"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="rotate(90 428 292)scale(812)"
          >
            <stop offset=".63" stopColor="#372AAC" stopOpacity="0" />
            <stop offset="1" stopColor="#6366F1" />
          </radialGradient>
        </defs>
      </svg>
      <nav className="z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur">
        <a href="/" className="text-2xl font-bold tracking-tight">
          AiFinVerse
        </a>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <button
            onClick={() => scrollTo("home")}
            className="hover:text-slate-300 transition"
          >
            Home
          </button>

          <button
            onClick={() => scrollTo("features")}
            className="hover:text-slate-300 transition"
          >
            Features
          </button>

          <button
            onClick={() => scrollTo("testimonials")}
            className="hover:text-slate-300 transition"
          >
            Testimonials
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="hover:text-slate-300 transition"
          >
            Contact
          </button>
        </div>

        <div className="hidden md:block space-x-3">
          <button
            onClick={() => navigate("/login?state=register")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-md"
          >
            Get started
          </button>
          <button
            onClick={() => navigate("/login")}
            className="hover:bg-slate-300/20 transition px-6 py-2 border border-slate-400 rounded-md"
          >
            Login
          </button>
        </div>

        <button id="open-menu" className="md:hidden active:scale-90 transition">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <path d="M4 5h16" />
            <path d="M4 12h16" />
            <path d="M4 19h16" />
          </svg>
        </button>
      </nav>
      <div
        id="mobile-navLinks"
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 -translate-x-full"
      >
        <button onClick={() => scrollTo("home")}>Home</button>
        <button onClick={() => scrollTo("features")}>Features</button>
        <button onClick={() => scrollTo("testimonials")}>Testimonials</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>

        <button
          id="close-menu"
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-slate-100 hover:bg-slate-200 transition text-black rounded-md flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div className="flex items-center mt-32 gap-2 border border-slate-600 text-gray-50 rounded-full px-4 py-2">
        <div className="size-2.5 bg-green-500 rounded-full"></div>
        <span>Start Investing Today</span>
      </div>
      <h1 className="text-center text-5xl leading-[68px] md:text-6xl md:leading-[70px] mt-4 font-semibold max-w-2xl">
        Build Wealth with Intelligent Financial Insights
      </h1>
      <p className="text-center text-base max-w-lg mt-2">
        Make confident investing and budgeting decisions using data-driven
        insights tailored to you.{" "}
      </p>
      <div className="flex items-center gap-4 mt-8">
        <button
          onClick={() => navigate("/login?state=register")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95 rounded-lg px-7 h-11"
        >
          Get started
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.166 10h11.667m0 0L9.999 4.165m5.834 5.833-5.834 5.834"
              stroke="#fff"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => navigate("/login")}
          className="border border-slate-400 active:scale-95 hover:bg-white/10 transition rounded-lg px-8 h-11"
        >
          Try a Demo
        </button>
      </div>
      <img
        src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/hero-section-showcase-2.png"
        className="w-full rounded-[15px] max-w-4xl mt-16"
        alt="hero section showcase"
      />
    </section>
  );
};

export default Hero;
