import React, { useEffect, useState } from "react";
import BookCard from "./bookCards";

const genres = ["fiction", "mystery", "science_fiction", "fantasy", "history"];

const genreStyles = {
  fiction: { color: "#D7263D", backgroundColor: "#FFE5E5" }, // Red theme
  mystery: { color: "#1A1A2E", backgroundColor: "#C2C3D1" }, // Dark theme
  science_fiction: { color: "#008080", backgroundColor: "#E0F7FA" }, // Teal theme
  fantasy: { color: "#8A2BE2", backgroundColor: "#EBD6FF" }, // Purple theme
  history: { color: "#965A38", backgroundColor: "#FAE0C3" }, // Brown theme
};

const Genres = () => {
  const [booksByGenre, setBooksByGenre] = useState({});

  useEffect(() => {
    const fetchBooksByGenre = async () => {
      try {
        const fetchedBooks = await Promise.all(
          genres.map(async (genre) => {
            const response = await fetch(
              `https://openlibrary.org/subjects/${genre}.json?limit=50`
            );
            const data = await response.json();

            // Select 5 random books from this genre
            const randomBooks = data.works
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((book) => ({
                title: book?.title || "Unknown Title",
                coverUrl: book?.cover_id
                  ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
                  : "https://via.placeholder.com/150",
                author: book?.author_name?.join(", ") || "Unknown",
                downloadLink: `https://openlibrary.org${book?.key}`,
              }));

            return { genre, books: randomBooks };
          })
        );

        // Convert array into an object grouped by genre
        const groupedBooks = Object.fromEntries(
          fetchedBooks.map(({ genre, books }) => [genre, books])
        );

        setBooksByGenre(groupedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooksByGenre();
  }, []);

  if (Object.keys(booksByGenre).length === 0)
    return <p className="text-center mt-5 fw-bold">Loading...</p>;

  return (
    <div className="container mt-4">
      {genres.map((genre) => (
        <div key={genre} className="mb-4">
          <h2 className="text-center py-2 rounded" style={genreStyles[genre]}>
            {genre.replace("_", " ").toUpperCase()}
          </h2>
          <div className="row mx-auto justify-content-center">
            {booksByGenre[genre]?.map((book, index) => (
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
        </div>
      ))}
    </div>
  );
};

export default Genres;
