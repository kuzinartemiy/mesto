let content = document.querySelector('.content');
let editButton = content.querySelector('.profile__edit-button');
let popup = content.querySelector('.popup');
let closeButton = content.querySelector('.popup__close-button');
let name = content.querySelector('.profile__name');
let job = content.querySelector('.profile__job');
let inputName = content.querySelector('.popup__input-name');
let inputJob = content.querySelector('.popup__input-job');

inputName.setAttribute('placeholder', name.textContent);
inputJob.setAttribute('placeholder', job.textContent);

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click',openPopup);
closeButton.addEventListener('click',closePopup);