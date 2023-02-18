/* ========== Переменные Edit Profile ========== */
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfilePopup = document.querySelector(".popup_edit_profile");
const closeButtonEdit = editProfilePopup.querySelector(".popup__btn-close");

const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

/* ========== Переменные  Add Card ========== */
const addCardButton = document.querySelector(".profile__button-add");
const addCardPopup = document.querySelector(".popup_add_card");
const closeButtonAddCard = addCardPopup.querySelector(".popup__btn-close_add_card");

const formAddCard = document.querySelector(".popup__form_add_card");
const placeInput = document.querySelector(".popup__input_type_place");
const urlInput = document.querySelector(".popup__input_type_url");

/* ========== Переменные  Add Image Card ========== */
const popupImage = document.querySelector(".popup_image");
const popupPhoto = popupImage.querySelector(".popup__photo");
const popupPhotoName = popupImage.querySelector(".popup__photo-name");
const popupCloseButton = popupImage.querySelector(".popup__btn-close_image");

/* ====================== Функция открытия, закрытия popUp. ====================== */

const openPopup = (editProfilePopup) => {
  editProfilePopup.classList.add("popup_opened");

  nameInput.value = profileName.textContent; // присваиваем инпуту name из профиля
  jobInput.value = profileDescription.textContent; // присваиваем инпуту description из профиля
};

const сlosePopup = (editProfilePopup) => {
  editProfilePopup.classList.remove("popup_opened");
};

/* ====================== Обработчик отправки формы Profile. ====================== */

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  сlosePopup(editProfilePopup);
};

/* ====================== Обработчик отправки формы Add Card. ====================== */

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: placeInput.value,
    link: urlInput.value,
  };

  initialCards.unshift(newCard);

  sectionGridElements.prepend(createCard(newCard));

  formAddCard.reset();

  сlosePopup(addCardPopup);
};

/* ====================== Массив с карточками ====================== */

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

/* ====================== Типмплэйт ======================*/

const template = document.querySelector("#template").content;
const sectionGridElements = document.querySelector(".grid-elements");

// создаем DOM-элемент на шаблоне template и возвращаем его.
const createCard = (item) => {
  const templateElements = template.cloneNode(true);
  templateElements.querySelector(".grid-elements__title").textContent =
    item.name;
  templateElements.querySelector(".grid-elements__image").src = item.link;

  // Открываем попап картинки.
  templateElements
    .querySelector(".grid-elements__image")
    .addEventListener("click", () => {
      popupPhoto.src = item.link;
      popupPhoto.alt = item.name;
      popupPhotoName.textContent = item.name;
      openPopup(popupImage);
    });

  //Кнопка - Like
  const likeButton = templateElements.querySelector(
    ".grid-elements__button-like"
  );
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("grid-elements__button-like_active");
  });

  //Кнопка - Удалить карточку
  const deleteCard = templateElements.querySelector(
    ".grid-elements__button-remove"
  );
  deleteCard.addEventListener("click", (evt) => {
    evt.target.closest(".grid-elements__items").remove();
  });

  return templateElements;
};

// Перебираем массив и вызываем функцию для каждого элемента массива и добавляем результат в элемент sectionGridElements через метод append()
initialCards.forEach((item) => {
  sectionGridElements.append(createCard(item));
});

/* ====================== Слушатетели ====================== */
editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);
});

closeButtonEdit.addEventListener("click", () => {
  сlosePopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

closeButtonAddCard.addEventListener("click", () => {
  сlosePopup(addCardPopup);
});

popupCloseButton.addEventListener("click", () => {
  сlosePopup(popupImage);
});

formElement.addEventListener("submit", handleFormSubmit);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
