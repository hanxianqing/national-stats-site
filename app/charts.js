// charts.js — small canvas charts drawn by this site's own code.
// One job: turn a {years, values} series into a readable line or bar chart
// with a hover readout. No chart library, no network.

function setupCanvas(canvas, heightCss) {
  const dpr = window.devicePixelRatio || 1;
  const widthCss = canvas.clientWidth || canvas.parentElement.clientWidth || 600;
  canvas.style.height = heightCss + 'px';
  canvas.width = Math.round(widthCss * dpr);
  canvas.height = Math.round(heightCss * dpr);
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { ctx, width: widthCss, height: heightCss };
}

function niceTicks(min, max) {
  // Aim for about 4 gridlines: pick a 1/2/5 step, never a step of 1 on a
  // span of a dozen (that crowds the axis with a label on every unit).
  const span = max - min || 1;
  const raw = span / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const ratio = raw / mag;
  const step = mag * (ratio <= 1 ? 1 : ratio <= 2 ? 2 : ratio <= 5 ? 5 : 10);
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = lo; v <= hi + step * 0.001; v += step) ticks.push(Math.round(v * 1000) / 1000);
  return ticks;
}

function formatTick(v) {
  if (Math.abs(v) >= 1000) return (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1) + 'k';
  if (Number.isInteger(v)) return String(v);
  return v.toFixed(1);
}

// Draw a series chart. `type` is 'line' or 'bar'; hover shows the value.
export function drawSeriesChart(canvas, series, type) {
  const { ctx, width, height } = setupCanvas(canvas, 240);
  const pad = { left: 52, right: 14, top: 14, bottom: 30 };
  const points = series.years.map((y, i) => ({ year: y, value: series.values[i] })).filter((p) => p.value !== null);
  const vals = points.map((p) => p.value);
  let min = Math.min(...vals);
  let max = Math.max(...vals);
  if (min > 0 && min / max > 0.7) min = min * 0.92;
  if (min < 0) min = Math.min(min * 1.1, min - 0.5);
  if (max < 0) max = 0;
  const ticks = niceTicks(min, max);
  min = Math.min(min, ticks[0]);
  max = Math.max(max, ticks[ticks.length - 1]);
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;
  const x = (i) => pad.left + (plotW * i) / (series.years.length - 1 || 1);
  const y = (v) => pad.top + plotH * (1 - (v - min) / (max - min));

  ctx.clearRect(0, 0, width, height);
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = '#5b6472';
  ctx.strokeStyle = '#e3e6ea';
  ctx.lineWidth = 1;
  for (const t of ticks) {
    const yy = y(t);
    ctx.beginPath();
    ctx.moveTo(pad.left, yy);
    ctx.lineTo(width - pad.right, yy);
    ctx.stroke();
    ctx.textAlign = 'right';
    ctx.fillText(formatTick(t), pad.left - 8, yy + 4);
  }
  ctx.fillStyle = '#5b6472';
  ctx.textAlign = 'center';
  series.years.forEach((yr, i) => ctx.fillText(String(yr), x(i), height - 8));

  const accent = '#c0392b';
  const ink = '#1b2a4a';
  if (type === 'bar') {
    const bw = Math.min(44, (plotW / series.years.length) * 0.55);
    points.forEach((p) => {
      const i = series.years.indexOf(p.year);
      const top = y(Math.max(p.value, 0));
      const base = y(0) > pad.top + plotH ? pad.top + plotH : y(0);
      ctx.fillStyle = p.value < 0 ? '#8a6d3b' : accent;
      ctx.fillRect(x(i) - bw / 2, Math.min(top, base), bw, Math.abs(base - top));
    });
  } else {
    ctx.beginPath();
    points.forEach((p, i) => {
      const xi = x(series.years.indexOf(p.year));
      if (i === 0) ctx.moveTo(xi, y(p.value));
      else ctx.lineTo(xi, y(p.value));
    });
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.beginPath();
    points.forEach((p) => {
      const xi = x(series.years.indexOf(p.year));
      ctx.moveTo(xi + 4, y(p.value));
      ctx.arc(xi, y(p.value), 4, 0, Math.PI * 2);
    });
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
  // Value labels on the points; a label near the top goes below the point
  // so it is never clipped by the chart's edge.
  ctx.fillStyle = ink;
  ctx.font = 'bold 12px system-ui, sans-serif';
  ctx.textAlign = 'center';
  points.forEach((p) => {
    const xi = x(series.years.indexOf(p.year));
    const yy = y(p.value);
    ctx.fillText(formatTick(p.value), xi, yy - 10 < pad.top ? yy + 18 : yy - 10);
  });

  // Hover readout.
  const readout = canvas.parentElement.querySelector('.chart-readout');
  canvas.onmousemove = (ev) => {
    const rect = canvas.getBoundingClientRect();
    const mx = ev.clientX - rect.left;
    let best = null;
    let bestDist = Infinity;
    points.forEach((p) => {
      const d = Math.abs(x(series.years.indexOf(p.year)) - mx);
      if (d < bestDist) { bestDist = d; best = p; }
    });
    if (best && readout) readout.textContent = best.year + ': ' + best.value + ' ' + series.unit;
  };
  canvas.onmouseleave = () => {
    if (readout) readout.textContent = 'Hover a point to read its value · ' + series.source;
  };
}

// Donut chart for shares (age structure, export products).
export function drawDonut(canvas, slices, colors) {
  const { ctx, width, height } = setupCanvas(canvas, 220);
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 14;
  const total = slices.reduce((s, p) => s + p.pct, 0);
  let start = -Math.PI / 2;
  ctx.clearRect(0, 0, width, height);
  slices.forEach((s, i) => {
    const sweep = (s.pct / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, start + sweep);
    ctx.closePath();
    ctx.fillStyle = colors[i % colors.length];
    ctx.fill();
    start += sweep;
  });
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  ctx.fillStyle = '#1b2a4a';
  ctx.font = 'bold 15px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(slices[0].centerLabel || '', cx, cy - 2);
  ctx.font = '12px system-ui, sans-serif';
  ctx.fillStyle = '#5b6472';
  ctx.fillText(slices[0].centerSub || '', cx, cy + 16);
}
