import React, { useState } from 'react';
import { WikipediaSearch } from './components/WikipediaSearch';
import { Star } from 'lucide-react';

interface FavoriteItem {
  name: string;
  rating: number;
  isWikipedia: boolean;
}

function App() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [currentRating, setCurrentRating] = useState(5);

  const addFavorite = (name: string, isWikipedia: boolean) => {
    setFavorites([...favorites, { name, rating: currentRating, isWikipedia }]);
    setCurrentRating(5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8">
          <h1 className="text-3xl font-bold text-center text-gray-800">My Favorites Survey</h1>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Add a favorite (movie, artist, show, etc.)
              </label>
              
              <WikipediaSearch
                onSelect={(title) => addFavorite(title, true)}
                placeholder="Search Wikipedia or type your own..."
              />

              <div className="flex items-center gap-2 justify-center mt-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                  <Star
                    key={rating}
                    size={24}
                    className={`cursor-pointer transition-colors ${
                      rating <= currentRating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    onClick={() => setCurrentRating(rating)}
                  />
                ))}
              </div>
            </div>

            {favorites.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800">Your Favorites</h2>
                <div className="grid gap-4">
                  {favorites.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex gap-1">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      {item.isWikipedia && (
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Wikipedia
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;