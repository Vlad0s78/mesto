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

// Массив с карточками
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
]; 

// Типмплэйт 

const template = document.querySelector('#template').content;
const sectionGridElements = document.querySelector('.grid-elements');

// создаем DOM-элемент на шаблоне template и возвращаем его.
const createCard = (item) => {
  const templateElements = template.cloneNode(true);
  templateElements.querySelector('.grid-elements__title').textContent = item.name;
  templateElements.querySelector('.grid-elements__image').src = item.link;
  return templateElements;
};

// Перебираем массив и вызываем функцию для каждого элемента массива и добавляем результат в элемент sectionGridElements через метод append()
initialCards.forEach((item) => {
  sectionGridElements.append(createCard(item));
});

// Слушатетели 
EditButton.addEventListener("click", openEditPopup); 
closeButton.addEventListener("click", handleCloseButtonClick); 
popUp.addEventListener("click", handleOverlayClick);
formElement.addEventListener("submit", handleFormSubmit); 
