const content = document.querySelector('.content');
const placeTemplate = document.querySelector('#place').content;

//buttons
const editButton = content.querySelector('.profile__edit-button');
const addButton = content.querySelector('.profile__add-button');
const editCloseButton = content.querySelector('#edit-close-button');
const addCardCloseButton = content.querySelector('#add-card-close-button');
//popups
const popup = content.querySelector('.popup');
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

function renderCards () {
  const places = content.querySelector('.places__list');
  places.textContent = '';
  for (let i = 0; i < initialCards.length; i++) {
    const placeElement = placeTemplate.querySelector('.place').cloneNode(true);
    placeElement.querySelector('.place__image').src = initialCards[i].link;
    placeElement.querySelector('.place__image').alt = 'На фотографии ' +initialCards[i].name;
    placeElement.querySelector('.place__title').textContent = initialCards[i].name;
    places.append(placeElement);
  }
  addLikes();
  deleteCard();
  openCardPhoto();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  if (popup === editPopup) {
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
  }
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

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {};

  newCard.name = cardNameInput.value;
  newCard.link = cardLinkInput.value;

  initialCards.unshift(newCard);
  renderCards();
  closePopup(addPopup);
}

function openCardPhoto () {
  const photoCardCloseButton = content.querySelector('#photo-card-close-button');
  const cardImages = content.querySelectorAll('.place__image');
  const cardBigImage = content.querySelector('.popup__big-image');
  const cardCaption = content.querySelector('.popup__caption');
  for (let i = 0; i < cardImages.length; i++) {
    const cardImage = cardImages[i];
    cardImage.addEventListener('click', function () {
      cardBigImage.src = initialCards[i].link;
      cardBigImage.alt = initialCards[i].name + ' крупным планом';
      cardCaption.textContent = initialCards[i].name;
      openPopup(photoPopup);
    })
  }
  photoCardCloseButton.addEventListener('click', function () {
    closePopup(photoPopup);
  })
}

function deleteCard () {
  const deleteButtons = content.querySelectorAll('.place__delete');
  for (let i = 0; i < deleteButtons.length; i++) {
    const deleteButton = deleteButtons[i];
    deleteButton.addEventListener('click', function () {
      initialCards.splice(i, 1);
      renderCards();
    });
  }
}

function addLikes() {
  const likeButtons = content.querySelectorAll('.place__like');
  for (let i = 0; i < likeButtons.length; i++) {
    const likeButton = likeButtons[i];
    likeButton.addEventListener('click', function () {
      likeButton.classList.toggle('place__like_active');
    });
  }
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