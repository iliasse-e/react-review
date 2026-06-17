import { Header } from './components/Header'
import './App.css'
import BookForm from './components/BookForm';
import Filters from './components/Filters';
import BookList from './components/BookList';
import { useState, useMemo } from 'react';
import { useBooks, BOOK_ACTIONS } from './hooks/useBooks';

function App() {
  // états des filtres (valeurs 'all' pour pas de filtre)
  const [genreFilter, setGenreFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Custom hook : gère les livres et la persistence localStorage
  const [books, dispatch] = useBooks()

  // onAdd: appelé par BookForm
  function handleAdd(newBook) {
    // s'assurer que newBook a un id
    const bookWithId = { 
      id: String(Date.now()), 
      status: "a-lire", 
      ...newBook 
    }
    dispatch({ type: BOOK_ACTIONS.ADD_BOOK, payload: bookWithId })
  }

  // gestionnaires simples passés à Filters
  function handleGenreChange(e) {
    setGenreFilter(e.target.value)
  }

  function handleStatusChange(e) {
    setStatusFilter(e.target.value)
  }

  function handleBookDelete(id) {
    dispatch({ type: BOOK_ACTIONS.DELETE_BOOK, payload: { id } })
  }

  function handleBookStatusChange(id, status) {
    dispatch({ type: BOOK_ACTIONS.SET_STATUS_CHANGE, payload: { id, status } })
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
