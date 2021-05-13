import {Card} from './components/Card.js';
import {FormValidator} from './components/FormValidator.js';
import {Section} from './components/Section.js';
import {PopupWithImage} from './components/PopupWithImage.js';
import {PopupWithForm} from './components/PopupWithForm.js';
import {UserInfo} from './components/UserInfo.js';
import {initialCards} from './initialCards.js';

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
const placesSelector = '.places__list';
const userNameSelector = '.profile__name';
const userJobSelector = '.profile__job';

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

const popupWithImage = new PopupWithImage('#photo-popup');

//render function
function renderer (card, container) {
  const newCard = createCard(card, config, popupWithImage);
  const cardToPrepend = newCard.generateCard();
  container.prepend(cardToPrepend);
}

function createCard(initialCards, config, photoPopup) {
  const card = new Card(initialCards, config.templateClass, photoPopup);
  return card;
}

const section = new Section({initialCards, renderer}, placesSelector);
section.renderCards();

const userInfo = new UserInfo({userNameSelector, userJobSelector});

//submit functions
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const newProfileValues = {
    userName: nameInput.value,
    userJob: jobInput.value
  }

  userInfo.setUserInfo(newProfileValues);
  editProfilePopup.close();
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();

  const newInitialCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  renderer(newInitialCard, places);
  
  addCardPopup.close();
  addCardSaveButton.setAttribute('disabled', true);
  addCardSaveButton.classList.add('popup__save-button_disabled');
}

// validate addCard-form
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();

// validate edit-form
const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();


const editProfilePopup = new PopupWithForm('#edit-popup', editFormSubmitHandler);
const addCardPopup = new PopupWithForm('#add-popup', addCardFormSubmitHandler);

//open popups events
editButton.addEventListener('click', function () {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.userName;
  jobInput.value = profileInfo.userJob;
  
  //validation methods
  editFormValidator.toggleButton(editPopup);
  editFormValidator.clearInputErrors(editPopup);

  editProfilePopup.setEventListeners();
  editProfilePopup.open();
});

addButton.addEventListener('click', function () {
  //validation methods
  addFormValidator.clearInputErrors(addPopup);
  addFormValidator.toggleButton(addPopup);

  addFormValidator.clearInputs(addPopup);
  addCardPopup.setEventListeners();
  addCardPopup.open();
});