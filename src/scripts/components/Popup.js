export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close() {
    this.removeEventListeners();
    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if(evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', this.close.bind(this));

    document.addEventListener('keyup', (evt) => {
      this._handleEscClose(evt)}
    );
    document.addEventListener('click', (evt) => {
      this._handleOverlayClose(evt)}
    );
  }

  removeEventListeners() {
    this._popupCloseButton.removeEventListener('click', this.close.bind(this));

    document.removeEventListener('keyup', (evt) => {
      this._handleEscClose(evt)}
    );
    document.removeEventListener('click', (evt) => {
      this._handleOverlayClose(evt)}
    );
  }
}

