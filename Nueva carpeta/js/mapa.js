/*
  Mapa de rooms para el editor de áreas ROM24
  Autor: ChatGPT
  
  Este módulo se auto-integra:
  - Inserta la pestaña MAPA y su sección si no existen
  - Lee las rooms y salidas desde el DOM (cards) de #ROOMS, con selectores flexibles
  - Construye un grafo y hace un layout en cuadrícula según las direcciones 0–9
  - Renderiza un SVG con pan/zoom, búsqueda y coloreado básico

  Dependencias: ninguna. Funciona con JS puro.
*/
(function () {
  const DIR = {
    0: { dx: 0, dy: -1, name: 'N' },
    1: { dx: 1, dy: 0, name: 'E' },
    2: { dx: 0, dy: 1, name: 'S' },
    3: { dx: -1, dy: 0, name: 'O' },
    4: { dz: 1, name: 'U' },
    5: { dz: -1, name: 'D' },
    6: { dx: 1, dy: -1, name: 'NE' },
    7: { dx: -1, dy: -1, name: 'NO' },
    8: { dx: 1, dy: 1, name: 'SE' },
    9: { dx: -1, dy: 1, name: 'SO' },
  };

  const CELL = 160; // tamaño de celda en px
  const NODE_W = 120;
  const NODE_H = 56;

  const STATE = {
    rooms: new Map(), // vnum -> {vnum,name,sector,flags}
    edges: [], // {from,to,dir,doorState,keyword,keyVnum,desc}
    pos: new Map(), // vnum -> {x,y,z}
    options: {
      layersUD: false,
      colorBy: 'none', // none|sector|flags
    },
    svg: null,
    gMain: null,
    gEdges: null,
    gNodes: null,
    view: { x: 0, y: 0, k: 1 },
    dragging: false,
    dragStart: { x: 0, y: 0 },
    viewStart: { x: 0, y: 0 },
  };

  // Instalación de la pestaña y sección MAPA si no existe
  function ensureUI() {
    // Botón en la barra de navegación
    const nav = document.querySelector('nav ul');
    if (nav && !nav.querySelector('button[data-section="mapa"]')) {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.className = 'nav-btn';
      btn.dataset.section = 'mapa';
      btn.textContent = 'MAPA';
      li.appendChild(btn);
      nav.appendChild(li);
      btn.addEventListener('click', () => switchSection('mapa'));
    }

    // Sección contenedora
    let sec = document.getElementById('mapa');
    if (!sec) {
      sec = document.createElement('section');
      sec.id = 'mapa';
      sec.className = 'section';
      sec.style.display = 'none';
      sec.innerHTML = `
        <div class="map-toolbar">
          <input id="mapa-search" placeholder="Buscar por vnum o nombre" />
          <select id="mapa-color-by">
            <option value="none">Colores neutros</option>
            <option value="sector">Colorear por sector</option>
            <option value="flags">Colorear por flags</option>
          </select>
          <button id="mapa-refrescar">Refrescar</button>
          <button id="mapa-centrar">Centrar</button>
          <label class="mapa-capas"><input type="checkbox" id="mapa-capas" /> Separar U/D por capas</label>
        </div>
        <div id="mapa-viewport" class="map-viewport"></div>
      `;
      const main = document.querySelector('.main-container');
      if (main) main.appendChild(sec);
      else document.body.appendChild(sec);
    }

    // Wire toolbar
    const search = document.getElementById('mapa-search');
    if (search) search.addEventListener('change', () => focusSearch(search.value.trim()));

    const colorSel = document.getElementById('mapa-color-by');
    if (colorSel)
      colorSel.addEventListener('change', () => {
        STATE.options.colorBy = colorSel.value;
        render();
      });

    const chk = document.getElementById('mapa-capas');
    if (chk)
      chk.addEventListener('change', () => {
        STATE.options.layersUD = chk.checked;
        layout();
        render();
      });

    const btnRef = document.getElementById('mapa-refrescar');
    if (btnRef) btnRef.addEventListener('click', () => refresh());

    const btnCenter = document.getElementById('mapa-centrar');
    if (btnCenter) btnCenter.addEventListener('click', () => centerView());

    // Eventos de navegación global existentes
    document.querySelectorAll('.nav-btn').forEach((b) => {
      if (b.dataset.section === 'mapa') return; // ya hecho arriba
      b.addEventListener('click', () => {
        // Oculta MAPA al cambiar de pestaña
        const secMapa = document.getElementById('mapa');
        if (secMapa) secMapa.style.display = 'none';
      });
    });
  }

  function switchSection(id) {
    document.querySelectorAll('.section').forEach((s) => (s.style.display = 'none'));
    const sec = document.getElementById(id);
    if (sec) sec.style.display = '';
  }

  // Recolecta rooms y edges desde el DOM con selectores tolerantes
  function collectGraphFromDOM() {
    STATE.rooms.clear();
    STATE.edges = [];

    // Detecta cards de room: intentamos varios selectores
    const roomCards = document.querySelectorAll('.room-card, .room, [data-room="card"]');
    roomCards.forEach((card) => {
      const vnum = readVnum(card);
      if (vnum == null) return;
      const name = readName(card) || `Room ${vnum}`;
      const sector = readSector(card) || 'unknown';
      const flags = readFlags(card) || [];
      STATE.rooms.set(vnum, { vnum, name, sector, flags });

      const exits = readExits(card);
      exits.forEach((ex) => {
        if (ex.dest == null || ex.dir == null) return;
        STATE.edges.push({
          from: vnum,
          to: ex.dest,
          dir: ex.dir,
          doorState: ex.state || 0,
          keyword: ex.keyword || '',
          keyVnum: ex.keyVnum ?? -1,
          desc: ex.desc || '',
        });
      });
    });
  }

  // Lectores tolerantes
  function readVnum(card) {
    const ds = card.dataset;
    if (ds && ds.vnum) {
      const n = parseInt(ds.vnum, 10);
      return Number.isFinite(n) ? n : null;
    }
    // Busca por input/elemento etiquetado VNUM
    const v = card.querySelector('[name="room-vnum"], .room-vnum, [data-field="vnum"]');
    if (v) {
      const t = (v.value ?? v.textContent ?? '').trim();
      const n = parseInt(t, 10);
      return Number.isFinite(n) ? n : null;
    }
    return null;
  }

  function readName(card) {
    if (card.dataset && card.dataset.name) return card.dataset.name;
    const el = card.querySelector('[name="room-name"], .room-name, [data-field="name"], h3, .card-title');
    return el ? (el.value ?? el.textContent ?? '').trim() : '';
  }

  function readSector(card) {
    if (card.dataset && card.dataset.sector) return card.dataset.sector;
    const el = card.querySelector('[name="room-sector"], .room-sector, [data-field="sector"]');
    return el ? (el.value ?? el.textContent ?? '').trim() : '';
  }

  function readFlags(card) {
    if (card.dataset && card.dataset.flags) {
      try { return JSON.parse(card.dataset.flags); } catch {}
      return (card.dataset.flags || '').split(/[,\s]+/).filter(Boolean);
    }
    // checkboxes
    const checks = card.querySelectorAll('[name^="room-flag-"], .room-flag');
    const out = [];
    checks.forEach((c) => {
      const on = c.checked ?? c.getAttribute('aria-checked') === 'true';
      if (on) out.push(c.value || c.dataset.flag || c.name);
    });
    return out;
  }

  function readExits(card) {
    const exits = [];
    // filas de salida con data-*
    const rows = card.querySelectorAll('.exit-row, .sub-item-row-grid, [data-exit-row]');
    rows.forEach((row) => {
      let dir = readDir(row);
      let dest = readDest(row);
      if (dir == null || dest == null) return;
      const state = readDoorState(row);
      const keyword = readKeyword(row);
      const keyVnum = readKeyVnum(row);
      const desc = readDesc(row);
      exits.push({ dir, dest, state, keyword, keyVnum, desc });
    });
    return exits;
  }

  function readDir(row) {
    if (row.dataset && row.dataset.dir != null) return parseInt(row.dataset.dir, 10);
    const sel = row.querySelector('[name*="dir"], [data-field="dir"], .exit-dir');
    if (sel) return parseInt((sel.value ?? sel.textContent).trim(), 10);
    return null;
  }
  function readDest(row) {
    if (row.dataset && row.dataset.dest != null) return parseInt(row.dataset.dest, 10);
    const el = row.querySelector('[name*="dest"], [data-field="dest"], .exit-dest');
    if (!el) return null;
    const t = (el.value ?? el.textContent ?? '').trim();
    const n = parseInt(t, 10);
    return Number.isFinite(n) ? n : null;
  }
  function readDoorState(row) {
    if (row.dataset && row.dataset.doorState != null) return parseInt(row.dataset.doorState, 10);
    const el = row.querySelector('[name*="state"], [data-field="state"], .exit-state');
    if (!el) return 0;
    const t = (el.value ?? el.textContent ?? '').trim();
    const n = parseInt(t, 10);
    return Number.isFinite(n) ? n : 0;
  }
  function readKeyword(row) {
    if (row.dataset && row.dataset.keyword != null) return row.dataset.keyword;
    const el = row.querySelector('[name*="keyword"], [data-field="keyword"], .exit-keyword');
    return el ? (el.value ?? el.textContent ?? '').trim() : '';
  }
  function readKeyVnum(row) {
    if (row.dataset && row.dataset.keyVnum != null) return parseInt(row.dataset.keyVnum, 10);
    const el = row.querySelector('[name*="key"], [data-field="key"], .exit-key');
    if (!el) return -1;
    const n = parseInt((el.value ?? el.textContent ?? '').trim(), 10);
    return Number.isFinite(n) ? n : -1;
  }
  function readDesc(row) {
    const el = row.querySelector('[name*="desc"], [data-field="desc"], .exit-desc, textarea');
    return el ? (el.value ?? el.textContent ?? '').trim() : '';
  }

  // Layout BFS en cuadrícula
  function layout() {
    STATE.pos.clear();
    const seen = new Set();
    // Construir adyacencias por room
    const adj = new Map();
    STATE.edges.forEach((e) => {
      if (!adj.has(e.from)) adj.set(e.from, []);
      adj.get(e.from).push(e);
      // También añadimos inversa si existe de facto (no forzamos)
    });

    // Si no hay rooms, nada que hacer
    if (STATE.rooms.size === 0) return;

    // Componentes: empezamos por vnum más pequeño
    const vnumbs = Array.from(STATE.rooms.keys()).sort((a, b) => a - b);
    const occupied = new Set(); // llaves "x,y,z"

    function key(x, y, z) { return `${x},${y},${z}`; }

    // Para cada componente
    for (const seed of vnumbs) {
      if (seen.has(seed)) continue;
      // BFS
      const q = [];
      let z0 = 0;
      place(seed, 0, 0, z0);
      q.push(seed);
      seen.add(seed);

      while (q.length) {
        const u = q.shift();
        const pu = STATE.pos.get(u);
        const neigh = adj.get(u) || [];
        for (const e of neigh) {
          const v = e.to;
          if (!STATE.rooms.has(v)) continue;
          if (STATE.options.layersUD && (e.dir === 4 || e.dir === 5)) {
            const dz = e.dir === 4 ? 1 : -1;
            tryPlaceNeighbor(u, v, 0, 0, dz);
          } else {
            const d = DIR[e.dir];
            const dx = d && typeof d.dx === 'number' ? d.dx : 0;
            const dy = d && typeof d.dy === 'number' ? d.dy : 0;
            tryPlaceNeighbor(u, v, dx, dy, 0);
          }
          if (!seen.has(v)) { q.push(v); seen.add(v); }
        }
      }
    }

    function place(vnum, x, y, z) {
      const k = key(x, y, z);
      let nx = x, ny = y, nz = z;
      let i = 0;
      while (occupied.has(key(nx, ny, nz))) {
        // pequeña espiral para resolver colisiones
        i++;
        nx = x + (i % 3) - 1;
        ny = y + ((Math.floor(i / 3)) % 3) - 1;
      }
      STATE.pos.set(vnum, { x: nx, y: ny, z: nz });
      occupied.add(key(nx, ny, nz));
    }

    function tryPlaceNeighbor(u, v, dx, dy, dz) {
      const pu = STATE.pos.get(u) || { x: 0, y: 0, z: 0 };
      const target = { x: pu.x + dx, y: pu.y + dy, z: pu.z + dz };
      if (!STATE.pos.has(v)) {
        place(v, target.x, target.y, target.z);
      }
    }
  }

  // Renderizado SVG con pan/zoom
  function render() {
    const vp = document.getElementById('mapa-viewport');
    if (!vp) return;
    vp.innerHTML = '';

    const svg = createSVG('svg', {
      width: '100%', height: '100%', viewBox: '0 0 1200 800',
      class: 'map-svg',
    });
    STATE.svg = svg;

    const gMain = createSVG('g', { class: 'g-main' });
    const gEdges = createSVG('g', { class: 'g-edges' });
    const gNodes = createSVG('g', { class: 'g-nodes' });

    gMain.appendChild(gEdges);
    gMain.appendChild(gNodes);
    svg.appendChild(gMain);

    STATE.gMain = gMain;
    STATE.gEdges = gEdges;
    STATE.gNodes = gNodes;

    // Dibujar edges primero
    for (const e of STATE.edges) {
      if (!STATE.pos.has(e.from) || !STATE.pos.has(e.to)) continue;
      const p1 = gridToPx(STATE.pos.get(e.from));
      const p2 = gridToPx(STATE.pos.get(e.to));
      // Evita dibujar duplicadas (dibujamos solo from<to)
      if (e.from > e.to && roughlyEqual(p1, p2)) continue;
      const line = createSVG('line', {
        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
        class: 'edge',
      });
      gEdges.appendChild(line);

      // Puerta: marcador a mitad
      if (e.doorState && e.doorState !== 0) {
        const mx = (p1.x + p2.x) / 2;
        const my = (p1.y + p2.y) / 2;
        const icon = createSVG('circle', { cx: mx, cy: my, r: 6, class: 'edge-door' });
        icon.title = `Puerta${e.keyword ? ': ' + e.keyword : ''}`;
        gEdges.appendChild(icon);
      }
    }

    // Dibujar nodos
    for (const [vnum, room] of STATE.rooms) {
      const p = STATE.pos.get(vnum);
      if (!p) continue;
      const { x, y } = gridToPx(p);
      const g = createSVG('g', { class: 'node', transform: `translate(${x - NODE_W / 2}, ${y - NODE_H / 2})` });

      const colorClass = colorClassFor(room);
      const rect = createSVG('rect', { rx: 8, ry: 8, width: NODE_W, height: NODE_H, class: `node-rect ${colorClass}` });
      const title = `${vnum} - ${room.name}`;
      const text = createSVG('text', { x: NODE_W / 2, y: NODE_H / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'node-text' });
      text.textContent = truncate(title, 26);

      const tooltip = createSVG('title', {});
      tooltip.textContent = buildTooltip(room);

      g.appendChild(rect);
      g.appendChild(text);
      g.appendChild(tooltip);

      g.addEventListener('click', () => scrollToRoomCard(vnum));

      STATE.gNodes.appendChild(g);
    }

    vp.appendChild(svg);

    // Pan/zoom básico
    wirePanZoom(svg);
  }

  function wirePanZoom(svg) {
    updateTransform();

    svg.addEventListener('wheel', (ev) => {
      ev.preventDefault();
      const delta = Math.sign(ev.deltaY);
      const factor = delta > 0 ? 0.9 : 1.1;
      const pt = clientToSvg(ev.clientX, ev.clientY);
      zoomAt(pt.x, pt.y, factor);
    }, { passive: false });

    svg.addEventListener('mousedown', (ev) => {
      STATE.dragging = true;
      STATE.dragStart = { x: ev.clientX, y: ev.clientY };
      STATE.viewStart = { x: STATE.view.x, y: STATE.view.y };
    });
    window.addEventListener('mousemove', (ev) => {
      if (!STATE.dragging) return;
      const dx = ev.clientX - STATE.dragStart.x;
      const dy = ev.clientY - STATE.dragStart.y;
      STATE.view.x = STATE.viewStart.x + dx;
      STATE.view.y = STATE.viewStart.y + dy;
      updateTransform();
    });
    window.addEventListener('mouseup', () => (STATE.dragging = false));
  }

  function clientToSvg(cx, cy) {
    const svg = STATE.svg;
    const pt = svg.createSVGPoint();
    pt.x = cx; pt.y = cy;
    const ctm = svg.getScreenCTM().inverse();
    const p = pt.matrixTransform(ctm);
    return p;
  }

  function zoomAt(cx, cy, factor) {
    const v = STATE.view;
    const kNew = clamp(v.k * factor, 0.2, 3);
    // mantener punto (cx,cy) estable
    v.x = cx - (cx - v.x) * (kNew / v.k);
    v.y = cy - (cy - v.y) * (kNew / v.k);
    v.k = kNew;
    updateTransform();
  }

  function updateTransform() {
    if (!STATE.gMain) return;
    const { x, y, k } = STATE.view;
    STATE.gMain.setAttribute('transform', `translate(${x},${y}) scale(${k})`);
  }

  function centerView() {
    // centra el conjunto de nodos
    const pts = Array.from(STATE.pos.values()).map(gridToPx);
    if (pts.length === 0) return;
    const minX = Math.min(...pts.map((p) => p.x));
    const maxX = Math.max(...pts.map((p) => p.x));
    const minY = Math.min(...pts.map((p) => p.y));
    const maxY = Math.max(...pts.map((p) => p.y));
    const vp = document.getElementById('mapa-viewport');
    const w = vp.clientWidth || 1200;
    const h = vp.clientHeight || 800;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    STATE.view.k = 1;
    STATE.view.x = w / 2 - cx;
    STATE.view.y = h / 2 - cy;
    updateTransform();
  }

  function focusSearch(q) {
    if (!q) return;
    let targetVnum = null;
    if (/^\d+$/.test(q)) {
      const n = parseInt(q, 10);
      if (STATE.rooms.has(n)) targetVnum = n;
    } else {
      for (const [v, r] of STATE.rooms) {
        if (r.name.toLowerCase().includes(q.toLowerCase())) { targetVnum = v; break; }
      }
    }
    if (targetVnum == null) return;
    const p = gridToPx(STATE.pos.get(targetVnum));
    const vp = document.getElementById('mapa-viewport');
    const w = vp.clientWidth || 1200;
    const h = vp.clientHeight || 800;
    STATE.view.x = w / 2 - p.x;
    STATE.view.y = h / 2 - p.y;
    updateTransform();
    // flash del nodo
    flashNode(targetVnum);
  }

  function flashNode(vnum) {
    const idx = Array.from(STATE.rooms.keys()).indexOf(vnum);
    if (idx < 0) return;
    const node = STATE.gNodes?.children[idx];
    if (!node) return;
    node.classList.add('flash');
    setTimeout(() => node.classList.remove('flash'), 800);
  }

  function scrollToRoomCard(vnum) {
    // busca card con data-vnum y hace scroll
    const card = document.querySelector(`.room-card[data-vnum="${vnum}"]`) ||
                 findCardByVnumFallback(vnum);
    if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function findCardByVnumFallback(vnum) {
    const all = document.querySelectorAll('.room-card, .room, [data-room="card"]');
    for (const c of all) {
      const v = readVnum(c);
      if (v === vnum) return c;
    }
    return null;
  }

  function buildTooltip(room) {
    const f = Array.isArray(room.flags) ? room.flags.join(', ') : String(room.flags || '');
    return `${room.vnum} - ${room.name}\nSector: ${room.sector || '-'}\nFlags: ${f || '-'}`;
  }

  function colorClassFor(room) {
    switch (STATE.options.colorBy) {
      case 'sector': return `sector-${sanitize(room.sector)}`;
      case 'flags': {
        const f = (room.flags || []).map(sanitize);
        if (f.includes('Safe')) return 'flag-safe';
        if (f.includes('No_Recall') || f.includes('NoRecall') || f.includes('No-Recall')) return 'flag-norecall';
        if (f.includes('Law')) return 'flag-law';
        return 'flag-other';
      }
      default: return 'neutral';
    }
  }

  function sanitize(s) {
    return String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function gridToPx(p) {
    return { x: p.x * CELL, y: p.y * CELL };
  }

  function roughlyEqual(a, b) { return a.x === b.x && a.y === b.y; }
  function clamp(x, a, b) { return Math.max(a, Math.min(b, x)); }
  function truncate(t, n) { return t.length > n ? t.slice(0, n - 1) + '…' : t; }

  function createSVG(tag, attrs) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  // Ciclo de refresco completo
  function refresh() {
    collectGraphFromDOM();
    layout();
    render();
    centerView();
  }

  // Exponer refresco público por si la app principal quiere llamarlo
  window.MapaRooms = { refresh };

  // Estilos por defecto si no existen
  function ensureStyles() {
    if (document.getElementById('mapa-inline-style')) return;
    const css = document.createElement('style');
    css.id = 'mapa-inline-style';
    css.textContent = `
      .map-viewport { position: relative; width: 100%; height: calc(100vh - 180px); background: #fafafa; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; }
      .map-toolbar { display: flex; gap: 8px; align-items: center; margin-bottom: 8px; flex-wrap: wrap; }
      .map-svg { width: 100%; height: 100%; cursor: grab; }
      .map-svg:active { cursor: grabbing; }
      .g-edges .edge { stroke: #999; stroke-width: 2; }
      .g-edges .edge-door { fill: none; stroke: #333; stroke-width: 2; }
      .node-rect.neutral { fill: #ffffff; stroke: #333; stroke-width: 1.2; }
      .node-rect.flag-safe { fill: #e6ffe6; stroke: #2f8f2f; }
      .node-rect.flag-norecall { fill: #fff0f0; stroke: #b3261e; }
      .node-rect.flag-law { fill: #eef3ff; stroke: #3451b2; }
      .node-rect.flag-other { fill: #f7f7ff; stroke: #666; }
      .node-text { font: 12px/1.2 system-ui, sans-serif; fill: #222; }
      .node.flash .node-rect { filter: drop-shadow(0 0 6px rgba(0,0,0,0.4)); }
      /* Colores de sector ejemplo */
      .node-rect.sector-city { fill: #ffe; stroke: #aa8; }
      .node-rect.sector-field { fill: #efe; stroke: #8a8; }
      .node-rect.sector-forest { fill: #e8ffe8; stroke: #6a6; }
      .node-rect.sector-desert { fill: #fff2e0; stroke: #c96; }
      .node-rect.sector-water { fill: #e8f4ff; stroke: #5aa; }
    `;
    document.head.appendChild(css);
  }

  // Inicialización diferida (espera al DOM)
  function init() {
    ensureUI();
    ensureStyles();
    // Si la app tiene un evento propio tras cargar #ROOMS, podemos enganchar aquí en el futuro.
    // Por ahora refrescamos cuando el usuario entra a la pestaña MAPA.

    const btnMapa = document.querySelector('button.nav-btn[data-section="mapa"]');
    if (btnMapa) {
      btnMapa.addEventListener('click', () => {
        // pequeño timeout por si la UI aún está renderizando
        setTimeout(() => refresh(), 0);
      });
    }
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', init);
  else init();
})();
