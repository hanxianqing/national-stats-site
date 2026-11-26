// pages.js — one render function per section of the site.
// Each page is plain HTML with real figures; every figure names its source
// and year in the text next to it. Charts are mounted by app.js afterwards.

import { COUNTRY, HEADLINES, SERIES, AGE_GROUPS, TRADE, LABOUR, PRICES, ECONOMY, INDICATORS, SOURCES } from './data.js';

function cite(source, year) {
  return '<span class="cite">' + source + ', ' + year + '</span>';
}

function kpiCard(h) {
  return '<article class="kpi"><div class="kpi-label">' + h.label + '</div>' +
    '<div class="kpi-value">' + h.value + '</div>' +
    '<div class="kpi-note">' + h.note + '</div>' +
    '<div class="kpi-src">' + h.source + ', ' + h.year + '</div></article>';
}

function chartCard(key, title) {
  const s = SERIES[key];
  return '<section class="card chart-card"><h3>' + title + '</h3>' +
    '<p class="muted">' + s.blurb + '</p>' +
    '<div class="chart-wrap"><canvas data-series="' + key + '" aria-label="' + s.title + ' chart"></canvas>' +
    '<p class="chart-readout">Hover a point to read its value · ' + s.source + '</p></div>' +
    '<div class="chart-toggle" data-chart="' + key + '">' +
    '<button type="button" data-kind="line" class="on">Line</button>' +
    '<button type="button" data-kind="bar">Bars</button></div>' +
    '<p class="src-line">Source: ' + s.source + ' · Unit: ' + s.unit + ' · 2020–2025</p></section>';
}

function indicatorRow(r) {
  return '<tr><td>' + r.indicator + '</td><td>' + r.value + '</td><td>' + r.year + '</td><td>' + r.source + '</td></tr>';
}

export function renderOverview() {
  const rows = INDICATORS.map(indicatorRow).join('');
  return '<section class="hero"><h1>Japan in figures</h1>' +
    '<p class="lede">The numbers that describe Japan — how many people live there, how big its economy is, ' +
    'how much things cost and what it sells to the world. Every figure on this site names its source and its year.</p>' +
    '<p class="hero-facts"><strong>Capital:</strong> ' + COUNTRY.capital + ' &nbsp;·&nbsp; <strong>Language:</strong> ' + COUNTRY.language +
    ' &nbsp;·&nbsp; <strong>Currency:</strong> ' + COUNTRY.currency + ' &nbsp;·&nbsp; <strong>Land area:</strong> ' + COUNTRY.areaKm2.toLocaleString('en-US') +
    ' km² ' + cite(COUNTRY.areaSource.split(', ')[0], COUNTRY.areaSource.split(', ')[1]) + '</p></section>' +
    '<section class="kpi-grid">' + HEADLINES.map(kpiCard).join('') + '</section>' +
    '<div class="two-col">' + chartCard('population', 'Population is shrinking') + chartCard('gdp', 'GDP in current US dollars') + '</div>' +
    '<section class="card"><h2>All key indicators</h2>' +
    '<p class="muted">Type to filter the table. Click a column heading to sort it.</p>' +
    '<input id="indicator-search" type="search" placeholder="Filter indicators — try “GDP” or “trade”…" aria-label="Filter indicators">' +
    '<div class="table-wrap"><table id="indicator-table"><thead><tr>' +
    '<th data-sort="0">Indicator ↕</th><th data-sort="1">Value ↕</th><th data-sort="2">Year ↕</th><th data-sort="3">Source ↕</th>' +
    '</tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
    '<section class="card"><h2>Where to look next</h2><div class="link-cards">' +
    '<a href="#/population">Population →</a><a href="#/economy">Economy →</a><a href="#/labour">Labour →</a>' +
    '<a href="#/prices">Prices →</a><a href="#/trade">Trade →</a><a href="#/sources">Sources →</a></div></section>';
}

export function renderPopulation() {
  const bars = AGE_GROUPS.map((g) =>
    '<div class="age-row"><span>' + g.label + '</span><div class="bar-track"><div class="bar-fill" style="width:' + g.pct + '%"></div></div>' +
    '<strong>' + g.pct + '%</strong><span class="cite">' + g.source + ', ' + g.year + '</span></div>').join('');
  return '<section class="page-head"><h1>Population</h1><p class="lede">123.4 million people in 2025 — and fewer every year. ' +
    'Japan is the world’s oldest large society: almost three in ten people are 65 or older.</p></section>' +
    '<div class="two-col">' + chartCard('population', 'Total population, 2020–2025') +
    '<section class="card"><h3>Who lives in Japan</h3><p class="muted">Share of the population by age group.</p>' + bars +
    '<p>Median age is about 49 years (UN World Population Prospects, 2024). The fertility rate is 1.2 births per woman ' +
    cite('World Bank WDI', 2024) + ' — well below the 2.1 needed to replace the population.</p>' +
    '<p>Population density is 326 people per km² ' + cite('World Bank WDI', 2024) + ', and about 37 million people live in ' +
    'Greater Tokyo, the world’s largest metropolitan area (UN, 2024).</p></section></div>' +
    '<section class="card"><h2>What the numbers mean</h2><ul class="points">' +
    '<li><strong>Shrinking:</strong> the population falls by roughly 0.5% a year — about 600,000 people in 2025.</li>' +
    '<li><strong>Ageing:</strong> the 65+ share rose from 28.4% in 2020 to 29.5% in 2024.</li>' +
    '<li><strong>Long-lived:</strong> life expectancy is 84.0 years ' + cite('World Bank WDI', 2025) + ' — among the highest in the world.</li>' +
    '</ul></section>';
}

export function renderEconomy() {
  return '<section class="page-head"><h1>Economy</h1><p class="lede">The world’s 4th largest economy: $4.44 trillion of GDP in 2025, ' +
    'or $35,951 per person.</p></section>' +
    '<div class="kpi-grid">' +
    kpiCard({ label: 'GDP (nominal)', value: '$4.44tn', note: '4th in the world', source: 'World Bank WDI', year: 2025 }) +
    kpiCard({ label: 'GDP, PPP', value: ECONOMY.gdpPpp.value, note: '5th in the world', source: 'World Bank WDI', year: 2025 }) +
    kpiCard({ label: 'GDP per person, PPP', value: ECONOMY.gdpPerCapitaPpp.value, note: 'current international $', source: 'World Bank WDI', year: 2025 }) +
    kpiCard({ label: 'Government debt', value: PRICES.debt.value, note: 'of GDP — the highest among large economies', source: 'IMF WEO', year: 2025 }) +
    '</div>' +
    '<div class="two-col">' + chartCard('gdp', 'GDP, nominal, 2020–2025') + chartCard('growth', 'Real GDP growth, 2020–2025') + '</div>' +
    '<section class="card"><h2>What Japan produces</h2><p>Services are ' + ECONOMY.servicesShare.value + ' of value added ' +
    cite('World Bank WDI', 2023) + '; industry about 29% and agriculture about 1%. Japan’s largest industries are cars, ' +
    'electronics and machinery — the same goods that dominate its exports.</p>' +
    '<p>GNI per capita (Atlas method) is ' + ECONOMY.gniPerCapita.value + ' ' + cite('World Bank WDI', 2025) + '.</p></section>';
}

export function renderLabour() {
  return '<section class="page-head"><h1>Labour</h1><p class="lede">A tight labour market: unemployment of 2.5% in 2025, ' +
    'one of the lowest rates among advanced economies.</p></section>' +
    '<div class="kpi-grid">' +
    kpiCard({ label: 'Unemployment', value: '2.5%', note: 'of the labour force', source: 'World Bank WDI', year: 2025 }) +
    kpiCard({ label: 'Labour force', value: LABOUR.labourForce.value, note: 'people working or looking for work', source: 'ILOSTAT', year: 2025 }) +
    kpiCard({ label: 'Youth unemployment', value: LABOUR.youthUnemployment.value, note: LABOUR.youthUnemployment.note, source: 'ILO estimate', year: 2023 }) +
    kpiCard({ label: 'Women in the labour force', value: LABOUR.femaleParticipation.value, note: LABOUR.femaleParticipation.note, source: 'World Bank WDI', year: 2024 }) +
    '</div>' +
    '<div class="two-col">' + chartCard('unemployment', 'Unemployment rate, 2020–2025') +
    '<section class="card"><h3>Reading the labour market</h3><p>' + LABOUR.note + '</p>' +
    '<p>Men’s labour-force participation is ' + LABOUR.maleParticipation.value + ' ' + cite('World Bank WDI', 2024) + ', ' +
    'against ' + LABOUR.femaleParticipation.value + ' for women — a gap that has narrowed steadily over the past decade.</p>' +
    '<p>With unemployment near 2.5% for six straight years, employers report shortages in construction, care work and hospitality, ' +
    'and Japan has opened more work visas for foreign workers (Japanese government labour statistics, 2024).</p></section></div>';
}

export function renderPrices() {
  return '<section class="page-head"><h1>Prices</h1><p class="lede">After twenty years of near-zero inflation, consumer prices have risen ' +
    'more than 2% a year since 2022.</p></section>' +
    '<div class="kpi-grid">' +
    kpiCard({ label: 'Consumer inflation', value: PRICES.cpi2025.value, note: 'annual CPI change', source: 'World Bank WDI', year: 2025 }) +
    kpiCard({ label: 'Yen per US dollar', value: PRICES.yenPerDollar.value, note: PRICES.yenPerDollar.note, source: 'World Bank', year: 2024 }) +
    kpiCard({ label: 'Government debt', value: PRICES.debt.value, note: 'of GDP', source: 'IMF WEO', year: 2025 }) +
    '</div>' +
    '<div class="two-col">' + chartCard('inflation', 'Consumer price inflation, 2020–2025') +
    '<section class="card"><h3>Why prices matter now</h3><p>' + PRICES.gdpDeflatorNote + '</p>' +
    '<p>The Bank of Japan ended its negative interest-rate policy in 2024, the first rate rise in 17 years, ' +
    'as inflation stayed above its 2% target (Bank of Japan, 2024). A weaker yen — ' + PRICES.yenPerDollar.value + ' to the dollar in 2024 — ' +
    'has made imported energy and food more expensive, which is why the same GDP looks smaller in dollar terms than in yen terms.</p></section></div>';
}

export function renderTrade() {
  const products = TRADE.topExportProducts.map((p) =>
    '<div class="age-row"><span>' + p.name + '</span><div class="bar-track"><div class="bar-fill" style="width:' + p.share + '%"></div></div>' +
    '<strong>' + p.share + '%</strong></div>').join('');
  return '<section class="page-head"><h1>Trade</h1><p class="lede">Japan sold $921bn of goods and services abroad in 2024 and bought $958bn — ' +
    'a deficit of $37bn.</p></section>' +
    '<div class="kpi-grid">' +
    kpiCard({ label: 'Exports', value: '$' + TRADE.exportsGoodsServices.value + 'bn', note: 'goods & services, 22% of GDP', source: 'World Bank WDI', year: 2024 }) +
    kpiCard({ label: 'Imports', value: '$' + TRADE.importsGoodsServices.value + 'bn', note: 'goods & services', source: 'World Bank WDI', year: 2024 }) +
    kpiCard({ label: 'Goods exports', value: '$' + TRADE.goodsExports.value + 'bn', note: 'merchandise only', source: 'WTO', year: 2024 }) +
    kpiCard({ label: 'Services exports', value: '$' + TRADE.servicesExports.value + 'bn', note: 'travel, transport, finance, IP', source: 'WTO', year: 2024 }) +
    '</div>' +
    '<div class="two-col">' + chartCard('exports', 'Exports of goods and services, 2020–2024') +
    '<section class="card"><h3>What Japan sells</h3><p class="muted">Share of merchandise exports, 2024 (WTO / UN Comtrade).</p>' + products +
    '<p class="src-line">Source: WTO merchandise trade, 2024 · shares are of goods exports</p></section></div>' +
    '<section class="card"><h2>Trading partners</h2><p>' + TRADE.partnerNote + '</p>' +
    '<p>Top partners in 2024: ' + TRADE.topPartners.join(', ') + '. Japan imports most of its energy — crude oil, natural gas and coal are ' +
    'its largest import items — because it has almost no domestic fossil fuels (WTO, 2024).</p></section>';
}

export function renderSources() {
  const rows = SOURCES.map((s) => '<tr><td>' + s.name + '</td><td>' + s.what + '</td><td>' + s.licence + '</td></tr>').join('');
  return '<section class="page-head"><h1>Sources &amp; method</h1><p class="lede">Where every number on this site comes from, and how to check it.</p></section>' +
    '<section class="card"><div class="table-wrap"><table><thead><tr><th>Source</th><th>Used for</th><th>Licence / terms</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table></div>' +
    '<h2>Method notes</h2><ul class="points">' +
    '<li>Headline figures use the latest published year for each indicator — mostly 2025, trade 2024 — and the year is printed next to every figure.</li>' +
    '<li>Charts show the published annual series, 2020–2025. Where a year is not yet published (exports, 2025) the chart stops and says so.</li>' +
    '<li>Dollar GDP moves with the yen: a weaker yen lowers the dollar figure even when the economy grows in yen.</li>' +
    '<li>This site is an independent summary. It is not affiliated with the World Bank, the IMF, the ILO or the WTO, and it copies no other site’s text or design.</li>' +
    '</ul></section>';
}

export const ROUTES = {
  '/': { title: 'Overview', render: renderOverview },
  '/population': { title: 'Population', render: renderPopulation },
  '/economy': { title: 'Economy', render: renderEconomy },
  '/labour': { title: 'Labour', render: renderLabour },
  '/prices': { title: 'Prices', render: renderPrices },
  '/trade': { title: 'Trade', render: renderTrade },
  '/sources': { title: 'Sources', render: renderSources },
};
