import React, { useEffect, useState } from "react";
import BookCard from "./bookCards";

const RandomBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "https://openlibrary.org/subjects/fiction.json?limit=50"
        );
        const data = await response.json();

        // Get random 10 books from the list
        const randomBooks = data.works
          .sort(() => 0.5 - Math.random()) // Shuffle array
          .slice(0, 10) // Take 10 random books
          .map((book) => ({
            title: book.title,
            coverUrl: book.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
              : "https://via.placeholder.com/150",
            author: book.author_name?.join(", ") || "Unknown",
            downloadLink: `https://openlibrary.org${book.key}`, // Open Library page
          }));

        setBooks(randomBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  if (books.length === 0)
    return <p className="text-center mt-5 fw-bold">Loading...</p>;

  return (
    <div className="row mx-auto justify-content-center mt-3">
      {books.map((book, index) => (
        <BookCard
          key={index}
          title={book.title}
          author={book.author}
          cover={book.coverUrl}
          style="col-9 col-md-3 col-lg-2"
          downloadLink={book.downloadLink}
        />
      ))}
    </div>
  );
};

export default RandomBooks;
