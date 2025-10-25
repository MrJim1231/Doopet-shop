import { useEffect, useState } from "react";
import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain";
import CatalogBlock from "./CatalogBlock";

function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const mainContainer = document.querySelector(".header__main-container");
    if (mainContainer) setHeaderHeight(mainContainer.offsetHeight);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isSticky ? "header--sticky" : ""}`}>
      <div
        className={`header__topbar-container ${
          isSticky ? "header__topbar-container--hidden" : ""
        }`}
      >
        <HeaderTopBar />
      </div>

      {/* 🔹 Высота фиксации, чтобы избежать рывка */}
      {isSticky && <div style={{ height: `${headerHeight}px` }}></div>}

      <div
        className={`header__main-container ${
          isSticky ? "header__main-container--fixed" : ""
        }`}
      >
        <HeaderMain />
      </div>

      <CatalogBlock />
    </header>
  );
}

export default Header;
