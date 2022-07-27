import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { AJAX, AJAX } from './helper.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
//
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);
    // const res = await fetch(`${API_URL}/${id}`);
    // const data = await res.json();
    state.recipe = createRecipeObject(data);
    //using the some method for the bookmarked array..
    if (state.bookmarks.some(boomark => boomark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    //temp error handling
    console.error(`${err}😪😪😪`);
    throw err;
  }
};

//implementing search functionality..
export const loadSearchresults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);
    console.log(data);
    //storing data..

    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
    //console.log(state.search.results);
  } catch (err) {
    console.error(`${err}😪😪😪`);
    throw err;
  }
};

//creating  function for getting data for  requested page..
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0

  const end = page * state.search.resultsPerPage; // 9

  return state.search.results.slice(start, end);
};

///
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
    //formula to count quantity newQt = oldQt * newServings / oldServings // 2 * 8/ 4 = 4
  });

  //updating the recipe..
  state.recipe.servings = newServings;
};
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
//bookmark function..
export const addBookmark = function (recipe) {
  //addbookmarks
  state.bookmarks.push(recipe);
  //Mark a current recipe as bookmarked...
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBookmarks();
};
//function to remove or delete bookmark..
export const deleteBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  //Mark a current recipe as not a  bookmarked...
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBookmarks();
}; //takin out the bookmark from storage..
const init = function () {
  const storage = localStorage.getItem('bookmarks');

  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
//clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
    //converting object back to array
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        // condition for ingredient less than 3
        if (ingArr.length !== 3) throw new Error('Wrong ingredient format');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    //using the mapmethod we take the data out of the string and put it into an object
    //creating a recipe object
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    //creating ajax req..
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    //storing our data into the state..
    state.recipe = createRecipeObject(data);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
