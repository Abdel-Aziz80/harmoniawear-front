import './App.css'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Femme from './pages/Femme.jsx'
import Homme from './pages/Homme.jsx'
import Maternity from './pages/Maternity.jsx'
import Enfant from './pages/Enfant.jsx'
import Muslim from './pages/Muslim.jsx'
import Sportswear from './pages/Sportswear.jsx'
import Streetwear from './pages/Streetwear.jsx'
import { CartProvider } from './contexts/CartProvider.jsx'
import Cart from './pages/Cart.jsx'
import Collections from './pages/Collections.jsx'
import Login from "./pages/Login.jsx";
import Account from "./pages/Account.jsx";
import Register from './pages/Register.jsx';
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail.jsx";
import Checkout from "./pages/Checkout.jsx";

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
              <Route path="/sportswear" element={<Sportswear />} />
              <Route path="/streetwear" element={<Streetwear />} />
              <Route path="/collections" element={<Collections />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
    </CartProvider>
  )
}

export default App