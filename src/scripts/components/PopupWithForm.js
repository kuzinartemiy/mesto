import {Popup} from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandle) {
    super(popupSelector);
    this._formSubmitHandle = formSubmitHandle;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputs = this._popupForm.querySelectorAll('.popup__input');
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
    this._popupForm.addEventListener('submit', this._formSubmitHandle);
  }

  close() {
    super.close();
    super.removeEventListeners();
    this._popupForm.reset();
  }
}