import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function BooksTable() {
  const api_url = "https://learning-horizon-server.premiumasp.net/Api/Book";
  const [books, setBooks] = useState([]);

  const getData = () => {
    fetch(`${api_url}/GetAll`)
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.sort((a, b) => {
          const sectionComparison = a.sectionTittle.localeCompare(
            b.sectionTittle
          );
          if (sectionComparison !== 0) {
            return sectionComparison;
          }
          return a.bookTitle.localeCompare(b.bookTitle);
        });
        setBooks(sortedData);
      });
  };

  const deleteBooks = (bookId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
        popup: "custom-swal",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          popup: "custom-swal",
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          fetch(`${api_url}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: bookId }),
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(
                  `Network response was not ok: ${res.statusText}`
                );
              }
              return res.json();
            })
            .then(() => {
              getData();
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
                customClass: {
                  popup: "custom-swal",
                },
              });
            })
            .catch((error) => {
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: `There was an error deleting the file: ${error.message}`,
                icon: "error",
                customClass: {
                  popup: "custom-swal",
                },
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
            customClass: {
              popup: "custom-swal",
            },
          });
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderBooks = () => {
    let lastSectionTitle = "";
    let bookIndex = 1;
    return books.map((book, index) => {
      const shouldAddSpace = book.sectionTittle !== lastSectionTitle;
      if (shouldAddSpace) {
        bookIndex = 1;
      }
      lastSectionTitle = book.sectionTittle;
      return (
        <React.Fragment key={book.bookId}>
          {shouldAddSpace && index !== 0 && (
            <tr style={{ height: "50px" }}></tr>
          )}
          <tr>
            <td>{bookIndex++}</td>
            <td>{book.bookTitle}</td>
            <td>{book.bookDescription.slice(0, 10)}...</td>
            <td>{book.sectionTittle}</td>
            <td>{book.bookPrice === "" ? "0" : book.bookPrice}</td>

            <td>
              <button
                className="operation btn btn-danger btn-sm me-2 mb-2"
                onClick={() => deleteBooks(book.bookId)}
              >
                Delete
              </button>
              <Link
                to={`/admin/books/${book.bookId}`}
                className="operation btn btn-info btn-sm me-2 mb-2"
              >
                View
              </Link>
              <Link
                to={`/admin/books/edit/${book.bookId}`}
                className="operation btn btn-primary btn-sm mb-2"
              >
                Edit
              </Link>
            </td>
          </tr>
        </React.Fragment>
      );
    });
  };
  const allBooks = books.length;
  return (
    <div className="container">
      <div className="table-responsive">
        <div className="mb-5">
          <h3 className="">Total Books: {allBooks}</h3>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Section</th>
              <th scope="col">Price</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>{renderBooks()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default BooksTable;
