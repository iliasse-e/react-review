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

## CSS : 🌙 Thème sombre
Le fichier root CSS contient une règle `@media (prefers-color-scheme: dark)` qui active un thème sombre quand l'utilisateur a choisi le mode sombre dans son système.

## React DOM : quelques points utiles

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

## Chapitre 1 : Composants & Props
Ce chapitre explique l'essentiel de ce que tu utilises déjà dans ce projet.

### 1. Qu'est-ce qu'un composant ?
- Un composant React est une fonction qui retourne du JSX.
- C'est une brique réutilisable de l'interface.
- Il doit commencer par une majuscule : `BookCard`, `BookList`, `BookForm`.

### 2. Exemple de composant fonctionnel
```jsx
function BookCard({ title, author }) {
  return (
    <article className="book-card">
      <h3>{title}</h3>
      <p>Par : {author}</p>
    </article>
  )
}
```

### 3. Les Props : les données entrantes
- Les props sont les « paramètres » du composant.
- Elles sont envoyées par le parent et lues par l'enfant.
- Dans l'exemple, `title` et `author` sont des props.
- Les props sont immuables dans le composant enfant : on ne les modifie pas.
- Elles peuvent être une fonction (voir plus bas)

### 4. Comment utiliser un composant
```jsx
<BookCard title="Les Damnés de la Terre" author="Frantz Fanon" />
```
- Ici `title` et `author` sont passés depuis le parent.
- React crée un `BookCard` avec ces valeurs.

### 5. Pourquoi c'est utile
- Cela sépare la logique et la présentation.
- Chaque composant fait une seule chose.
- On peut tester et réutiliser plus facilement.

### 6. Dans ce projet
- `App` peut passer `books` à `BookList`.
- `BookList` crée plusieurs `BookCard`.
- `BookForm` recevra une prop `onAdd` pour ajouter un livre.

### 7. Donner une fonction à un child component : Comprendre `onAdd`
- `onAdd` est une prop envoyée par le parent (`App`) à `BookForm`.
- Dans `BookForm`, `onAdd` est une fonction de rappel (callback).
- Quand le formulaire est soumis, `BookForm` appelle `onAdd` avec les données du nouveau livre.
- Cela permet à `App` de mettre à jour sa liste de livres.

Exemple :
```jsx
function App() {
  const [books, setBooks] = useState(booksData)

  function handleAdd(book) {
    setBooks((prevBooks) => [book, ...prevBooks])
  }

  return (
    <>
      <BookForm onAdd={handleAdd} />
      <BookList books={books} />
    </>
  )
}
```

Dans `BookForm` :
```jsx
function BookForm({ onAdd }) {
  // ...
  function handleSubmit(e) {
    e.preventDefault()
    onAdd({ title, author })
  }
}
```

`onAdd` est donc le lien entre le formulaire et le stockage des données dans le parent.

### 8. Pourquoi `useState` dans `App` ?
- `useState` permet à React de garder une valeur qui change dans le temps.
- Dans `App`, on stocke la liste des livres dans un state : `const [books, setBooks] = useState(booksData)`.
- Quand on appelle `setBooks(...)`, React met à jour la liste et relance le rendu.
- C'est le parent qui possède la liste, et `BookForm` déclenche le changement via `onAdd`.

En résumé :
- `props` servent à transmettre des données vers un enfant.
- `useState` sert à garder et modifier les données dans un composant.
- `onAdd` est l'action qui connecte le formulaire au state de l'application.

## Chapitre 2 : `useMemo`
`useMemo` est un hook React qui permet de mémoriser le résultat d'un calcul.

- On l'utilise quand un calcul est un peu lourd et qu'on ne veut pas le refaire à chaque rendu.
- La syntaxe est : `const memoValue = useMemo(() => compute(), [dep1, dep2])`.
- React va recalculer `compute()` uniquement si `dep1` ou `dep2` changent.

### Exemple simple
```jsx
const total = useMemo(() => {
  return items.reduce((sum, item) => sum + item.value, 0)
}, [items])
```
- Si `items` ne change pas, React réutilise le total précédent.
- Si `items` change, le calcul est relancé.

## 🧠 Notes de Cheat Sheet (Mes mots à moi)
*(Notez ici vos propres définitions de Props, State, et hooks au fur et à mesure)*


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