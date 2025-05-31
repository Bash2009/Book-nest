import React from "react";

const BookCard = (props) => {
  return (
    <>
      <div
        className={
          props.style +
          " m-2 justify-content-center row py-3 book-card rounded-3"
        }
      >
        {props.cover ? (
          <img src={props.cover} alt={props.title} />
        ) : (
          <p>No cover image</p>
        )}
        <div style={{ bottom: 0 }}>
          <h5 className="m-0 my-2">{props.title}</h5>
          <p className="my-2">
            <strong>Author:</strong> {props.author}
          </p>
          <a
            className="text-decoration-none"
            href={props.downloadLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download / More Info
          </a>
        </div>
      </div>
    </>
  );
};

export default BookCard;
