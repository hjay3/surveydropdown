import React, { useState, useEffect } from 'react';

interface WikipediaSearchProps {
  onSelect: (title: string) => void;
  placeholder?: string;
}

export function WikipediaSearch({ onSelect, placeholder }: WikipediaSearchProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(
            query
          )}&limit=5&namespace=0&format=json&origin=*`
        );
        const [, titles] = await response.json();
        setSuggestions(titles);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((title, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(title);
                setQuery(title);
                setSuggestions([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}