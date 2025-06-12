'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock, ChefHat, Eye, Copy, Check } from 'lucide-react';
import { Recipe, saveFavoriteRecipe, removeFavoriteRecipe, isRecipeFavorite } from '@/lib/storage';
import { RecipeDialog } from './recipe-dialog';

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteChange?: () => void;
}

export function RecipeCard({ recipe, onFavoriteChange }: RecipeCardProps) {
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorite(recipe.id));
  const [showDialog, setShowDialog] = useState(false);
  const [copied, setCopied] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteRecipe(recipe.id);
    } else {
      saveFavoriteRecipe(recipe);
    }
    setIsFavorite(!isFavorite);
    onFavoriteChange?.();
  };

  const copyRecipe = async () => {
    const recipeText = `${recipe.name}\n\n${recipe.description}\n\nIngredients:\n${recipe.ingredients.join('\n')}\n\nInstructions:\n${recipe.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}\n\nCook Time: ${recipe.cookTime}\nDifficulty: ${recipe.difficulty}\n\nTips: ${recipe.tips}`;
    
    try {
      await navigator.clipboard.writeText(recipeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy recipe:', error);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
              {recipe.name}
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFavorite}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-1">{recipe.description}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {recipe.cookTime}
            </Badge>
            <Badge className={`flex items-center gap-1 ${getDifficultyColor(recipe.difficulty)}`}>
              <ChefHat className="h-3 w-3" />
              {recipe.difficulty}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Ingredients:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              {recipe.ingredients.slice(0, 3).map((ingredient, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                  {ingredient}
                </div>
              ))}
              {recipe.ingredients.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{recipe.ingredients.length - 3} more ingredients
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => setShowDialog(true)}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              View Recipe
            </Button>
            <Button
              onClick={copyRecipe}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      <RecipeDialog
        recipe={recipe}
        open={showDialog}
        onOpenChange={setShowDialog}
      />
    </>
  );
}