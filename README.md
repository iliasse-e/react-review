# Mon Book Tracker - Apprentissage de React

Projet fil rouge pour maîtriser les concepts fondamentaux de React en partant de zéro.

## Wireframe de l'app

+-----------------------------------------------------------------------+
| 📚 MON BOOK TRACKER (Militant & Engagé)          [ Total : 6 livres ] | -> Header
+-----------------------------------------------------------------------+
|                                                                       |
|  [ Ajouter un livre ]                                                 | -> BookForm
|  Titre : [__________________]  Auteur : [____________________]         |
|  Genre : [ Décolonialisme v]   [ + Ajouter au Tracker ]               |
|                                                                       |
+-----------------------------------------------------------------------+
|  Filtrer par genre : ( Tout ) ( Décolonialisme ) ( Féminisme )       | -> Filters
|  Filtrer par statut : ( Tout ) ( À lire ) ( En cours ) ( Lu )         |
+-----------------------------------------------------------------------+
|                                                                       |
|  +---------------------------+   +---------------------------+        |
|  | Les Damnés de la Terre    |   | Femmes, Race et Classe    |        | -> BookList
|  | Par : Frantz Fanon        |   | Par : Angela Davis        |        |    contenant
|  | Genre : Décolonialisme    |   | Genre : Féminisme         |        |    plusieurs
|  |                           |   |                           |        |    BookCard
|  | [ Statut : Lu 🟩 ]         |   | [ Statut : En cours 🟨 ]   |        |
|  |                           |   |                           |        |
|  | ( Supprimer )             |   | ( Supprimer )             |        |
|  +---------------------------+   +---------------------------+        |
|                                                                       |
+-----------------------------------------------------------------------+

## 🗺️ Feuille de route & Progression

- [ ] **Chapitre 1 : Composants & Props**
  - *Ce que j'ai fait :* (À compléter)
  - *Ce que j'ai compris :* (À compléter)
- [ ] **Chapitre 2 : Le State (`useState`)**
  - *Ce que j'ai fait :* - *Ce que j'ai compris :*
- [ ] **Chapitre 3 : Listes et Rendu Conditionnel**
  - *Ce que j'ai fait :*
  - *Ce que j'ai compris :*
- [ ] **Chapitre 4 : Les Effets (`useEffect`) & Persistance**
  - *Ce que j'ai fait :*
  - *Ce que j'ai compris :*

## 🧠 Notes de Cheat Sheet (Mes mots à moi)
*(Notez ici vos propres définitions de Props, State, et hooks au fur et à mesure)*

## CSS : 🌙 Thème sombre
Le fichier root CSS contient une règle `@media (prefers-color-scheme: dark)` qui active un thème sombre quand l'utilisateur a choisi le mode sombre dans son système.

## React DOM : quelques points utiles
- `className` remplace `class` en JSX.
- `htmlFor` remplace `for` sur les `<label>`.
- `onChange` sur un `<input>` reçoit un `event` (`e`) et se déclenche à chaque saisie.
```jsx
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    placeholder="Ex: Les Damnés de la Terre"
  />
```

- `onClick` se met sur un bouton ou un élément cliquable.
- `e.preventDefault()` bloque le comportement par défaut (par exemple l'envoi de formulaire qui recharge la page).
- Dans React, on manipule souvent `value={...}` + `onChange={...}` pour contrôler un champ.
- Les noms d'attributs sont en camelCase : `tabIndex`, `readOnly`, `defaultValue`.

### Exemple JSX
```jsx
function BookForm({ onAdd }) {
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    onAdd({ title })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Titre</label>
      <input
        id="title"
        className="input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" onClick={() => console.log('Ajout')}>
        Ajouter
      </button>
    </form>
  )
}
```
