import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);   
    this._bigImage = this._popup.querySelector('.popup__big-image');
    this._bigImageCaption = this._popup.querySelector('.popup__caption');
  }

  open(name, link) {
    super.open();
    this._bigImage.src = link;
    this._bigImage.alt = `${name} на большой фотографии`;
    this._bigImageCaption.textContent = name;
  }
}