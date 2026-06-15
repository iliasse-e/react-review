import BookCard from "./BookCard";

export function BookList({books}) {

    return (
    <section className="book-list">

      {books.map(book => 
        <BookCard title={book.title} author={book.author} />
      )}

    </section>
  );
}