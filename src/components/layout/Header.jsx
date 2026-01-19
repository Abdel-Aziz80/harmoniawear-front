// src/components/layout/Navigation.jsx
import logo from "../../assets/logo/logo.png";
import SearchBar from "../ui/SearchBar.jsx";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import CartIcon from "../ui/CartIcon.jsx";





function NavItem({ to, label, end = false, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `hover:text-harmonia-red transition-colors duration-300 ${
          isActive ? "text-harmonia-red" : ""
        }`
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
  )
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth() || {}

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="bg-gradient-to-r from-[#181818] via-harmonia-black to-harmonia-black text-harmonia-cream sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        {/* Barre principale */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
              <img
                src={logo}
                alt="HarmoniaWear"
                className="w-8 h-8 object-contain"
              />
            <span className="text-xl font-montserrat font-bold tracking-wider">
              HARMONIAWEAR
            </span>
          </Link>

          {/* Liens desktop */}
          <div className="hidden md:flex space-x-6 font-semibold">
            <NavItem to="/" label="ACCUEIL" end onClick={closeMenu} />
            <NavItem to="/femme" label="FEMME" onClick={closeMenu} />
            <NavItem to="/homme" label="HOMME" onClick={closeMenu} />
            <NavItem to="/enfant" label="ENFANT" onClick={closeMenu} />
            <NavItem to="/collections" label="COLLECTIONS" onClick={closeMenu} />
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Admin Panel (si admin) */}
            {user && user.role === "ADMIN" && (
              <Link
                to="/admin"
                className="hover:text-harmonia-red transition-colors font-semibold"
                title="Panel Admin"
                aria-label="Panel Admin"
                data-testid="admin-link"
              >
                🛠️ ADMIN
              </Link>
            )}

            {/* Recherche (future route /search si besoin) */}
            <button
              className="hover:text-harmonia-red transition-colors"
              title="Rechercher"
              aria-label="Rechercher"
              type="button"
            >
            </button>
            <SearchBar />

            {/* Compte : /account si connecté, sinon /login */}
            <Link
              to={user ? "/account" : "/login"}
              className="hover:text-harmonia-red transition-colors"
              title={user ? "Mon compte" : "Se connecter"}
              aria-label={user ? "Mon compte" : "Se connecter"}
            >
              👤
            </Link>

            {/* Panier */}
            <Link
              to="/cart"
              className="hover:text-harmonia-red transition-colors"
              aria-label="Panier"
              title="Panier"
            >
              <CartIcon />
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(v => !v)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            type="button"
          >
            ☰
          </button>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div id="mobile-nav" className="md:hidden mt-4 pb-4 border-t border-harmonia-mauve pt-4">
            <div className="flex flex-col space-y-4 font-semibold">
              <NavItem to="/" label="ACCUEIL" end onClick={closeMenu} />
              <NavItem to="/femme" label="FEMME" onClick={closeMenu} />
              <NavItem to="/homme" label="HOMME" onClick={closeMenu} />
              <NavItem to="/enfant" label="ENFANT" onClick={closeMenu} />
              <NavItem to="/collections" label="COLLECTIONS" onClick={closeMenu} />

              {/* Sous-collections */}
              <div className="ml-4 border-l border-harmonia-mauve pl-4 space-y-2 text-sm">
                <NavItem to="/maternity" label=" Maternity" onClick={closeMenu} />
                <NavItem to="/streetwear" label=" Streetwear" onClick={closeMenu} />
                <NavItem to="/sportswear" label=" Sportswear" onClick={closeMenu} />
                <NavItem to="/muslim" label=" Muslim" onClick={closeMenu} />
              </div>

              {/* Compte */}
              <Link
                to={user ? "/account" : "/login"}
                className="hover:text-harmonia-red transition-colors py-2"
                onClick={closeMenu}
              >
                {user ? "MON COMPTE" : "SE CONNECTER"}
              </Link>

              {/* Panier (mobile) */}
              <Link
                to="/cart"
                className="hover:text-harmonia-red transition-colors py-2 flex items-center gap-2"
                onClick={closeMenu}
                aria-label="Panier"
                title="Panier"
              >
                <CartIcon />
                <span>Panier</span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
