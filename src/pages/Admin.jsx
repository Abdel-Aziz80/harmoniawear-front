// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiGet, apiDel } from "../services/api";
import { formatPrice, formatDate, labelCategory, labelCollection } from "../utils/formatters";

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée"
};

export default function Admin() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("products"); // products | orders
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Redirection si pas admin
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      if (activeTab === "products") {
        const data = await apiGet("/api/products");
        setProducts(data);
      } else {
        // Pour l'admin, on pourrait créer une route spéciale qui retourne toutes les commandes
        // Pour l'instant, on utilise la route user qui retourne seulement ses commandes
        const data = await apiGet("/api/orders");
        setOrders(data);
      }
    } catch (e) {
      setError(e?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return;
    
    try {
      await apiDel(`/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id));
    } catch (e) {
      alert("Erreur lors de la suppression : " + (e?.message || ""));
    }
  };

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 
            className="text-4xl font-montserrat font-bold text-harmonia-black mb-2"
            data-testid="admin-title"
          >
            🛠️ PANEL ADMIN
          </h1>
          <p className="text-harmonia-mauve">
            Bienvenue {user.firstName || user.email}
          </p>
        </div>

        {/* Onglets */}
        <div className="flex gap-4 mb-6" data-testid="admin-tabs">
          <button
            onClick={() => setActiveTab("products")}
            data-testid="tab-products"
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "products"
                ? "bg-harmonia-red text-white"
                : "bg-white text-harmonia-black hover:bg-harmonia-mauve hover:text-white"
            }`}
          >
            📦 Produits
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            data-testid="tab-orders"
            className={`px-6 py-3 rounded-lg font-semibold transition ${
              activeTab === "orders"
                ? "bg-harmonia-red text-white"
                : "bg-white text-harmonia-black hover:bg-harmonia-mauve hover:text-white"
            }`}
          >
            🛒 Commandes
          </button>
        </div>

        {/* Contenu */}
        {loading ? (
          <div className="bg-white rounded-2xl p-8 text-center">
            Chargement...
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-8 text-center text-red-600">
            {error}
          </div>
        ) : activeTab === "products" ? (
          <ProductsTab 
            products={products} 
            onDelete={handleDeleteProduct}
          />
        ) : (
          <OrdersTab orders={orders} />
        )}
      </div>
    </div>
  );
}

// Onglet Produits
function ProductsTab({ products, onDelete }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-harmonia-black">
          Gestion des Produits
        </h2>
        <Link
          to="/admin/products/new"
          data-testid="create-product-btn"
          className="bg-harmonia-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
        >
          + Nouveau Produit
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-harmonia-mauve py-8">
          Aucun produit pour le moment
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full" data-testid="products-table">
            <thead>
              <tr className="border-b-2 border-harmonia-mauve">
                <th className="text-left p-3 font-semibold">ID</th>
                <th className="text-left p-3 font-semibold">Nom</th>
                <th className="text-left p-3 font-semibold">Catégorie</th>
                <th className="text-left p-3 font-semibold">Collection</th>
                <th className="text-left p-3 font-semibold">Prix</th>
                <th className="text-left p-3 font-semibold">Stock</th>
                <th className="text-left p-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr 
                  key={product.id} 
                  className="border-b border-gray-200 hover:bg-harmonia-cream transition"
                  data-testid={`product-row-${product.id}`}
                >
                  <td className="p-3">{product.id}</td>
                  <td className="p-3 font-semibold">{product.name}</td>
                  <td className="p-3">{labelCategory(product.category)}</td>
                  <td className="p-3">{labelCollection(product.collection)}</td>
                  <td className="p-3 text-harmonia-red font-semibold">
                    {formatPrice(product.price)}
                  </td>
                  <td className="p-3">
                    <span className={product.stock < 10 ? "text-red-600 font-semibold" : ""}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        data-testid={`edit-product-${product.id}`}
                        className="text-harmonia-black hover:text-harmonia-red text-sm underline"
                      >
                        ✏️ Modifier
                      </Link>
                      <button
                        onClick={() => onDelete(product.id)}
                        data-testid={`delete-product-${product.id}`}
                        className="text-red-600 hover:text-red-800 text-sm underline"
                      >
                        🗑️ Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// Onglet Commandes
function OrdersTab({ orders }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-harmonia-black mb-6">
        Gestion des Commandes
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-harmonia-mauve py-8">
          Aucune commande pour le moment
        </p>
      ) : (
        <div className="space-y-4" data-testid="orders-list-admin">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              data-testid={`admin-order-${order.id}`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-harmonia-black text-lg">
                    Commande #{order.id}
                  </p>
                  <p className="text-sm text-harmonia-mauve">
                    {formatDate(order.createdAt)}
                  </p>
                  <p className="text-sm text-harmonia-mauve">
                    Client ID: {order.userId}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order.status === "shipped"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {statusLabels[order.status] || order.status}
                  </span>
                  <p className="font-bold text-harmonia-red text-lg mt-2">
                    {formatPrice(order.total)}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <p className="text-sm font-semibold text-harmonia-black mb-2">
                  Adresse de livraison :
                </p>
                <p className="text-sm text-harmonia-mauve whitespace-pre-line">
                  {order.shippingAddress}
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-sm font-semibold text-harmonia-black mb-2">
                  Articles ({order.items?.length || 0}) :
                </p>
                <div className="space-y-2">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.product?.name || "Produit"} x{item.quantity}</span>
                      <span className="font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link
                  to={`/order-confirmation/${order.id}`}
                  data-testid={`view-order-detail-${order.id}`}
                  className="flex-1 bg-harmonia-black text-white py-2 rounded-lg text-center hover:bg-harmonia-red transition text-sm"
                >
                  Voir détails
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
