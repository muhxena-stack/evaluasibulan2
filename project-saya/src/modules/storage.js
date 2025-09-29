export function saveToLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFromLocal(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

export function saveToSession(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function getFromSession(key) {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}

const FAVORITES_KEY = 'favoriteRecipes';

/**
 * Mengambil semua key resep favorit dari localStorage.
 * @returns {string[]} Array of recipe keys.
 */
export function getFavorites() {
  return getFromLocal(FAVORITES_KEY) || [];
}

/**
 * Menambah atau menghapus resep dari daftar favorit.
 * @param {string} recipeKey - Key dari resep yang akan di-toggle.
 * @returns {boolean} - `true` jika resep ditambahkan, `false` jika dihapus.
 */
export function toggleFavorite(recipeKey) {
  const favorites = getFavorites();
  const index = favorites.indexOf(recipeKey);

  if (index === -1) { // Jika belum ada, tambahkan
    favorites.push(recipeKey);
    saveToLocal(FAVORITES_KEY, favorites);
    return true;
  } else { // Jika sudah ada, hapus
    favorites.splice(index, 1);
    saveToLocal(FAVORITES_KEY, favorites);
    return false;
  }
}
