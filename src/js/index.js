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
descriptionButton.onclick = showDescription(`${book.key}`);
closeButton.onclick = closePopup;
