import './index.css';

import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import {initialCards} from '../scripts/initialCards.js';

import {
  config,
  places,
  placesSelector,
  userNameSelector,
  userJobSelector,
  editButton,
  addButton,
  addCardSaveButton,
  nameInput,
  jobInput,
  cardNameInput,
  cardLinkInput,
  editFormElement,
  addCardFormElement
} from '../scripts/constants.js';

const userInfo = new UserInfo({userNameSelector, userJobSelector});

const editProfilePopup = new PopupWithForm('#edit-popup', editFormSubmitHandler);
editProfilePopup.setEventListeners();

function editFormSubmitHandler(inputsData) {
  const newProfileValues = {
    userName: inputsData.inputName,
    userJob: inputsData.inputJob
  }

  userInfo.setUserInfo(newProfileValues);
  editProfilePopup.close();
}

const addCardPopup = new PopupWithForm('#add-popup', addCardFormSubmitHandler);
addCardPopup.setEventListeners();

function addCardFormSubmitHandler(inputsData) {
  const newInitialCard = {
    name: inputsData.newCardName,
    link: inputsData.newCardLink
  };

  section.addCard(newInitialCard);
  
  addCardPopup.close();
}

const popupWithImage = new PopupWithImage('#photo-popup');
popupWithImage.setEventListeners();

const section = new Section({initialCards, renderer}, placesSelector);
section.renderCards();

// validate addCard-form
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();

// validate edit-form
const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();

//render function
function renderer (card, container) {
  const newCard = createCard(card, config, popupWithImage.open.bind(popupWithImage));
  const cardToPrepend = newCard.generateCard();
  container.prepend(cardToPrepend);
}

function createCard(initialCards, config, photoPopup) {
  const card = new Card(initialCards, config.templateClass, photoPopup);
  return card;
}

//open popups events
editButton.addEventListener('click', function () {
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.userName;
  jobInput.value = profileInfo.userJob;
  
  //validation methods
  editFormValidator.disableButton();
  editFormValidator.clearInputErrors();
  
  editProfilePopup.open();
});

addButton.addEventListener('click', function () {
  //validation methods
  addFormValidator.clearInputErrors();
  addFormValidator.disableButton();
  addFormValidator.clearInputErrors();

  addCardPopup.open();
});