// format string jadi huruf kapital di awal
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// bikin ID unik (misal untuk form atau draft)
export function generateId(prefix = "id") {
  return prefix + "-" + Math.random().toString(36).substring(2, 9);
}

// simpan ke localStorage dengan JSON.stringify
export function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ambil dari localStorage dengan JSON.parse
export function loadFromStorage(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

/**
 * Memicu download file di browser.
 * @param {string} filename - Nama file yang akan di-download.
 * @param {string} content - Isi dari file.
 * @param {string} contentType - Tipe konten (misal: 'application/json').
 */
export function downloadFile(filename, content, contentType) {
  const element = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element); // Diperlukan untuk Firefox
  element.click();
  document.body.removeChild(element);
}

/**
 * Menyalin teks ke clipboard.
 * @param {string} text - Teks yang akan disalin.
 * @returns {Promise<void>}
 */
export async function copyToClipboard(text) {
  if (!navigator.clipboard) {
    throw new Error("Clipboard API tidak didukung di browser ini.");
  }
  await navigator.clipboard.writeText(text);
}
