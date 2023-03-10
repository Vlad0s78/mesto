/* ========== Переменные Edit Profile ========== */
const editProfileButton = document.querySelector(".profile__button-edit");
const editProfilePopup = document.querySelector(".popup_edit_profile");
const closeButtonEdit = editProfilePopup.querySelector(".popup__btn-close");

const formEditProfile = document.querySelector(".popup__form_edit_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

/* ========== Переменные  Add Card ========== */
const addCardButton = document.querySelector(".profile__button-add");
const addCardPopup = document.querySelector(".popup_add_card");
const closeButtonAddCard = addCardPopup.querySelector(".popup__btn-close_add_card");
const addCardButtonSubmit = document.querySelector(".popup__btn-submit_add_card");

const formAddCard = document.querySelector(".popup__form_add_card");
const placeInput = document.querySelector(".popup__input_type_place");
const urlInput = document.querySelector(".popup__input_type_url");

/* ========== Переменные  Add Image Card ========== */
const popupImage = document.querySelector(".popup_image");
const popupPhoto = popupImage.querySelector(".popup__photo");
const popupPhotoName = popupImage.querySelector(".popup__photo-name");
const popupCloseButton = popupImage.querySelector(".popup__btn-close_image");

/* ========== Переменная всех Попапов ========== */
const allPopup = document.querySelectorAll(".popup");

/* ====================== Функции открытия, закрытия popup====================== */

function openPopup(element) {
  element.classList.add("popup_opened");
}

function closePopup(element) {
  element.classList.remove("popup_opened");
}

/* ====================== закрытие попапа кликом на Оверлей ====================== */

allPopup.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) {
      closePopup(popup);
    }
  });
});

function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

/* ====================== Обработчик отправки формы Profile. ====================== */

const handleFormSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(editProfilePopup);
};

/* ====================== Обработчик отправки формы Add Card. ====================== */

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = {
    name: placeInput.value,
    link: urlInput.value,
  };

  sectionGridElements.prepend(createCard(newCard));

  formAddCard.reset();

  closePopup(addCardPopup);
};

/* ====================== Тимплэйт ======================*/

const template = document.querySelector("#template").content;
const sectionGridElements = document.querySelector(".grid-elements");

const createCard = (item) => {
  const templateElements = template.cloneNode(true);
  const elementImageCard = templateElements.querySelector(".grid-elements__image");
  templateElements.querySelector(".grid-elements__title").textContent = item.name;
  elementImageCard.src = item.link;
  elementImageCard.alt = item.name;

  templateElements
    .querySelector(".grid-elements__image")
    .addEventListener("click", () => {
      popupPhoto.src = item.link;
      popupPhoto.alt = item.name;
      popupPhotoName.textContent = item.name;
      openPopup(popupImage);
    });

  //Кнопка - Like
  const likeButton = templateElements.querySelector(".grid-elements__button-like");
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("grid-elements__button-like_active");
  });

  //Кнопка - Удалить карточку
  const deleteCard = templateElements.querySelector(".grid-elements__button-remove");
  deleteCard.addEventListener("click", (evt) => {
    evt.target.closest(".grid-elements__items").remove();
  });

  return templateElements;
};

initialCards.forEach((item) => {
  sectionGridElements.append(createCard(item));
});

/* ====================== Слушатетели ====================== */

editProfileButton.addEventListener("click", () => {
  openPopup(editProfilePopup);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  resetFormError(formEditProfile, settings);
});

closeButtonEdit.addEventListener("click", () => {
  closePopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);

  addCardButtonSubmit.setAttribute("disabled", "");
  addCardButtonSubmit.classList.add("popup__btn-submit_disabled");

  resetFormError(formAddCard, settings);
});

closeButtonAddCard.addEventListener("click", () => {
  formAddCard.reset();
  closePopup(addCardPopup);
});

popupCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});

formEditProfile.addEventListener("submit", handleFormSubmit);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
document.addEventListener("keydown", closePopupOnEscape);
