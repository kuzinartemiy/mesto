import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandle) {
    super(popupSelector);
    this._formSubmitHandle = formSubmitHandle;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popupForm.querySelector('.popup__save-button');
    this._submitButtonResetText = this._submitButton.textContent;
  }
  
  setSubmitHandle(submitHandler) {
    this._formSubmitHandle = submitHandler;
  }

  _getInputValues() {
    this._inputsData = {};
    this._inputs.forEach(input => {
      this._inputsData[input.name] = input.value;
    });
    return this._inputsData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._formSubmitHandle(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  resetSubmitText() {
    return this._submitButtonResetText;
  }

  changeSubmitText(text) {
    this._submitButton.textContent = text;
  }
}