import "../css/style.css";

export const searchButton = document.querySelector(".search-button");
export const closeButton = document.querySelector(".close-button");
export let descriptionButton = document.querySelector(".description-button");

export function getBooks() {
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
              <div class="book-details">
                <h3>${book.title}</h3>
                <p>Author: ${
                  book.authors ? book.authors[0].name : "Unknown"
                }</p>
                <button class="description-button" data-book-key="${
                  book.key
                }">View Description</button>
              </div>
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

export function showDescription(event) {
  const bookKey = event.target.getAttribute("data-book-key");
  const bookUrl = `https://openlibrary.org${bookKey}.json`;

  fetch(bookUrl)
    .then((response) => response.json())
    .then((book) => {
      const popup = document.querySelector("#popup");
      const descriptionContent = document.querySelector("#description-content");
      descriptionContent.innerHTML = `
          <h2>${book.title}</h2>
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

export function closePopup() {
  document.querySelector("#popup").style.display = "none";
}
