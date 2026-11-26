// Small hand-drawn SVG charts. No library: each helper takes plain data and
// returns an SVG string that scales to its container via viewBox. Colours
// come from CSS classes in style.css so the charts follow the site palette.

export function esc(text) {
  return String(text).replace(/[&<>"']/g, (ch) => `&#${ch.charCodeAt(0)};`);
}

export function fmtNum(n, digits = 0) {
  return Number(n).toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function niceBounds(values) {
  let lo = Math.min(...values);
  let hi = Math.max(...values);
  if (lo > 0) lo = 0;
  if (hi === lo) hi = lo + 1;
  const pad = (hi - lo) * 0.08;
  return { lo: lo - (lo < 0 ? pad : 0), hi: hi + pad };
}

// Line chart for a time series: points are {year, value}.
// opts: {unit, digits, yLabel}
export function lineChart(points, opts = {}) {
  const W = 720, H = 300, L = 56, R = 16, T = 18, B = 34;
  const { lo, hi } = niceBounds(points.map((p) => p.value));
  const x0 = points[0].year, x1 = points[points.length - 1].year;
  const px = (year) => L + ((year - x0) / (x1 - x0 || 1)) * (W - L - R);
  const py = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const digits = opts.digits ?? 1;

  let grid = '';
  for (let i = 0; i <= 4; i++) {
    const v = lo + ((hi - lo) * i) / 4;
    const y = py(v).toFixed(1);
    grid += `<line class="chart-grid" x1="${L}" y1="${y}" x2="${W - R}" y2="${y}"/>` +
      `<text class="chart-tick" x="${L - 8}" y="${y}" dy="4" text-anchor="end">${fmtNum(v, digits)}</text>`;
  }

  const path = points.map((p, i) => `${i ? 'L' : 'M'}${px(p.year).toFixed(1)},${py(p.value).toFixed(1)}`).join(' ');
  const dots = points
    .map((p) => `<circle class="chart-dot" cx="${px(p.year).toFixed(1)}" cy="${py(p.value).toFixed(1)}" r="3.5"><title>${p.year}: ${fmtNum(p.value, digits)}</title></circle>`)
    .join('');
  const labels = points
    .map((p) => `<text class="chart-val" x="${px(p.year).toFixed(1)}" y="${(py(p.value) - 9).toFixed(1)}" text-anchor="middle">${fmtNum(p.value, digits)}</text>`)
    .join('');
  const years = points
    .map((p) => `<text class="chart-tick" x="${px(p.year).toFixed(1)}" y="${H - 10}" text-anchor="middle">${p.year}</text>`)
    .join('');
  const zero = lo < 0
    ? `<line class="chart-zero" x1="${L}" y1="${py(0).toFixed(1)}" x2="${W - R}" y2="${py(0).toFixed(1)}"/>`
    : '';
  const unit = opts.unit ? `<text class="chart-unit" x="${L}" y="12">${esc(opts.unit)}</text>` : '';

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.yLabel || 'line chart')}">${grid}${zero}<path class="chart-line" d="${path}"/>${dots}${labels}${years}${unit}</svg>`;
}

// Vertical bar chart for a time series with possible negatives (growth).
export function barChart(points, opts = {}) {
  const W = 720, H = 300, L = 56, R = 16, T = 22, B = 34;
  const { lo, hi } = niceBounds(points.map((p) => p.value));
  const plotW = W - L - R;
  const slot = plotW / points.length;
  const barW = Math.min(44, slot * 0.62);
  const py = (v) => T + (1 - (v - lo) / (hi - lo)) * (H - T - B);
  const digits = opts.digits ?? 1;
  const zeroY = py(Math.max(lo, 0));

  let grid = '';
  for (let i = 0; i <= 4; i++) {
    const v = lo + ((hi - lo) * i) / 4;
    const y = py(v).toFixed(1);
    grid += `<line class="chart-grid" x1="${L}" y1="${y}" x2="${W - R}" y2="${y}"/>` +
      `<text class="chart-tick" x="${L - 8}" y="${y}" dy="4" text-anchor="end">${fmtNum(v, digits)}</text>`;
  }

  const bars = points.map((p, i) => {
    const cx = L + slot * i + slot / 2;
    const top = Math.min(py(p.value), zeroY);
    const height = Math.max(1, Math.abs(py(p.value) - zeroY));
    const cls = p.value < 0 ? 'chart-bar neg' : 'chart-bar';
    const labelY = p.value < 0 ? top + height + 14 : top - 6;
    return `<rect class="${cls}" x="${(cx - barW / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${barW.toFixed(1)}" height="${height.toFixed(1)}" rx="2"><title>${p.year}: ${fmtNum(p.value, digits)}</title></rect>` +
      `<text class="chart-val" x="${cx.toFixed(1)}" y="${labelY.toFixed(1)}" text-anchor="middle">${fmtNum(p.value, digits)}</text>` +
      `<text class="chart-tick" x="${cx.toFixed(1)}" y="${H - 10}" text-anchor="middle">${p.year}</text>`;
  }).join('');

  const unit = opts.unit ? `<text class="chart-unit" x="${L}" y="12">${esc(opts.unit)}</text>` : '';
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.yLabel || 'bar chart')}">${grid}${bars}${unit}</svg>`;
}

// Horizontal bars for labelled shares (age groups, enrolment).
// bars are {label, value}; values are percents unless opts.max says otherwise.
export function hBarChart(bars, opts = {}) {
  const rowH = 26;
  const W = 720, L = 150, R = 64, T = 8;
  const H = T + bars.length * rowH + 8;
  const max = opts.max ?? Math.max(...bars.map((b) => b.value));
  const digits = opts.digits ?? 1;
  const suffix = opts.suffix ?? '%';

  const rows = bars.map((b, i) => {
    const y = T + i * rowH;
    const w = Math.max(2, (b.value / max) * (W - L - R));
    return `<text class="chart-tick" x="${L - 10}" y="${y + 15}" text-anchor="end">${esc(b.label)}</text>` +
      `<rect class="chart-bar" x="${L}" y="${y + 3}" width="${w.toFixed(1)}" height="${rowH - 8}" rx="2"><title>${esc(b.label)}: ${fmtNum(b.value, digits)}${suffix}</title></rect>` +
      `<text class="chart-val" x="${(L + w + 8).toFixed(1)}" y="${y + 16}">${fmtNum(b.value, digits)}${suffix}</text>`;
  }).join('');

  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(opts.yLabel || 'horizontal bar chart')}">${rows}</svg>`;
}

// One stacked share bar (urban vs rural, or a province's share of the nation).
export function shareBar(percent, leftLabel, rightLabel) {
  const pct = Math.min(100, Math.max(0, percent));
  return `<div class="sharebar" role="img" aria-label="${esc(leftLabel)} ${pct.toFixed(1)} percent">` +
    `<span class="sharebar-fill" style="width:${pct.toFixed(1)}%"></span></div>` +
    `<div class="sharebar-labels"><span>${esc(leftLabel)}</span><span>${esc(rightLabel)}</span></div>`;
}
