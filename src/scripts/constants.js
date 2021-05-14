//classes for validation
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible',
  templateClass: '.place__template',
  editPopupId: '#edit-popup'
}

export const content = document.querySelector('.content');
export const places = content.querySelector('.places__list');
export const placesSelector = '.places__list';
export const userNameSelector = '.profile__name';
export const userJobSelector = '.profile__job';

//buttons
export const editButton = content.querySelector('.profile__edit-button');
export const addButton = content.querySelector('.profile__add-button');
export const addCardSaveButton = content.querySelector('#add-card-save-button');

//inputs
export const nameInput = content.querySelector('.popup__input_field_name');
export const jobInput = content.querySelector('.popup__input_field_job');
export const cardNameInput = content.querySelector('.popup__input_field_card-name');
export const cardLinkInput = content.querySelector('.popup__input_field_card-link');

//forms
export const editFormElement = content.querySelector('#edit-form');
export const addCardFormElement = content.querySelector('#add-card-form');