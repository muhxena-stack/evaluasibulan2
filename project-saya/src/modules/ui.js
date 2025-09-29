import { getFavorites } from "./storage.js";

export function renderRecipeList(recipes) {
  const container = document.getElementById("recipeList");

  const favorites = getFavorites(); // Ambil daftar favorit
  container.innerHTML = "";

  if (recipes.length === 0) {
    container.innerHTML = "<p>Tidak ada resep ditemukan.</p>";
    return;
  }
  recipes.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    // Tambahkan ikon hati jika resep ada di favorit
    const isFavorite = favorites.includes(r.key) ? '<span class="favorite-icon">❤️</span>' : '';

    card.innerHTML = `
      <img src="${r.thumb}" alt="${r.title}">
      <h3>${r.title} ${isFavorite}</h3>
      <p>⏱ ${r.times} | 🍽 ${r.portion}</p>
      <a href="detail.html?id=${r.key}">Lihat Detail</a>
    `;
    container.appendChild(card);
  });
}

export function renderRecipeDetail(recipe) {
  const container = document.getElementById("recipeDetail");
  if (!recipe) {
    container.innerHTML = "<p>Resep tidak ditemukan.</p>";
    return;
  }
  container.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.thumb}" alt="${recipe.title}">
    <p><b>Waktu:</b> ${recipe.times}</p>
    <p><b>Porsi:</b> ${recipe.portion}</p>
    <p><b>Tingkat:</b> ${recipe.difficulty}</p>

    <h3>Bahan-bahan:</h3>
    <ul>${recipe.ingredient.map(i => `<li>${i}</li>`).join("")}</ul>

    <h3>Langkah-langkah:</h3>
    <ol>${recipe.step.map(s => `<li>${s}</li>`).join("")}</ol>

    <div class="actions" style="margin-top: 25px;">
      <button id="favBtn">❤️ Simpan ke Favorit</button>
      <button id="downloadBtn">💾 Download Resep </button>
      <button id="shareBtn">🔗 Salin Link untuk Berbagi</button>
    </div>
  `;
}
