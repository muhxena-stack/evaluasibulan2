import { fetchRecipes, fetchRecipeByKey } from "./modules/api.js";
import { renderRecipeList, renderRecipeDetail } from "./modules/ui.js";
import { getFavorites, toggleFavorite } from "./modules/storage.js";
import { downloadFile, copyToClipboard } from "./modules/utils.js";

const searchInput = document.getElementById("searchInput");
const recipeListContainer = document.getElementById("recipeList");
const recipeDetailContainer = document.getElementById("recipeDetail");

/**
 * Menambahkan event listener untuk tombol download dan share.
 * @param {object} recipe - Objek resep yang akan di-handle.
 */
function addActionListeners(recipe) {
  const downloadBtn = document.getElementById("downloadBtn");
  const shareBtn = document.getElementById("shareBtn");
  const favBtn = document.getElementById("favBtn");

  if (downloadBtn) {
    downloadBtn.onclick = () => {
      // Mengubah objek resep menjadi teks JSON yang rapi
      const recipeJson = JSON.stringify(recipe, null, 2);
      // Memanggil fungsi utilitas untuk men-download file
      downloadFile(`${recipe.key}.json`, recipeJson, "application/json");
    };
  }

  if (shareBtn) {
    shareBtn.onclick = async () => {
      // Mengubah objek resep menjadi string, lalu di-encode ke Base64
      // agar aman diletakkan di URL.
      const encodedData = btoa(JSON.stringify(recipe));
      const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;

      try {
        // Menyalin URL ke clipboard pengguna
        await copyToClipboard(shareUrl);
        alert("Link resep telah disalin ke clipboard!");
      } catch (err) {
        alert("Gagal menyalin link. Coba salin secara manual.");
        console.error("Gagal menyalin:", err);
      }
    };
  }

  if (favBtn) {
    // Cek status favorit saat tombol pertama kali dimuat
    const favorites = getFavorites();
    if (favorites.includes(recipe.key)) {
      favBtn.textContent = "💔 Hapus dari Favorit";
    }

    favBtn.onclick = () => {
      const isAdded = toggleFavorite(recipe.key);
      if (isAdded) {
        favBtn.textContent = "💔 Hapus dari Favorit";
      } else {
        favBtn.textContent = "❤️ Simpan ke Favorit";
      }
    };
  }
}

/**
 * Logika untuk halaman utama (index.html)
 */
async function handleHomePage() {
  const query = searchInput.value;
  const recipes = await fetchRecipes(query);
  renderRecipeList(recipes);
}

/**
 * Logika untuk halaman favorit (favorites.html)
 */
async function handleFavoritesPage() {
  const favoriteKeys = getFavorites();
  if (favoriteKeys.length === 0) {
    renderRecipeList([]); // Kirim array kosong untuk menampilkan pesan "tidak ada resep"
    document.querySelector('#recipeList').innerHTML = '<p style="text-align: center; margin-top: 40px;">Anda belum punya resep favorit.</p>';
    return;
  }

  // Ambil semua resep, lalu filter berdasarkan yang ada di favorit
  const allRecipes = await fetchRecipes();
  const favoriteRecipes = allRecipes.filter(recipe =>
    favoriteKeys.includes(recipe.key)
  );
  renderRecipeList(favoriteRecipes);
}

/**
 * Logika untuk halaman detail (detail.html)
 */
async function handleDetailPage() {
  const params = new URLSearchParams(window.location.search);
  const recipeKey = params.get("id");
  const recipeData = params.get("data"); // Ambil data dari parameter 'data'
  let recipe = null;

  if (recipeData) {
    // Jika ada data di URL, decode dan gunakan data itu
    try {
      const decodedString = atob(recipeData); // Decode dari Base64
      recipe = JSON.parse(decodedString);
    } catch (e) {
      console.error("Gagal mem-parsing data resep dari URL:", e);
      recipe = null;
    }
  } else if (recipeKey) {
    // Jika tidak ada data, fetch resep berdasarkan 'id'
    recipe = await fetchRecipeByKey(recipeKey);
  }

  renderRecipeDetail(recipe);
  if (recipe) {
    // Jika resep berhasil dimuat, tambahkan event listener ke tombol
    addActionListeners(recipe);
  }
}

// Router sederhana untuk menentukan halaman mana yang aktif
if (recipeListContainer) {
  if (searchInput) { // Jika ada searchInput, ini halaman utama
    searchInput.addEventListener("input", handleHomePage);
    handleHomePage();
  } else { // Jika tidak ada searchInput, ini halaman favorit
    handleFavoritesPage();
  }
} else if (recipeDetailContainer) {
  // Jika ini halaman detail (ada #recipeDetail)
  handleDetailPage();
}
