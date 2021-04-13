
const toggleButtonState = (inputList, buttonElement, configObj) => {
  const findNotValid = (inputElement) => !inputElement.validity.valid;
  const hasNotValidInput = inputList.some(findNotValid);

  if (hasNotValidInput) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(configObj.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(configObj.inactiveButtonClass);
  }
}

const showInputError = (inputElement, inputErrorMessage, configObj) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = inputErrorMessage;
  errorElement.classList.add(configObj.errorClass);
  inputElement.classList.add(configObj.inputErrorClass);
}

const hideInputError = (inputElement, configObj) => {
  const errorElement = inputElement.nextElementSibling;
  errorElement.textContent = '';
  errorElement.classList.remove(configObj.errorClass);
  inputElement.classList.remove(configObj.inputErrorClass);
}

const checkInputValidity = (formElement, inputElement, configObj) => {
  const isInputNotValid = !inputElement.validity.valid;

  if (isInputNotValid) {
    const inputErrorMessage = inputElement.validationMessage;
    showInputError(inputElement, inputErrorMessage, configObj);
  } else {
    hideInputError(inputElement, configObj);
  }
}

const setEventListeners = (formElement, configObj) => {
  formElement.addEventListener('submit', function(evt) {
    evt.preventDefault();
  })

  const inputList = Array.from(formElement.querySelectorAll(configObj.inputSelector));
  const buttonElement = formElement.querySelector(configObj.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, configObj);
      toggleButtonState(inputList, buttonElement, configObj);
    })
  })
  editButton.addEventListener('click', function() {
    toggleButtonState(inputList, buttonElement, configObj);
  })

  addButton.addEventListener('click', function() {
    toggleButtonState(inputList, buttonElement, configObj);
  })
}

const enableValidation = (configObj) => {
  const formList = Array.from(document.querySelectorAll(configObj.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, configObj);
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});