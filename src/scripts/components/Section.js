export class Section {
  constructor({initialCards, renderer} , containerSelector) {
    this._initialCards = initialCards;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  renderCards() {
    this._initialCards.forEach(card => {
      this._renderer(card, this._container);
    });
  }

  addCard(card) {
    this._container.prepend(card);
  }
}