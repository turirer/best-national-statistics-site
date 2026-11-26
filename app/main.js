// A recipe site: the list of recipes and a page for each, on hash routes. The recipes are in data.js, so the site
// needs no network.
//
//   #/                the list
//   #/recipe/<slug>   one recipe
//
// window.__shotReady is false while a page renders and true once it is on screen, so a screenshot script knows when
// to capture.

import { recipes } from './data.js';
import { list, missing, recipe } from './views.js';

const app = document.getElementById('app');

function render() {
  window.__shotReady = false;
  const match = location.hash.match(/^#\/recipe\/([^/?]+)/);
  if (match) {
    const found = recipes.find((r) => r.slug === decodeURIComponent(match[1]));
    document.title = `${found ? found.title : 'Not found'} | Weeknight Kitchen`;
    app.innerHTML = found ? recipe(found) : missing();
  } else {
    document.title = 'Weeknight Kitchen';
    app.innerHTML = list(recipes);
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
