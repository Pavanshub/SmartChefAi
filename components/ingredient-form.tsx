"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Sparkles, AlertCircle, Heart } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

interface IngredientFormProps {
  onSubmit: (ingredients: string[], dietary: string) => void;
  onSurpriseMe: (ingredients: string[], dietary: string) => void;
  loading: boolean;
}

export function IngredientForm({
  onSubmit,
  onSurpriseMe,
  loading,
}: IngredientFormProps) {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [dietary, setDietary] = useState("none");
  const [error, setError] = useState("");

  const addIngredient = () => {
    const trimmed = currentIngredient.trim();

    if (!trimmed) {
      setError("Please enter an ingredient");
      return;
    }

    if (ingredients.includes(trimmed)) {
      setError("This ingredient is already added");
      return;
    }

    if (ingredients.length >= 10) {
      setError("Maximum 10 ingredients allowed");
      return;
    }

    setIngredients([...ingredients, trimmed]);
    setCurrentIngredient("");
    setError("");
  };

  const removeIngredient = (ingredientToRemove: string) => {
    setIngredients(
      ingredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
    setError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addIngredient();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setError("");
    onSubmit(ingredients, dietary);
  };

  const handleSurpriseMe = () => {
    if (ingredients.length === 0) {
      setError("Please add at least one ingredient");
      return;
    }

    setError("");
    onSurpriseMe(ingredients, dietary);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex justify-between text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
          🍳 What&apos;s in your kitchen?
          <Link href="/favorites">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-black hover:bg-red-50 hover:border-red-300 transition-colors"
            >
              <Heart className="h-4 w-4 text-red-500" />
              Favorites
            </Button>
          </Link>
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2 text-start">
          Add your ingredients and let AI create amazing recipes for you
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label
              htmlFor="ingredient-input"
              className="text-sm font-medium text-gray-700"
            >
              Add your ingredients
            </Label>
            <div className="flex gap-2">
              <Input
                id="ingredient-input"
                type="text"
                placeholder="e.g., eggs, tomatoes, bread..."
                value={currentIngredient}
                onChange={(e) => {
                  setCurrentIngredient(e.target.value);
                  if (error) setError("");
                }}
                onKeyPress={handleKeyPress}
                className="flex-1 border-gray-200 focus:border-orange-300 focus:ring-orange-200"
                disabled={loading}
              />
              <Button
                type="button"
                onClick={addIngredient}
                variant="outline"
                size="icon"
                disabled={
                  !currentIngredient.trim() ||
                  loading ||
                  ingredients.length >= 10
                }
                className="hover:bg-orange-50 hover:border-orange-300 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {error && (
              <Alert variant="destructive" className="py-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-sm">{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {ingredients.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Your ingredients ({ingredients.length}/10):
              </Label>
              <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                {ingredients.map((ingredient) => (
                  <Badge
                    key={ingredient}
                    variant="secondary"
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 hover:bg-gray-50 transition-colors group"
                  >
                    {ingredient}
                    <button
                      type="button"
                      onClick={() => removeIngredient(ingredient)}
                      disabled={loading}
                      className="ml-2 hover:text-red-500 transition-colors group-hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label
              htmlFor="dietary-select"
              className="text-sm font-medium text-gray-700"
            >
              Dietary preferences
            </Label>
            <Select
              value={dietary}
              onValueChange={setDietary}
              disabled={loading}
            >
              <SelectTrigger className="border-gray-200 focus:border-orange-300 focus:ring-orange-200">
                <SelectValue placeholder="Choose your dietary preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No restrictions</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="gluten-free">Gluten-free</SelectItem>
                <SelectItem value="dairy-free">Dairy-free</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="paleo">Paleo</SelectItem>
                <SelectItem value="low-carb">Low-carb</SelectItem>
                <SelectItem value="mediterranean">Mediterranean</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="submit"
              disabled={ingredients.length === 0 || loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-medium py-2.5 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Generating...
                </div>
              ) : (
                "Get Recipes"
              )}
            </Button>
            <Button
              type="button"
              onClick={handleSurpriseMe}
              disabled={ingredients.length === 0 || loading}
              variant="outline"
              className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:border-purple-300 transition-all duration-300 font-medium py-2.5 disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4" />
              Surprise Me!
            </Button>
          </div>

          <div className="text-xs text-gray-500 text-center">
            {process.env.NODE_ENV === "development" && (
              <p>
                💡 Add your OpenRouter API key to .env.local for AI-powered
                recipes
              </p>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
