import React, { useState } from "react";
import BookCard from "./bookCards";
import RandomBooks from "./randomBooks";

const BookFinder = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      const results = data.docs.slice(0, 12); // limit to 10 results

      const booksList = results.map((book) => ({
        title: book.title,
        author: book.author_name?.join(", ") || "Unknown",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : null,
        downloadLink: `https://openlibrary.org${book.key}`,
      }));

      setBooks(booksList);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="col-7 mx-auto row text-center mt-5">
        <h1 className="my-2">Book Nest</h1>
        <div className="row">
          <input
            type="text"
            placeholder="Enter book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={searchBooks}
            className="form-control col search-bar"
          />
          <button
            onClick={searchBooks}
            className="col-2 btn btn-accent text-second search-button"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center fw-bold mt-3">Loading...</p>}

        {!loading && query !== "" && books.length === 0 && (
          <p className="text-center mt-3 fw-bold">No results.</p>
        )}
        {!loading && query !== "" && books.length > 0 && (
          <p className="text-center mt-3 fw-bold">
            Here are results on "{query}".
          </p>
        )}
      </div>
      {query == "" && <RandomBooks />}
      <div className="row mx-auto col-11 justify-content-center">
        {books.map((book, index) => (
          <BookCard
            key="index"
            title={book.title}
            author={book.author}
            cover={book.cover}
            style="col-9 col-md-4 col-lg-3 mt-5"
            downloadLink={book.downloadLink}
          />
        ))}
      </div>
    </>
  );
};

export default BookFinder;
