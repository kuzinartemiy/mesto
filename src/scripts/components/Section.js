export class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  
  renderCards(res) {
    res.reverse().forEach(card => {
      this._renderer(card, this._container);
    });
  }

  addCard(card) {
    this._renderer(card, this._container);
  }
}