const content = document.querySelector('.content');
const places = content.querySelector('.places__list');
const placeTemplate = document.querySelector('#place').content;

//buttons
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const editCloseButton = content.querySelector('#edit-close-button');
const addCardCloseButton = content.querySelector('#add-card-close-button');
const addCardSaveButton = content.querySelector('#add-card-save-button');
const photoCardCloseButton = content.querySelector('#photo-card-close-button');

//popups
const editPopup = content.querySelector('#edit-popup');
const addPopup = content.querySelector('#add-popup');
const photoPopup = content.querySelector('#photo-popup');

//profileElements
const nameProfile = content.querySelector('.profile__name');
const jobProfile = content.querySelector('.profile__job');

//inputs
const nameInput = content.querySelector('.popup__input_field_name');
const jobInput = content.querySelector('.popup__input_field_job');
const cardNameInput = content.querySelector('.popup__input_field_card-name');
const cardLinkInput = content.querySelector('.popup__input_field_card-link');

//forms
const editFormElement = content.querySelector('#edit-form');
const addCardFormElement = content.querySelector('#add-card-form');

//photo-popup elements
const cardBigImage = content.querySelector('.popup__big-image'); 
const cardCaption = content.querySelector('.popup__caption');

// initialCards in initialCards.js

//render functions
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

  //like
  const likeButton = placeElement.querySelector('.place__like');
  likeButton.addEventListener('click', function () {
    addLike(likeButton);
  });

  //delete
  const deleteButton = placeElement.querySelector('.place__delete');
  deleteButton.addEventListener('click', function () {
    deleteCard(placeElement);
  });

  //open-card-image
  placeImage.addEventListener('click', function () {
    openCardPhoto(name, link);
  });

  return placeElement;
}

//cards render
initialCards.forEach(card => renderCard(card));

//card actions
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

//popups functions
function openPopup(popup) {
  popup.classList.add('popup_opened');

  document.addEventListener('click', closeOverlayClick);
  document.addEventListener('keyup', closeEscapeKeydown);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//close by events functions

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

//submit functions
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

//open buttons events
editButton.addEventListener('click', function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  
  openPopup(editPopup);
});
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

//close buttons events
editCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});

addCardCloseButton.addEventListener('click',function () {
  closePopup(addPopup);
});

photoCardCloseButton.addEventListener('click', function () {
  closePopup(photoPopup);
});

//forms events
editFormElement.addEventListener('submit', editFormSubmitHandler);
addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);