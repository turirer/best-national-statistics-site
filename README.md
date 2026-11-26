# Nusantara in Numbers — Indonesia's national statistics site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/turirer/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/turirer/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An original national statistics site for Indonesia: the world's largest
archipelago nation in numbers — 283.5 million people, 38 provinces, more
than 17,000 islands. Every figure comes from BPS (Badan Pusat Statistik),
Indonesia's national statistics office, and is shown with its year.

What is inside:

- **Overview** — twelve headline indicators (population, GDP, growth,
  inflation, unemployment, poverty, life expectancy, median age, urban
  share, land area, density) and the population trend since 1961.
- **Population** — census trend 1961–2024, age structure with a toggle
  between five-year and broad groups, and the rise of the urban share.
- **Economy** — switchable charts for GDP growth, inflation, open
  unemployment and poverty (2015–2024), plus total GDP vs GDP per person.
- **Provinces** — all 38 provinces in a searchable, sortable table
  (population, area, density), with a detail page per province.
- **Health & education** — life expectancy, literacy and school enrolment.
- **About** — country facts and the sources behind every number.

The site is plain static files under `app/` (HTML, CSS, ES modules, no build
step, no network requests, hand-drawn SVG charts), works on desktop and
phone, and is handed in by `main.ts`, which copies `app/` and
`screenshots/` to the output directory and writes `dossier.json`.

Entry for the make.fun bounty: https://make.fun/bounty/best-national-statistics-site-20261126-0539

Referral: https://make.fun/r/d6btpjsv
