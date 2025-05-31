import React, { useEffect, useState } from "react";

const BookCarousel = () => {
  const [books, setBooks] = useState([]);

  // Example ISBNs
  const bookISBNs = ["9781637632116", "9781950129362", "9781781100486"];

  useEffect(() => {
    const fetchBooks = async () => {
      const promises = bookISBNs.map((isbn) =>
        fetch(
          `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);

      const booksData = results
        .map((result) => {
          const volumeInfo = result.items?.[0]?.volumeInfo;
          if (!volumeInfo) return null;

          // Use the widest available cover image
          const imageLinks = volumeInfo.imageLinks || {};
          const coverUrl =
            imageLinks.extraLarge ||
            imageLinks.large ||
            imageLinks.medium ||
            imageLinks.thumbnail ||
            imageLinks.smallThumbnail ||
            null;

          return {
            title: volumeInfo.title || "No Title",
            coverUrl,
          };
        })
        .filter((book) => book && book.coverUrl);

      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  if (books.length === 0) return <p className="mt-4 text-center">Loading...</p>;

  return (
    <div
      id="googleBooksCarousel"
      className="carousel slide w-50 mx-auto mt-4"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {books.map(({ coverUrl, title }, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={title}
          >
            <img
              src={coverUrl}
              className="d-block w-100"
              alt={`Cover of ${title}`}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>{title}</h5>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#googleBooksCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#googleBooksCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default BookCarousel;
