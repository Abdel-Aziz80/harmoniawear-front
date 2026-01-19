import './App.css';
import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import Femme from './pages/Femme.jsx';
import Homme from './pages/Homme.jsx';
import Maternity from './pages/Maternity.jsx';
import Enfant from './pages/Enfant.jsx';
import Muslim from './pages/Muslim.jsx';
import MuslimCategory from './pages/MuslimCategory.jsx';
import Sportswear from './pages/Sportswear.jsx'
import Streetwear from './pages/Streetwear.jsx';
import About from './pages/About.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import Cart from './pages/Cart.jsx';
import Collections from './pages/Collections.jsx';
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import Register from './pages/Register.jsx';
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmation from "./pages/OrderConfirmation.jsx";
import Admin from "./pages/Admin.jsx";
import AdminProductForm from "./pages/AdminProductForm.jsx";
import MentionsLegale from "./pages/LegalMentions.jsx";
import CGV from "./pages/Cgv.jsx";
import Privacy from "./pages/Privacy.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <CartProvider>
        <div className="bg-harmonia-cream min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/account" element={<Account />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/femme" element={<Femme />} />
              <Route path="/homme" element={<Homme />} />
              <Route path="/maternity" element={<Maternity />} />
              <Route path="/enfant" element={<Enfant />} />
              <Route path="/muslim" element={<Muslim />} />
              <Route path="/muslim/:category" element={<MuslimCategory />} />
              <Route path="/sportswear" element={<Sportswear />} />
              <Route path="/streetwear" element={<Streetwear />} />
              <Route path="/about" element={<About />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/products/new" element={<AdminProductForm />} />
              <Route path="/admin/products/edit/:id" element={<AdminProductForm />} />
              <Route path="/LegalMentions" element={<MentionsLegale />} />
              <Route path="/cgv" element={<CGV />} />
              <Route path="/privacy" element={<Privacy />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </CartProvider>
  )
}

export default App