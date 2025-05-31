import React from "react";
import pic1 from "../../media/home_library.jpeg";
import pic2 from "../../media/dream_library.jpeg";
import pic3 from "../../media/endless_books.jpeg";

const BookCarousel = () => {
  // Static list of books
  const books = [
    {
      title: "Enjoy books anywhere, anytime",
      coverUrl: pic1,
    },
    {
      title: "Convenient access to knowledge at all times",
      coverUrl: pic2,
    },
    {
      title: "Over 1000+ books available",
      coverUrl: pic3,
    },
  ];

  return (
    <div
      id="bookCarousel"
      className="carousel slide w-100 mx-auto"
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
              style={{ maxHeight: "350px", objectFit: "cover" }}
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
        data-bs-target="#bookCarousel"
        data-bs-slide="prev"
      >
        <span className="fa fa-step-backward" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bookCarousel"
        data-bs-slide="next"
      >
        <span className="fa fa-step-forward" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default BookCarousel;
