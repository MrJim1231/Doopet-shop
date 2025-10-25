import HeaderTopBar from "./HeaderTopBar";
import HeaderMain from "./HeaderMain"; // переименуй твой старый Header.jsx в HeaderMain.jsx
import CatalogBlock from "./CatalogBlock";

function Header() {
  return (
    <header className="header">
      <HeaderTopBar />
      <HeaderMain />
      <CatalogBlock />
    </header>
  );
}

export default Header;
