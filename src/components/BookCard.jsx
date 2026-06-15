function BookCard({ title, author }) {
  return (
    <article className="book-card">
      <div className="book-card__content">
        <h3>{title}</h3>
        <p className="book-card__author">Par : {author}</p>
      </div>
      <div className="book-card__actions">
        <button className="book-card__button book-card__button--primary">Marquer comme lu</button>
        <button className="book-card__button book-card__button--danger">Supprimer</button>
      </div>
    </article>
  );
}

export default BookCard;