let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let closeButton = content.querySelector('.popup__close-button');
let nameProfile = content.querySelector('.profile__name');
let jobProfile = content.querySelector('.profile__job');
let nameInput = content.querySelector('.popup__input_field_name');
let jobInput = content.querySelector('.popup__input_field_job');
let formElement = content.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInputValue = nameInput.value;
  let jobInputValue = jobInput.value;

  nameProfile.textContent = nameInputValue;
  jobProfile.textContent = jobInputValue;

  closePopup();
}

editButton.addEventListener('click',openPopup);
closeButton.addEventListener('click',closePopup);
formElement.addEventListener('submit', formSubmitHandler);