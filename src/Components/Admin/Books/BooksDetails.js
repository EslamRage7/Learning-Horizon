import "../css/view.css";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function BooksDetails() {
  const { booksID } = useParams();
  const [book, setBook] = useState({});

  const api_url = `https://learning-horizon-server.premiumasp.net/Api/Book/GetById?id=${booksID}`;

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
      });
  }, [api_url, booksID]);

  const bookImageUrl = `https://learning-horizon-server.premiumasp.net/Api/Book/GetBookFile?path=${book.bookImageLink}`;

  return (
    <>
      <div className="details">
        <div className="container">
          <h1 className="head mt-5 mb-5">Books Details</h1>
          <div className="row text-center">
            <div className="col-12">
              <div className="element">
                <img
                  className="img-fluid mb-3 mt-3 img-thumbnail"
                  src={bookImageUrl}
                  alt={book.bookTitle}
                />
                {book && (
                  <div className="box text-center p-4 mb-3">
                    <div className="mb-2">
                      <span className="span-head">Title:</span>
                      <span className="span-body text-black-50">
                        {book.bookTitle}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="span-head">Description:</span>
                      <span className="span-body text-black-50">
                        {book.bookDescription}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="span-head">Section:</span>
                      <span className="span-body text-black-50">
                        {book.sectionTittle}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="span-head">Price:</span>
                      <span className="span-body text-black-50">
                        {book.freeOrPremium === "free" || book.bookPrice === 0
                          ? "Free"
                          : book.bookPrice}
                      </span>
                    </div>

                    <Link className="text-start btn mt-4" to="/admin/books">
                      Back to Admin Page
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BooksDetails;
