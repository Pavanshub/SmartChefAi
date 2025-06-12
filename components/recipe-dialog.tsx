'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Heart, Clock, ChefHat, Copy, Check, Lightbulb } from 'lucide-react';
import { Recipe, saveFavoriteRecipe, removeFavoriteRecipe, isRecipeFavorite } from '@/lib/storage';

interface RecipeDialogProps {
  recipe: Recipe;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RecipeDialog({ recipe, open, onOpenChange }: RecipeDialogProps) {
  const [isFavorite, setIsFavorite] = useState(isRecipeFavorite(recipe.id));
  const [copied, setCopied] = useState(false);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteRecipe(recipe.id);
    } else {
      saveFavoriteRecipe(recipe);
    }
    setIsFavorite(!isFavorite);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold text-gray-900 pr-8">
              {recipe.name}
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button
                onClick={copyRecipe}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </Button>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{recipe.description}</p>
        </DialogHeader>

        <div className="space-y-6">
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

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">🧂 Ingredients</h3>
            <div className="grid gap-2">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-700">{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">📖 Instructions</h3>
            <div className="space-y-3">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-4 p-3 rounded-lg bg-gray-50">
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {recipe.tips && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  💡 Tips & Substitutions
                </h3>
                <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-gray-700">{recipe.tips}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}