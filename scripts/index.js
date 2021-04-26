import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//classes for validation
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  templateClass: '.place__template',
  editPopupId: '#edit-popup'
}

const content = document.querySelector('.content');
const places = content.querySelector('.places__list');

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
const formList = Array.from(document.querySelectorAll(config.formSelector));
const editFormElement = content.querySelector('#edit-form');
const addCardFormElement = content.querySelector('#add-card-form');

//render function
function renderCard (initialCard) {
  const newCard = createCard(initialCard);
  places.prepend(newCard);
}

function createCard(initialCard) {
  const card = new Card(initialCard, config.templateClass);
  const initialCardElement = card.generateCard();
  return initialCardElement;
}

//cards render
initialCards.forEach(initialCard => renderCard(initialCard));

//popup functions
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

//close popups events
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

const clearInputs = (popup) => {
  const popupInputs = Array.from(popup.querySelectorAll('.popup__input'));
  popupInputs.forEach(popupInput => popupInput.value = '');
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
  const newInitialCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };
  renderCard(newInitialCard);
  closePopup(addPopup);
  
  addCardSaveButton.setAttribute('disabled', true);
  addCardSaveButton.classList.add('popup__save-button_disabled');
}

//open popups events
editButton.addEventListener('click', function () {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  // validate edit-form
  const editFormValidator = new FormValidator(config, editFormElement);
  editFormValidator.toggleButton(editPopup);
  editFormValidator.clearInputErrors(editPopup);
  editFormValidator.enableValidation();

  openPopup(editPopup);
});

addButton.addEventListener('click', function () {
  const button = addPopup.querySelector('.popup__save-button');
  // validate addCard-form
  const addFormValidator = new FormValidator(config, addCardFormElement);
  addFormValidator.clearInputErrors(addPopup);
  addFormValidator.toggleButton(addPopup);
  addFormValidator.clearInputs(addPopup);
  addFormValidator.enableValidation();

  openPopup(addPopup);
});

//close buttons events
editCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});

addCardCloseButton.addEventListener('click',function () {
  closePopup(addPopup);
});

photoCardCloseButton.addEventListener('click', () => {
  closePopup(photoPopup);
});

//forms events
editFormElement.addEventListener('submit', editFormSubmitHandler);
addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);