import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-harmonia-black text-harmonia-cream mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-harmonia-red rounded-full"></div>
              <span className="text-2xl font-montserrat font-bold">HARMONIAWEAR</span>
            </div>
            <p className="text-harmonia-mauve max-w-md">
              Maternity, confort et style pour le sport et le quotidien.
              Streetwear urbain et collections Muslim pour toute la famille; 
              hommes, femmes et enfants.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">NAVIGATION</h3>
            <ul className="space-y-2 text-harmonia-mauve">
              <li><a href="/home" className="hover:text-harmonia-red transition">Boutique</a></li>
              <li><a href="/maternity" className="hover:text-harmonia-red transition">Maternity</a></li>
              <li><a href="/muslim" className="hover:text-harmonia-red transition">Muslim</a></li>
              <li><a href="/sportswear" className="hover:text-harmonia-red transition">Sportswear</a></li>
              <li><a href="/streetwear" className="hover:text-harmonia-red transition">Streetwear</a></li>
              <li><a href="/about" className="hover:text-harmonia-red transition">À propos</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-montserrat font-bold text-lg mb-4">CONTACT</h3>
            <ul className="space-y-2 text-harmonia-mauve">
              <li><a href="mailto:contact@harmoniawear.com">contact@harmoniawear.com</a></li>
              <li>📞 01 23 45 67 89</li>
              <li>📍 Paris, France</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-harmonia-mauve mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-harmonia-mauve text-sm">
            © 2025 HarmoniaWear. Tous droits réservés.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/legalMentions" className="text-harmonia-mauve hover:text-harmonia-red transition">Mentions légales</Link>
            <Link to="/cgv" className="text-harmonia-mauve hover:text-harmonia-red transition">CGV</Link>
            <Link to="/privacy" className="text-harmonia-mauve hover:text-harmonia-red transition">Confidentialité</Link>
          </div>

          {/* Développement */}
          <div className="harmonia-mauve">
            <p className="text-harmonia-mauve text-sm text-center">
              Site développé par{" "}
              <a 
                href="https://devora.fr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-harmonia-red hover:underline"
              >
                DevOra
              </a>
              {" "}- Tous droits réservés
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}