export class FormValidator {
  constructor(config, form) {
    this._data = config;
    this._form = form;
  }
  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })

    this._inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
    this._buttonElement = this._form.querySelector(this._data.submitButtonSelector);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  _checkInputValidity(inputElement) {
    this._isInputNotValid = !inputElement.validity.valid;

    if(this._isInputNotValid) {
      this._inputErrorMessage = inputElement.validationMessage;
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    this._hasNotValidInput = this._inputList.some(this._findNotValid);
    if(this._hasNotValidInput) {
      this._buttonElement.setAttribute('disabled', true);
      this._buttonElement.classList.add(this._data.inactiveButtonClass);
    } else {
      this._buttonElement.removeAttribute('disabled', true);
      this._buttonElement.classList.remove(this._data.inactiveButtonClass);
    }
  }

  _findNotValid(inputElement) {
    return !inputElement.validity.valid;
  }

  _showInputError(inputElement) {
    this._errorElement = inputElement.nextElementSibling;
    this._errorElement.textContent = this._inputErrorMessage;
    this._errorElement.classList.add(this._data.errorClass);
    inputElement.classList.add(this._data.inputErrorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = inputElement.nextElementSibling;
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._data.errorClass);
    inputElement.classList.remove(this._data.inputErrorClass);
  }

  disableButton() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._data.inactiveButtonClass);
  }

  clearInputErrors() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement);
    })
  }

  enableValidation() {
    this._setEventListeners();
  }
}