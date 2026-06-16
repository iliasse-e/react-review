import { Header } from './components/Header'
import './App.css'
import { booksData } from './booksData'
import BookForm from './components/BookForm';
import Filters from './components/Filters';
import BookList from './components/BookList';
import { useState, useMemo } from 'react';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  // états des filtres (valeurs 'all' pour pas de filtre)
  const [genreFilter, setGenreFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // state principal des livres (chargement initial depuis localStorage)
  const [books, setBooks] = useLocalStorage('book', booksData)

  // onAdd: appelé par BookForm
  function handleAdd(newBook) {
    // s'assurer que newBook a un id
    const bookWithId = { 
      id: String(Date.now()), 
      status: "a-lire", 
      ...newBook 
    }
    setBooks((prev) => [bookWithId, ...prev])
  }

  // gestionnaires simples passés à Filters
  function handleGenreChange(e) {
    setGenreFilter(e.target.value)
  }

  function handleStatusChange(e) {
    setStatusFilter(e.target.value)
  }

  function handleBookDelete(id) {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
  }

  function handleBookStatusChange(id, status) {
    setBooks((prevBooks) =>
      prevBooks.map((book) => {
        if (book.id !== id) return book
        return { ...book, status }
      })
    )
  }

  // calcul des livres filtrés (optimisé avec useMemo)
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesGenre =
        genreFilter === 'all' ||
        (book.genre || '').toLowerCase().includes(genreFilter.toLowerCase())

      const matchesStatus =
        statusFilter === 'all' || (book.status || '').toLowerCase() === statusFilter.toLowerCase()

      return matchesGenre && matchesStatus
    })
  }, [books, genreFilter, statusFilter])

  return (
    <>
      <Header total={books.length} />
      <BookForm onAdd={handleAdd} />
      <Filters
        genre={genreFilter}
        status={statusFilter}
        onGenreChange={handleGenreChange}
        onStatusChange={handleStatusChange}
      />
      <BookList 
        books={filteredBooks} 
        onStatusChange={handleBookStatusChange} 
        onDelete={handleBookDelete}
      />
    </>
  )
}

export default App
