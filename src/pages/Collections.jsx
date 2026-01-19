// src/pages/Collections.jsx
import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ui/ProductCard.jsx'
import { useProducts } from '../contexts/ProductsContext.jsx'
import { groupBy } from "../utils/helpers.js";

const ORDER = ['maternity', 'streetwear', 'sportswear', 'muslim']
const TITLES = {
  maternity: 'MATERNITY',
  streetwear: 'STREETWEAR',
  sportswear: 'SPORTSWEAR',
  muslim: 'MUSLIM',
}
const BG = {
  maternity: 'bg-harmonia-mauve',
  streetwear: 'bg-harmonia-black',
  sportswear: 'bg-harmonia-red',
  muslim: 'bg-harmonia-black',
}
const norm = (s) => (s || '').trim().toLowerCase()

export default function Collections() {
  const byCollection = groupBy(products, "collections");
  const { products, status, error } = useProducts()
  const [sp, setSp] = useSearchParams()

  // Filtres URL
  const audience = norm(sp.get('audience'))     // femme | homme | enfant | ''
  const q        = (sp.get('q') || '').trim()   // recherche
  const sort     = sp.get('sort') || 'newest'   // newest | price_asc | price_desc

  // Compteurs par public (pour badges)
  const audienceCounts = useMemo(() => {
    const c = { femme: 0, homme: 0, enfant: 0 }
    for (const p of products) {
      const a = norm(p.category)
      if (a in c) c[a]++
    }
    return c
  }, [products])

  // Appliquer filtres & tri, puis regrouper par collection
  const groups = useMemo(() => {
    let base = products.slice()

    if (audience) base = base.filter(p => norm(p.category) === audience)
    if (q) {
      const qq = norm(q)
      base = base.filter(p =>
        norm(p.name).includes(qq) ||
        norm(p.description).includes(qq)
      )
    }

    switch (sort) {
      case 'price_asc':  base.sort((a,b) => (a.price ?? 0) - (b.price ?? 0)); break
      case 'price_desc': base.sort((a,b) => (b.price ?? 0) - (a.price ?? 0)); break
      default:           base.sort((a,b) => (b.id ?? 0) - (a.id ?? 0))         // newest
    }

    const by = Object.fromEntries(ORDER.map(k => [k, []]))
    for (const p of base) {
      const key = norm(p.collection)
      if (ORDER.includes(key)) by[key].push(p)
    }
    return by
  }, [products, audience, q, sort])

  const visibleKeys = useMemo(() => ORDER.filter(k => (groups[k]?.length || 0) > 0), [groups])
  const setParam = (key, val) => {
    const next = new URLSearchParams(sp)
    if (val) next.set(key, val); else next.delete(key)
    setSp(next, { replace: true })
  }
  const clearFilters = () => setSp(new URLSearchParams(), { replace: true })

  if (status === 'loading') return <div className="container mx-auto px-4 py-12">Chargement…</div>
  if (status === 'error')   return <div className="container mx-auto px-4 py-12 text-red-500">Erreur : {String(error?.message || error)}</div>

  const hasAny = visibleKeys.length > 0

  return (
    <div className="min-h-screen bg-harmonia-cream">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <section className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-montserrat font-bold text-harmonia-black mb-3">
            NOS COLLECTIONS
          </h1>
          <p className="text-harmonia-mauve text-lg max-w-2xl mx-auto">
            Filtrez par public, recherchez un produit et triez les résultats. Les sections ci-dessous regroupent par collection.
          </p>
        </section>

        {/* Panneau de filtres */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm text-harmonia-mauve mr-2">Public :</span>
            <button
              className={`px-3 py-1 rounded-full border ${!audience ? 'bg-harmonia-red text-white' : 'hover:bg-black/5'}`}
              onClick={() => setParam('audience', '')}
            >
              Tous
            </button>
            {(['femme','homme','enfant']).map(a => (
              <button
                key={a}
                className={`px-3 py-1 rounded-full border ${audience === a ? 'bg-harmonia-red text-white' : 'hover:bg-black/5'}`}
                onClick={() => setParam('audience', a)}
              >
                {a.charAt(0).toUpperCase() + a.slice(1)}{' '}
                <span className="text-xs opacity-70">({audienceCounts[a]})</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <input
              type="search"
              placeholder="Rechercher un produit…"
              className="flex-1 border rounded-lg px-3 py-2"
              value={q}
              onChange={(e) => setParam('q', e.target.value)}
            />
            <select
              className="border rounded-lg px-3 py-2 md:w-56"
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
            >
              <option value="newest">Plus récent</option>
              <option value="price_asc">Prix ↑</option>
              <option value="price_desc">Prix ↓</option>
            </select>
            {(audience || q || sort !== 'newest') && (
              <button className="border rounded-lg px-3 py-2 hover:bg-black/5" onClick={clearFilters}>
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* Nav rapide (sections non vides) */}
        {hasAny && (
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {visibleKeys.map((key) => (
              <a key={key} href={`#${key}`} className={`${BG[key]} text-harmonia-cream px-4 py-2 rounded-lg hover:opacity-90 transition`}>
                {TITLES[key]}
              </a>
            ))}
          </div>
        )}

        {/* Sections par collection */}
        {hasAny ? (
          ORDER.map((key) => {
            const list = groups[key]
            if (!list?.length) return null
            return (
              <section key={key} id={key} className="mb-16">
                <div className={`${BG[key]} text-harmonia-cream rounded-t-2xl p-6`}>
                  <h2 className="text-2xl font-montserrat font-bold text-center">{TITLES[key]}</h2>
                  <p className="text-center mt-2 opacity-90">
                    {list.length} produit{list.length > 1 ? 's' : ''} disponible{list.length > 1 ? 's' : ''}
                  </p>
                </div>
                <div className="bg-white rounded-b-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((product) => <ProductCard key={product.id} product={product} />)}
                  </div>
                </div>
              </section>
            )
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl">
            <p className="text-harmonia-mauve mb-3">Aucun produit ne correspond aux filtres.</p>
            <Link to="/" className="inline-block bg-harmonia-red text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition">
              Retour à l'accueil
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
