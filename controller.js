import * as model from './model.js';
import recipeView from './views/recipeView.js';
//importing our icons files..
// import icons from '../img/icons.svg';// using parcel 1
//
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
//import core-js for compatibility..
//the core-js if for polifyling everything else...
import bookMarksView from './views/bookMarksView.js';
//
import addRecipeView from './views/addRecipeView.js';
//
import { MODAL_CLOSE_SEC } from './config.js';
import 'core-js/stable';
//this one is for polifyling async await
import 'regenerator-runtime/runtime';
import { isInteger } from 'core-js';
import searchView from './views/searchView.js';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }
const controlRecipes = async function () {
  // 1, Loading recipe.....
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;
    //rendering spinner..
    recipeView.renderSpinner();
    //0, result view to mark selected seacrh reslt..
    resultView.update(model.getSearchResultsPage());
    //updating bookmarks view

    bookMarksView.update(model.state.bookmarks);
    //caling the function from model..
    await model.loadRecipe(id);

    //2,rendering recipe...
    recipeView.render(model.state.recipe);
    // const recipeView = new recipeView(model.state.recipe);
  } catch (err) {
    //alert(err);
    // console.log(err);
    recipeView.renderError();

    // console.log('what');
  }
};
//controlRecipes();
////Fecthing from api..using ajax

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    //1, getting search query..

    const query = searchView.getQuery();
    if (!query) return;
    //2, Load search results..

    await model.loadSearchresults(query);
    //3, render result
    // console.log(model.state.search.results);
    resultView.render(model.getSearchResultsPage());

    //4, Render initaial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goTopage) {
  // console.log('Page controler');
  //1, render New rsults..
  resultView.render(model.getSearchResultsPage(goTopage));

  //2, render New Pagination buttons..
  paginationView.render(model.state.search);
};

//controlling the servings ..
const controlServings = function (newServings) {
  //1,update the recipe servings(in the state)
  model.updateServings(newServings);
  //update the recipe view
  recipeView.render(model.state.recipe);
};

//controller fr adding new bookmark..
const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // model.deleteBookmark(model.state.recipe.id);
  // model.addBookmark(model.state.recipe);
  //update recipe view..
  recipeView.update(model.state.recipe);

  //3, bookmark view render
  bookMarksView.render(model.state.bookmarks);
};
///creating bookmarks function..
const controlBookmarks = function () {
  bookMarksView.render(model.state.bookmarks);
};
//controller to receive the new recipe data..
const controlAddRecipe = async function (newrecipe) {
  try {
    //show loading spinner
    addRecipeView.renderSpinner();
    //upload the new recipe data
    await model.uploadRecipe(newrecipe);
    console.log(model.state.recipe);

    //render recipe
    recipeView.render(model.state.recipe);
    //display a succes message..
    addRecipeView.renderMessage();
    //render the bookmark vie..
    bookMarksView.render(model.state.bookmarks);
    //changing th id in the url using the history api.
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //close  window form to see rendered recipe
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.log('🥱', err);
    addRecipeView.renderError(err.message);
  }
};

const newFeature = function () {
  console.log('Welcome git');
};
const init = function () {
  bookMarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Welcome');
  newFeature();
};
init();
// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
// controlSearchResults();
//
