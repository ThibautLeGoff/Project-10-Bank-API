// Stockage du JWT token en mémoire
let token = null

// Sauvegarde le token JWT en mémoire (appelé après une connexion réussie)
export function setToken(t) {
  token = t
}

// Récupère le token JWT stocké en mémoire (utilisé par axios pour les requêtes)
export function getToken() {
  return token
}

export default { setToken, getToken }
