import View from './view.js'; //
//
import icons from 'url:../../img/icons.svg'; // using parcel 2 and if is video
import previewView from './previewView.js';
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. find a nice recipe to bookmarked!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    //looping thru the array
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
