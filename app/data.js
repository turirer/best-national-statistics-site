// Nusantara in Numbers — the data layer.
//
// Every figure on the site lives here, with the year it refers to and the
// publisher it came from, so each number on screen can be traced back to a
// published source. All series are from Badan Pusat Statistik (BPS),
// Indonesia's national statistics office, unless a row says otherwise.
//
// Units are stated per series; provinces carry population in thousands of
// people and land area in square kilometres, and density is computed.

export const SOURCE = 'BPS (Badan Pusat Statistik)';

// Headline indicators for the overview dashboard. `value` is the display
// string; `year` is the reference year of the figure.
export const HEADLINE = [
  { label: 'Population', value: '283.5 million', year: 2024, note: 'Mid-year projection; 4th most populous country in the world.' },
  { label: 'Provinces', value: '38', year: 2022, note: 'Southwest Papua became the 38th province in November 2022.' },
  { label: 'GDP', value: 'Rp 22,139 trillion', year: 2024, note: 'Current prices, whole economy.' },
  { label: 'GDP growth', value: '5.03%', year: 2024, note: 'Year on year, constant prices.' },
  { label: 'Inflation', value: '1.57%', year: 2024, note: 'December, year on year (consumer price index).' },
  { label: 'Open unemployment', value: '4.91%', year: 2024, note: 'August labour-force survey (Sakernas).' },
  { label: 'Poverty rate', value: '8.57%', year: 2024, note: 'September; share of people below the national poverty line.' },
  { label: 'Life expectancy', value: '74.2 years', year: 2024, note: 'At birth, both sexes.' },
  { label: 'Median age', value: '30.4 years', year: 2024, note: 'Half the population is younger than this.' },
  { label: 'Living in cities', value: '58%', year: 2024, note: 'Share of the population in urban areas.' },
  { label: 'Land area', value: '1.89 million km²', year: 2024, note: 'Across more than 17,000 islands.' },
  { label: 'Population density', value: '150 / km²', year: 2024, note: 'National average; Java is far denser.' },
];

// Population at each national census, plus the 2024 projection (millions).
export const POPULATION_TREND = [
  { year: 1961, value: 97.0 },
  { year: 1971, value: 119.2 },
  { year: 1980, value: 147.5 },
  { year: 1990, value: 179.4 },
  { year: 2000, value: 206.3 },
  { year: 2010, value: 237.6 },
  { year: 2020, value: 270.2 },
  { year: 2024, value: 283.5 },
];

// Age structure, share of total population in percent (2024 projection).
export const AGE_GROUPS = [
  { label: '0–4', value: 7.4 }, { label: '5–9', value: 8.2 }, { label: '10–14', value: 8.8 },
  { label: '15–19', value: 9.2 }, { label: '20–24', value: 9.0 }, { label: '25–29', value: 8.6 },
  { label: '30–34', value: 8.1 }, { label: '35–39', value: 7.6 }, { label: '40–44', value: 6.9 },
  { label: '45–49', value: 6.1 }, { label: '50–54', value: 5.3 }, { label: '55–59', value: 4.5 },
  { label: '60–64', value: 3.9 }, { label: '65–69', value: 2.7 }, { label: '70–74', value: 1.8 },
  { label: '75+', value: 1.9 },
];

export const AGE_BROAD = [
  { label: 'Children 0–14', value: 24.4 },
  { label: 'Working age 15–64', value: 69.2 },
  { label: 'Older 65+', value: 6.4 },
];

// Urban / rural split over time (percent urban).
export const URBAN_SHARE = [
  { year: 1990, value: 30.9 }, { year: 2000, value: 42.0 }, { year: 2010, value: 49.8 },
  { year: 2020, value: 56.7 }, { year: 2024, value: 58.0 },
];

// Economy series, 2015–2024. Each entry: display name, unit, source note, points.
export const ECONOMY = {
  growth: {
    name: 'GDP growth',
    unit: '% per year',
    note: 'Real GDP growth, year on year (BPS national accounts). 2020 is the COVID-19 contraction.',
    points: [
      { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 }, { year: 2017, value: 5.07 },
      { year: 2018, value: 5.17 }, { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
      { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 }, { year: 2023, value: 5.05 },
      { year: 2024, value: 5.03 },
    ],
  },
  inflation: {
    name: 'Inflation',
    unit: '% year on year',
    note: 'Consumer price inflation each December (BPS). The 2022 peak followed the fuel-price adjustment.',
    points: [
      { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 }, { year: 2017, value: 3.61 },
      { year: 2018, value: 3.13 }, { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
      { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 }, { year: 2023, value: 2.61 },
      { year: 2024, value: 1.57 },
    ],
  },
  unemployment: {
    name: 'Open unemployment rate',
    unit: '% of labour force',
    note: 'Tingkat Pengangguran Terbuka from the August Sakernas labour-force survey (BPS).',
    points: [
      { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 }, { year: 2017, value: 5.50 },
      { year: 2018, value: 5.34 }, { year: 2019, value: 5.23 }, { year: 2020, value: 7.07 },
      { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 }, { year: 2023, value: 5.32 },
      { year: 2024, value: 4.91 },
    ],
  },
  poverty: {
    name: 'Poverty rate',
    unit: '% of population',
    note: 'Share of people below the national poverty line, each September (BPS).',
    points: [
      { year: 2015, value: 11.13 }, { year: 2016, value: 10.70 }, { year: 2017, value: 10.12 },
      { year: 2018, value: 9.66 }, { year: 2019, value: 9.22 }, { year: 2020, value: 10.19 },
      { year: 2021, value: 9.71 }, { year: 2022, value: 9.57 }, { year: 2023, value: 9.36 },
      { year: 2024, value: 8.57 },
    ],
  },
};

// GDP at current prices (Rp trillion) and GDP per capita (US$).
export const GDP_LEVEL = [
  { year: 2015, value: 11526 }, { year: 2016, value: 12401 }, { year: 2017, value: 13588 },
  { year: 2018, value: 14838 }, { year: 2019, value: 15833 }, { year: 2020, value: 15443 },
  { year: 2021, value: 16970 }, { year: 2022, value: 19588 }, { year: 2023, value: 20892 },
  { year: 2024, value: 22139 },
];

export const GDP_PER_CAPITA = [
  { year: 2015, value: 3329 }, { year: 2016, value: 3562 }, { year: 2017, value: 3877 },
  { year: 2018, value: 3927 }, { year: 2019, value: 4174 }, { year: 2020, value: 3911 },
  { year: 2021, value: 4334 }, { year: 2022, value: 4783 }, { year: 2023, value: 4919 },
  { year: 2024, value: 4960 },
];

// Health and education series.
export const LIFE_EXPECTANCY = [
  { year: 2015, value: 70.8 }, { year: 2016, value: 71.0 }, { year: 2017, value: 71.1 },
  { year: 2018, value: 71.2 }, { year: 2019, value: 71.3 }, { year: 2020, value: 71.5 },
  { year: 2021, value: 71.9 }, { year: 2022, value: 73.6 }, { year: 2023, value: 73.9 },
  { year: 2024, value: 74.2 },
];

export const LITERACY = [
  { year: 2015, value: 95.2 }, { year: 2018, value: 95.7 }, { year: 2020, value: 96.0 },
  { year: 2022, value: 96.4 }, { year: 2023, value: 96.7 },
];

// Net enrolment rate by school level, 2023 (percent of the official age group).
export const ENROLMENT = [
  { label: 'Primary (ages 7–12)', value: 97.7 },
  { label: 'Junior secondary (13–15)', value: 81.5 },
  { label: 'Senior secondary (16–18)', value: 66.2 },
];

// All 38 provinces. pop = mid-2024 projection in thousands of people;
// area = land area in km²; region groups them for the filter.
export const PROVINCES = [
  { name: 'Aceh', capital: 'Banda Aceh', region: 'Sumatra', pop: 5600, area: 56835 },
  { name: 'North Sumatra', capital: 'Medan', region: 'Sumatra', pop: 15750, area: 72981 },
  { name: 'West Sumatra', capital: 'Padang', region: 'Sumatra', pop: 5900, area: 42012 },
  { name: 'Riau', capital: 'Pekanbaru', region: 'Sumatra', pop: 6850, area: 87023 },
  { name: 'Jambi', capital: 'Jambi City', region: 'Sumatra', pop: 3724, area: 50058 },
  { name: 'South Sumatra', capital: 'Palembang', region: 'Sumatra', pop: 8950, area: 91592 },
  { name: 'Bengkulu', capital: 'Bengkulu City', region: 'Sumatra', pop: 2115, area: 19919 },
  { name: 'Lampung', capital: 'Bandar Lampung', region: 'Sumatra', pop: 9500, area: 34623 },
  { name: 'Bangka Belitung Islands', capital: 'Pangkal Pinang', region: 'Sumatra', pop: 1531, area: 16424 },
  { name: 'Riau Islands', capital: 'Tanjung Pinang', region: 'Sumatra', pop: 2187, area: 8201 },
  { name: 'DKI Jakarta', capital: 'Jakarta', region: 'Java', pop: 10750, area: 664 },
  { name: 'West Java', capital: 'Bandung', region: 'Java', pop: 50345, area: 37040 },
  { name: 'Central Java', capital: 'Semarang', region: 'Java', pop: 38000, area: 34337 },
  { name: 'DI Yogyakarta', capital: 'Yogyakarta', region: 'Java', pop: 3759, area: 3133 },
  { name: 'East Java', capital: 'Surabaya', region: 'Java', pop: 42000, area: 47800 },
  { name: 'Banten', capital: 'Serang', region: 'Java', pop: 12600, area: 9662 },
  { name: 'Bali', capital: 'Denpasar', region: 'Bali & Nusa Tenggara', pop: 4500, area: 5780 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', region: 'Bali & Nusa Tenggara', pop: 5720, area: 18572 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', region: 'Bali & Nusa Tenggara', pop: 5750, area: 48718 },
  { name: 'West Kalimantan', capital: 'Pontianak', region: 'Kalimantan', pop: 5750, area: 147307 },
  { name: 'Central Kalimantan', capital: 'Palangka Raya', region: 'Kalimantan', pop: 2850, area: 153564 },
  { name: 'South Kalimantan', capital: 'Banjarbaru', region: 'Kalimantan', pop: 4350, area: 38744 },
  { name: 'East Kalimantan', capital: 'Samarinda', region: 'Kalimantan', pop: 4200, area: 127347 },
  { name: 'North Kalimantan', capital: 'Tanjung Selor', region: 'Kalimantan', pop: 747, area: 75468 },
  { name: 'North Sulawesi', capital: 'Manado', region: 'Sulawesi', pop: 2760, area: 14500 },
  { name: 'Central Sulawesi', capital: 'Palu', region: 'Sulawesi', pop: 3150, area: 61841 },
  { name: 'South Sulawesi', capital: 'Makassar', region: 'Sulawesi', pop: 9600, area: 46717 },
  { name: 'Southeast Sulawesi', capital: 'Kendari', region: 'Sulawesi', pop: 2880, area: 38068 },
  { name: 'Gorontalo', capital: 'Gorontalo City', region: 'Sulawesi', pop: 1230, area: 11257 },
  { name: 'West Sulawesi', capital: 'Mamuju', region: 'Sulawesi', pop: 1463, area: 16787 },
  { name: 'Maluku', capital: 'Ambon', region: 'Maluku & Papua', pop: 1945, area: 46914 },
  { name: 'North Maluku', capital: 'Sofifi', region: 'Maluku & Papua', pop: 1374, area: 31982 },
  { name: 'West Papua', capital: 'Manokwari', region: 'Maluku & Papua', pop: 576, area: 60275 },
  { name: 'Southwest Papua', capital: 'Sorong', region: 'Maluku & Papua', pop: 628, area: 39123 },
  { name: 'Papua', capital: 'Jayapura', region: 'Maluku & Papua', pop: 1061, area: 82681 },
  { name: 'Central Papua', capital: 'Nabire', region: 'Maluku & Papua', pop: 1428, area: 61073 },
  { name: 'Highland Papua', capital: 'Wamena', region: 'Maluku & Papua', pop: 1467, area: 51213 },
  { name: 'South Papua', capital: 'Merauke', region: 'Maluku & Papua', pop: 522, area: 117849 },
];

export const REGIONS = ['All regions', 'Sumatra', 'Java', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'];

// Extra context shown on the About page.
export const FACTS = [
  { label: 'Official name', value: 'Republic of Indonesia (Republik Indonesia)' },
  { label: 'Capital', value: 'Jakarta (Nusantara, the new capital in East Kalimantan, is under construction)' },
  { label: 'Official language', value: 'Indonesian (Bahasa Indonesia); over 700 local languages are spoken' },
  { label: 'Currency', value: 'Rupiah (Rp)' },
  { label: 'Islands', value: '17,508 named islands (BPS, 2023)' },
  { label: 'Largest islands', value: 'Kalimantan, Sumatra, Papua, Sulawesi and Java hold most of the land' },
  { label: 'Time zones', value: 'Three: western (UTC+7), central (UTC+8) and eastern (UTC+9)' },
  { label: 'Independence', value: 'Proclaimed 17 August 1945' },
];
