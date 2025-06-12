import { NextRequest, NextResponse } from 'next/server';
import { OpenRouterService } from '@/lib/openrouter';

// Force this API route to be dynamic
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { ingredients, dietary, surpriseMe } = await request.json();
    
    // Validate input
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one ingredient' },
        { status: 400 }
      );
    }

    // Filter out empty ingredients
    const validIngredients = ingredients.filter(ing => ing && ing.trim().length > 0);
    
    if (validIngredients.length === 0) {
      return NextResponse.json(
        { error: 'Please provide valid ingredients' },
        { status: 400 }
      );
    }

    const openRouterService = new OpenRouterService();
    const recipeData = await openRouterService.generateRecipes(
      validIngredients,
      dietary || 'none',
      surpriseMe || false
    );

    // Transform the data to include IDs for the frontend
    const recipes = recipeData.map((recipe, index) => ({
      id: Date.now() + index, // Simple ID generation
      ...recipe
    }));

    return NextResponse.json({ 
      recipes,
      source: process.env.OPENROUTER_API_KEY ? 'ai' : 'mock'
    });

  } catch (error) {
    console.error('Error generating recipes:', error);
    
    // Return appropriate error message
    if (error instanceof Error) {
      if (error.message.includes('API error')) {
        return NextResponse.json(
          { error: 'AI service temporarily unavailable. Please try again later.' },
          { status: 503 }
        );
      }
      
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'An unexpected error occurred while generating recipes' },
      { status: 500 }
    );
  }
}