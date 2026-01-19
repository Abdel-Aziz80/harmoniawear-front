// src/pages/AdminProductForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { apiGet, apiPost, apiPut } from "../services/api";

const categories = [
  { value: "femme", label: "Femme" },
  { value: "homme", label: "Homme" },
  { value: "enfant", label: "Enfant" }
];

const collections = [
  { value: "streetwear", label: "Streetwear" },
  { value: "sportswear", label: "Sportswear" },
  { value: "maternity", label: "Maternity" },
  { value: "muslim", label: "Muslim" }
];

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export default function AdminProductForm() {
  const { id } = useParams(); // Si id existe, c'est une modification
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEdit = !!id;

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "femme",
    collection: "streetwear",
    images: [""],
    stock: "",
    sizes: [],
    colors: [""]
  });

  // Redirection si pas admin
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    if (isEdit) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const product = await apiGet(`/api/products/${id}`);
      setForm({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        category: product.category || "femme",
        collection: product.collection || "streetwear",
        images: product.images?.length > 0 ? product.images : [""],
        stock: product.stock?.toString() || "",
        sizes: product.sizes || [],
        colors: product.colors?.length > 0 ? product.colors : [""]
      });
    } catch (e) {
      setError("Erreur de chargement du produit");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...form.images];
    newImages[index] = value;
    setForm(prev => ({ ...prev, images: newImages }));
  };

  const addImageField = () => {
    setForm(prev => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeImageField = (index) => {
    if (form.images.length > 1) {
      const newImages = form.images.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, images: newImages }));
    }
  };

  const handleColorChange = (index, value) => {
    const newColors = [...form.colors];
    newColors[index] = value;
    setForm(prev => ({ ...prev, colors: newColors }));
  };

  const addColorField = () => {
    setForm(prev => ({ ...prev, colors: [...prev.colors, ""] }));
  };

  const removeColorField = (index) => {
    if (form.colors.length > 1) {
      const newColors = form.colors.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, colors: newColors }));
    }
  };

  const toggleSize = (size) => {
    setForm(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name.trim()) {
      setError("Le nom est requis");
      return;
    }
    if (!form.price || parseFloat(form.price) <= 0) {
      setError("Le prix doit être supérieur à 0");
      return;
    }
    if (!form.stock || parseInt(form.stock) < 0) {
      setError("Le stock ne peut pas être négatif");
      return;
    }

    const productData = {
      name: form.name.trim(),
      description: form.description.trim() || null,
      price: parseFloat(form.price),
      category: form.category,
      collection: form.collection,
      images: form.images.filter(img => img.trim() !== ""),
      stock: parseInt(form.stock),
      sizes: form.sizes,
      colors: form.colors.filter(color => color.trim() !== "")
    };

    setSaving(true);
    try {
      if (isEdit) {
        await apiPut(`/api/products/${id}`, productData);
      } else {
        await apiPost("/api/products", productData);
      }
      navigate("/admin");
    } catch (e) {
      setError(e?.message || "Erreur lors de l'enregistrement");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-harmonia-cream flex items-center justify-center">
        <div className="text-harmonia-black">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 
            className="text-3xl font-montserrat font-bold text-harmonia-black mb-6"
            data-testid="product-form-title"
          >
            {isEdit ? "✏️ Modifier le Produit" : "➕ Nouveau Produit"}
          </h1>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} data-testid="product-form">
              {/* Nom */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Nom du produit *
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  data-testid="product-name-input"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                  placeholder="Ex: T-shirt Oversized"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  data-testid="product-description-input"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                  placeholder="Description détaillée du produit"
                />
              </div>

              {/* Prix et Stock */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Prix (€) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    data-testid="product-price-input"
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                    placeholder="29.99"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Stock *
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                    required
                    min="0"
                    data-testid="product-stock-input"
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                    placeholder="100"
                  />
                </div>
              </div>

              {/* Catégorie et Collection */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Catégorie *
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    data-testid="product-category-select"
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Collection *
                  </label>
                  <select
                    name="collection"
                    value={form.collection}
                    onChange={handleChange}
                    data-testid="product-collection-select"
                    className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                  >
                    {collections.map(col => (
                      <option key={col.value} value={col.value}>
                        {col.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tailles */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Tailles disponibles
                </label>
                <div className="flex flex-wrap gap-2" data-testid="product-sizes-selector">
                  {availableSizes.map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => toggleSize(size)}
                      data-testid={`size-toggle-${size}`}
                      className={`px-4 py-2 border-2 rounded-lg font-semibold transition ${
                        form.sizes.includes(size)
                          ? "border-harmonia-red bg-harmonia-red text-white"
                          : "border-gray-300 text-harmonia-black hover:border-harmonia-red"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Couleurs */}
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">
                  Couleurs disponibles
                </label>
                {form.colors.map((color, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      data-testid={`product-color-input-${index}`}
                      className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                      placeholder="Ex: Noir, Rouge, Bleu"
                    />
                    {form.colors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeColorField(index)}
                        data-testid={`remove-color-${index}`}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addColorField}
                  data-testid="add-color-btn"
                  className="text-harmonia-red hover:underline text-sm"
                >
                  + Ajouter une couleur
                </button>
              </div>

              {/* Images */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">
                  URLs des images
                </label>
                {form.images.map((image, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      data-testid={`product-image-input-${index}`}
                      className="flex-1 border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-harmonia-red"
                      placeholder="https://exemple.com/image.jpg"
                    />
                    {form.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        data-testid={`remove-image-${index}`}
                        className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  data-testid="add-image-btn"
                  className="text-harmonia-red hover:underline text-sm"
                >
                  + Ajouter une image
                </button>
              </div>

              {error && (
                <p className="text-red-600 text-sm mb-4" data-testid="form-error">
                  {error}
                </p>
              )}

              {/* Boutons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin")}
                  data-testid="cancel-btn"
                  className="flex-1 bg-harmonia-mauve text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  data-testid="save-product-btn"
                  className={`flex-1 py-3 rounded-lg font-semibold transition ${
                    saving
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-harmonia-red text-white hover:bg-opacity-90"
                  }`}
                >
                  {saving ? "Enregistrement..." : isEdit ? "Modifier" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
