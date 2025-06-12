interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface RecipeData {
  name: string;
  description: string;
  ingredients: string[];
  steps: string[];
  cookTime: string;
  difficulty: string;
  tips: string;
}

export class OpenRouterService {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1';

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || '';
    if (!this.apiKey) {
      console.warn('OpenRouter API key not found. Using mock responses.');
    }
  }

  private createPrompt(ingredients: string[], dietary: string, surpriseMe: boolean = false): string {
    const dietaryText = dietary !== 'none' ? dietary : 'no specific dietary restrictions';
    
    if (surpriseMe) {
      return `You are a creative and innovative chef. A user has these ingredients: ${ingredients.join(', ')}. Their dietary preference is: ${dietaryText}.

Create 1 VERY CREATIVE and UNEXPECTED recipe that combines these ingredients in a surprising way. Think outside the box - maybe fusion cuisine, unusual combinations, or creative presentations.

Return ONLY a valid JSON object with this exact structure:
{
  "name": "Creative Recipe Name",
  "description": "Brief description highlighting what makes it unique",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
  "steps": ["Step 1", "Step 2", "Step 3"],
  "cookTime": "X minutes",
  "difficulty": "Easy/Medium/Hard",
  "tips": "Helpful tips or substitutions"
}

Make it fun, creative, and delicious!`;
    }

    return `You are a helpful and creative home chef. A user has these ingredients: ${ingredients.join(', ')}. Their dietary preference is: ${dietaryText}.

Generate 3 practical, delicious recipes that use these ingredients. Make them varied in style and cooking method.

Return ONLY a valid JSON array with this exact structure:
[
  {
    "name": "Recipe Name",
    "description": "Brief description of the dish",
    "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
    "steps": ["Step 1", "Step 2", "Step 3"],
    "cookTime": "X minutes",
    "difficulty": "Easy/Medium/Hard",
    "tips": "Helpful tips or substitutions"
  }
]

Focus on practical, achievable recipes that taste great!`;
  }

  private parseRecipeResponse(content: string): RecipeData[] {
    try {
      // Clean the response - remove any markdown formatting
      const cleanContent = content
        .replace(/```json\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();

      const parsed = JSON.parse(cleanContent);
      
      // Handle both single recipe and array responses
      const recipes = Array.isArray(parsed) ? parsed : [parsed];
      
      return recipes.map((recipe: any, index: number) => ({
        name: recipe.name || `Recipe ${index + 1}`,
        description: recipe.description || 'A delicious recipe',
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        steps: Array.isArray(recipe.steps) ? recipe.steps : [],
        cookTime: recipe.cookTime || '30 minutes',
        difficulty: recipe.difficulty || 'Medium',
        tips: recipe.tips || 'Enjoy your cooking!'
      }));
    } catch (error) {
      console.error('Failed to parse recipe response:', error);
      throw new Error('Failed to parse recipe data from AI response');
    }
  }

  async generateRecipes(ingredients: string[], dietary: string, surpriseMe: boolean = false): Promise<RecipeData[]> {
    if (!this.apiKey) {
      // Return mock data when API key is not available
      return this.getMockRecipes(ingredients, surpriseMe);
    }

    try {
      const prompt = this.createPrompt(ingredients, dietary, surpriseMe);
      
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
          'X-Title': 'SmartChef Recipe Generator'
        },
        body: JSON.stringify({
          model: 'google/gemma-3n-e4b-it:free',
          messages: [
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: surpriseMe ? 0.9 : 0.7,
          max_tokens: 2000
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`OpenRouter API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
      }

      const data: OpenRouterResponse = await response.json();
      
      if (!data.choices || data.choices.length === 0) {
        throw new Error('No response from AI model');
      }

      const content = data.choices[0].message.content;
      return this.parseRecipeResponse(content);

    } catch (error) {
      console.error('OpenRouter API error:', error);
      
      // Fallback to mock data on API failure
      if (error instanceof Error && error.message.includes('API error')) {
        throw error; // Re-throw API errors to show user
      }
      
      // For parsing or network errors, fallback to mock data
      console.log('Falling back to mock recipes due to error');
      return this.getMockRecipes(ingredients, surpriseMe);
    }
  }

  private getMockRecipes(ingredients: string[], surpriseMe: boolean): RecipeData[] {
    const baseIngredients = ingredients.slice(0, 3).join(', ');
    
    if (surpriseMe) {
      return [{
        name: `Fusion ${baseIngredients} Delight`,
        description: "A creative fusion dish that combines your ingredients in an unexpected way",
        ingredients: [
          ...ingredients.map(ing => `1 portion ${ing}`),
          "Seasonings to taste",
          "Cooking oil"
        ],
        steps: [
          "Prepare all ingredients by washing and chopping as needed",
          "Heat oil in a large pan over medium heat",
          "Combine ingredients in a creative fusion style",
          "Cook while stirring occasionally for 10-15 minutes",
          "Season to taste and serve hot"
        ],
        cookTime: "25 minutes",
        difficulty: "Medium",
        tips: "This fusion approach creates unique flavor combinations. Feel free to experiment with spices!"
      }];
    }

    return [
      {
        name: `Classic ${baseIngredients} Skillet`,
        description: "A hearty, traditional dish featuring your available ingredients",
        ingredients: [
          ...ingredients.map(ing => `1 portion ${ing}`),
          "Salt and pepper to taste",
          "2 tbsp olive oil"
        ],
        steps: [
          "Heat olive oil in a large skillet over medium heat",
          "Add ingredients in order of cooking time needed",
          "Season with salt and pepper",
          "Cook for 15-20 minutes, stirring occasionally",
          "Serve hot and enjoy"
        ],
        cookTime: "20 minutes",
        difficulty: "Easy",
        tips: "This versatile recipe works with many ingredient combinations. Adjust cooking time based on your ingredients."
      },
      {
        name: `Baked ${baseIngredients} Casserole`,
        description: "A comforting baked dish that brings out the best in your ingredients",
        ingredients: [
          ...ingredients.map(ing => `1 portion ${ing}`),
          "1 cup broth or water",
          "Herbs and spices to taste"
        ],
        steps: [
          "Preheat oven to 375°F (190°C)",
          "Layer ingredients in a baking dish",
          "Add broth and seasonings",
          "Cover and bake for 30-35 minutes",
          "Let rest for 5 minutes before serving"
        ],
        cookTime: "40 minutes",
        difficulty: "Easy",
        tips: "Casseroles are forgiving and can be customized with whatever ingredients you have on hand."
      },
      {
        name: `Quick ${baseIngredients} Stir-Fry`,
        description: "A fast and flavorful stir-fry that maximizes the taste of your ingredients",
        ingredients: [
          ...ingredients.map(ing => `1 portion ${ing}`),
          "2 tbsp soy sauce",
          "1 tbsp oil for cooking"
        ],
        steps: [
          "Heat oil in a wok or large pan over high heat",
          "Add harder ingredients first, softer ones later",
          "Stir-fry quickly, keeping ingredients moving",
          "Add soy sauce in the last minute",
          "Serve immediately over rice or noodles"
        ],
        cookTime: "15 minutes",
        difficulty: "Medium",
        tips: "High heat and quick cooking preserve the texture and nutrients of your ingredients."
      }
    ];
  }
}