const content = document.querySelector('.content');
const cardBigImage = content.querySelector('.popup__big-image'); 
const cardCaption = content.querySelector('.popup__caption');
const photoPopup = content.querySelector('#photo-popup');

export class Card {
  constructor(data, placeTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = placeTemplate;
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
    
    const placeImage = this._element.querySelector('.place__image');
    placeImage.addEventListener('click', () => {
      this._handleOpenCard();
    })
  }

  _handleAddLike(likeButton) {
    likeButton.classList.toggle('place__like_active');
  }

  _handleDeleteCard(element) {
    element.remove();
  }

  _handleOpenCard() {
    cardCaption.textContent = this._name;
    cardBigImage.src = this._link;
    cardBigImage.alt = `На большой фотографии ${this._name}`;
    photoPopup.classList.add('popup_opened');

    document.addEventListener('click', (evt) => {
      this._closeOverlayClick(evt)
    })
    document.addEventListener('keyup', (evt) => {
      this._closeEscapeKeydown(evt);
    })
  }

  _handleCloseCard() {
    photoPopup.classList.remove('popup_opened');
    document.removeEventListener('click', (evt) => {
      this._closeOverlayClick(evt)
    })
    document.removeEventListener('keyup', (evt) => {
      this._closeEscapeKeydown(evt);
    })
  }

  _closeOverlayClick(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this._handleCloseCard();
    }
  }

  _closeEscapeKeydown(evt) {
    if(evt.key === 'Escape') {
      const activePopup = document.querySelector('.popup_opened');
      this._handleCloseCard();
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.place__image').src = this._link;
    this._element.querySelector('.place__image').alt = `На фотографии ${this._name}`;
    this._element.querySelector('.place__title').textContent = this._name;
    return this._element;
  }
}