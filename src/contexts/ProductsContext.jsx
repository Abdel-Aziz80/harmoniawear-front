// src/contexts/ProductsContext.jsx
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { apiGet } from "../services/api"
import { mockProducts } from "../data/mockProducts.js"

const ProductsContext = createContext(null)

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([])
  const [status, setStatus] = useState("idle")   // idle | loading | ready | error
  const [error, setError] = useState(null)

  const load = async () => {
    setStatus("loading"); setError(null)
    try {
      const data = await apiGet("/api/products")
      setProducts(Array.isArray(data) ? data : [])
      setStatus("ready")
    } catch (e) {
      console.error(e)
      if (Array.isArray(mockProducts)) {
        setProducts(mockProducts)
        setStatus("ready")
      } else {
        setStatus("error")
        setError(e)
      }
    }
  }

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setStatus("loading")
        const data = await apiGet("/api/products")
        if (!cancelled) {
          setProducts(Array.isArray(data) ? data : [])
          setStatus("ready")
        }
      } catch (e) {
        console.error(e)
        if (!cancelled) {
          if (Array.isArray(mockProducts)) {
            setProducts(mockProducts)
            setStatus("ready")
          } else {
            setStatus("error"); setError(e)
          }
        }
      }
    })()
    return () => { cancelled = true }
  }, [])

  const byCollection = useMemo(() => ({
    maternity:  products.filter(p => p.collection === "maternity"),
    streetwear: products.filter(p => p.collection === "streetwear"),
    sportswear: products.filter(p => p.collection === "sportswear"),
    muslim:     products.filter(p => p.collection === "muslim"),
  }), [products])

  const byCategory = useMemo(() => ({
    femme:  products.filter(p => p.category === "femme"),
    homme:  products.filter(p => p.category === "homme"),
    enfant: products.filter(p => p.category === "enfant"),
  }), [products])

  const find = (id) => products.find(p => String(p.id) === String(id))
  const search = (q) => {
    const s = String(q || "").toLowerCase().trim()
    if (!s) return products
    return products.filter(p =>
      [p.name, p.description, p.category, p.collection]
        .filter(Boolean)
        .some(v => String(v).toLowerCase().includes(s))
    )
  }

  const value = { products, status, error, refresh: load, byCollection, byCategory, find, search }
  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}

export function useProducts() {
  const ctx = useContext(ProductsContext)
  if (!ctx) throw new Error("useProducts must be used inside <ProductsProvider>")
  return ctx
}
