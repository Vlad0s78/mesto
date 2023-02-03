const EditButton = document.querySelector(".profile__button-edit");
const popUp = document.querySelector(".popup");
const closeButton = popUp.querySelector(".popup__btn-close");

const handleEditButtonClick = () => {
  popUp.classList.add("popup__opened");
};

const handleCloseButtonClick = () => {
  popUp.classList.remove("popup__opened");
};

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    popUp.classList.remove("popup__opened");
  }
};

EditButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
popUp.addEventListener("click", handleOverlayClick);
