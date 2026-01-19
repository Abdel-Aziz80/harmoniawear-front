// src/pages/OrderConfirmation.jsx
import { useEffect, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiGet } from "../services/api";
import { formatPrice, formatDate } from "../utils/formatters";
import LoadingSpinner from "../components/common/LoadingSpinner";

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée"
};

export default function OrderConfirmation() {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Redirection si pas connecté
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    let off = false;
    apiGet(`/api/orders/${id}`)
      .then((data) => !off && setOrder(data))
      .catch((e) => !off && setError(e))
      .finally(() => !off && setLoading(false));
    
    return () => { off = true; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-harmonia-cream flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-harmonia-cream">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg p-8 text-center" data-testid="order-error">
            <p className="text-red-600 mb-4">
              {error?.message || "Commande introuvable"}
            </p>
            <Link
              to="/account"
              className="inline-block bg-harmonia-black text-white px-6 py-2 rounded-lg hover:bg-harmonia-red transition"
              data-testid="back-account-btn"
            >
              Retour à mon compte
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de confirmation */}
        <div className="bg-white rounded-2xl p-8 shadow-lg text-center mb-8" data-testid="order-confirmation-header">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-montserrat font-bold text-harmonia-black mb-2">
            Commande confirmée !
          </h1>
          <p className="text-harmonia-mauve mb-4">
            Merci pour votre achat. Votre commande a été enregistrée avec succès.
          </p>
          <p className="text-sm text-harmonia-mauve">
            Numéro de commande : <span className="font-mono font-semibold" data-testid="order-number">#{order.id}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Détails de la commande */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-semibold text-harmonia-black mb-6">
                Détails de la commande
              </h2>

              {/* Statut */}
              <div className="mb-6 p-4 bg-harmonia-cream rounded-lg" data-testid="order-status-section">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-harmonia-black">
                    Statut
                  </span>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold bg-harmonia-red text-white"
                    data-testid="order-status"
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                </div>
              </div>

              {/* Articles commandés */}
              <div className="space-y-4" data-testid="order-items-list">
                {order.items && order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-4 border-b border-gray-200"
                    data-testid={`order-item-${item.id}`}
                  >
                    <div className="w-20 h-20 bg-harmonia-cream rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.product?.images && item.product.images.length > 0 ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <span className="text-2xl">📦</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-harmonia-black">
                        {item.product?.name || "Produit"}
                      </h3>
                      <p className="text-sm text-harmonia-mauve">
                        Quantité : {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-harmonia-red">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-xs text-harmonia-mauve">
                        {formatPrice(item.price)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-xl font-semibold text-harmonia-black mb-4">
                Récapitulatif
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-harmonia-black">Sous-total</span>
                  <span className="font-semibold">{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-harmonia-black">Livraison</span>
                  <span className="font-semibold text-green-600">Gratuite</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-harmonia-black border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span className="text-harmonia-red" data-testid="order-total">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-harmonia-mauve" data-testid="order-date">
                Commandé le {formatDate(order.createdAt)}
              </div>
            </div>

            {/* Adresse de livraison */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-lg font-semibold text-harmonia-black mb-3">
                Adresse de livraison
              </h3>
              <p className="text-harmonia-mauve whitespace-pre-line" data-testid="shipping-address">
                {order.shippingAddress}
              </p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                to="/account"
                data-testid="view-orders-btn"
                className="block w-full bg-harmonia-black text-white py-3 rounded-lg font-semibold text-center hover:bg-harmonia-red transition"
              >
                Voir mes commandes
              </Link>
              <Link
                to="/"
                data-testid="continue-shopping-btn"
                className="block w-full bg-harmonia-mauve text-white py-3 rounded-lg font-semibold text-center hover:bg-opacity-90 transition"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
