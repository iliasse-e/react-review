import { useEffect, useState } from "react"

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

export default useLocalStorage