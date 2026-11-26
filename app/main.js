// Nusantara in Numbers — router and interactive state.
//
// Hash routes (the site is plain static files, so the hash keeps every page
// reachable from app/index.html alone):
//
//   #/                  overview dashboard
//   #/population        population trend, age structure, urban share
//   #/economy           growth / inflation / unemployment / poverty, GDP size
//   #/provinces         searchable, sortable table of all 38 provinces
//   #/province/<slug>   one province in detail
//   #/health-education  life expectancy, literacy, enrolment
//   #/about             country facts and sources
//
// window.__shotReady flips true once a page is on screen, so a screenshot
// script knows when to capture.

import { PROVINCES } from './data.js';
import {
  overview, population, economy, provinces, provinceRows,
  provinceDetail, healthEducation, about, missing, slugOf,
} from './views.js';

const app = document.getElementById('app');
const navLinks = [...document.querySelectorAll('[data-nav]')];

// Interactive state that survives re-renders of a single view.
const state = {
  ageView: 'five',        // population: 'five' | 'broad'
  series: 'growth',       // economy: growth | inflation | unemployment | poverty
  gdpUnit: 'total',       // economy: 'total' | 'percapita'
  query: '',              // provinces search text
  region: 'All regions',  // provinces region filter
  sortKey: 'name',        // provinces sort column
  sortDir: 1,             // 1 ascending, -1 descending
};

function markNav(route) {
  for (const link of navLinks) {
    const on = link.dataset.nav === route || (route === 'province' && link.dataset.nav === 'provinces');
    link.classList.toggle('on', on);
    if (on) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  }
}

function fillProvinceRows() {
  const body = document.getElementById('prov-rows');
  const count = document.getElementById('prov-count');
  if (!body) return;
  const { html, count: n } = provinceRows(state);
  body.innerHTML = html;
  if (count) count.textContent = `${n} of 38 provinces shown`;
}

function wireProvinces() {
  const search = document.getElementById('prov-search');
  const region = document.getElementById('prov-region');
  if (search) {
    search.addEventListener('input', () => {
      state.query = search.value;
      fillProvinceRows();
    });
  }
  if (region) {
    region.addEventListener('change', () => {
      state.region = region.value;
      fillProvinceRows();
    });
  }
  for (const btn of document.querySelectorAll('[data-sort]')) {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (state.sortKey === key) state.sortDir *= -1;
      else { state.sortKey = key; state.sortDir = 1; }
      render(); // re-render so the arrow moves; search text is kept in state
    });
  }
  fillProvinceRows();
}

function wireToggles() {
  for (const btn of document.querySelectorAll('[data-toggle]')) {
    btn.addEventListener('click', () => {
      state[btn.dataset.toggle] = btn.dataset.value;
      render();
    });
  }
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const provinceMatch = hash.match(/^#\/province\/([^/?]+)/);
  let route = 'overview';
  let title = 'Indonesia in numbers — Nusantara in Numbers';

  if (provinceMatch) {
    const found = PROVINCES.find((p) => slugOf(p.name) === decodeURIComponent(provinceMatch[1]));
    route = 'province';
    title = found ? `${found.name} — Nusantara in Numbers` : title;
    app.innerHTML = found ? provinceDetail(found) : missing();
  } else if (hash.startsWith('#/population')) {
    route = 'population';
    title = 'Population — Nusantara in Numbers';
    app.innerHTML = population(state);
  } else if (hash.startsWith('#/economy')) {
    route = 'economy';
    title = 'Economy — Nusantara in Numbers';
    app.innerHTML = economy(state);
  } else if (hash.startsWith('#/provinces')) {
    route = 'provinces';
    title = 'Provinces — Nusantara in Numbers';
    app.innerHTML = provinces(state);
  } else if (hash.startsWith('#/health-education')) {
    route = 'health-education';
    title = 'Health & education — Nusantara in Numbers';
    app.innerHTML = healthEducation();
  } else if (hash.startsWith('#/about')) {
    route = 'about';
    title = 'About — Nusantara in Numbers';
    app.innerHTML = about();
  } else if (hash === '#/' || hash === '#') {
    app.innerHTML = overview();
  } else {
    route = 'missing';
    app.innerHTML = missing();
  }

  document.title = title;
  markNav(route);
  wireToggles();
  if (route === 'provinces') wireProvinces();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
