import { useReducer, useEffect } from 'react'
import { booksData } from '../booksData'

// Types d'actions constants pour éviter les fautes de frappe
export const BOOK_ACTIONS = {
  ADD_BOOK: 'ADD_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',
  SET_STATUS_CHANGE: 'SET_STATUS_CHANGE'
}

// Reducer pur : décrit comment l'état change
function booksReducer(state, action) {
  switch (action.type) {
    case BOOK_ACTIONS.ADD_BOOK:
      return [action.payload, ...state]
    case BOOK_ACTIONS.DELETE_BOOK: {
      const { id } = action.payload
      return state.filter((book) => book.id !== id)
    }
    case BOOK_ACTIONS.SET_STATUS_CHANGE:
      return state.map((book) =>
        book.id === action.payload.id
          ? { ...book, status: action.payload.status }
          : book
      )
    default:
      return state
  }
}

// Initialisation lazy (l'option facultative) : charge depuis localStorage
function initBooks() {
  const saved = localStorage.getItem('books')
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch (error) {
      console.error('Erreur de parsing localStorage:', error)
      return booksData
    }
  }
  return booksData
}

/**
 * Custom hook : gère la liste des livres avec localStorage
 * Encapsule le reducer + la persistence
 * 
 * @returns {Array} [books, dispatch] - l'état des livres et la fonction dispatch
 */
export function useBooks() {
  // useReducer avec initialisation paresseuse
  const [books, dispatch] = useReducer(
    booksReducer,
    booksData,
    initBooks
  )

  // Persister les livres dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  return [books, dispatch]
}
