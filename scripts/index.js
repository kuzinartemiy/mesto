const content = document.querySelector('.content');
const placeTemplate = document.querySelector('#place').content;
let places = content.querySelector('.places__list');
const editButton = content.querySelector('.profile__edit-button');
const popup = content.querySelector('.popup');
const editPopup = content.querySelector('#edit-popup');
const addPopup = content.querySelector('#add-popup');
const photoPopup = content.querySelector('#photo-popup');
const nameProfile = content.querySelector('.profile__name');
const jobProfile = content.querySelector('.profile__job');
const nameInput = content.querySelector('.popup__input_field_name');
const jobInput = content.querySelector('.popup__input_field_job');
const cardNameInput = content.querySelector('.popup__input_field_card-name');
const cardLinkInput = content.querySelector('.popup__input_field_card-link');
const editFormElement = content.querySelector('#edit-form');
const addCardFormElement = content.querySelector('#add-card-form');
const addButton = content.querySelector('.profile__add-button');
const editCloseButton = content.querySelector('#edit-close-button');
const addCardCloseButton = content.querySelector('#add-card-close-button');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderCards () {
  places.textContent = '';
  for (let i = 0; i < initialCards.length; i++) {
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    placeElement.querySelector('.place__image').src = initialCards[i].link;
    placeElement.querySelector('.place__title').textContent = initialCards[i].name;
    places.append(placeElement);
  }
  addLikes();
  deleteCard();
  openCardPhoto();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;

  nameProfile.textContent = nameInputValue;
  jobProfile.textContent = jobInputValue;

  closePopup(editPopup);
}

function addLikes() {
  const likeButtons = document.querySelectorAll('.place__like');
  for (let i = 0; i < likeButtons.length; i++) {
    const likeButton = likeButtons[i];
    likeButton.addEventListener('click', function () {
      likeButton.classList.toggle('place__like_active');
    });
  }
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {};

  newCard.name = cardNameInput.value;
  newCard.link = cardLinkInput.value;

  initialCards.unshift(newCard);
  console.log(initialCards);
  renderCards();
  closePopup(addPopup);
}

function deleteCard () {
  const deleteButtons = document.querySelectorAll('.place__delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', function () {
      initialCards.splice(i, 1);
      renderCards();
    });
  }
}

function openCardPhoto () {
  const photoCardCloseButton = document.querySelector('#photo-card-close-button');
  const cardImages = document.querySelectorAll('.place__image');
  for (let i = 0; i < cardImages.length; i++) {
    const cardImage = cardImages[i];
    cardImage.addEventListener('click', function () {
      document.querySelector('.popup__big-image').src = initialCards[i].link;
      document.querySelector('.popup__caption').textContent = initialCards[i].name;
      openPopup(photoPopup);
    })
  }
  photoCardCloseButton.addEventListener('click', function () {
    closePopup(photoPopup);
  })
}

renderCards();

editButton.addEventListener('click', function () {
  openPopup(editPopup);
});
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});
editCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
});
addCardCloseButton.addEventListener('click',function () {
  closePopup(addPopup);
});

editFormElement.addEventListener('submit', editFormSubmitHandler);
addCardFormElement.addEventListener('submit', addCardFormSubmitHandler);
