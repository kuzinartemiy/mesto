const content = document.querySelector('.content');
const places = content.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;

//кнопки
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const editCloseButton = content.querySelector('#edit-close-button');
const addCardCloseButton = content.querySelector('#add-card-close-button');
const addCardSaveButton = content.querySelector('#add-card-save-button');
const photoCardCloseButton = content.querySelector('#photo-card-close-button');

//попапы
const editPopup = content.querySelector('#edit-popup');
const addPopup = content.querySelector('#add-popup');
const photoPopup = content.querySelector('#photo-popup');

//текстовые элементы профиля
const nameProfile = content.querySelector('.profile__name');
const jobProfile = content.querySelector('.profile__job');

//поля ввода
const nameInput = content.querySelector('.popup__input_field_name');
const jobInput = content.querySelector('.popup__input_field_job');
const cardNameInput = content.querySelector('.popup__input_field_card-name');
const cardLinkInput = content.querySelector('.popup__input_field_card-link');

//формы
const editFormElement = content.querySelector('#edit-form');
const addCardFormElement = content.querySelector('#add-card-form');

//элементы фото-попапа
const cardBigImage = content.querySelector('.popup__big-image'); 
const cardCaption = content.querySelector('.popup__caption');

// initialCards in initialCards.js

//функции отрисовки
function renderCard (card) {
  places.prepend(createCard(card.name, card.link));
}

function createCard (name, link) {
  const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
  const placeImage = placeElement.querySelector('.place__image');
  const placeTitle = placeElement.querySelector('.place__title');

  placeImage.src = link;
  placeImage.alt = 'На фотографии ' + name;
  placeTitle.textContent = name;

  //функция лайка
  const likeButton = placeElement.querySelector('.place__like');
  likeButton.addEventListener('click', function () {
    addLike(likeButton);
  });

  //удаление карточки
  const deleteButton = placeElement.querySelector('.place__delete');
  deleteButton.addEventListener('click', function () {
    deleteCard(placeElement);
  });

  //открытие фото-попапа
  placeImage.addEventListener('click', function () {
    openCardPhoto(name, link);
  });

  return placeElement;
}

//отрисовка карточек
initialCards.forEach(card => renderCard(card));

//функции действий внутри карточек
function addLike (button) {
  button.classList.toggle('place__like_active');
}

function deleteCard (card) {
  card.remove();
}

function openCardPhoto (name, link) {
  cardCaption.textContent = name;
  cardBigImage.src = link;
  openPopup(photoPopup);
}

//функции попапов
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('click', closeOverlayClick);
  document.addEventListener('keyup', closeEscapeKeydown);
}

function closePopup(popup) {

  popup.classList.remove('popup_opened');

  document.removeEventListener('click', closeOverlayClick);
  document.removeEventListener('keyup', closeEscapeKeydown);
}

//сброс кнопки сохранить в зависимости от открываемого попапа
const toggleButton = (popup) => {
  const buttonElement = popup.querySelector('.popup__save-button');
  if (popup === editPopup) {
    buttonElement.removeAttribute('disabled', true);
    buttonElement.classList.remove('popup__save-button_disabled');
  } else {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__save-button_disabled');
  }
}

//функции событий закрытия попапов
const closeOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  }
}

const closeEscapeKeydown = (evt) => {
  if(evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

//очистка ошибок в инпутах
const clearInputErrors = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_visible');
    inputElement.classList.remove('popup__input_type_error');
  })
}

//submit функции
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(editPopup);
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  renderCard(newCard);
  closePopup(addPopup);

  cardNameInput.value = '';
  cardLinkInput.value = '';
  
  addCardSaveButton.setAttribute('disabled', true);
  addCardSaveButton.classList.add('popup__save-button_disabled');
}

//функции событий открытия попапов
editButton.addEventListener('click', function () {
  clearInputErrors(editPopup);

  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  toggleButton(editPopup);
  openPopup(editPopup);
});

addButton.addEventListener('click', function () {
  //сброс кнопки сохранить перед валидацией
  toggleButton(addPopup);

  openPopup(addPopup);
});

//события кнопки "закрыть"
editCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});

addCardCloseButton.addEventListener('click',function () {
  closePopup(addPopup);
});

photoCardCloseButton.addEventListener('click', function () {
  closePopup(photoPopup);
});

//события форм(submits)
editFormElement.addEventListener('submit', editFormSubmitHandler);
addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);