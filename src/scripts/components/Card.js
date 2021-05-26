export class Card {
  constructor(data, placeTemplate, openPopupWithImage, deleteCardHandle, userId, addLikeHandle) {
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = placeTemplate;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.place__like');
    this._deleteButton = this._element.querySelector('.place__delete');
    this._placeImage = this._element.querySelector('.place__image');
    this._openPopupWithImage = openPopupWithImage;
    this._likes = data.likes;
    this._likesCount = this._element.querySelector('.place__like-count');
    this._deleteCardHandle = deleteCardHandle;
    this._confirmDeleteButton = document.querySelector('#card-delete-button');
    this._isLiked = false;
    this._addLikeHandle = addLikeHandle;
  }

  _getTemplate() {
    const placeElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);

    return placeElement;
  }

  updateLikesCount(count) {
    this._likesCount.textContent = count;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._isLiked = !this._isLiked;
      this._addLikeHandle(this._id, this._isLiked, this);
      this._toggleLike();
    })

    this._deleteButton.addEventListener('click', () => {
      this._deleteCardHandle(this._id, this);
    })

    this._placeImage.addEventListener('click', () => {
      this._openPopupWithImage(this._name, this._link);
    })
  }

  _toggleLike() {
    this._likeButton.classList.toggle('place__like_active');
  }

  deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._setEventListeners();
    this._placeImage.src = this._link;
    this._placeImage.alt = `На фотографии ${this._name}`;
    this._element.querySelector('.place__title').textContent = this._name;
    if (this._ownerId === this._userId) {
      this._deleteButton.style.display = "block";
    }
    this._likes.forEach(likeObject => {
      if (likeObject._id === this._userId) {
        this._isLiked = true;
        this._toggleLike();
      }
    })
    this._likesCount.textContent = this._likes.length;
    return this._element;
  }
}