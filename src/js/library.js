import "../css/style.css";
import axios from "axios";
import debounce from "lodash/debounce";

export const searchButton = document.querySelector(".search-button");
export const closeButton = document.querySelector(".close-button");
export const descriptionButton = document.querySelector(".description-button");

// Async function to fetch books based on selected genre
export async function getBooks() {
  const genre = document.querySelector("#genre").value;
  const bookListContainer = document.querySelector("#book-list");

  // Displaying a spinner while data is being fetched
  bookListContainer.innerHTML = '<div class="spinner"></div>';

  try {
    const response = await axios.get(
      `https://openlibrary.org/subjects/${genre}.json?limit=100`
    );
    const data = response.data;
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
              }</p><br>
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
  } catch (error) {
    console.error("Error fetching data:", error);
    bookListContainer.innerHTML = "<div>Error fetching data</div>";
  }
}

// Async function to show book description in a popup
export async function showDescription(event) {
  const bookKey = event.target.getAttribute("data-book-key");
  const bookUrl = `https://openlibrary.org${bookKey}.json`;
  const debouncedShowDescription = debounce(showDescription, 300);

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("description-button")) {
      debouncedShowDescription(event);
    }
  });

  try {
    const response = await axios.get(bookUrl);
    const book = response.data;

    const popup = document.querySelector("#popup");
    const descriptionContent = document.querySelector("#description-content");
    descriptionContent.innerHTML = `
      <h2>${book.title}</h2>
      <br><p><strong>Description:</strong> ${
        book.description || "No description available."
      }</p>
    `;
    popup.style.display = "block";
  } catch (error) {
    console.error("Error fetching book data:", error);
    alert("Error fetching book data");
  }
}

// Function to close the popup
export function closePopup() {
  document.querySelector("#popup").style.display = "none";
}
