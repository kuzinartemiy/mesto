import './index.css';

import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import {Section} from '../scripts/components/Section.js';
import {PopupWithImage} from '../scripts/components/PopupWithImage.js';
import {PopupWithForm} from '../scripts/components/PopupWithForm.js';
import {UserInfo} from '../scripts/components/UserInfo.js';
import {Api} from '../scripts/components/Api.js';

import {
  config,
  placesSelector,
  userNameSelector,
  userJobSelector,
  editButton,
  addButton,
  nameInput,
  jobInput,
  editFormElement,
  addCardFormElement,
  avatarSelector,
  editAvatarFormElement,
  editAvatar
} from '../scripts/constants.js';

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-24','dff2004b-ae2b-4b49-ae11-6674a4b5c7dc');

const userInfo = new UserInfo({userNameSelector, userJobSelector, avatarSelector});

//отображение загрузки
const renderLoading = (isLoading, popup) => {
  if(isLoading) {
    popup.changeSubmitText('Сохранение...');
  } else {
    popup.changeSubmitText(popup.resetSubmitText());
  }
}

const editAvatarPopup = new PopupWithForm('#edit-avatar-popup', editAvatarSubmitHandler);
editAvatarPopup.setEventListeners();

// обработчик редактирования аватара
function editAvatarSubmitHandler(inputsData) {
  renderLoading(true, editAvatarPopup);
  api.editAvatar(inputsData.newCardLink)
    .then(res => {
      userInfo.setUserAvatar(res.avatar);
      editAvatarPopup.close();
    })
    .catch(error => {
      console.log(`Ошибка при редактировании аватара: ${error}`);
    })
    .finally(res => {
      renderLoading(false, editAvatarPopup);
    })
}

const editProfilePopup = new PopupWithForm('#edit-popup', editFormSubmitHandler);
editProfilePopup.setEventListeners();

//обработчик события редактирования профиля
function editFormSubmitHandler(inputsData) {
  renderLoading(true, editProfilePopup);
  api.editProfile({newName: inputsData.inputName, newAbout: inputsData.inputJob})
    .then(res => {
      userInfo.setUserInfo(res);
      editProfilePopup.close();
    })
    .catch(error => {
      console.log(`Ошибка при редактировании профиля: ${error}`);
    })
    .finally(res => {
      renderLoading(false, editProfilePopup);
    })
}

const deleteCardPopup = new PopupWithForm('#delete-popup', deleteCardSubmitHandler);
deleteCardPopup.setEventListeners();

// обработчик события удаления карточки
function deleteCardSubmitHandler(cardId,thisCard) {
  deleteCardPopup.open();
  deleteCardPopup.setSubmitHandle(() => {
    api.deleteCard(cardId)
      .then(res => {
        thisCard.deleteCard();
        deleteCardPopup.close();
      })
      .catch(error => {
        console.log(`Ошибка при удалении карточки: ${error}`);
      })
  })
}

const addCardPopup = new PopupWithForm('#add-popup', addCardFormSubmitHandler);
addCardPopup.setEventListeners();

// обработчик события добавления карточки
function addCardFormSubmitHandler(inputsData) {
  renderLoading(true, addCardPopup);
  const newInitialCard = {
    newCardName: inputsData.newCardName,
    newCardLink: inputsData.newCardLink
  };
  api.addCard(newInitialCard)
    .then(res => {
      section.addCard(res);
      addCardPopup.close();
    })
    .catch(error => {
      console.log(`Ошибка при добавлении карточки: ${error}`);
    })
    .finally(res => {
      renderLoading(false, addCardPopup);
    })
}
//обработчик лайка
const toggleLike = (cardId, isLiked, card) => {
  if(isLiked) {
    api.addLike(cardId)
      .then(res => {
        card.updateLikesCount(res.likes.length);
      })
      .catch(error => {
        console.log(`Ошибка при добавлении лайка: ${error}`);
      })
  } else {
    api.deleteLike(cardId)
      .then(res => {
        card.updateLikesCount(res.likes.length);
      })
      .catch(error => {
        console.log(`Ошибка при удалении лайка: ${error}`);
      })
  }
}

const popupWithImage = new PopupWithImage('#photo-popup');
popupWithImage.setEventListeners();

const section = new Section(renderer, placesSelector);

// validate addCard-form
const addFormValidator = new FormValidator(config, addCardFormElement);
addFormValidator.enableValidation();

// validate edit-form
const editFormValidator = new FormValidator(config, editFormElement);
editFormValidator.enableValidation();

// validate edit-avatar-form
const editAvatarValidator = new FormValidator(config, editAvatarFormElement);
editAvatarValidator.enableValidation();

//render function
function renderer (card, container) {
  const newCard = createCard(card, config, popupWithImage.open.bind(popupWithImage), deleteCardSubmitHandler, userInfo.getUserId(), toggleLike);
  // const cardToPrepend = newCard.generateCard();
  // container.prepend(newCard);
  section.prependCard(newCard, container);
}

function createCard(initialCards, config, photoPopup, deletePopup, deleteCardHandle, id, addLikeHandle) {
  const card = new Card(initialCards, config.templateClass, photoPopup, deletePopup, deleteCardHandle, id, addLikeHandle);
  return card.generateCard();
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
  addFormValidator.disableButton();
  addFormValidator.clearInputErrors();

  addCardPopup.open();
});

editAvatar.addEventListener('click', function () {
  //validation methods
  editAvatarValidator.disableButton();
  editAvatarValidator.clearInputErrors();

  editAvatarPopup.open();
})

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    section.renderCards(cards);
  })
  .catch(error => {
    console.log(`Ошибка при получении данных: ${error}`);
  })