'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RecipeCard } from '@/components/recipe-card';
import { Recipe, getFavoriteRecipes } from '@/lib/storage';
import { ArrowLeft, Heart, Trash2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFavorites, setFilteredFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFavorites(favorites);
    } else {
      const filtered = favorites.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredFavorites(filtered);
    }
  }, [searchTerm, favorites]);

  const loadFavorites = () => {
    const savedFavorites = getFavoriteRecipes();
    setFavorites(savedFavorites);
  };

  const clearAllFavorites = () => {
    if (window.confirm('Are you sure you want to remove all favorite recipes?')) {
      localStorage.removeItem('smartchef-favorites');
      setFavorites([]);
      setFilteredFavorites([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <Link href="/">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Button>
                </Link>
            </div>
                <div className='flex flex-col  text-center'>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    My Favorite Recipes
                </h1>
                <p className="text-gray-600 mt-1">
                    Your saved recipes collection
                </p>
                </div>
          {favorites.length > 0 && (
            <Button
              onClick={clearAllFavorites}
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          )}
          
        </div>

        {/* Search and Stats */}
        {favorites.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search your favorite recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                />
              </div>
              
              <div className="flex gap-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500" />
                  {favorites.length} Favorite{favorites.length !== 1 ? 's' : ''}
                </Badge>
                {searchTerm && (
                  <Badge variant="secondary">
                    {filteredFavorites.length} Found
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Favorites Grid */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((recipe, index) => (
              <div
                key={recipe.id}
                className="animate-in slide-in-from-bottom-4 duration-500"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <RecipeCard 
                  recipe={recipe} 
                  onFavoriteChange={loadFavorites}
                />
              </div>
            ))}
          </div>
        ) : favorites.length > 0 && searchTerm ? (
          // No search results
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-600 mb-4">
              Try searching with different keywords
            </p>
            <Button
              onClick={() => setSearchTerm('')}
              variant="outline"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          // Empty state
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No favorite recipes yet
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding recipes to your favorites by clicking the heart icon on any recipe card
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                Discover Recipes
              </Button>
            </Link>
          </div>
        )}

        {/* Recipe Stats */}
        {favorites.length > 0 && (
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-orange-600">{favorites.length}</div>
                  <div className="text-sm text-gray-600">Total Favorites</div>
                </CardContent>
              </Card>
              
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-green-600">
                    {favorites.filter(r => r.difficulty === 'Easy').length}
                  </div>
                  <div className="text-sm text-gray-600">Easy Recipes</div>
                </CardContent>
              </Card>
              
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-yellow-600">
                    {favorites.filter(r => r.difficulty === 'Medium').length}
                  </div>
                  <div className="text-sm text-gray-600">Medium Recipes</div>
                </CardContent>
              </Card>
              
              <Card className="p-4">
                <CardContent className="p-0">
                  <div className="text-2xl font-bold text-red-600">
                    {favorites.filter(r => r.difficulty === 'Hard').length}
                  </div>
                  <div className="text-sm text-gray-600">Hard Recipes</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}