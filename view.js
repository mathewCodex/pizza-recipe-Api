import icons from 'url:../../img/icons.svg';

export default class view {
  _data;
  /**
   * Render the recieved object to the DOM
   * @param {Object | Object[]} data the data to be rendered(e.g, recipe)
   * @param {boolean} [ render = true] If false, create markup string instead of rendering to the DOM
   * @returns { undefined | string } A markup string is return if render=false
   * @this { Object } view instance
   * @author Mathew Emmanuel(mathewCodex)
   * @todo Finish implementation
   */
  render(data, render = true) {
    //rendering error..
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    // recipeContainer.innerHTML = '';
    // recipeContainer.insertAdjacentHTML('afterbegin', markup);
  }

  //updating DOM Element..creating an algorithm
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //converting Markup string to a DOM 0bject..
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    //using array.from to convert the node list element to real element
    //looping over the new element array..
    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      //update change Text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      //update change attribute

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  //rendering spinner..
  renderSpinner() {
    const markup = ` <div class="spinner"> 
    <svg>
    <use href="${icons}.svg#icon-loader"></use>
  </svg>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //Error Handler implementation..

  renderError(message = this._errorMessage) {
    const markup = `
    
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> 
   `;
    this._clear();

    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  ///  //success Handler implementation..

  renderMessage(message = this._message) {
    const markup = `
   <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>
   `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
