import icons from 'url:../../img/icons.svg'; // using parcel 2 and if is video
import View from './view.js';

class addRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _message = 'Recipe was  successfully uploaded';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  //adding cnstructor method..
  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  //listen for the clicking event for opening and close btn..
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  //hiding our form
  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  //method handling form submission..
  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      //converting entries into object..
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {}
}

export default new addRecipeView();
