/**
 * Recipe Service
 * Abstracts the API call for generating recipes.
 * Uses fetch to call an AI API with a structured prompt.
 */

const API_URL = '/api/generate-recipe';

/**
 * Generate a recipe from ingredients and cuisine.
 * Falls back to a mock response if the API is unavailable.
 *
 * @param {string[]} ingredients - List of ingredient names
 * @param {string} cuisine - Selected cuisine type
 * @returns {Promise<Object>} Recipe object
 */
export async function generateRecipe(ingredients, cuisine) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ingredients, cuisine }),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.warn('API unavailable, using mock recipe:', error.message);
        return getMockRecipe(ingredients, cuisine);
    }
}

/**
 * Generates a realistic mock recipe for demo / offline use.
 */
function getMockRecipe(ingredients, cuisine) {
    const cuisineRecipes = {
        indian: {
            name: 'Spiced Masala Delight',
            description: 'A fragrant and hearty dish that brings together bold Indian spices with your fresh ingredients, simmered to perfection.',
            cookingTime: '35 mins',
            servings: 4,
            steps: [
                'Heat 2 tablespoons of oil in a large heavy-bottomed pan over medium heat. Add cumin seeds and let them splutter for 30 seconds.',
                `Finely dice the ${ingredients[0] || 'onions'} and sauté until they turn golden brown, about 5-6 minutes.`,
                `Add minced ginger-garlic paste and cook for 1 minute until the raw smell disappears. Stir in ${ingredients.slice(1, 3).join(' and ') || 'the remaining vegetables'}.`,
                'Add turmeric, red chili powder, coriander powder, and garam masala. Stir well to coat the ingredients evenly.',
                'Pour in ½ cup of water, cover, and simmer on low heat for 15-20 minutes until everything is tender and the flavors meld together.',
                'Garnish with fresh coriander leaves and a squeeze of lemon. Serve hot with steamed basmati rice or warm naan bread.',
            ],
        },
        chinese: {
            name: 'Wok-Tossed Stir Fry',
            description: 'A quick and vibrant stir-fry with the perfect balance of savory soy, aromatic ginger, and crisp vegetables.',
            cookingTime: '20 mins',
            servings: 3,
            steps: [
                'Prepare the sauce by mixing 2 tablespoons soy sauce, 1 tablespoon oyster sauce, 1 teaspoon sesame oil, and a pinch of white pepper.',
                `Wash and cut ${ingredients[0] || 'vegetables'} into uniform bite-sized pieces for even cooking.`,
                'Heat a wok over high heat until smoking. Add 2 tablespoons of vegetable oil and swirl to coat.',
                `Add ${ingredients.slice(0, 3).join(', ') || 'your ingredients'} to the wok. Toss constantly for 2-3 minutes.`,
                'Pour in the prepared sauce and toss everything together for another minute until glossy and well-coated.',
                'Serve immediately over steamed jasmine rice, garnished with sliced spring onions and toasted sesame seeds.',
            ],
        },
        thai: {
            name: 'Fragrant Thai Garden Bowl',
            description: 'A bright and aromatic Thai-inspired bowl that balances sweet, sour, salty, and spicy in every bite.',
            cookingTime: '25 mins',
            servings: 3,
            steps: [
                'Prepare the Thai dressing: whisk together lime juice, fish sauce, palm sugar, and finely sliced bird\'s eye chili.',
                `Julienne or slice ${ingredients[0] || 'vegetables'} into thin matchsticks for authentic Thai texture.`,
                `In a hot pan with coconut oil, stir-fry ${ingredients.slice(1, 3).join(' and ') || 'your protein'} until just cooked through.`,
                'Add Thai basil leaves and a splash of coconut milk. Cook for 2 more minutes.',
                'Toss everything with the dressing and fresh herbs — mint, cilantro, and Thai basil.',
                'Serve in bowls over rice noodles, topped with crushed peanuts and a wedge of lime.',
            ],
        },
        italian: {
            name: 'Rustic Italian Comfort',
            description: 'Simple, honest Italian cooking — where quality ingredients speak for themselves with minimal but masterful preparation.',
            cookingTime: '30 mins',
            servings: 4,
            steps: [
                'Bring a large pot of generously salted water to a rolling boil.',
                `Dice ${ingredients[0] || 'tomatoes'} and mince 3 cloves of garlic. Tear fresh basil leaves by hand.`,
                'In a wide skillet, heat extra virgin olive oil over medium heat. Gently sauté the garlic until fragrant, about 1 minute.',
                `Add ${ingredients.slice(0, 3).join(', ') || 'your ingredients'} and cook until softened, seasoning with salt, pepper, and a pinch of red pepper flakes.`,
                'Cook pasta until al dente, then transfer directly to the skillet with a ladle of pasta water. Toss vigorously to emulsify.',
                'Finish with a generous drizzle of good olive oil, torn basil, and freshly grated Parmigiano-Reggiano.',
            ],
        },
        mexican: {
            name: 'Smoky Fiesta Bowl',
            description: 'A vibrant Mexican-inspired bowl bursting with smoky chipotle, zesty lime, and fresh cilantro.',
            cookingTime: '30 mins',
            servings: 4,
            steps: [
                'Season and char the main ingredients in a hot cast-iron skillet with a drizzle of oil and smoked paprika.',
                `Dice ${ingredients[0] || 'peppers'} and ${ingredients[1] || 'onions'}. Prepare fresh pico de gallo with tomatoes, cilantro, and lime.`,
                'Warm corn tortillas directly over the flame or in a dry pan until lightly charred and pliable.',
                `Cook ${ingredients.slice(0, 3).join(', ') || 'your ingredients'} with cumin, chili powder, and a chipotle in adobo.`,
                'Assemble bowls with cilantro-lime rice, black beans, the cooked filling, and all your favorite toppings.',
                'Top with crumbled queso fresco, sliced avocado, a squeeze of lime, and a drizzle of crema.',
            ],
        },
        mediterranean: {
            name: 'Sun-Kissed Mediterranean Plate',
            description: 'A light yet satisfying plate inspired by the sun-drenched coasts — olive oil, fresh herbs, and wholesome ingredients.',
            cookingTime: '25 mins',
            servings: 3,
            steps: [
                'Preheat your oven to 200°C (400°F). Line a baking sheet with parchment paper.',
                `Toss ${ingredients[0] || 'vegetables'} with olive oil, za\'atar, salt, and pepper. Roast for 18-20 minutes.`,
                'While roasting, prepare a lemon-tahini dressing with fresh lemon juice, tahini, garlic, and cold water.',
                `Arrange ${ingredients.slice(0, 3).join(', ') || 'your ingredients'} on a large plate with mixed greens.`,
                'Add the roasted vegetables, crumbled feta, kalamata olives, and a handful of toasted pine nuts.',
                'Drizzle generously with the tahini dressing and finish with fresh dill and a crack of black pepper.',
            ],
        },
        japanese: {
            name: 'Zen Garden Donburi',
            description: 'An elegantly simple Japanese rice bowl that celebrates precision, balance, and the purity of each ingredient.',
            cookingTime: '25 mins',
            servings: 2,
            steps: [
                'Cook short-grain Japanese rice by the absorption method. Let it rest covered for 10 minutes after cooking.',
                `Prepare ${ingredients[0] || 'your main ingredient'} — slice thinly and season lightly with a touch of soy sauce and mirin.`,
                'Make a dashi-based sauce: combine dashi stock, soy sauce, mirin, and a pinch of sugar. Simmer gently.',
                `Cook ${ingredients.slice(0, 3).join(', ') || 'your ingredients'} in the seasoned broth until just tender.`,
                'Arrange the rice in bowls, top with the cooked ingredients, and ladle over a little broth.',
                'Garnish with shredded nori, sesame seeds, thinly sliced scallions, and a small mound of pickled ginger.',
            ],
        },
        continental: {
            name: 'Classic Continental Sauté',
            description: 'An elegant European-style dish with refined flavors, butter-kissed ingredients, and a velvety sauce.',
            cookingTime: '35 mins',
            servings: 4,
            steps: [
                'Bring all ingredients to room temperature. Season generously with salt, pepper, and fresh thyme.',
                `Prepare ${ingredients[0] || 'your main ingredient'} by trimming and cutting into elegant portions.`,
                'Melt butter with a splash of olive oil in a heavy skillet over medium-high heat.',
                `Sear ${ingredients.slice(0, 3).join(', ') || 'your ingredients'} until golden on each side. Remove and rest.`,
                'Deglaze the pan with white wine, scraping up the fond. Add cream and reduce by half.',
                'Return everything to the pan, spoon the sauce over, and finish with fresh parsley and a squeeze of lemon.',
            ],
        },
    };

    const recipeBase = cuisineRecipes[cuisine] || cuisineRecipes.italian;

    return {
        name: recipeBase.name,
        description: recipeBase.description,
        cuisine: cuisine.charAt(0).toUpperCase() + cuisine.slice(1),
        cookingTime: recipeBase.cookingTime,
        servings: recipeBase.servings,
        ingredients: ingredients.map(
            (ing) => `${ing.charAt(0).toUpperCase() + ing.slice(1)} — to taste`
        ),
        steps: recipeBase.steps,
    };
}
