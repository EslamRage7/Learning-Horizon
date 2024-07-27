import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import book1 from "../images/book1.png";
import book2 from "../images/book2.png";
import book3 from "../images/book3.png";

function Books() {
  // const apiUrl = "";
  const [searchTerm, setSearchTerm] = useState("");
  // const [books, setBooks] = useState("");

  // useEffect(() => {
  //   fetch(apiUrl)
  //     .then((res) => res.json())
  //     .then((data) => setBooks(data));
  // }, []);

  const books = [
    {
      id: 1,
      title: "Gray's Anatomy",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      img: book1,
    },
    {
      id: 2,
      title: "San Francisco",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      img: book2,
    },
    {
      id: 3,
      title: "Seattle",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      img: book3,
    },
  ];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="book-input">
        <label className="search-icon" htmlFor="search">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </label>
        <input
          className="form-control search"
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="book mt-5">
        <div className="row">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div key={book.id} className="col-lg-12 col-md-12 col-sm-12">
                <div className="card mb-3">
                  <div className="d-flex align-items-center">
                    <img
                      className="img-fluid"
                      src={book.img}
                      alt={book.title}
                    />
                    <div className="info ms-4">
                      <h2>{book.title}</h2>
                      <p>{book.description}</p>
                    </div>
                    <div className="links ms-auto pe-3">
                      <Link
                        className="btn mb-2"
                        to=""
                        target="_blank"
                        rel="noopener"
                      >
                        Visit Link
                      </Link>
                      <br />
                      <button className="btn">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12">
              <p className="text-center">
                No books found matching your search criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Books;
