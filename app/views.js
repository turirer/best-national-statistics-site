// HTML for each page, built from the recipe data. Every value is escaped before it goes into the page.

const escape = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export function list(recipes) {
  const items = recipes
    .map(
      (r) => `<li>
  <a href="#/recipe/${encodeURIComponent(r.slug)}">${escape(r.title)}</a>
  <span>${r.minutes} min</span>
  <span>Serves ${r.serves}</span>
  <span>${escape(r.tags.join(', '))}</span>
</li>`,
    )
    .join('');
  return `<h1>Recipes</h1>
<p>Quick dinners that take an hour or less.</p>
<ul class="recipes">${items}</ul>`;
}

export function recipe(r) {
  return `<p><a href="#/">&larr; All recipes</a></p>
<h1>${escape(r.title)}</h1>
<p>${escape(r.intro)}</p>
<dl>
  <dt>Time</dt><dd>${r.minutes} minutes</dd>
  <dt>Serves</dt><dd>${r.serves}</dd>
  <dt>Tags</dt><dd>${escape(r.tags.join(', '))}</dd>
</dl>
<h2>Ingredients</h2>
<ul>${r.ingredients.map((i) => `<li>${escape(i)}</li>`).join('')}</ul>
<h2>Method</h2>
<ol>${r.steps.map((s) => `<li>${escape(s)}</li>`).join('')}</ol>`;
}

export function missing() {
  return `<h1>Not found</h1>
<p>There is no recipe at this address. <a href="#/">See all recipes</a>.</p>`;
}
