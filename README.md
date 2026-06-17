# Mon Book Tracker - Apprentissage de React

Projet fil rouge pour maîtriser les concepts fondamentaux de React en partant de zéro.

## Wireframe de l'app

![Wireframe book tracker](/src/assets/wireframe-book-tracker.png)


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
  [Documentation (fr.react.dev) — Gérer l'état / chargement de données](https://fr.react.dev/learn/managing-state)

- `onClick` se met sur un bouton ou un élément cliquable.
  [Documentation (fr.react.dev) — Ajouter de l'interactivité (formulaires)](https://fr.react.dev/learn/adding-interactivity)
- `e.preventDefault()` bloque le comportement par défaut (par exemple l'envoi de formulaire qui recharge la page).
- Dans React, on manipule souvent `value={...}` + `onChange={...}` pour contrôler un champ.
  [Documentation (fr.react.dev) — Documentation générale React](https://fr.react.dev/)
- Les noms d'attributs sont en camelCase : `tabIndex`, `readOnly`, `defaultValue`.

  [Documentation (fr.react.dev) — Apprendre React (concepts liés au routing)](https://fr.react.dev/learn)

## Chapitre 1 : Composants & Props
[Documentation (fr.react.dev) — Composants & Props](https://fr.react.dev/learn/describing-the-ui)
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
- On peut affecter une valeur par défaut au prop
`title = "Vilain petit canard"`

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
[Documentation (fr.react.dev) — `useMemo`](https://fr.react.dev/reference/react/useMemo)
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


## Chapitre 3 : rendu conditionnel
[Documentation (fr.react.dev) — Affichage conditionnel](https://fr.react.dev/learn/adding-interactivity)
Le rendu conditionnel permet d'afficher une partie de l'interface seulement quand une condition est vraie.

### 1. Expression ternaire avec `? :` 
```jsx
{filteredBooks.length === 0 ? (
  <p>Aucun livre trouvé</p>
) : (
  <BookList books={filteredBooks} />
)}
```
- Si la condition est vraie, React affiche le premier bloc.
- Sinon, il affiche le second.

### 2. Condition avec `&&`
```jsx
{filteredBooks.length === 0 && <p>Aucun livre trouvé</p>}
```
- Si `filteredBooks.length === 0` est vrai, le message s'affiche.
- Si c'est faux, React ne montre rien.

### 3. `return` conditionnel dans un composant
```jsx
function BookSection({ books }) {
  if (books.length === 0) {
    return <p>Aucun livre trouvé</p>
  }

  return <BookList books={books} />
}
```
- Cela permet d'écrire une logique simple avant le rendu.

### 4. Pourquoi c'est utile ici
- Afficher un message quand aucun livre ne correspond aux filtres.
- Éviter d'afficher une liste vide sans explication.
- Garder l'interface claire et compréhensible.


## Chapitre 4 : `useEffect`
[Documentation (fr.react.dev) — `useEffect`](https://fr.react.dev/reference/react/useEffect)

`useEffect` est un hook React qui permet d'exécuter du code secondaire en réaction au cycle de vie d'un composant.

- On l'utilise pour :
  - récupérer des données depuis une API,
  - enregistrer dans le localStorage,
  - écouter des événements externes,
  - déclencher une action quand une valeur change.
- La syntaxe :
```jsx
useEffect(() => {
  // effet à exécuter
}, [dep1, dep2])
```
- React exécute l'effet après le rendu du composant.
- Si la liste de dépendances est vide `[]`, l'effet ne s'exécute qu'une fois au montage.
- Si on met des variables dans la liste, l'effet se ré-exécute quand elles changent.

### Exemple : sauvegarder les livres dans le navigateur
```jsx
useEffect(() => {
  localStorage.setItem('books', JSON.stringify(books))
}, [books])
```
- À chaque fois que `books` change, on enregistre la nouvelle liste.
- Cela permet de persister les données entre deux visites.

### Exemple : effet de montage seulement
```jsx
useEffect(() => {
  console.log('App monté')
}, [])
```
- Ce code tourne une seule fois, dès que le composant s'affiche.

### Nettoyage d'un effet avec `return`
```jsx
useEffect(() => {
  function handleResize() {
    console.log(window.innerWidth)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    window.removeEventListener('resize', handleResize)
  }
}, [])
```
- `return` permet de nettoyer l'effet quand le composant disparaît.
- C'est indispensable pour éviter les fuites mémoire et les écouteurs en double.

### Pourquoi c'est utile dans ce projet
- `useEffect` est pratique pour charger ou sauvegarder la liste de livres.
- Il sépare le rendu (`JSX`) des effets de bord (API, localStorage, événements).
- Il évite de faire ces actions à chaque render sans raison.



## Chapitre 5 : Custom Hooks
[Documentation (fr.react.dev) — Hooks (général)](https://fr.react.dev/learn)

Un custom hook est une fonction React qui réutilise d'autres hooks (`useState`, `useEffect`, etc.).

- Un custom hook commence toujours par `use` : `useLocalStorage`, `useFetch`, `useForm`.
- C'est juste du JavaScript : une fonction qui appelle d'autres hooks.
- Cela permet d'extraire la logique et de la partager entre composants.

### Pourquoi un custom hook ?
- Éviter de répéter le même code dans plusieurs composants.
- Rendre le composant plus lisible et petit.
- Centraliser la logique métier (ex : chargement/sauvegarde localStorage).

### Exemple simple : `useLocalStorage`
C'est un hook qui gère la lecture et l'écriture dans localStorage de manière propre.

```jsx
function useLocalStorage(key, initialValue) {
  // 1. Charger depuis localStorage au montage
  const [storedValue, setStoredValue] = useState(() => {
    const saved = localStorage.getItem(key)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error('Erreur de parsing localStorage:', error)
        return initialValue
      }
    }
    return initialValue
  })

  // 2. Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(storedValue))
  }, [storedValue, key])

  return [storedValue, setStoredValue]
}
```

### Comment utiliser `useLocalStorage` ?
```jsx
function App() {
  // Au lieu de :
  // const [books, setBooks] = useState(() => { ... })
  // useEffect(() => { localStorage.setItem(...) }, [books])

  // On utilise simplement :
  const [books, setBooks] = useLocalStorage('books', booksData)

  // Et c'est tout ! localStorage est géré automatiquement
}
```

### Avantages
- `App.jsx` devient plus court et plus lisible.
- Si tu as besoin de localStorage ailleurs, tu réutilises juste `useLocalStorage`.
- La logique est testable (on peut tester le hook isolément).

### Structure d'un custom hook
1. Le hook **doit être une fonction** (pas une classe).
2. Le hook **doit appeler d'autres hooks** (`useState`, `useEffect`, etc.).
3. Le nom **doit commencer par `use`** (convention React).
4. On peut le créer n'importe où et l'importer dans d'autres composants.

### Exemple : `useFetch`
Un hook pour charger des données depuis une API :

```jsx
function useFetch(url, initialValue) {
  const [data, setData] = useState(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (mounted) {
          setData(json)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err)
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [url])

  return [data, loading, error]
}
```

### Utilisation
```jsx
function App() {
  const [books, loading, error] = useFetch('/api/books', [])

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error.message}</p>

  return <BookList books={books} />
}
```

### Bonnes pratiques pour les custom hooks
- Nommer avec le préfixe `use` : `useForm`, `useAuth`, `useDebounce`.
- Documenter les paramètres et la valeur retournée.
- Garder le hook simple, une responsabilité par hook.
- Créer un dossier `hooks/` pour les organiser.



## Chapitre 6 : useReduce
[Documentation (fr.react.dev) — `useReducer`](https://fr.react.dev/reference/react/useReducer)

`useReducer` est un hook React destiné à gérer des états plus complexes ou des transitions d'état multiples de façon prévisible.

- Quand l'utiliser :
  - logique de mise à jour complexe (plusieurs champs qui changent ensemble),
  - plusieurs actions possibles (add / remove / toggle / edit),
  - quand on veut centraliser la logique de mise à jour dans une fonction pure.

  *Définition — fonction pure : une fonction qui, pour les mêmes entrées, retourne toujours la même sortie et n'a pas d'effets de bord (pas d'accès réseau, pas de `localStorage`, pas de mutation d'objets externes). Dans le cas d'un `reducer`, cela implique de ne pas muter l'état existant mais de renvoyer un nouvel objet d'état.*
  
### Syntaxe
```jsx
const [state, dispatch] = useReducer(reducer, initialState, init)
```
- `reducer` : `(state, action) => newState` — une fonction pure qui décrit comment l'état change en fonction d'une action.
  
- `dispatch` : fonction pour envoyer des actions (`dispatch({ type: 'ADD', payload: ... })`).
- `init` : fonction facultative pour l'initialisation paresseuse (utile pour charger depuis `localStorage`).
### Exemple simple (gestion de la liste de livres)
```jsx
const initialState = booksData

function booksReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [action.payload, ...state]
    case 'REMOVE':
      return state.filter((b) => b.id !== action.payload)
    case 'TOGGLE_READ':
      return state.map((b) =>
        b.id === action.payload ? { ...b, read: !b.read } : b
      )
    default:
      return state
  }
}

function App() {
  const [books, dispatch] = useReducer(booksReducer, initialState)

  function handleAdd(book) {
    dispatch({ type: 'ADD', payload: book })
  }

  function handleRemove(id) {
    dispatch({ type: 'REMOVE', payload: id })
  }

  function handleToggleRead(id) {
    dispatch({ type: 'TOGGLE_READ', payload: id })
  }

  return (
    // ... BookForm envoie des actions via props ou onAdd qui utilise dispatch
  )
}
```

### Points importants
- Le `reducer` doit être une fonction **pure** : pas d'effets de bord (API, `localStorage`, etc.) à l'intérieur.
- Place les effets secondaires (sauvegarde, fetch) dans `useEffect` ; déclenche-les après un `dispatch` si nécessaire.
- Utilise un `init` pour initialiser l'état depuis `localStorage` sans coût au montage :
```jsx
const [books, dispatch] = useReducer(booksReducer, [], () => {
  const saved = localStorage.getItem('books')
  return saved ? JSON.parse(saved) : booksData
})

useEffect(() => {
  localStorage.setItem('books', JSON.stringify(books))
}, [books])
```


### Initialisation paresseuse vs synchrone

**Sans `init` (initialisation simple) :**
```jsx
const [books, dispatch] = useReducer(booksReducer, booksData)
// React : books = booksData immédiatement
```
- Le 2e argument devient l'état initial directement.
- Problème : si `booksData` est volumineux, le calcul a lieu à chaque rendu du parent.

**Avec `init` (initialisation paresseuse) :**
```jsx
function initBooks() {
  const saved = localStorage.getItem('books')
  return saved ? JSON.parse(saved) : booksData
}

const [books, dispatch] = useReducer(booksReducer, booksData, initBooks)
// React : books = initBooks(booksData) UNE SEULE FOIS au montage
```
- La fonction `init` est appelée **une seule fois** au montage, pas à chaque rendu.
- React passe le 2e argument (`booksData`) à `init()` ; il l'ignore autrement.
- Utile pour charger depuis `localStorage`, faire des calculs initiaux onéreux, etc.

**Et les promesses / async ?**
- ❌ `init` doit être **synchrone** et retourner une valeur, pas une Promise.
- ❌ Les promesses/fetch doivent aller dans `useEffect`, pas dans `init`.
```jsx
// ❌ Ne marche pas :
function initBooks() {
  return fetch('/api/books')  // ← Promise, pas une valeur !
}
const [books, dispatch] = useReducer(booksReducer, booksData, initBooks)

// ✅ Correct : utilise useEffect pour async
function useBooks() {
  const [books, dispatch] = useReducer(booksReducer, [])
  
  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SET_BOOKS', payload: data }))
  }, [])
  
  return [books, dispatch]
}
```


### Quand préférer `useState`
- Pour des états simples et indépendants (un champ, un booléen), `useState` est plus concis.
- `useReducer` devient intéressant quand les mises à jour sont liées ou nombreuses.

### Bonnes pratiques
- Déclare des types d'actions constants (`const ADD = 'ADD'`) pour éviter les fautes de frappe.
- Garde le reducer petit et testable ; couvre chaque action par des tests unitaires.
- Pour éviter le prop drilling, combine `useReducer` avec `useContext` et expose `state` + `dispatch`.

### Analogie avec Redux
- Similarité principale : le pattern `reducer + action` est identique. Dans les deux cas, une fonction pure `reducer(state, action)` reçoit l'état courant et une action, et retourne le nouvel état.
- `dispatch` fonctionne conceptuellement de la même manière : on envoie des actions décrivant ce qui doit changer.
- Différences clés :
  - portée : `useReducer` gère un état local au composant (ou un sous-arbre via `Context`), tandis que Redux gère généralement un store global partagé.
  - écosystème : Redux propose middleware (thunks, sagas), devtools, et un flux d'architecture plus formel pour les effets asynchrones ; `useReducer` ne fournit pas ces couches par défaut.
  - initialisation et persistance : Redux a des patterns et outils dédiés pour hydrater/synchroniser le store ; avec `useReducer` on utilise `init` + `useEffect` manuellement.
- Quand faire une analogie :
  - si tu connais Redux, tu peux écrire des `reducer` locaux avec les mêmes conventions (types constants, action creators) et migrer ensuite vers Redux si besoin.
  - combiner `useReducer` + `useContext` permet de reproduire un petit store local sans dépendance externe.

En résumé : `useReducer` apporte structure et prévisibilité pour la gestion d'états complexes. Il s'intègre bien dans des applications où les actions sur l'état sont nombreuses et où l'on veut centraliser la logique de mise à jour.

### Quand préférer `useReducer` vs `useState`

- **Règle simple :** `useState` pour des états simples et indépendants ; `useReducer` quand la logique de mise à jour devient liée, multiple, ou difficile à raisonner.
- **Signes qu'il est temps de migrer :**
  - Tu as plusieurs `useState` qui doivent être modifiés ensemble pour rester cohérents.
  - Tu as plusieurs types d'actions (ajout, suppression, édition, toggle) qui affectent le même morceau d'état.
  - La logique de mise à jour contient des conditions/branches importantes ou du code répété.
  - Tu veux tester la logique d'état séparément (le `reducer` est facilement testable).
  - Tu subis du prop-drilling pour passer des setters : `useReducer` + `useContext` aide à réduire ça.
- **Règle pratique :** si tu manipules 3+ sous-états liés ou 2–3 actions différentes fréquemment, `useReducer` vaut le coup.
- **Exemples dans ce projet :**
  - La gestion de la liste `books` (ajout / suppression / toggle lu / édition) — bon candidat.
  - Un formulaire multi-champs avec logique de validation et reset.


## Chapitre 7 : Fetch / API


## Chapitre 8 : Validation de formulaire


## Chapitre 9 : Tests


## Chapitre 10 : React router