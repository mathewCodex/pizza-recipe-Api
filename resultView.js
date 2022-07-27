import View from './view.js'; //
//
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg'; // using parcel 2 and if is video
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try anotherone!';
  _message = '';

  _generateMarkup() {
    //looping thru the array
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
