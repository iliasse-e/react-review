import { useEffect, useState } from "react"

function useLocalStorage(key, initData) {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem(key)
    if (savedBooks) {
      try {
        return JSON.parse(savedBooks)
      } catch (error) {
        console.error('Erreur de parsing localStorage books:', error)
        return initData
      }
    }
    return initData
  })

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books))
  }, [books])

  return [books, setBooks]
}

export default useLocalStorage