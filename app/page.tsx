'use client';

import { useState } from 'react';
import { IngredientForm } from '@/components/ingredient-form';
import { RecipeCard } from '@/components/recipe-card';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { Recipe } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Sparkles, Heart, AlertCircle, Wifi, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [surpriseRecipe, setSurpriseRecipe] = useState<Recipe | null>(null);
  const [apiStatus, setApiStatus] = useState<'ai' | 'mock' | null>(null);
  const { toast } = useToast();

  const generateRecipes = async (ingredients: string[], dietary: string) => {
    setLoading(true);
    setSurpriseRecipe(null);
    setApiStatus(null);
    
    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          dietary,
          surpriseMe: false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate recipes');
      }

      const data = await response.json();
      setRecipes(data.recipes);
      setApiStatus(data.source);
      
      toast({
        title: "🎉 Recipes Generated!",
        description: `Found ${data.recipes.length} delicious recipes for you.`,
      });
    } catch (error) {
      console.error('Error generating recipes:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate recipes';
      
      toast({
        title: "❌ Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSurpriseRecipe = async (ingredients: string[], dietary: string) => {
    setLoading(true);
    setApiStatus(null);
    
    try {
      const response = await fetch('/api/generate-recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          dietary,
          surpriseMe: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate surprise recipe');
      }

      const data = await response.json();
      setSurpriseRecipe(data.recipes[0]);
      setApiStatus(data.source);
      
      toast({
        title: "✨ Surprise Recipe Ready!",
        description: "Here's a creative recipe just for you!",
      });
    } catch (error) {
      console.error('Error generating surprise recipe:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate surprise recipe';
      
      toast({
        title: "❌ Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
              SmartChef
            </h1>
            {/* <Link href="/favorites">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 hover:bg-red-50 hover:border-red-300 transition-colors"
              >
                <Heart className="h-4 w-4 text-red-500" />
                Favorites
              </Button>
            </Link> */}
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Turn your ingredients into amazing recipes with AI-powered creativity. 
            Just tell us what you have, and we&apos;ll show you what you can make! 🍳✨
          </p>
        </div>

        {/* API Status Indicator */}
        {apiStatus && (
          <div className="mb-6 flex justify-center">
            <Alert className={`max-w-md ${apiStatus === 'ai' ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
              {apiStatus === 'ai' ? (
                <Wifi className="h-4 w-4 text-green-600" />
              ) : (
                <WifiOff className="h-4 w-4 text-blue-600" />
              )}
              <AlertDescription className={`text-sm ${apiStatus === 'ai' ? 'text-green-700' : 'text-blue-700'}`}>
                {apiStatus === 'ai' 
                  ? '🤖 Powered by AI - Real-time recipe generation'
                  : '📚 Demo mode - Using sample recipes (Add OpenRouter API key for AI features)'
                }
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Ingredient Form */}
        <div className="mb-12">
          <IngredientForm
            onSubmit={generateRecipes}
            onSurpriseMe={generateSurpriseRecipe}
            loading={loading}
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 text-lg font-medium text-gray-600">
                <Sparkles className="h-5 w-5 animate-spin text-orange-500" />
                {apiStatus === 'ai' ? 'AI is cooking up something amazing...' : 'Preparing your recipes...'}
              </div>
            </div>
            <LoadingSkeleton />
          </div>
        )}

        {/* Surprise Recipe */}
        {surpriseRecipe && !loading && (
          <div className="mb-12">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-purple-500" />
                🎉 Your Surprise Recipe!
              </h2>
              <p className="text-gray-600 mt-2">
                Something unexpected and creative just for you
              </p>
            </div>
            <div className="max-w-md mx-auto">
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                <RecipeCard recipe={surpriseRecipe} />
              </div>
            </div>
          </div>
        )}

        {/* Recipe Results */}
        {recipes.length > 0 && !loading && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Heart className="h-6 w-6 text-red-500" />
                Your Personalized Recipes
              </h2>
              <p className="text-gray-600 mt-2">
                Crafted just for your ingredients and preferences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <div
                  key={recipe.id}
                  className="animate-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <RecipeCard recipe={recipe} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && recipes.length === 0 && !surpriseRecipe && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👨‍🍳</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Ready to cook something amazing?
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Add your ingredients above and let&apos;s create some delicious recipes together! 
              Our AI will suggest creative combinations you might never have thought of.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 mt-16">
          <p>Made with ❤️ and AI by
            <Link href="https://www.linkedin.com/in/thepavanchowdary/" target='_blank' >
            <Button variant={'outline'} className="ml-2 inline-flex items-center gap-1 hover:bg-gray-100 transition-colors">
              Pavan Krishna D
            </Button>
            </Link>
          </p>
        </footer>
      </div>
      
      <Toaster />
    </div>
  );
}