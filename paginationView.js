import icons from 'url:../../img/icons.svg'; // using parcel 2 and if is video
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  //
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      console.log(btn);

      if (!btn) return;
      const goTopage = +btn.dataset.goto;
      // console.log(goTopage);
      handler(goTopage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    //Knowing the number of pages
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultPerpage
    );
    //console.log(numPages);
    //Page 1, and there are other pages..
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }"class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
    }

    //Last Page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button> `;
    }
    //other page..

    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>
    <button data-goto="${
      curPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
  `;
    }

    //Page 1, and there are No other Pages
    return '';
  }
}

export default new PaginationView();
