// Page views for Nusantara in Numbers. Each function returns the HTML for
// one hash route; main.js owns the router and the interactive state, and
// re-renders a view when a toggle changes. All figures come from data.js.

import {
  SOURCE, HEADLINE, POPULATION_TREND, AGE_GROUPS, AGE_BROAD, URBAN_SHARE,
  ECONOMY, GDP_LEVEL, GDP_PER_CAPITA, LIFE_EXPECTANCY, LITERACY, ENROLMENT,
  PROVINCES, REGIONS, FACTS,
} from './data.js';
import { esc, fmtNum, lineChart, barChart, hBarChart, shareBar } from './charts.js';

const TOTAL_POP = PROVINCES.reduce((sum, p) => sum + p.pop, 0); // thousands

export function slugOf(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function sourceLine(text) {
  return `<p class="source">Source: ${esc(text || SOURCE)}.</p>`;
}

function toggleButtons(options, active, group) {
  const btns = options
    .map((o) => `<button type="button" class="toggle${o.id === active ? ' on' : ''}" data-toggle="${group}" data-value="${o.id}" aria-pressed="${o.id === active}">${esc(o.label)}</button>`)
    .join('');
  return `<div class="toggles" role="group">${btns}</div>`;
}

// ---------------------------------------------------------------- overview
export function overview() {
  const cards = HEADLINE.map((h) => `
    <article class="card">
      <p class="card-label">${esc(h.label)}</p>
      <p class="card-value">${esc(h.value)}</p>
      <p class="card-note">${esc(h.note)}</p>
      <p class="card-year">${h.year} · ${esc(SOURCE)}</p>
    </article>`).join('');

  return `
  <section class="hero">
    <h1>Indonesia in numbers</h1>
    <p class="lede">The world's largest archipelago nation, measured: 283.5 million people
    across 38 provinces and more than 17,000 islands. Every figure on this site comes from
    Badan Pusat Statistik (BPS), Indonesia's national statistics office, with its year shown.</p>
  </section>
  <section class="cards" aria-label="Headline indicators">${cards}</section>
  <section class="panel">
    <h2>Population growth, 1961–2024</h2>
    <p>Indonesia has nearly tripled its population since the first census of the republic.
    Growth has slowed from about 2.3% a year in the 1970s to under 0.8% today.</p>
    ${lineChart(POPULATION_TREND, { unit: 'million people', digits: 1, yLabel: 'Population trend chart' })}
    ${sourceLine('BPS national censuses 1961–2020 and the 2024 mid-year projection')}
    <p><a class="more" href="#/population">Explore population →</a></p>
  </section>
  <section class="panel">
    <h2>Start exploring</h2>
    <div class="linkgrid">
      <a href="#/population"><strong>Population</strong><span>Trend, age structure, city growth</span></a>
      <a href="#/economy"><strong>Economy</strong><span>Growth, prices, jobs, poverty</span></a>
      <a href="#/provinces"><strong>Provinces</strong><span>All 38 provinces, searchable and sortable</span></a>
      <a href="#/health-education"><strong>Health &amp; education</strong><span>Life expectancy, literacy, schooling</span></a>
    </div>
  </section>`;
}

// -------------------------------------------------------------- population
export function population(state) {
  const ageChart = state.ageView === 'broad'
    ? hBarChart(AGE_BROAD, { max: 100, digits: 1, yLabel: 'Broad age groups' })
    : hBarChart(AGE_GROUPS, { digits: 1, yLabel: 'Age structure by five-year group' });
  const ageNote = state.ageView === 'broad'
    ? 'Three broad groups: children, working age, and older people.'
    : 'Share of the population in each five-year age group. The widest bars are teenagers and young adults — the demographic bonus.';

  return `
  <section class="hero">
    <h1>Population</h1>
    <p class="lede">283.5 million people in 2024, up from 97.0 million at the 1961 census.
    Indonesia is the fourth most populous country in the world, after India, China and the United States.</p>
  </section>
  <section class="panel">
    <h2>Population at each census</h2>
    ${lineChart(POPULATION_TREND, { unit: 'million people', digits: 1, yLabel: 'Population trend chart' })}
    ${sourceLine('BPS national censuses 1961–2020 and the 2024 mid-year projection')}
  </section>
  <section class="panel">
    <h2>Age structure, 2024</h2>
    ${toggleButtons([
      { id: 'five', label: 'Five-year groups' },
      { id: 'broad', label: 'Broad groups' },
    ], state.ageView, 'ageView')}
    <p>${ageNote}</p>
    ${ageChart}
    ${sourceLine('BPS 2024 population projection, share of total population')}
  </section>
  <section class="panel">
    <h2>Moving to the cities</h2>
    <p>In 1990 fewer than a third of Indonesians lived in a city. Today it is well over half,
    and the urban share keeps rising about half a point a year.</p>
    ${lineChart(URBAN_SHARE, { unit: '% of population in urban areas', digits: 1, yLabel: 'Urban share chart' })}
    ${shareBar(58.0, 'Urban 58.0%', 'Rural 42.0%')}
    ${sourceLine('BPS censuses and 2024 projection')}
  </section>
  <section class="panel">
    <h2>Key facts</h2>
    <ul class="facts">
      <li><strong>Median age 30.4 years</strong> (2024) — half of Indonesians are younger.</li>
      <li><strong>Total fertility about 2.1 children per woman</strong> (2024), near replacement level.</li>
      <li><strong>Java holds about 56% of the population</strong> on about 7% of the land.</li>
      <li><strong>Density 150 people per km²</strong> nationally, but over 16,000 per km² in Jakarta.</li>
    </ul>
    ${sourceLine()}
  </section>`;
}

// ----------------------------------------------------------------- economy
export function economy(state) {
  const series = ECONOMY[state.series] || ECONOMY.growth;
  const chart = state.series === 'growth'
    ? barChart(series.points, { unit: series.unit, digits: 2, yLabel: series.name })
    : lineChart(series.points, { unit: series.unit, digits: 2, yLabel: series.name });

  const gdpPoints = state.gdpUnit === 'percapita' ? GDP_PER_CAPITA : GDP_LEVEL;
  const gdpUnit = state.gdpUnit === 'percapita' ? 'US$ per person' : 'Rp trillion';
  const gdpDigits = 0;

  return `
  <section class="hero">
    <h1>Economy</h1>
    <p class="lede">Southeast Asia's largest economy: GDP of Rp 22,139 trillion in 2024
    (about US$4,960 per person), growing at about 5% a year since the pandemic.</p>
  </section>
  <section class="panel">
    <h2>${esc(series.name)}, 2015–2024</h2>
    ${toggleButtons([
      { id: 'growth', label: 'GDP growth' },
      { id: 'inflation', label: 'Inflation' },
      { id: 'unemployment', label: 'Unemployment' },
      { id: 'poverty', label: 'Poverty' },
    ], state.series, 'series')}
    <p>${esc(series.note)}</p>
    ${chart}
    ${sourceLine()}
  </section>
  <section class="panel">
    <h2>Size of the economy</h2>
    ${toggleButtons([
      { id: 'total', label: 'Total GDP (Rp trillion)' },
      { id: 'percapita', label: 'Per person (US$)' },
    ], state.gdpUnit, 'gdpUnit')}
    ${lineChart(gdpPoints, { unit: gdpUnit, digits: gdpDigits, yLabel: 'GDP chart' })}
    <p>${state.gdpUnit === 'percapita'
      ? 'GDP per person crossed US$4,900 in 2023 and reached US$4,960 in 2024 — an upper-middle-income economy.'
      : 'GDP at current prices nearly doubled in a decade, from Rp 11,526 trillion in 2015 to Rp 22,139 trillion in 2024.'}</p>
    ${sourceLine('BPS national accounts')}
  </section>
  <section class="panel">
    <h2>Reading the decade</h2>
    <ul class="facts">
      <li><strong>2020:</strong> GDP shrank 2.07% and unemployment jumped to 7.07% in the pandemic year.</li>
      <li><strong>2022:</strong> inflation peaked at 5.51% after the subsidised fuel price rose.</li>
      <li><strong>2024:</strong> poverty fell to 8.57%, the lowest in the series, and unemployment to 4.91%.</li>
    </ul>
    ${sourceLine()}
  </section>`;
}

// --------------------------------------------------------------- provinces
export function provinces(state) {
  const regionOptions = REGIONS
    .map((r) => `<option value="${esc(r)}"${r === state.region ? ' selected' : ''}>${esc(r)}</option>`)
    .join('');
  const arrow = (key) => (state.sortKey === key ? (state.sortDir === 1 ? ' ▲' : ' ▼') : '');

  return `
  <section class="hero">
    <h1>Provinces</h1>
    <p class="lede">All 38 provinces of Indonesia. Search by name or capital, filter by region,
    and click a column heading to sort. Population is the BPS mid-2024 projection;
    click a province for its detail page.</p>
  </section>
  <section class="panel">
    <div class="controls">
      <label>Search <input id="prov-search" type="search" value="${esc(state.query)}" placeholder="e.g. Java, Makassar…" autocomplete="off"></label>
      <label>Region <select id="prov-region">${regionOptions}</select></label>
      <p class="count" id="prov-count"></p>
    </div>
    <div class="tablewrap">
      <table class="data" id="prov-table">
        <thead><tr>
          <th><button type="button" class="sort" data-sort="name">Province${arrow('name')}</button></th>
          <th><button type="button" class="sort" data-sort="capital">Capital${arrow('capital')}</button></th>
          <th><button type="button" class="sort" data-sort="region">Region${arrow('region')}</button></th>
          <th class="num"><button type="button" class="sort" data-sort="pop">Population${arrow('pop')}</button></th>
          <th class="num"><button type="button" class="sort" data-sort="area">Area (km²)${arrow('area')}</button></th>
          <th class="num"><button type="button" class="sort" data-sort="density">Density / km²${arrow('density')}</button></th>
        </tr></thead>
        <tbody id="prov-rows"></tbody>
      </table>
    </div>
    ${sourceLine('BPS mid-2024 population projection and official land areas; density computed')}
  </section>`;
}

// Rows for the province table, filtered and sorted by the given state.
// Returns {html, count} so main.js can update the body without a full render.
export function provinceRows(state) {
  const q = state.query.trim().toLowerCase();
  let rows = PROVINCES.filter((p) => {
    if (state.region !== 'All regions' && p.region !== state.region) return false;
    if (!q) return true;
    return p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q) || p.region.toLowerCase().includes(q);
  });
  const density = (p) => (p.pop * 1000) / p.area;
  const key = state.sortKey;
  rows = rows.slice().sort((a, b) => {
    let cmp = 0;
    if (key === 'density') cmp = density(a) - density(b);
    else if (key === 'pop' || key === 'area') cmp = a[key] - b[key];
    else cmp = String(a[key]).localeCompare(String(b[key]));
    return cmp * state.sortDir;
  });
  const html = rows.map((p) => `
    <tr>
      <td><a href="#/province/${slugOf(p.name)}">${esc(p.name)}</a></td>
      <td>${esc(p.capital)}</td>
      <td>${esc(p.region)}</td>
      <td class="num">${fmtNum(p.pop * 1000)}</td>
      <td class="num">${fmtNum(p.area)}</td>
      <td class="num">${fmtNum(density(p), density(p) < 100 ? 1 : 0)}</td>
    </tr>`).join('');
  return { html: html || '<tr><td colspan="6">No province matches that search.</td></tr>', count: rows.length };
}

// ---------------------------------------------------------- province detail
export function provinceDetail(province) {
  const density = (province.pop * 1000) / province.area;
  const share = (province.pop / TOTAL_POP) * 100;
  const byPop = PROVINCES.slice().sort((a, b) => b.pop - a.pop);
  const rank = byPop.findIndex((p) => p.name === province.name) + 1;
  const biggest = byPop[0];

  return `
  <section class="hero">
    <p class="crumb"><a href="#/provinces">← All provinces</a></p>
    <h1>${esc(province.name)}</h1>
    <p class="lede">Capital: ${esc(province.capital)} · Region: ${esc(province.region)}</p>
  </section>
  <section class="cards">
    <article class="card"><p class="card-label">Population (2024)</p><p class="card-value">${fmtNum(province.pop * 1000)}</p><p class="card-note">Rank ${rank} of 38 provinces by population.</p><p class="card-year">2024 · ${esc(SOURCE)}</p></article>
    <article class="card"><p class="card-label">Land area</p><p class="card-value">${fmtNum(province.area)} km²</p><p class="card-note">${((province.area / 1892555) * 100).toFixed(1)}% of Indonesia's land area.</p><p class="card-year">2024 · ${esc(SOURCE)}</p></article>
    <article class="card"><p class="card-label">Density</p><p class="card-value">${fmtNum(density, density < 100 ? 1 : 0)} / km²</p><p class="card-note">National average is about 150 per km².</p><p class="card-year">2024 · computed</p></article>
    <article class="card"><p class="card-label">Share of Indonesia</p><p class="card-value">${share.toFixed(1)}%</p><p class="card-note">Of the national population of 283.5 million.</p><p class="card-year">2024 · computed</p></article>
  </section>
  <section class="panel">
    <h2>Population compared with the largest province</h2>
    <p>${esc(biggest.name)} is the most populous province with ${fmtNum(biggest.pop * 1000)} people.</p>
    ${shareBar((province.pop / biggest.pop) * 100, `${province.name}: ${fmtNum(province.pop * 1000)}`, `${biggest.name}: ${fmtNum(biggest.pop * 1000)}`)}
    ${sourceLine('BPS mid-2024 population projection')}
    <p><a class="more" href="#/provinces">Back to all provinces →</a></p>
  </section>`;
}

// --------------------------------------------------------- health & school
export function healthEducation() {
  return `
  <section class="hero">
    <h1>Health &amp; education</h1>
    <p class="lede">Indonesians live longer and stay in school longer than a generation ago:
    life expectancy reached 74.2 years in 2024 and adult literacy 96.7% in 2023.</p>
  </section>
  <section class="panel">
    <h2>Life expectancy at birth</h2>
    ${lineChart(LIFE_EXPECTANCY, { unit: 'years', digits: 1, yLabel: 'Life expectancy chart' })}
    <p>BPS revised its method in 2022 using the 2020 census long form, which lifted the series;
    the upward trend is consistent before and after.</p>
    ${sourceLine('BPS life tables')}
  </section>
  <section class="panel">
    <h2>Literacy, age 15 and over</h2>
    ${lineChart(LITERACY, { unit: '% who can read and write', digits: 1, yLabel: 'Literacy chart' })}
    ${sourceLine('BPS Susenas household survey')}
  </section>
  <section class="panel">
    <h2>Children in school, 2023</h2>
    <p>Net enrolment rate: the share of children of the official age who are enrolled at that level.</p>
    ${hBarChart(ENROLMENT, { max: 100, digits: 1, yLabel: 'Net enrolment by level' })}
    ${sourceLine('BPS Susenas household survey, 2023')}
  </section>
  <section class="panel">
    <h2>More indicators</h2>
    <ul class="facts">
      <li><strong>Infant mortality 16.8 per 1,000 live births</strong> (2020 census), down from 26 in 2010.</li>
      <li><strong>Under-five mortality 19.8 per 1,000</strong> (2020 census).</li>
      <li><strong>Mean years of schooling 8.9 years</strong> for adults 25+ (2023).</li>
      <li><strong>Expected years of schooling 13.2 years</strong> for a child starting school (2023).</li>
    </ul>
    ${sourceLine()}
  </section>`;
}

// ------------------------------------------------------------------- about
export function about() {
  const rows = FACTS.map((f) => `<tr><th scope="row">${esc(f.label)}</th><td>${esc(f.value)}</td></tr>`).join('');
  return `
  <section class="hero">
    <h1>About this site</h1>
    <p class="lede">Nusantara in Numbers is an independent guide to Indonesia's statistics.
    It is not affiliated with BPS; it republishes BPS figures with their years so anyone can check them.</p>
  </section>
  <section class="panel">
    <h2>Country facts</h2>
    <div class="tablewrap"><table class="data facts-table"><tbody>${rows}</tbody></table></div>
  </section>
  <section class="panel">
    <h2>Sources</h2>
    <ul class="facts">
      <li><strong>BPS (Badan Pusat Statistik)</strong> — population censuses and projections, national accounts (GDP), consumer price index, Sakernas labour-force survey, Susenas household survey, poverty measurement, life tables.</li>
      <li>Province land areas are the official BPS figures used in its regional statistics publications.</li>
      <li>Density and population shares are computed here from the BPS figures above.</li>
    </ul>
    <p>Figures are the latest published at the time of writing (2024 releases, with 2023 for some education series).
    Where BPS revises a series, the newest vintage is used.</p>
  </section>`;
}

export function missing() {
  return `
  <section class="hero">
    <h1>Page not found</h1>
    <p class="lede">That address is not part of this site. Try the
    <a href="#/">overview</a> or the <a href="#/provinces">province table</a>.</p>
  </section>`;
}
