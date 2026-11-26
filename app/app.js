// app.js — routing and wiring for Japan in Figures.
// One job: read the hash route, render the page, mount its charts, and wire
// the controls on that page (chart type toggles, table sort and filter).

import { ROUTES } from './pages.js';
import { SERIES } from './data.js';
import { drawSeriesChart } from './charts.js';

const NAV = [
  ['#/', 'Overview'],
  ['#/population', 'Population'],
  ['#/economy', 'Economy'],
  ['#/labour', 'Labour'],
  ['#/prices', 'Prices'],
  ['#/trade', 'Trade'],
  ['#/sources', 'Sources'],
];

const chartKinds = {};

function navHtml(active) {
  return NAV.map(([href, label]) =>
    '<a href="' + href + '"' + (href === active ? ' class="on" aria-current="page"' : '') + '>' + label + '</a>').join('');
}

function mountCharts(root) {
  root.querySelectorAll('canvas[data-series]').forEach((canvas) => {
    const key = canvas.getAttribute('data-series');
    const kind = chartKinds[key] || 'line';
    drawSeriesChart(canvas, SERIES[key], kind);
  });
  root.querySelectorAll('.chart-toggle').forEach((box) => {
    const key = box.getAttribute('data-chart');
    box.querySelectorAll('button').forEach((btn) => {
      btn.classList.toggle('on', (chartKinds[key] || 'line') === btn.getAttribute('data-kind'));
      btn.onclick = () => {
        chartKinds[key] = btn.getAttribute('data-kind');
        box.querySelectorAll('button').forEach((b) => b.classList.toggle('on', b === btn));
        const canvas = root.querySelector('canvas[data-series="' + key + '"]');
        if (canvas) drawSeriesChart(canvas, SERIES[key], chartKinds[key]);
      };
    });
  });
}

function wireTable(root) {
  const input = root.querySelector('#indicator-search');
  const table = root.querySelector('#indicator-table');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  if (input) {
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      tbody.querySelectorAll('tr').forEach((tr) => {
        tr.style.display = tr.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }
  let sortDir = 1;
  table.querySelectorAll('th[data-sort]').forEach((th) => {
    th.style.cursor = 'pointer';
    th.addEventListener('click', () => {
      const col = Number(th.getAttribute('data-sort'));
      sortDir = -sortDir;
      const rows = Array.from(tbody.querySelectorAll('tr'));
      rows.sort((a, b) => {
        const ta = a.children[col].textContent.trim();
        const tb = b.children[col].textContent.trim();
        const na = parseFloat(ta.replace(/[^0-9.\-]/g, ''));
        const nb = parseFloat(tb.replace(/[^0-9.\-]/g, ''));
        if (!Number.isNaN(na) && !Number.isNaN(nb) && col !== 0) return (na - nb) * sortDir;
        return ta.localeCompare(tb) * sortDir;
      });
      rows.forEach((r) => tbody.appendChild(r));
    });
  });
}

function render() {
  const hash = location.hash || '#/';
  const path = hash.slice(1) || '/';
  const route = ROUTES[path] || ROUTES['/'];
  const active = ROUTES[path] ? '#' + path : '#/';
  document.getElementById('site-nav').innerHTML = navHtml(active);
  const main = document.getElementById('page');
  main.innerHTML = route.render();
  document.title = route.title + ' — Japan in Figures';
  mountCharts(main);
  wireTable(main);
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
window.addEventListener('resize', () => {
  document.querySelectorAll('canvas[data-series]').forEach((canvas) => {
    const key = canvas.getAttribute('data-series');
    drawSeriesChart(canvas, SERIES[key], chartKinds[key] || 'line');
  });
});
render();
