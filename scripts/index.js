import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

//classes for validation
const validationData = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
}

//cards
const initialCards = [
  {
    name: 'Париж',
    link: 'https://images.unsplash.com/photo-1596889591149-1646a4321476?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1924&q=80'
  },
  {
    name: 'Танзания',
    link: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1266&q=80'
  },
  {
    name: 'Венеция',
    link: 'https://images.unsplash.com/photo-1616246686486-a4a886f23ac6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=629&q=80'
  },
  {
    name: 'Китай',
    link: 'https://images.unsplash.com/photo-1598249645083-5cbc4351b263?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Косой переулок',
    link: 'https://images.unsplash.com/photo-1616262373426-18bfa28bafab?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Индонезия',
    link: 'https://images.unsplash.com/photo-1612995972660-c95bcbe960e0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80'
  }
];

const content = document.querySelector('.content');
const places = content.querySelector('.places__list');

// //buttons
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const editCloseButton = content.querySelector('#edit-close-button');
const addCardCloseButton = content.querySelector('#add-card-close-button');
const addCardSaveButton = content.querySelector('#add-card-save-button');

// //popups
const editPopup = content.querySelector('#edit-popup');
const addPopup = content.querySelector('#add-popup');

// //profileElements
const nameProfile = content.querySelector('.profile__name');
const jobProfile = content.querySelector('.profile__job');

// //inputs
const nameInput = content.querySelector('.popup__input_field_name');
const jobInput = content.querySelector('.popup__input_field_job');
const cardNameInput = content.querySelector('.popup__input_field_card-name');
const cardLinkInput = content.querySelector('.popup__input_field_card-link');

// //forms
const formList = Array.from(document.querySelectorAll(validationData.formSelector));
const editFormElement = content.querySelector('#edit-form');
const addCardFormElement = content.querySelector('#add-card-form');

//render functions
function renderCard (initialCard) {
  const card = new Card(initialCard, '.place__template');
  const initialCardElement = card.generateCard();
  places.prepend(initialCardElement);
}

//cards render
initialCards.forEach(initialCard => renderCard(initialCard));

//form validate
const validateForm = (formElement) => {
  const formForValidate = new FormValidator(validationData, formElement);
  formForValidate.enableValidation();
}

formList.forEach(formElement => validateForm(formElement));

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
//button toggle
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


const clearInputErrors = (popup) => {
  const inputList = Array.from(popup.querySelectorAll('.popup__input'));
  inputList.forEach(inputElement => {
    const errorElement = inputElement.nextElementSibling;
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_visible');
    inputElement.classList.remove('popup__input_type_error');
  })
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
  const newCard = new Card(newInitialCard, '.place__template');

  places.prepend(newCard.generateCard());
  closePopup(addPopup);

  cardNameInput.value = '';
  cardLinkInput.value = '';
  
  addCardSaveButton.setAttribute('disabled', true);
  addCardSaveButton.classList.add('popup__save-button_disabled');
}

//open popups events
editButton.addEventListener('click', function () {
  clearInputErrors(editPopup);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  
  toggleButton(editPopup);
  openPopup(editPopup);
});

addButton.addEventListener('click', function () {
  const button = addPopup.querySelector('.popup__save-button');
  //disable save-button before validation
  toggleButton(addPopup);

  openPopup(addPopup);
});

// //close buttons events
editCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});

addCardCloseButton.addEventListener('click',function () {
  closePopup(addPopup);
});

// //forms events
editFormElement.addEventListener('submit', editFormSubmitHandler);
addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);