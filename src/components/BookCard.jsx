function BookCard({ book, onStatusChange, onDelete }) {
  return (
    <article className="book-card">
      <div className="book-card__content">
        <h3>{book.title}</h3>
        <p className="book-card__author">Par : {book.author}</p>
      </div>
      <div className="book-card__actions">
        {book.status === 'a-lire' && (
          <button
            className="book-card__button book-card__button--primary"
            onClick={() => onStatusChange(book.id, 'en-cours')}
          >
            Marquer comme en cours
          </button>
        )}
        {book.status === 'en-cours' && (
          <button
            className="book-card__button book-card__button--primary"
            onClick={() => onStatusChange(book.id, 'lu')}
          >
            Marquer comme lu
          </button>
        )}
        {book.status === 'lu' && (
          <button
            className="book-card__button book-card__button--primary"
            onClick={() => onStatusChange(book.id, 'a-lire')}
          >
            Marquer comme non lu
          </button>
        )}
        <button
          className="book-card__button book-card__button--danger"
          onClick={() => onDelete(book.id)}
        >
          Supprimer
        </button>
      </div>
    </article>
  );
}

export default BookCard;