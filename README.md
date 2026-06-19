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
[Documentation (fr.react.dev) — Récupérer des données](https://fr.react.dev/learn/you-might-not-need-an-effect#fetching-data)
[Documentation MDN — Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)

`fetch` est une API JavaScript native pour communiquer avec des serveurs (API REST). Elle remplace l'ancien `XMLHttpRequest`.

### Syntaxe basique

```jsx
fetch('https://api.example.com/books')
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error('Erreur:', error))
```

- `fetch(url)` retourne une **Promise**.
- `.then(response => response.json())` — transforme la réponse en JSON.
- `.then(data => ...)` — traite les données.
- `.catch(error => ...)` — gère les erreurs réseau.

### Statuts HTTP et gestion d'erreurs

**Important :** `fetch` ne rejette la Promise que si le réseau est inaccessible. Un statut 404 ou 500 ne rejette pas !

```jsx
fetch('https://api.example.com/books')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => console.log(data))
  .catch((error) => console.error('Erreur:', error.message))
```

- `response.ok` — vrai si le statut est 200-299.
- `response.status` — le code HTTP (200, 404, 500, etc.).
- `response.json()` — parse le corps en JSON.

### Utilisation avec `useEffect`

La façon canonique de charger des données en React :

```jsx
import { useState, useEffect } from 'react'

function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // 1. Fonction async
    async function fetchBooks() {
      try {
        setLoading(true)
        const response = await fetch('https://api.example.com/books')
        
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`)
        }
        
        const data = await response.json()
        setBooks(data)
        setError(null)
      } catch (err) {
        setError(err.message)
        setBooks([])
      } finally {
        setLoading(false)
      }
    }

    // 2. Appeler la fonction
    fetchBooks()
  }, []) // Dépendance vide : fetch une seule fois au montage

  // 3. Rendu conditionnel
  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error}</p>
  
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}
```

### Fetch avec dépendances

Pour recharger les données si un paramètre change (ex: ID) :

```jsx
function BookDetail({ bookId }) {
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBook() {
      setLoading(true)
      try {
        const response = await fetch(`https://api.example.com/books/${bookId}`)
        if (!response.ok) throw new Error('Livre non trouvé')
        const data = await response.json()
        setBook(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [bookId]) // Re-fetch si bookId change

  // ...
}
```

### Fetch avec méthodes POST/PUT/DELETE

Envoyer des données au serveur :

```jsx
async function addBook(newBook) {
  try {
    const response = await fetch('https://api.example.com/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })

    if (!response.ok) throw new Error('Impossible d\'ajouter le livre')
    
    const createdBook = await response.json()
    return createdBook
  } catch (err) {
    console.error(err)
    throw err
  }
}

// Utilisation dans un composant
function BookForm() {
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const newBook = { title: 'Mon livre', author: 'Moi' }
      const created = await addBook(newBook)
      console.log('Livre créé:', created)
    } catch (err) {
      alert('Erreur: ' + err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* formulaire */}
    </form>
  )
}
```

### Custom hook pour fetch

Pour réutiliser la logique de fetch ailleurs :

```jsx
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true // évite les fuites mémoire

    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        
        const json = await response.json()
        
        // Vérifier que le composant est toujours monté
        if (mounted) {
          setData(json)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err.message)
          setData(null)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()

    return () => {
      mounted = false // cleanup
    }
  }, [url])

  return { data, loading, error }
}

// Utilisation
function App() {
  const { data: books, loading, error } = useFetch('/api/books')

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur: {error}</p>
  
  return <BookList books={books} />
}
```

### Bonnes pratiques

- **Toujours gérer les trois états :** `loading`, `error`, `data`.
- **Nettoyer les requêtes en vol :** utiliser `let mounted = true` pour éviter les mises à jour après le démontage.
- **Vérifier `response.ok`** : `fetch` ne rejette pas sur les erreurs HTTP.
- **Utiliser `async/await`** plutôt que `.then()` pour plus de lisibilité.
- **Une requête par effet** : ne pas appeler `fetch` directement dans le JSX.
- **Dépendances claires :** si la requête dépend d'un paramètre (ID, query), l'inclure dans le tableau de dépendances.
- **Headers d'authentification :** passer un token dans l'en-tête `Authorization` si nécessaire.

### Fetch vs autres bibliothèques

- **fetch** : natif, simple, suffisant pour la plupart des cas.
- **axios** : plus verbeux, gère automatiquement les timeouts et les annulations.
- **TanStack Query (react-query)** : plus puissant, cache, synchronisation, revalidation automatique — pour les apps complexes.

Pour ce projet, `fetch` + `useEffect` suffisent.

### Axios : une alternative plus simple

**Axios** est une bibliothèque HTTP populaire qui simplifie beaucoup de choses par rapport à `fetch` :

**Installation :**
```bash
npm install axios
```

**Différences clés par rapport à `fetch` :**
- ✅ Transforme automatiquement JSON (pas besoin de `.json()`)
- ✅ Rejette la Promise sur les statuts d'erreur (404, 500, etc.)
- ✅ Support des timeouts natif
- ✅ Annulation de requêtes (`AbortController` équivalent)
- ✅ Intercepteurs pour les headers, l'authentification globale, etc.

**Exemple basique :**
```jsx
import axios from 'axios'

function BookList() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBooks() {
      try {
        const { data } = await axios.get('https://api.example.com/books')
        setBooks(data) // data est déjà parsé en JSON
        setError(null)
      } catch (err) {
        setError(err.message)
        setBooks([])
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, [])

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error}</p>
  
  return (
    <ul>
      {books.map((book) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}
```

**Comparaison fetch vs axios :**

| Besoin | fetch | axios |
|--------|-------|-------|
| GET simple | `fetch(url).then(r => r.json())` | `axios.get(url).then(r => r.data)` |
| Vérifier le statut | `if (!response.ok) throw ...` | Automatique (rejette sur erreur) |
| POST avec JSON | `method: 'POST', body: JSON.stringify(data)` | `axios.post(url, data)` |
| Headers | `headers: {...}` | `headers: {...}` ou intercepteur global |
| Timeout | À gérer avec `AbortController` | `timeout: 5000` dans la config |
| Annulation | `AbortController` | `CancelToken` ou `AbortSignal` |

**POST avec axios :**
```jsx
async function addBook(newBook) {
  try {
    const { data } = await axios.post('https://api.example.com/books', newBook)
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
```

**Avec intercepteur global pour l'authentification :**
```jsx
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000
})

// Ajouter le token à toutes les requêtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Utilisation
function useBooks() {
  const [books, setBooks] = useState([])

  useEffect(() => {
    api.get('/books')
      .then(({ data }) => setBooks(data))
      .catch(err => console.error(err))
  }, [])

  return books
}
```

**Quand utiliser axios vs fetch :**
- **fetch** : prototypes, projets simples, zéro dépendances externes.
- **axios** : apps complexes, besoin d'intercepteurs, gestion globale des erreurs HTTP, timeouts, annulation.

Pour ce projet `book-tracker`, `fetch` est suffisant, mais axios devient intéressant si tu ajoutes de l'authentification ou des headers globaux.


## Chapitre 8 : Validation de formulaire
[Documentation (fr.react.dev) — Formulaires](https://fr.react.dev/learn/adding-interactivity)

La validation de formulaire permet de s'assurer que les données saisies par l'utilisateur sont correctes avant de les traiter.

### 1. Pourquoi valider ?
- **Prévenir les erreurs :** empêcher l'envoi de données incomplètes ou invalides.
- **Améliorer l'expérience :** donner du feedback immédiat à l'utilisateur.
- **Sécurité :** valider côté client (rapidité) ET côté serveur (sécurité).
- **Clarté :** aider l'utilisateur à corriger ses erreurs.

### 2. Types de validation

**Validation synchrone (immédiate) :**
- Longueur minimale/maximale (ex: titre ≥ 3 caractères).
- Format (ex: email avec regex).
- Valeur requise (ex: le titre ne peut pas être vide).

**Validation asynchrone (requête serveur) :**
- Vérifier si un email existe déjà.
- Vérifier si un ISBN est valide.
- Récupérer des données depuis une API.

Pour ce projet, on va se concentrer sur la validation **synchrone**.

### 3. Stratégies de validation

**À chaque changement (onChange) :**
- Retour immédiat à l'utilisateur.
- Peut être trop "verbeux" (trop de messages).
- Bonne expérience si pas trop strict au départ.

```jsx
function BookForm() {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState('')

  function handleTitleChange(e) {
    const value = e.target.value
    setTitle(value)

    // Valider à chaque changement
    if (value.trim().length === 0) {
      setTitleError('Le titre est obligatoire')
    } else if (value.trim().length < 3) {
      setTitleError('Au moins 3 caractères requis')
    } else {
      setTitleError('') // pas d'erreur
    }
  }

  return (
    <>
      <input
        value={title}
        onChange={handleTitleChange}
        placeholder="Titre du livre"
      />
      {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
    </>
  )
}
```

**Au submit (à l'envoi du formulaire) :**
- Valider toute la forme d'un coup.
- Mieux pour les gros formulaires.
- Moins "harcelant" pour l'utilisateur.

```jsx
function BookForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [errors, setErrors] = useState({})

  function validateForm() {
    const newErrors = {}

    if (title.trim().length === 0) {
      newErrors.title = 'Le titre est obligatoire'
    } else if (title.trim().length < 3) {
      newErrors.title = 'Au moins 3 caractères'
    }

    if (author.trim().length > 100) {
      newErrors.author = 'Maximum 100 caractères'
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validateForm()

    // S'il y a des erreurs, les afficher
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Sinon, envoyer les données
    setErrors({})
    onAdd({ title: title.trim(), author: author.trim() })
    setTitle('')
    setAuthor('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Titre</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ex: Les Damnés de la Terre"
        />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </label>

      <label>
        <span>Auteur</span>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Ex: Frantz Fanon"
        />
        {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}
      </label>

      <button type="submit">Ajouter</button>
    </form>
  )
}
```

### 4. Objet de schéma de validation

Pour centraliser les règles de validation, on peut créer un objet qui décrit les validations pour chaque champ :

```jsx
const validationRules = {
  title: [
    {
      check: (value) => value.trim().length === 0,
      message: 'Le titre est obligatoire'
    },
    {
      check: (value) => value.trim().length < 3,
      message: 'Au moins 3 caractères requis'
    },
    {
      check: (value) => value.trim().length > 100,
      message: 'Maximum 100 caractères'
    }
  ],
  author: [
    {
      check: (value) => value.trim().length > 100,
      message: 'Maximum 100 caractères'
    }
  ]
}

function validateForm(formData) {
  const errors = {}

  for (const [field, rules] of Object.entries(validationRules)) {
    for (const rule of rules) {
      if (rule.check(formData[field])) {
        errors[field] = rule.message
        break // Afficher une erreur par champ seulement
      }
    }
  }

  return errors
}

// Utilisation
const newErrors = validateForm({ title, author })
```

### 5. Custom hook `useForm`

Pour réutiliser la logique de validation dans plusieurs formulaires, on crée un custom hook :

```jsx
function useForm(initialState, validationRules, onSubmitCallback) {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function validateForm() {
    const newErrors = {}

    for (const [field, rules] of Object.entries(validationRules)) {
      for (const rule of rules) {
        if (rule.check(formData[field])) {
          newErrors[field] = rule.message
          break
        }
      }
    }

    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()

    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Données valides : appeler le callback et réinitialiser
    setErrors({})
    onSubmitCallback(formData)
    setFormData(initialState)
  }

  function reset() {
    setFormData(initialState)
    setErrors({})
  }

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    reset
  }
}
```

**Utilisation du hook :**
```jsx
const bookValidationRules = {
  title: [
    {
      check: (value) => value.trim().length === 0,
      message: 'Le titre est obligatoire'
    },
    {
      check: (value) => value.trim().length < 3,
      message: 'Au moins 3 caractères requis'
    }
  ],
  author: [
    {
      check: (value) => value.trim().length > 100,
      message: 'Maximum 100 caractères'
    }
  ]
}

function BookForm({ onAdd }) {
  const { formData, errors, handleChange, handleSubmit, reset } = useForm(
    { title: '', author: '' },
    bookValidationRules,
    (data) => {
      onAdd(data)
      reset()
    }
  )

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Titre</span>
        <input
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ex: Les Damnés de la Terre"
        />
        {errors.title && <p style={{ color: 'red' }}>{errors.title}</p>}
      </label>

      <label>
        <span>Auteur</span>
        <input
          value={formData.author}
          onChange={(e) => handleChange('author', e.target.value)}
          placeholder="Ex: Frantz Fanon"
        />
        {errors.author && <p style={{ color: 'red' }}>{errors.author}</p>}
      </label>

      <button type="submit">Ajouter</button>
    </form>
  )
}
```

### 6. Désactiver le bouton si le formulaire invalide

On peut vérifier si le formulaire est valide **avant** l'envoi pour désactiver le bouton :

```jsx
function BookForm({ onAdd }) {
  const { formData, errors, handleChange, handleSubmit } = useForm(...)

  // Valider sans afficher les erreurs
  function isFormValid() {
    const tempErrors = {}
    for (const [field, rules] of Object.entries(bookValidationRules)) {
      for (const rule of rules) {
        if (rule.check(formData[field])) {
          tempErrors[field] = rule.message
          break
        }
      }
    }
    return Object.keys(tempErrors).length === 0
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* champs ... */}
      <button type="submit" disabled={!isFormValid()}>
        Ajouter
      </button>
    </form>
  )
}
```

### 7. Validation temps réel (onChange) avec feedback immédiat

Pour une meilleure expérience, on peut valider chaque champ **pendant qu'on le remplit** :

```jsx
function useForm(initialState, validationRules, onSubmitCallback) {
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({}) // Suivi des champs "touchés"

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Valider ce champ en temps réel SI l'utilisateur l'a "touché"
    if (touched[field]) {
      validateField(field, value)
    }
  }

  function handleBlur(field) {
    // Marquer le champ comme "touché" quand on quitte le champ
    setTouched((prev) => ({ ...prev, [field]: true }))
    // Valider ce champ
    validateField(field, formData[field])
  }

  function validateField(field, value) {
    const fieldRules = validationRules[field] || []
    const fieldErrors = errors

    for (const rule of fieldRules) {
      if (rule.check(value)) {
        fieldErrors[field] = rule.message
        break
      }
    }

    if (!fieldRules.some((rule) => rule.check(value))) {
      delete fieldErrors[field]
    }

    setErrors({ ...fieldErrors })
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Marquer tous les champs comme touchés
    const newTouched = {}
    for (const field of Object.keys(initialState)) {
      newTouched[field] = true
    }
    setTouched(newTouched)

    // Valider tous les champs
    const newErrors = {}
    for (const [field, rules] of Object.entries(validationRules)) {
      for (const rule of rules) {
        if (rule.check(formData[field])) {
          newErrors[field] = rule.message
          break
        }
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Données valides
    setErrors({})
    onSubmitCallback(formData)
    setFormData(initialState)
    setTouched({})
  }

  return {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit
  }
}
```

**Utilisation :**
```jsx
function BookForm({ onAdd }) {
  const { formData, errors, touched, handleChange, handleBlur, handleSubmit } = useForm(
    { title: '', author: '' },
    bookValidationRules,
    onAdd
  )

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Titre</span>
        <input
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          onBlur={() => handleBlur('title')}
          placeholder="Ex: Les Damnés de la Terre"
        />
        {/* Afficher l'erreur seulement si le champ a été touché */}
        {touched.title && errors.title && (
          <p style={{ color: 'red' }}>{errors.title}</p>
        )}
      </label>

      {/* Pareil pour author */}
      <button type="submit">Ajouter</button>
    </form>
  )
}
```

### 8. Points clés à retenir

1. **Valider à l'envoi** pour les petits formulaires (moins "harcelant").
2. **Valider au blur** pour une meilleure expérience : afficher les erreurs après que l'utilisateur quitte le champ.
3. **Créer un custom hook** pour réutiliser la logique entre formulaires.
4. **Séparer les règles de validation** dans un objet ou un fichier pour la maintenabilité.
5. **Toujours valider côté serveur** : la validation client est pour l'UX, pas pour la sécurité.
6. **Messages d'erreur clairs :** dire à l'utilisateur QUOI corriger, pas seulement qu'c'est faux.
7. **Désactiver le bouton** si le formulaire invalide pour prévenir les clics.

### 9. Stratégie recommandée pour `BookForm`

Pour le projet Book Tracker :
1. Créer un custom hook `useForm` dans `hooks/useForm.js`.
2. Définir les règles de validation pour les livres.
3. Valider au submit et au blur (meilleure UX).
4. Afficher les erreurs sous chaque champ.
5. Tester avec des cas limites (titre vide, trop court, trop long, etc.).


## Chapitre 9 : Tests


## Chapitre 10 : React router