import CartIcon from "../ui/CartIcon.jsx"
import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext.jsx" 

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useAuth() || {}

  const navLink = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `hover:text-harmonia-red transition-colors duration-300 ${isActive ? "text-harmonia-red" : ""}`
      }
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </NavLink>
  )

  return (
    <header className="bg-harmonia-black text-harmonia-cream sticky top-0 z-50 shadow-lg">
      <nav className="container mx-auto px-4 py-3">
        {/* Desktop Navigation */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-harmonia-red rounded-full" />
            <span className="text-xl font-montserrat font-bold tracking-wider">HARMONIAWEAR</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex space-x-6 font-semibold">
            {navLink("/", "ACCUEIL")}
            {navLink("/femme", "FEMME")}
            {navLink("/homme", "HOMME")}
            {navLink("/enfant", "ENFANT")}
            {navLink("/collections", "COLLECTIONS")}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="hover:text-harmonia-red transition-colors" title="Rechercher" aria-label="Rechercher">
              🔍
            </button>

            {/* Compte : /account si connecté, sinon /login */}
            <Link
              to={user ? "/account" : "/login"}
              className="hover:text-harmonia-red transition-colors"
              title={user ? "Mon compte" : "Se connecter"}
              aria-label={user ? "Mon compte" : "Se connecter"}
            >
              👤
            </Link>

            {/* Panier cliquable */}
            <Link to="/cart" className="hover:text-harmonia-red transition-colors" aria-label="Panier">
              <CartIcon />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            ☰
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-harmonia-mauve pt-4">
            <div className="flex flex-col space-y-4 font-semibold">
              {navLink("/", "ACCUEIL")}
              {navLink("/femme", "FEMME")}
              {navLink("/homme", "HOMME")}
              {navLink("/enfant", "ENFANT")}
              <div className="ml-4 border-l border-harmonia-mauve pl-4 space-y-2 text-sm">
                {navLink("/maternity", "• Maternity")}
                {navLink("/streetwear", "• Streetwear")}
                {navLink("/sportswear", "• Sportswear")}
                {navLink("/muslim", "• Muslim")}
              </div>

              {/* Lien compte en bas du menu mobile */}
              <Link
                to={user ? "/account" : "/login"}
                className="hover:text-harmonia-red transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {user ? "MON COMPTE" : "SE CONNECTER"}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
