// src/components/ui/SearchBar.jsx
import { useState } from 'react';

export default function SearchBar({ onSearch, placeholder = 'Rechercher...' }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative" data-testid="search-form">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        data-testid="search-input"
        className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-harmonia-red"
      />
      <button
        type="submit"
        data-testid="search-submit-btn"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-harmonia-mauve hover:text-harmonia-red transition"
        aria-label="Rechercher"
      >
        🔍
      </button>
    </form>
  );
}
