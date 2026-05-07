// Gestionnaire simple du token JWT en mémoire
// Cela évite d'importer le store Redux dans le module axios
// et empêche l'utilisation du localStorage pour le stockage du token
let token = null

/**
 * Définit le token JWT en mémoire
 * @param {string|null} t - Le token JWT
 */
export function setToken(t) {
  token = t
}

/**
 * Récupère le token JWT depuis la mémoire
 * @returns {string|null} Le token JWT ou null
 */
export function getToken() {
  return token
}

export default { setToken, getToken }
