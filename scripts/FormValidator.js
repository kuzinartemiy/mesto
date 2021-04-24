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
        this._checkInputValidity(inputElement, this._form, this._data);
        this._toggleButtonState(this._inputList, this._buttonElement, this._data);
      })
    })
  }

  _checkInputValidity(inputElement) {
    this._isInputNotValid = !inputElement.validity.valid;

    if(this._isInputNotValid) {
      this._inputErrorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, this._inputErrorMessage, this._data);
    } else {
      this._hideInputError(inputElement, this._data);
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

  toggleButton(popup) {
    this._popupSaveButton = popup.querySelector(this._data.submitButtonSelector);
    this._editPopup = document.querySelector(this._data.editPopupId);
    if(popup === this._editPopup) {
      this._popupSaveButton.removeAttribute('disabled', true);
      this._popupSaveButton.classList.remove(this._data.inactiveButtonClass);
    } else {
      this._popupSaveButton.setAttribute('disabled', true);
      this._popupSaveButton.classList.add(this._data.inactiveButtonClass);
    }
  }

  clearInputErrors(popup) {
    this._inputs = Array.from(popup.querySelectorAll(this._data.inputSelector));
    this._inputs.forEach(inputElement => {
      const errorElement = inputElement.nextElementSibling;
      errorElement.textContent = '';
      errorElement.classList.remove(this._data.errorClass);
      inputElement.classList.remove(this._data.inputErrorClass);
    })
  }

  clearInputs(popup) {
    this._popupInputs = Array.from(popup.querySelectorAll(this._data.inputSelector));
    this._popupInputs.forEach(popupInput => popupInput.value = '');
  }

  enableValidation() {
    this._setEventListeners();
  }
}