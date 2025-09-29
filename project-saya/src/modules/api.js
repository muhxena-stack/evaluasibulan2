const LOCAL_URL = "assets/data/resep.json";

// Variabel untuk menyimpan cache resep setelah dimuat pertama kali
let cachedRecipes = null;

/**
 * Mengambil resep dari cache atau dari file jika belum ada.
 * Ini mencegah pemuatan file JSON berulang kali.
 */
async function getRecipes() {
  if (cachedRecipes === null) {
    const res = await fetch(LOCAL_URL);
    const data = await res.json();
    cachedRecipes = data.recipes || [];
  }
  return cachedRecipes;
}

export async function fetchRecipes(query = "") {
  let recipes = await getRecipes();
  if (query.trim()) {
    recipes = recipes.filter(r => r.title.toLowerCase().includes(query.toLowerCase()));
  }
  return recipes;
}

export async function fetchRecipeByKey(key) {
  const recipes = await getRecipes();
  return recipes.find(r => r.key === key) || null;
}
