const EditButton = document.querySelector(".profile__button-edit");
const popUp = document.querySelector(".popup");
const closeButton = popUp.querySelector(".popup__btn-close");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// Функция открытия, закрытия popUp.

const openEditPopup = () => {
  popUp.classList.add("popup_opened");

  nameInput.value = profileName.textContent; // присваиваем инпуту name из профиля
  jobInput.value = profileDescription.textContent; // присваиваем инпуту description из профиля
};

const handleCloseButtonClick = () => {
  popUp.classList.remove("popup_opened");
};

const handleOverlayClick = (event) => {
  if (event.target === event.currentTarget) {
    popUp.classList.remove("popup_opened");
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
EditButton.addEventListener("click", openEditPopup);
closeButton.addEventListener("click", handleCloseButtonClick);
popUp.addEventListener("click", handleOverlayClick);
formElement.addEventListener("submit", handleFormSubmit);
