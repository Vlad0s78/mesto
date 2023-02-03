const EditButton = document.querySelector(".profile__button-edit");
const popUp = document.querySelector(".popup");
const closeButton = popUp.querySelector(".popup__btn-close");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Функция открытия, закрытия popUp.

const handleEditButtonClick = () => {
  popUp.classList.add("popup__opened");

  nameInput.value = profileName.textContent; // присваиваем инпуту name из профиля
  jobInput.value = profileDescription.textContent; // присваиваем инпуту description из профиля
};

const handleCloseButtonClick = () => {
  popUp.classList.remove("popup__opened");
};

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    popUp.classList.remove("popup__opened");
  }
};

// Обработчик отправки формы.

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  handleCloseButtonClick(); // Закрываем попап после отправки формы.
};

// Слушатетели
EditButton.addEventListener("click", handleEditButtonClick);
closeButton.addEventListener("click", handleCloseButtonClick);
popUp.addEventListener("click", handleOverlayClick);
formElement.addEventListener("submit", handleFormSubmit);
