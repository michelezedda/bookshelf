import "../css/style.scss";
import logoFn from "../js/logo.js";
import {
  getBooks,
  searchButton,
  closeButton,
  closePopup,
  descriptionButton,
  showDescription,
} from "../js/library.js";

document.querySelector("nav").appendChild(logoFn());

searchButton.onclick = getBooks;

document
  .querySelector("#book-list")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("description-button")) {
      showDescription(event);
    }
  });

closeButton.onclick = closePopup;
