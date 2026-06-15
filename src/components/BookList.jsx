import BookCard from "./BookCard";

export default function BookList({ books, onStatusChange, onDelete }) {
  if (books.length === 0) {
    return (
      <div className="book-list__empty">
        <h2>Pas de livres pour le moment</h2>
        <p>Essayez de changer les filtres ou ajoutez un nouveau livre.</p>
      </div>
    )
  }

  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard 
          key={book.id}
          book={book}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </section>
  )
}
