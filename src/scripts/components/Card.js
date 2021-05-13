export class Card {
  constructor(data, placeTemplate, popupWithImage) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = placeTemplate;
    this._element = this._getTemplate();
    this._placeImage = this._element.querySelector('.place__image');
    this._popupWithImage = popupWithImage;
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
    const likeButton = this._element.querySelector('.place__like');
    likeButton.addEventListener('click', () => {
      this._handleAddLike(likeButton);
    })

    const deleteButton = this._element.querySelector('.place__delete');
    deleteButton.addEventListener('click', () => {
      this._handleDeleteCard(this._element);
    })
    
    this._placeImage.addEventListener('click', () => {
      this._popupWithImage.open(this._name, this._link);
    })
  }

  _handleAddLike(likeButton) {
    likeButton.classList.toggle('place__like_active');
  }

  _handleDeleteCard(element) {
    element.remove();
  }

  generateCard() {
    this._setEventListeners();
    this._placeImage.src = this._link;
    this._placeImage.alt = `На фотографии ${this._name}`;
    this._element.querySelector('.place__title').textContent = this._name;
    return this._element;
  }
}