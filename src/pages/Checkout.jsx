// src/pages/Checkout.jsx
import { useState } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useCart } from "../contexts/useCart.jsx";
import { useAuth } from "../contexts/AuthContext";
import { apiPost } from "../services/api";
import { formatPrice } from "../utils/formatters";

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();

  const [shippingAddress, setShippingAddress] = useState(user?.address || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirection si pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirection si panier vide
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!shippingAddress.trim()) {
      setError("Veuillez saisir une adresse de livraison");
      return;
    }

    setLoading(true);

    try {
      const orderItems = items.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const orderData = {
        items: orderItems,
        shippingAddress: shippingAddress.trim(),
      };

      const order = await apiPost("/api/orders", orderData);

      // Vider le panier
      clearCart();

      // Rediriger vers la page de confirmation avec l'ID de commande
      navigate(`/order-confirmation/${order.id}`, { replace: true });
    } catch (e) {
      setError(e?.message || "Erreur lors de la création de la commande");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        <h1
          className="text-4xl font-montserrat font-bold text-harmonia-black mb-8"
          data-testid="checkout-title"
        >
          FINALISER LA COMMANDE
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulaire de commande */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-semibold text-harmonia-black mb-6">
                Informations de livraison
              </h2>

              <form onSubmit={handleSubmit} data-testid="checkout-form">
                {/* Email (lecture seule) */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-harmonia-black mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    data-testid="checkout-email"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Adresse de livraison */}
                <div className="mb-4">
                  <label
                    htmlFor="shipping-address"
                    className="block text-sm font-semibold text-harmonia-black mb-2"
                  >
                    Adresse de livraison *
                  </label>
                  <textarea
                    id="shipping-address"
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                    rows={3}
                    data-testid="shipping-address-input"
                    placeholder="12 Rue de la Mode, 75000 Paris"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-harmonia-red"
                  />
                </div>

                {error && (
                  <p className="text-red-600 text-sm mb-4" data-testid="checkout-error">
                    {error}
                  </p>
                )}

                {/* Boutons */}
                <div className="flex gap-4 mt-6">
                  <Link
                    to="/cart"
                    data-testid="back-to-cart-btn"
                    className="flex-1 bg-harmonia-mauve text-white py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition"
                  >
                    ← Retour au panier
                  </Link>
                  <button
                    type="submit"
                    disabled={loading}
                    data-testid="confirm-order-btn"
                    className={`flex-1 py-3 rounded-lg font-semibold transition ${
                      loading
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-harmonia-red text-white hover:bg-opacity-90"
                    }`}
                  >
                    {loading ? "Traitement..." : "Confirmer la commande"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Récapitulatif de commande */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
              <h2
                className="text-xl font-semibold text-harmonia-black mb-4"
                data-testid="order-summary-title"
              >
                Récapitulatif
              </h2>

              <div className="space-y-4 mb-6" data-testid="order-items-summary">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                    data-testid={`order-item-${item.id}`}
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-harmonia-black">
                        {item.name}
                      </p>
                      <p className="text-harmonia-mauve text-xs">
                        Quantité : {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-harmonia-red">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-harmonia-black">Sous-total</span>
                  <span className="font-semibold" data-testid="subtotal-amount">
                    {formatPrice(total)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-harmonia-black">Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-harmonia-black border-t border-gray-200 pt-4 mt-4">
                  <span>Total</span>
                  <span className="text-harmonia-red" data-testid="total-amount">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
