export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  difficulty: string;
  tips: string;
}

export const saveFavoriteRecipe = (recipe: Recipe) => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavoriteRecipes();
  const updatedFavorites = [...favorites, recipe];
  localStorage.setItem('smartchef-favorites', JSON.stringify(updatedFavorites));
};

export const removeFavoriteRecipe = (recipeId: number) => {
  if (typeof window === 'undefined') return;
  
  const favorites = getFavoriteRecipes();
  const updatedFavorites = favorites.filter(recipe => recipe.id !== recipeId);
  localStorage.setItem('smartchef-favorites', JSON.stringify(updatedFavorites));
};

export const getFavoriteRecipes = (): Recipe[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const favorites = localStorage.getItem('smartchef-favorites');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const isRecipeFavorite = (recipeId: number): boolean => {
  const favorites = getFavoriteRecipes();
  return favorites.some(recipe => recipe.id === recipeId);
};