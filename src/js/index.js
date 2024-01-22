import "../css/style.scss";
import logoFn from "../js/logo.js";

document.querySelector("nav").appendChild(logoFn());

function getBooks() {
  const genre = document.querySelector("#genre").value;
  const bookListContainer = document.querySelector("#book-list");
  bookListContainer.innerHTML = '<div class="spinner"></div>';

  fetch(`https://openlibrary.org/subjects/${genre}.json?limit=100`)
    .then((response) => response.json())
    .then((data) => {
      const books = data.works;

      if (books && books.length > 0) {
        const bookListHTML = books
          .map(
            (book) => `
            <div class="book">
              <img src="https://covers.openlibrary.org/b/id/${
                book.cover_id
              }-L.jpg" alt="${book.title}">
              <h3>${book.title}</h3>
              <br><p>Author: ${
                book.authors ? book.authors[0].name : "Unknown"
              }</p>
              <br><button onclick="showDescription('${
                book.key
              }')">View Description</button>
            </div>
          `
          )
          .join("");

        bookListContainer.innerHTML = bookListHTML;
      } else {
        bookListContainer.innerHTML = "<div>No books found</div>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      bookListContainer.innerHTML = "<div>Error fetching data</div>";
    });
}

function showDescription(bookKey) {
  const bookUrl = `https://openlibrary.org${bookKey}.json`;

  fetch(bookUrl)
    .then((response) => response.json())
    .then((book) => {
      const popup = document.querySelector("#popup");
      const descriptionContent = document.querySelector("#descriptionContent");
      descriptionContent.innerHTML = `
          <h2>${book.title}</h2>
          </p>
          <br><p><strong>Description:</strong> ${
            book.description || "No description available."
          }</p>
        `;
      popup.style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching book data:", error);
      alert("Error fetching book data");
    });
}

function closePopup() {
  document.querySelector("#popup").style.display = "none";
}
