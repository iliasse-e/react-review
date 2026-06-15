import { Header } from './components/Header'
import './App.css'
import { booksData } from './booksData'
import { BookList } from './components/BookList';

function App() {

  const books = booksData;

  return (
    <>
      <Header total={books.length} />
      <BookList books={books} />
    </>
  )
}

export default App
