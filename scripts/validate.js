const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-submit",
  inactiveButtonClass: "popup__btn-submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

/* ======== Функция для показа сообщения об ошибке для поля ввода ======== */

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Элемент, где должно отображаться сообщение об ошибке
  inputElement.classList.add(settings.inputErrorClass); // Добавляем класс поля ввода в состоянии ошибки
  errorElement.textContent = errorMessage; // Выводим сообщение об ошибке
  errorElement.classList.add(settings.errorClass); // Добавляем класс для отображения сообщения об ошибке
};

/* ======== Функция для скрытия сообщения об ошибке для поля ввода ======== */

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass); // Удаляем класс
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = ""; // Очищаем текст сообщения об ошибке
};

/* ======== Функция для проверки валидности поля ввода ======== */

const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings); // Если поле ввода не является валидным, показываем сообщение об ошибке
  } else {
    hideInputError(formElement, inputElement, settings); // иначе скрываем его
  }
};

/* ======== Функция для установки обработчиков событий на поля ввода ======== */

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); // Находим все поля ввода в форме и создаем массив из них
  const buttonElement = formElement.querySelector(settings.submitButtonSelector); // Находим кнопку отправки формы
  toggleButtonState(inputList, buttonElement, settings); // Устанавливаем состояние кнопки в соответствии с валидностью полей ввода

  inputList.forEach((inputElement) => {
    // Устанавливаем обработчики событий на каждое поле ввода
    inputElement.addEventListener("input", function () {
      toggleButtonState(inputList, buttonElement, settings); // Переключаем состояние кнопки в соответствии с валидностью полей ввода
      checkInputValidity(formElement, inputElement, settings); // Проверяем валидность поля ввода и показываем/скрываем сообщение об ошибке
    });
  });
};

/* ======== Функция для включения валидации форм ======== */

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector)); // Находим все формы на странице по селектору формы из параметров
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault(); // Отменяем стандартное поведение формы при ее отправке
    });
    setEventListeners(formElement, settings); // Добавляем обработчики событий для всех полей формы
  });
};

/* ======== Функция которая проверят каждый инпут на валидность ======== */

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; // Возвращает true, если хотя бы одно поле в списке невалидно
  });
};

/* ======== Функция переключения состояния кнопки отправки в зависимости от валидности полей формы ======== */

const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass); // Если есть невалидные поля в списке, добавляем класс неактивной кнопки
    buttonElement.setAttribute("disabled", true); // И отключаем ее
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass); // Если все поля валидны, убираем класс неактивной кнопки
    buttonElement.removeAttribute("disabled"); // И включаем кнопку
  }
};

/* ======== Функция сброса ошибок ======== */

function resetValidation(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector)); // Находим все поля ввода в форме и создаем массив из них
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    // Проходимся по каждому полю ввода и сбрасываем состояние ошибки
    hideInputError(formElement, inputElement, settings); // Скрываем сообщение об ошибке и удаляем классы ошибок
  });
  toggleButtonState(inputList, buttonElement, settings);
}

/* ======== Вызов функции enableValidation с передачей настроек валидации ======== */

enableValidation(settings);
