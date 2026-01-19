// src/pages/Account.jsx
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { apiGet, apiPut } from "../services/api";
import { formatPrice, formatDate } from "../utils/formatters";

const statusLabels = {
  pending: "En attente",
  confirmed: "Confirmée",
  shipped: "Expédiée",
  delivered: "Livrée"
};

export default function Account() {
  const { user, logout } = useAuth();

  const [profile, setProfile] = useState(user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || ""
  });
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    let off = false;
    if (!user) {
      setLoading(false);
      return;
    }

    // Charger le profil et les commandes
    Promise.all([
      apiGet("/api/auth/me"),
      apiGet("/api/orders")
    ])
      .then(([profileData, ordersData]) => {
        if (!off) {
          setProfile(profileData);
          setOrders(ordersData);
          setFormData({
            firstName: profileData.firstName || "",
            lastName: profileData.lastName || "",
            address: profileData.address || ""
          });
        }
      })
      .catch((e) => {
        console.error("Erreur chargement:", e);
        if (!off) {
          setProfile(user);
          setOrders([]);
        }
      })
      .finally(() => {
        if (!off) setLoading(false);
      });

    return () => {
      off = true;
    };
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateError("");
    setUpdateSuccess(false);

    try {
      const result = await apiPut("/api/users/me", formData);
      setProfile(result.user);
      setEditMode(false);
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (e) {
      setUpdateError(e?.message || "Erreur lors de la mise à jour");
    }
  };

  return (
    <main className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        <h1 
          className="text-2xl md:text-3xl font-montserrat font-bold text-harmonia-black mb-6"
          data-testid="account-title"
        >
          Mon compte
        </h1>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-6">Chargement…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Colonne gauche : résumé + logout */}
            <section className="bg-white rounded-xl shadow p-6">
              <div className="text-5xl mb-4">👤</div>
              <p className="text-sm text-harmonia-mauve mb-1">Connecté en tant que</p>
              <p 
                className="font-semibold break-words"
                data-testid="user-email"
              >
                {profile?.email}
              </p>
              <p 
                className="text-xs mt-2 inline-block bg-black/5 px-2 py-1 rounded"
                data-testid="user-role"
              >
                {profile?.role || "CUSTOMER"}
              </p>
              <button
                onClick={logout}
                data-testid="logout-btn"
                className="mt-6 w-full rounded-lg py-2 font-semibold text-white bg-harmonia-black hover:bg-harmonia-red transition"
              >
                Se déconnecter
              </button>
            </section>

            {/* Colonne droite : infos */}
            <section className="md:col-span-2 space-y-6">
              {/* Informations personnelles */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-harmonia-black">
                    Informations personnelles
                  </h2>
                  {!editMode && (
                    <button
                      onClick={() => setEditMode(true)}
                      data-testid="edit-profile-btn"
                      className="text-harmonia-red hover:underline text-sm"
                    >
                      Modifier
                    </button>
                  )}
                </div>

                {updateSuccess && (
                  <div 
                    className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg"
                    data-testid="update-success-message"
                  >
                    Profil mis à jour avec succès !
                  </div>
                )}

                {editMode ? (
                  <form onSubmit={handleUpdateProfile} data-testid="edit-profile-form">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-1">Prénom</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          data-testid="first-name-input"
                          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Nom</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          data-testid="last-name-input"
                          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-1">Adresse</label>
                        <textarea
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          rows={3}
                          data-testid="address-input"
                          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                        />
                      </div>
                      {updateError && (
                        <p className="text-red-600 text-sm" data-testid="update-error-message">
                          {updateError}
                        </p>
                      )}
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditMode(false);
                            setUpdateError("");
                            setFormData({
                              firstName: profile?.firstName || "",
                              lastName: profile?.lastName || "",
                              address: profile?.address || ""
                            });
                          }}
                          data-testid="cancel-edit-btn"
                          className="flex-1 bg-harmonia-mauve text-white py-2 rounded-lg hover:bg-opacity-90 transition"
                        >
                          Annuler
                        </button>
                        <button
                          type="submit"
                          data-testid="save-profile-btn"
                          className="flex-1 bg-harmonia-red text-white py-2 rounded-lg hover:bg-opacity-90 transition"
                        >
                          Enregistrer
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3" data-testid="profile-info">
                    <div>
                      <span className="text-sm text-harmonia-mauve">Prénom :</span>
                      <p className="font-semibold" data-testid="display-first-name">
                        {profile?.firstName || "-"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-harmonia-mauve">Nom :</span>
                      <p className="font-semibold" data-testid="display-last-name">
                        {profile?.lastName || "-"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-harmonia-mauve">Adresse :</span>
                      <p className="font-semibold whitespace-pre-line" data-testid="display-address">
                        {profile?.address || "-"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Historique des commandes */}
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold text-harmonia-black mb-4">
                  Mes commandes
                </h2>

                {orders.length === 0 ? (
                  <div className="text-center py-8" data-testid="no-orders">
                    <p className="text-harmonia-mauve mb-4">Aucune commande pour le moment</p>
                    <Link
                      to="/"
                      data-testid="start-shopping-btn"
                      className="inline-block bg-harmonia-red text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition"
                    >
                      Commencer mes achats
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4" data-testid="orders-list">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                        data-testid={`order-${order.id}`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-semibold text-harmonia-black">
                              Commande #{order.id}
                            </p>
                            <p className="text-sm text-harmonia-mauve">
                              {formatDate(order.createdAt)}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-700"
                                : order.status === "shipped"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                            data-testid={`order-status-${order.id}`}
                          >
                            {statusLabels[order.status] || order.status}
                          </span>
                        </div>

                        <div className="text-sm text-harmonia-mauve mb-3">
                          {order.items?.length || 0} article{(order.items?.length || 0) > 1 ? 's' : ''}
                        </div>

                        <div className="flex justify-between items-center">
                          <p className="font-bold text-harmonia-red">
                            {formatPrice(order.total)}
                          </p>
                          <Link
                            to={`/order-confirmation/${order.id}`}
                            data-testid={`view-order-btn-${order.id}`}
                            className="text-harmonia-black hover:text-harmonia-red text-sm font-semibold hover:underline"
                          >
                            Voir détails →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
