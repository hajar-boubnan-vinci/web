# Documentation de l'API

## Opérations de l'API

| URI | Méthode HTTP | Auths? | Opération |
|---|---|---|---|
| **`/api/films`** | GET | Non | READ ALL : Lire toutes les ressources de la collection |
| **`/api/films/:id`** | GET | Non | READ ONE : Lire une ressource de la collection |
| **`/api/films`** | POST | Oui | CREATE ONE : Créer une ressource de la collection basée sur un body au format `{title: string; director: string; duration: number; description?: string; }` |
| **`/api/films/:id`** | PATCH | Oui | UPDATE ONE : Mettre à jour une ressource de la collection basée sur un body au format `{title?: string; director?: string; duration?: number; description?: string; }` |
| **`/api/films/:id`** | DELETE | Oui | DELETE ONE : Supprimer une ressource de la collection |
| **`/api/comments`** | GET | Non | READ ALL FILTERED : Lire toutes les ressources de la collection, filtrées par film |
| **`/api/comments`** | POST | Oui | CREATE ONE : Créer une ressource basée sur un body au format `{filmId: number; userId: number; content: string; }` |
| **`/api/comments/:id`** | DELETE | Oui | DELETE ONE : Supprimer une ressource de la collection basée sur l'utilisateur authentifié |
| **`/api/auth/register`** | POST | Non | REGISTER : Enregistrer un nouvel utilisateur basé sur un body au format `{username: string; password: string; }` |
| **`/api/auth/login`** | POST | Non | LOGIN : Authentifier un utilisateur basé sur un body au format `{username: string; password: string; }` |

## Notes

- Les opérations de lecture (GET) sur les films et les commentaires ne nécessitent pas d'authentification.
- Les opérations d'écriture (POST, PATCH, DELETE) sur les films et les commentaires nécessitent une authentification par JWT.
- Les opérations d'authentification (REGISTER, LOGIN) ne nécessitent pas d'authentification préalable.