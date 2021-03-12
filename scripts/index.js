let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let closeButton = content.querySelector('.popup__close-button');
let nameProfile = content.querySelector('.profile__name');
let jobProfile = content.querySelector('.profile__job');
let nameInput = content.querySelector('.popup__input-name');
let jobInput = content.querySelector('.popup__input-job');
let formElement = content.querySelector('.popup__form');
let likeElements = content.querySelectorAll('.places__like');

for (let i = 0; i < likeElements.length; i += 1) {
  let likeElement = likeElements[i];
  likeElement.addEventListener('click', function() {
    likeElement.classList.toggle('places__like_active');
  });
}

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}


function formSubmitHandler (evt) {
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

nameInput.setAttribute('value', nameProfile.textContent);
jobInput.setAttribute('value', jobProfile.textContent);