/* ========== Переменные Edit Profile ========== */
const buttonEditProfile = document.querySelector(".profile__button-edit");
const popupEditProfile = document.querySelector(".popup_edit_profile");
const buttonCloseEdit = popupEditProfile.querySelector(".popup__btn-close");
const formEditProfile = document.querySelector(".popup__form_edit_profile");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

/* ========== Переменные  Add Card ========== */
const buttonAddCard = document.querySelector(".profile__button-add");
const popupAddCard = document.querySelector(".popup_add_card");
const buttonCloseAddCard = popupAddCard.querySelector(".popup__btn-close_add_card");
const buttonSubmitAddCard = document.querySelector(".popup__btn-submit_add_card");
const formAddCard = document.querySelector(".popup__form_add_card");
const placeInput = document.querySelector(".popup__input_type_place");
const urlInput = document.querySelector(".popup__input_type_url");

/* ========== Переменные  Add Image Card ========== */
const popupImage = document.querySelector(".popup_image");
const popupPhoto = popupImage.querySelector(".popup__photo");
const popupPhotoName = popupImage.querySelector(".popup__photo-name");
const popupCloseButton = popupImage.querySelector(".popup__btn-close_image");

/* ========== Переменные Тимплэйт'а ========== */
const template = document.querySelector("#template").content;
const sectionGridElements = document.querySelector(".grid-elements");

/* ====================== Функции открытия, закрытия popup / на ESC, Overlay ====================== */

function openPopup(element) {
  element.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupOnEscape);
}

function closePopup(element) {
  element.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupOnEscape);
}

function handleCloseByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

function closePopupOnEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

/* ====================== Обработчик отправки формы Profile. ====================== */

const handleFormEditProfileSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
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

  closePopup(popupAddCard);
};

/* ====================== Тимплэйт ======================*/

const createCard = (item) => {
  const templateElement = template.cloneNode(true);
  const elementImageCard = templateElement.querySelector(".grid-elements__image");
  templateElement.querySelector(".grid-elements__title").textContent = item.name;
  elementImageCard.src = item.link;
  elementImageCard.alt = item.name;

  templateElement.querySelector(".grid-elements__image").addEventListener("click", () => {
    popupPhoto.src = item.link;
    popupPhoto.alt = item.name;
    popupPhotoName.textContent = item.name;
    openPopup(popupImage);
  });

  //Кнопка - Like
  const likeButton = templateElement.querySelector(".grid-elements__button-like");
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("grid-elements__button-like_active");
  });

  //Кнопка - Удалить карточку
  const cardRemovalButton = templateElement.querySelector(".grid-elements__button-remove");
  cardRemovalButton.addEventListener("click", (evt) => {
    evt.target.closest(".grid-elements__items").remove();
  });

  return templateElement;
};

initialCards.forEach((item) => {
  sectionGridElements.append(createCard(item));
});

/* ====================== Слушатетели ====================== */

buttonEditProfile.addEventListener("click", () => {
  openPopup(popupEditProfile);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  resetValidation(formEditProfile, settings);
});

buttonCloseEdit.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

buttonAddCard.addEventListener("click", () => {
  openPopup(popupAddCard);
  formAddCard.reset();
  resetValidation(formAddCard, settings);
});

buttonCloseAddCard.addEventListener("click", () => {
  closePopup(popupAddCard);
});

popupCloseButton.addEventListener("click", () => {
  closePopup(popupImage);
});

const popups = Array.from(document.querySelectorAll('.popup'))

popups.forEach((popup) => {
    popup.addEventListener('click', handleCloseByOverlay)
})

formEditProfile.addEventListener("submit", handleFormEditProfileSubmit);
formAddCard.addEventListener("submit", handleAddCardFormSubmit);
