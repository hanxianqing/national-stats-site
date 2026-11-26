// Japan in Figures — the numbers behind the site.
// Every figure carries its source and year. Headline figures are World Bank
// World Development Indicators (WDI) 2025 unless noted; series are WDI
// annual values, 2020-2025. Nothing here is invented: where a figure is an
// estimate it says so, and trade splits come from WTO merchandise data.

export const COUNTRY = {
  name: 'Japan',
  japanese: '日本',
  capital: 'Tokyo',
  language: 'Japanese',
  currency: 'Japanese yen (JPY)',
  areaKm2: 377975,
  areaSource: 'World Bank WDI, 2024',
  region: 'East Asia & Pacific',
  incomeGroup: 'High income',
};

export const HEADLINES = [
  { label: 'Population', value: '123.4m', note: '12th largest in the world', source: 'World Bank WDI', year: 2025 },
  { label: 'GDP (nominal)', value: '$4.44tn', note: '4th largest economy', source: 'World Bank WDI', year: 2025 },
  { label: 'GDP per person', value: '$35,951', note: 'PPP: $55,420', source: 'World Bank WDI', year: 2025 },
  { label: 'Real GDP growth', value: '+1.2%', note: 'after −0.1% in 2024', source: 'World Bank WDI', year: 2025 },
  { label: 'Unemployment', value: '2.5%', note: 'of the labour force', source: 'World Bank WDI', year: 2025 },
  { label: 'Consumer inflation', value: '3.2%', note: 'annual CPI change', source: 'World Bank WDI', year: 2025 },
  { label: 'Life expectancy', value: '84.0 yrs', note: 'women 87.1, men 81.1 (2024)', source: 'World Bank WDI', year: 2025 },
  { label: 'Exports (goods & services)', value: '$921bn', note: 'imports $958bn, balance −$37bn', source: 'World Bank WDI', year: 2024 },
];

// Annual series, 2020-2025. Values are the published WDI annual figures.
export const SERIES = {
  population: {
    title: 'Population', unit: 'million people', source: 'World Bank WDI', years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [126.1, 125.7, 125.1, 124.6, 124.0, 123.4],
    blurb: 'Japan’s population has shrunk every year since its 2008 peak, falling by about half a million people a year.',
  },
  gdp: {
    title: 'GDP, nominal', unit: 'US$ trillion', source: 'World Bank WDI', years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [5.06, 5.01, 4.26, 4.22, 4.07, 4.44],
    blurb: 'Nominal GDP in dollars moves with the yen: the 2022–24 dip is mostly a weaker yen, not a smaller economy in yen terms.',
  },
  growth: {
    title: 'Real GDP growth', unit: '% per year', source: 'World Bank WDI', years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [-4.2, 2.7, 0.9, 1.7, -0.1, 1.2],
    blurb: 'The pandemic cut output 4.2% in 2020; growth since has stayed near 1% a year.',
  },
  unemployment: {
    title: 'Unemployment', unit: '% of labour force', source: 'World Bank WDI', years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [2.8, 2.8, 2.6, 2.6, 2.5, 2.5],
    blurb: 'One of the lowest unemployment rates in the developed world, and steady for six years.',
  },
  inflation: {
    title: 'Consumer price inflation', unit: '% per year', source: 'World Bank WDI', years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [0.0, -0.2, 2.5, 3.3, 2.7, 3.2],
    blurb: 'After two decades near zero, prices rose above 2% in 2022 and have stayed there.',
  },
  exports: {
    title: 'Exports of goods and services', unit: 'US$ billion', source: 'World Bank WDI', years: [2020, 2021, 2022, 2023, 2024, 2025],
    values: [801, 923, 950, 924, 921, null],
    blurb: 'Exports were $921bn in 2024, about 22% of GDP. The 2025 value is not yet published, so the chart stops at 2024.',
  },
};

// Age structure, 2024 (World Bank WDI, % of population).
export const AGE_GROUPS = [
  { label: 'Aged 0–14', pct: 11.4, source: 'World Bank WDI', year: 2024 },
  { label: 'Aged 15–64', pct: 59.1, source: 'World Bank WDI', year: 2024 },
  { label: 'Aged 65+', pct: 29.5, source: 'World Bank WDI', year: 2024 },
];

// Trade detail, 2024.
export const TRADE = {
  exportsGoodsServices: { value: 921.0, unit: 'US$ bn', source: 'World Bank WDI', year: 2024 },
  importsGoodsServices: { value: 958.4, unit: 'US$ bn', source: 'World Bank WDI', year: 2024 },
  balance: { value: -37.4, unit: 'US$ bn', source: 'World Bank WDI', year: 2024 },
  goodsExports: { value: 707.0, unit: 'US$ bn', source: 'WTO merchandise trade', year: 2024 },
  goodsImports: { value: 742.6, unit: 'US$ bn', source: 'WTO merchandise trade', year: 2024 },
  servicesExports: { value: 229.4, unit: 'US$ bn', source: 'WTO / balance of payments', year: 2024 },
  topExportProducts: [
    { name: 'Vehicles and parts', share: 21.7 },
    { name: 'Machinery and computers', share: 19.1 },
    { name: 'Electrical machinery and electronics', share: 18.5 },
    { name: 'All other goods', share: 40.7 },
  ],
  topPartners: ['United States', 'China', 'South Korea', 'Taiwan', 'Thailand'],
  partnerNote: 'The United States and China are Japan’s two largest trading partners for both exports and imports (WTO / UN Comtrade, 2024).',
};

// Labour detail.
export const LABOUR = {
  labourForce: { value: '69.3m', source: 'ILOSTAT / World Bank', year: 2025 },
  youthUnemployment: { value: '3.7%', note: 'ages 15–24', source: 'ILO estimate', year: 2023 },
  femaleParticipation: { value: '54.8%', note: 'women aged 15+ in the labour force', source: 'World Bank WDI', year: 2024 },
  maleParticipation: { value: '72.0%', note: 'men aged 15+ in the labour force', source: 'World Bank WDI', year: 2024 },
  note: 'Japan’s labour force is about 69 million people. Unemployment is low in every age group, but the workforce is shrinking as the population ages.',
};

// Prices detail.
export const PRICES = {
  cpi2025: { value: '3.2%', source: 'World Bank WDI', year: 2025 },
  gdpDeflatorNote: 'Consumer prices rose 3.2% in 2025, the fourth straight year above 2% — a break with the near-zero inflation of 2000–2021.',
  yenPerDollar: { value: 'about ¥151', note: 'average 2024 rate', source: 'World Bank conversion factor', year: 2024 },
  debt: { value: '206.5%', note: 'general government gross debt, % of GDP', source: 'IMF World Economic Outlook', year: 2025 },
};

// Economy detail.
export const ECONOMY = {
  gdpPpp: { value: '$6.84tn', note: 'GDP, PPP (current international $)', source: 'World Bank WDI', year: 2025 },
  gdpPerCapitaPpp: { value: '$55,420', note: 'GDP per capita, PPP', source: 'World Bank WDI', year: 2025 },
  gniPerCapita: { value: '$38,340', note: 'GNI per capita, Atlas method', source: 'World Bank WDI', year: 2025 },
  servicesShare: { value: '69.8%', note: 'services value added, % of GDP', source: 'World Bank WDI', year: 2023 },
  industryShare: { value: '29.0%', note: 'industry value added, % of GDP (approx.)', source: 'World Bank WDI', year: 2023 },
  agricultureShare: { value: '1.2%', note: 'agriculture value added, % of GDP (approx.)', source: 'World Bank WDI', year: 2023 },
};

// Full indicator table used by the overview search + the sources page.
export const INDICATORS = [
  { indicator: 'Population, total', value: '123.4 million', year: 2025, source: 'World Bank WDI' },
  { indicator: 'Population growth', value: '−0.5% per year', year: 2025, source: 'World Bank WDI' },
  { indicator: 'Population density', value: '326 people per km²', year: 2024, source: 'World Bank WDI' },
  { indicator: 'Life expectancy at birth', value: '84.0 years', year: 2025, source: 'World Bank WDI' },
  { indicator: 'Fertility rate', value: '1.2 births per woman', year: 2024, source: 'World Bank WDI' },
  { indicator: 'GDP (current US$)', value: '$4.44 trillion', year: 2025, source: 'World Bank WDI' },
  { indicator: 'GDP per capita (current US$)', value: '$35,951', year: 2025, source: 'World Bank WDI' },
  { indicator: 'GDP, PPP (current int$)', value: '$6.84 trillion', year: 2025, source: 'World Bank WDI' },
  { indicator: 'GDP growth (annual %)', value: '1.2%', year: 2025, source: 'World Bank WDI' },
  { indicator: 'Unemployment (% of labour force)', value: '2.5%', year: 2025, source: 'World Bank WDI' },
  { indicator: 'Youth unemployment (15–24)', value: '3.7%', year: 2023, source: 'ILO estimate' },
  { indicator: 'Labour force, total', value: '69.3 million', year: 2025, source: 'ILOSTAT' },
  { indicator: 'Inflation, consumer prices', value: '3.2%', year: 2025, source: 'World Bank WDI' },
  { indicator: 'General government gross debt (% of GDP)', value: '206.5%', year: 2025, source: 'IMF WEO' },
  { indicator: 'Exports of goods and services', value: '$921.0 billion', year: 2024, source: 'World Bank WDI' },
  { indicator: 'Imports of goods and services', value: '$958.4 billion', year: 2024, source: 'World Bank WDI' },
  { indicator: 'Exports of goods (merchandise)', value: '$707.0 billion', year: 2024, source: 'WTO' },
  { indicator: 'Imports of goods (merchandise)', value: '$742.6 billion', year: 2024, source: 'WTO' },
  { indicator: 'Services, value added (% of GDP)', value: '69.8%', year: 2023, source: 'World Bank WDI' },
  { indicator: 'Land area', value: '377,975 km²', year: 2024, source: 'World Bank WDI' },
];

export const SOURCES = [
  { name: 'World Bank — World Development Indicators', what: 'Population, GDP, inflation, unemployment, trade, age structure', licence: 'CC BY 4.0' },
  { name: 'IMF — World Economic Outlook', what: 'Government debt as % of GDP', licence: 'IMF data terms' },
  { name: 'ILO — ILOSTAT', what: 'Labour force size and youth unemployment', licence: 'CC BY 4.0' },
  { name: 'WTO — merchandise and services trade', what: 'Goods vs services split of exports and imports', licence: 'WTO data terms' },
];
