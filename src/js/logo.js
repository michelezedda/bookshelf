import logoImg from "../img/logo.png";
import "../css/style.css";

function logo() {
  const logoDomImage = new Image();
  logoDomImage.src = logoImg;
  return logoDomImage;
}

export default logo;
