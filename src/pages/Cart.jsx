// src/pages/Cart.jsx
import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { formatPrice } from "../utils/formatters.js";

const LS_CART_KEY = "HW_CART_V2";              // clé utilisée par ton CartContext
const LS_OWNER_KEY = "HW_CART_OWNER";          // propriétaire courant du panier
const userKey = (id) => `HW_CART_${id}`;       // sauvegardes par utilisateur

export default function Cart() {
  const { user } = useAuth();
  const { items, removeItem, updateQty, subtotal, clear, addItem } = useCart();
  const total = subtotal;

  // On garde en mémoire le "propriétaire précédent" pour détecter login/logout/changement de compte
  const prevOwnerRef = useRef(localStorage.getItem(LS_OWNER_KEY) || "");

  // Helpers LS
  const saveCartFor = (uid, dataItems = items) => {
    try {
      localStorage.setItem(userKey(uid), JSON.stringify({ items: dataItems }));
    } catch {}
  };
  const loadCartFor = (uid) => {
    try {
      const raw = localStorage.getItem(userKey(uid));
      return raw ? JSON.parse(raw).items || [] : [];
    } catch {
      return [];
    }
  };
  const setOwner = (uid) => {
    if (uid) localStorage.setItem(LS_OWNER_KEY, String(uid));
    else localStorage.removeItem(LS_OWNER_KEY);
    prevOwnerRef.current = uid ? String(uid) : "";
  };

  // Gestion des transitions d'authentification — TOUT en Cart.jsx, sans toucher les autres fichiers
  useEffect(() => {
    const prevOwner = prevOwnerRef.current;          // "ancien" propriétaire dans LS
    const currOwner = user?.id ? String(user.id) : ""; // propriétaire courant

    // 1) LOGOUT: on avait un owner et maintenant plus d'user
    if (prevOwner && !currOwner) {
      // Sauvegarder le panier de l'ancien utilisateur
      saveCartFor(prevOwner, items);
      // Vider le panier "courant" (clé globale HW_CART_V2 + contexte)
      clear();
      try { localStorage.removeItem(LS_CART_KEY); } catch {}
      setOwner(""); // plus de propriétaire
      return;
    }

    // 2) LOGIN depuis INVITÉ (pas d'ancien owner -> maintenant on en a un)
    if (!prevOwner && currOwner) {
      // On associe simplement le panier invité au compte qui vient d'arriver
      // + on fusionne avec l'éventuel panier déjà sauvegardé de ce compte
      const saved = loadCartFor(currOwner);
      if (Array.isArray(saved) && saved.length) {
        // On merge en ajoutant les lignes sauvegardées au panier invité
        saved.forEach((it) => addItem({ ...it }));
      }
      // Définir le propriétaire courant
      setOwner(currOwner);
      // On a maintenant un panier lié à ce compte; on peut le sur-sauver
      saveCartFor(currOwner, items);
      return;
    }

    // 3) SWITCH de compte (ancien owner ≠ nouveau owner)
    if (prevOwner && currOwner && prevOwner !== currOwner) {
      // Sauvegarder le panier du compte précédent
      saveCartFor(prevOwner, items);
      // Vider le panier global
      clear();
      try { localStorage.removeItem(LS_CART_KEY); } catch {}
      // Charger le panier du nouveau compte (si existant)
      const savedNew = loadCartFor(currOwner);
      if (Array.isArray(savedNew) && savedNew.length) {
        savedNew.forEach((it) => addItem({ ...it }));
      }
      setOwner(currOwner);
      return;
    }

    // 4) Même compte qu'avant → rien de spécial
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]); // on réagit seulement aux changements d'authentification

  // Panier vide
  if (!items.length) {
    return (
      <main className="bg-harmonia-cream min-h-screen flex flex-col">
        <div className="max-w-screen-md w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">Mon panier</h1>
          <div className="bg-white rounded-xl p-8 text-center shadow">
            <p className="text-harmonia-mauve mb-4">Votre panier est vide.</p>
            <Link
              to="/collections"
              className="inline-flex justify-center items-center bg-harmonia-black text-white px-5 py-2 rounded-lg hover:bg-harmonia-red transition"
            >
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-harmonia-cream min-h-screen flex flex-col">
      <div className="max-w-screen-lg w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex-1">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Mon panier</h1>

        <div className="space-y-3 sm:space-y-4">
          {items.map((l) => {
            const lineKey = `${l.id}:${l.size || ""}:${l.color || ""}`;
            return (
              <div
                key={lineKey}
                className="grid grid-cols-[64px_1fr] sm:grid-cols-[80px_1fr_auto] gap-3 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 shadow"
              >
                {/* Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 overflow-hidden rounded">
                  {l.image ? (
                    <img src={l.image} alt={l.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                {/* Infos produit */}
                <div className="min-w-0">
                  <div className="font-semibold text-sm sm:text-base truncate">{l.name}</div>
                  <div className="text-xs sm:text-sm text-harmonia-mauve mt-0.5">
                    {l.size ? <>Taille : <b>{l.size}</b></> : null}
                    {l.color ? <>{l.size ? " • " : null}Couleur : <b>{l.color}</b></> : null}
                  </div>
                  <div className="text-xs sm:text-sm mt-1">{formatPrice(l.price)}</div>
                </div>

                {/* Actions */}
                <div className="col-span-2 sm:col-span-1 flex items-center justify-between sm:justify-end gap-3">
                  <div className="flex items-center border rounded overflow-hidden shrink-0">
                    <button
                      type="button"
                      className="px-2 sm:px-3 py-1 hover:bg-black/5"
                      onClick={() =>
                        updateQty({
                          id: l.id,
                          size: l.size,
                          color: l.color,
                          quantity: Math.max(1, l.quantity - 1),
                        })
                      }
                      aria-label="Diminuer la quantité"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      value={l.quantity}
                      onChange={(e) =>
                        updateQty({
                          id: l.id,
                          size: l.size,
                          color: l.color,
                          quantity: Math.max(1, Number(e.target.value) || 1),
                        })
                      }
                      className="w-10 sm:w-16 text-center outline-none py-1"
                      aria-label="Quantité"
                    />
                    <button
                      type="button"
                      className="px-2 sm:px-3 py-1 hover:bg-black/5"
                      onClick={() =>
                        updateQty({
                          id: l.id,
                          size: l.size,
                          color: l.color,
                          quantity: l.quantity + 1,
                        })
                      }
                      aria-label="Augmenter la quantité"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right font-semibold w-auto sm:w-24">
                    {formatPrice(l.price * l.quantity)}
                  </div>

                  <button
                    onClick={() => removeItem({ id: l.id, size: l.size, color: l.color })}
                    className="text-red-600 text-sm shrink-0 hover:underline"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Résumé */}
        <div className="pt-4 sm:pt-6 border-t mt-6 sm:mt-8">
          <div className="flex items-center justify-between">
            <span className="text-base sm:text-lg font-semibold">Total :</span>
            <span className="text-lg sm:text-xl font-bold text-harmonia-red" data-testid="cart-total">
              {formatPrice(total)}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={clear} className="text-sm hover:underline sm:order-1">
              Vider le panier
            </button>
            <Link
              to="/checkout"
              data-testid="proceed-checkout-btn"
              className="w-full sm:w-auto sm:ml-auto px-5 py-3 rounded-lg bg-harmonia-red text-white font-semibold text-center hover:bg-harmonia-red/90"
            >
              Commander ({formatPrice(total)})
            </Link>
          </div>
        </div>
      </div>

      {/* CTA sticky mobile */}
      <div className="sm:hidden sticky bottom-0 inset-x-0 bg-white/90 backdrop-blur border-t p-3">
        <Link
          to="/checkout"
          className="w-full inline-flex justify-center items-center px-4 py-3 rounded-lg bg-harmonia-red text-white font-semibold"
        >
          Commander ({formatPrice(total)})
        </Link>
      </div>
    </main>
  );
}