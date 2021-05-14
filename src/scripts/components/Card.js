export class Card {
  constructor(data, placeTemplate, openPopupWithImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = placeTemplate;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like');
    this._deleteButton = this._element.querySelector('.place__delete');
    this._placeImage = this._element.querySelector('.place__image');
    this._openPopupWithImage = openPopupWithImage;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return placeElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._toggleLike(this._likeButton);
    })

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    })
    
    this._placeImage.addEventListener('click', () => {
      this._openPopupWithImage(this._name, this._link);
    })
  }

  _toggleLike() {
    this._likeButton.classList.toggle('place__like_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._setEventListeners();
    this._placeImage.src = this._link;
    this._placeImage.alt = `На фотографии ${this._name}`;
    this._element.querySelector('.place__title').textContent = this._name;
    return this._element;
  }
}