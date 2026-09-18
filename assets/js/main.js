/* =========================================================
   MÔ ĐI PHÊ HOUSE — script dùng chung cho mọi trang
   Header / footer · song ngữ VI/EN · slider · thẻ nhà · trang nhà
   · bộ xem ảnh · form đặt phòng (WhatsApp / Zalo / Google Sheet)
   Dữ liệu nằm trong data.js
   ========================================================= */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
let LANG = store.get('mo-lang', 'vi');
const t = (vi, en) => (LANG === 'en' ? en : vi);
const L = o => (o && typeof o === 'object' ? o[LANG] : o);
const houseName = h => (LANG === 'en' && h.nameEn ? h.nameEn : h.name);

/* ---------- Icon ---------- */
const sv = (d, w = 1.4) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICON = {
  menu: sv('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: sv('<path d="m6 6 12 12M18 6 6 18"/>'),
  arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h15m-5-6 6 6-6 6"/></svg>',
  left: sv('<path d="m15 5-7 7 7 7"/>', 1.5),
  right: sv('<path d="m9 5 7 7-7 7"/>', 1.5),
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 5 5 9-10"/></svg>',
  chat: sv('<path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9.5h8M8 12.5h5"/>'),
  phone: sv('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"/>'),
  pin: sv('<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>'),
  camera: sv('<path d="M4 8h3l2-2.5h6L17 8h3v11H4V8Z"/><circle cx="12" cy="13" r="3.5"/>'),
  guests: sv('<circle cx="9" cy="8" r="3"/><path d="M3.5 19c.8-3.3 3-5 5.5-5s4.7 1.7 5.5 5"/><circle cx="17" cy="9" r="2.3"/><path d="M16 14c2.3 0 4 1.4 4.6 4"/>'),
  bed: sv('<path d="M3 18V7M3 14h18v4M21 14v-2.5a3 3 0 0 0-3-3h-7V14"/><circle cx="7" cy="11" r="1.8"/>'),
  pool: sv('<path d="M3 17c1.5 0 1.5 1 3 1s1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1"/><path d="M8 15V5.5a2 2 0 0 1 4 0M16 15V5.5a2 2 0 0 0-4 0M8 9h8M8 12.5h8"/>'),
  wave: sv('<path d="M3 15c2 0 2-2 4.5-2s2.5 2 4.5 2 2-2 4.5-2 2.5 2 4.5 2M3 19c2 0 2-2 4.5-2s2.5 2 4.5 2 2-2 4.5-2 2.5 2 4.5 2"/><circle cx="16" cy="6.5" r="2.5"/>'),
  wifi: sv('<path d="M2.5 9a14 14 0 0 1 19 0M5.5 12.3a9.5 9.5 0 0 1 13 0M8.6 15.5a5 5 0 0 1 6.8 0"/><circle cx="12" cy="18.6" r=".9" fill="currentColor"/>'),
  kitchen: sv('<rect x="4" y="3.5" width="16" height="17" rx="1"/><path d="M4 9h16M8 6.2h.01M11 6.2h.01"/><circle cx="12" cy="14.5" r="3"/>'),
  washer: sv('<rect x="4" y="3" width="16" height="18" rx="1.5"/><circle cx="12" cy="13" r="4.5"/><path d="M7.5 6.5h2"/>'),
  bath: sv('<path d="M3 12h18v2.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5V12Z"/><path d="M6 12V5.5A2 2 0 0 1 9.8 4.7M7 19l-1 2M17 19l1 2"/>'),
  desk: sv('<path d="M3 9h18M5 9v11M19 9v11M13 9v5h6"/><rect x="7" y="3.5" width="8" height="5.5" rx=".5"/>'),
  bike: sv('<circle cx="6" cy="16" r="3.5"/><circle cx="18" cy="16" r="3.5"/><path d="M6 16 9.5 8h5M12 16l-2.5-8M18 16l-3.5-8h2.5"/>'),
  spa: sv('<path d="M12 20c-4 0-7-2.5-7-6 2.5 0 5 1 7 3 2-2 4.5-3 7-3 0 3.5-3 6-7 6Z"/><path d="M12 17c-1.8-2-2.2-5 0-9 2.2 4 1.8 7 0 9Z"/>'),
  car: sv('<path d="M4 16v-3.5L6 7h12l2 5.5V16H4Z"/><path d="M4 16v2.5h2.5V16M17.5 16v2.5H20V16M7 12.5h.01M17 12.5h.01"/>'),
  snow: sv('<path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5"/>'),
  sun: sv('<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>'),
  leaf: sv('<path d="M5 19C5 10 10 5 20 4c-.5 10-5.5 15-15 15Z"/><path d="M5 19 13 11"/>'),
  shield: sv('<path d="M12 3 5 6v5.5c0 4.3 3 8 7 9.5 4-1.5 7-5.2 7-9.5V6l-7-3Z"/><path d="m9 12 2.2 2.2L15.5 10"/>'),
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".8" fill="currentColor"/></svg>',
};

/* ---------- Header & footer dùng chung ---------- */
const NAV = [
  ['index.html#nha', 'Các căn nhà', 'Our houses', 'houses'],
  ['luu-tru.html', 'Ngắn ngày & dài ngày', 'Short & long stays', 'stay'],
  ['index.html#trai-nghiem', 'Trải nghiệm Hội An', 'Hội An experiences', 'exp'],
  ['index.html#ve-chung-toi', 'Về chúng tôi', 'About us', 'about'],
  ['lien-he.html', 'Liên hệ đặt phòng', 'Book & contact', 'contact'],
];

function renderHeader() {
  const host = $('#site-header');
  if (!host) return;
  const page = document.body.dataset.page;
  const links = NAV.map(([href, vi, en, key]) =>
    `<a href="${href}" data-en="${en}" ${key === page ? 'aria-current="page"' : ''}>${vi}</a>`).join('');
  host.outerHTML = `
  <div class="announce" data-en="Book direct with the host · 24/7 support ${CONTACT.phoneDisplay}">Đặt trực tiếp với chủ nhà · Hỗ trợ 24/7 ${CONTACT.phoneDisplay}</div>
  <header class="header" id="header">
    <div class="wrap header__row">
      <button class="icon-btn burger" id="burger" aria-label="Menu">${ICON.menu}</button>
      <a class="logo" href="index.html" aria-label="Mô Đi Phê House — Trang chủ" data-en-aria="Mô Đi Phê House — Home">
        <img src="assets/img/logo-mark.png" alt="Mô">
        <span class="logo__tag" data-en="homes for slow living">nhà để sống chậm</span>
      </a>
      <nav class="nav" aria-label="Menu chính" data-en-aria="Main menu">${links}</nav>
      <div class="actions">
        <div class="lang lang--desktop" role="group" aria-label="Ngôn ngữ" data-en-aria="Language">
          <button data-lang="vi">VI</button><button data-lang="en">EN</button>
        </div>
        <a class="icon-btn head-chat" href="${CONTACT.zalo}" target="_blank" rel="noopener" aria-label="Nhắn Zalo" data-en-aria="Message on Zalo">${ICON.chat}</a>
      </div>
    </div>
  </header>
  <div class="drawer" id="drawer">
    <div class="drawer__scrim" data-close></div>
    <div class="drawer__panel">
      <button class="icon-btn drawer__close" data-close aria-label="Đóng" data-en-aria="Close">${ICON.close}</button>
      <a href="index.html" data-en="Home">Trang chủ</a>
      ${NAV.map(([href, vi, en]) => `<a href="${href}" data-en="${en}" data-close>${vi}</a>`).join('')}
      <div class="lang" style="margin-top:24px;align-self:flex-start"><button data-lang="vi">Tiếng Việt</button><button data-lang="en">English</button></div>
    </div>
  </div>`;
}

function renderFooter() {
  const host = $('#site-footer');
  if (!host) return;
  host.outerHTML = `
  <footer class="footer">
    <div class="wrap">
      <div class="footer__grid">
        <div class="footer__lead">
          <h3 data-en="Four homes in Hội An, for slow days and deep sleep.">Bốn ngôi nhà ở Hội An, cho những ngày chậm và giấc ngủ sâu.</h3>
          <p class="footer__phone"><a href="tel:${CONTACT.phone.replace(/\s/g, '')}">${ICON.phone}<span>${CONTACT.phoneDisplay}</span></a></p>
          <small data-en="Phone · Zalo · WhatsApp — 24/7 support">Điện thoại · Zalo · WhatsApp — hỗ trợ 24/7</small>
        </div>
        <div>
          <h4 data-en="Our houses">Các căn nhà</h4>
          <ul>${HOUSES.map(h => `<li><a href="${h.page}" ${h.nameEn ? `data-en="${h.nameEn}"` : ''}>${h.name}</a></li>`).join('')}</ul>
        </div>
        <div>
          <h4 data-en="Stay">Lưu trú</h4>
          <ul>
            <li><a href="luu-tru.html#ngan-ngay" data-en="Short stays">Ở ngắn ngày</a></li>
            <li><a href="luu-tru.html#dai-ngay" data-en="Long stays">Ở dài ngày</a></li>
            <li><a href="luu-tru.html#chinh-sach" data-en="Cancellation &amp; house rules">Chính sách hủy &amp; nội quy</a></li>
            <li><a href="luu-tru.html#hoi-dap" data-en="FAQ">Câu hỏi thường gặp</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="Contact">Liên hệ</h4>
          <ul>
            <li><a href="lien-he.html" data-en="Send a booking request">Gửi yêu cầu đặt phòng</a></li>
            <li><a href="${CONTACT.zalo}" target="_blank" rel="noopener">Zalo</a></li>
            <li><a href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li>
          </ul>
        </div>
        <div>
          <h4 data-en="Mô Đi Phê">Mô Đi Phê</h4>
          <ul>
            <li><a href="${CONTACT.bedding}" target="_blank" rel="noopener">Mô Bedding</a></li>
            <li><a href="${CONTACT.instagram}" target="_blank" rel="noopener">Instagram</a></li>
            <li><a href="${CONTACT.facebook}" target="_blank" rel="noopener">Facebook</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2026 Mô Đi Phê House · Hội An</span>
        <div class="footer__social">
          <a href="${CONTACT.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${ICON.ig}</a>
          <a href="${CONTACT.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${ICON.fb}</a>
        </div>
        <span data-en="Book direct · No platform fees">Đặt trực tiếp · Không qua phí sàn</span>
      </div>
    </div>
  </footer>
  <a class="float-chat" href="${CONTACT.zalo}" target="_blank" rel="noopener" aria-label="Nhắn Zalo" data-en-aria="Message on Zalo">${ICON.chat}<span data-en="Chat">Nhắn tin</span></a>
  <div class="toast" id="toast" role="status" aria-live="polite">${ICON.check}<span></span></div>`;
}

/* ---------- Song ngữ ---------- */
function applyLang(lang) {
  LANG = lang;
  store.set('mo-lang', lang);
  document.documentElement.lang = lang;
  $$('[data-en]').forEach(el => {
    if (el.dataset.vi === undefined) el.dataset.vi = el.innerHTML;
    el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.vi;
  });
  $$('[data-en-ph]').forEach(el => {
    if (el.dataset.viPh === undefined) el.dataset.viPh = el.placeholder;
    el.placeholder = lang === 'en' ? el.dataset.enPh : el.dataset.viPh;
  });
  $$('[data-en-aria]').forEach(el => {
    if (el.dataset.viAria === undefined) el.dataset.viAria = el.getAttribute('aria-label');
    el.setAttribute('aria-label', lang === 'en' ? el.dataset.enAria : el.dataset.viAria);
  });
  $$('[data-en-alt]').forEach(el => {
    if (el.dataset.viAlt === undefined) el.dataset.viAlt = el.alt;
    el.alt = lang === 'en' ? el.dataset.enAlt : el.dataset.viAlt;
  });
  if (document.body.dataset.enTitle) {
    if (document.body.dataset.viTitle === undefined) document.body.dataset.viTitle = document.title;
    document.title = lang === 'en' ? document.body.dataset.enTitle : document.body.dataset.viTitle;
  }
  $$('[data-lang]').forEach(b => b.classList.toggle('is-active', b.dataset.lang === lang));
  document.dispatchEvent(new CustomEvent('langchange'));
}

let toastTimer;
function toast(msg) {
  const el = $('#toast');
  if (!el) return;
  $('span', el).textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
}

/* Nội dung dựng bằng JS: vẽ lại khi đổi ngôn ngữ */
function live(fn) { fn(); document.addEventListener('langchange', fn); }

/* ---------- Thẻ nhà ---------- */
function houseCard(h) {
  return `
  <a class="hcard2" href="${h.page}" data-tags="${h.tags.join(' ')}">
    <figure><img src="${h.cover}" alt="${houseName(h)}" loading="lazy" style="object-position:${h.coverPos}"></figure>
    <p class="hcard2__area">${L(h.area)}</p>
    <h3 class="hcard2__name">${houseName(h)}</h3>
    <p class="hcard2__type">${L(h.type)}</p>
    <ul class="stats">
      <li>${ICON.guests}<span>${h.stats.guests} ${t('khách', 'guests')}</span></li>
      <li>${ICON.bed}<span>${h.stats.beds} ${t('phòng ngủ', 'bedrooms')}</span></li>
      ${h.stats.pool ? `<li>${ICON.pool}<span>${t('Hồ bơi', 'Pool')}</span></li>` : ''}
    </ul>
    <div class="hcard2__foot"><span class="price">${t('Giá: Liên hệ', 'Rate: on request')}</span><span class="link-line">${t('Xem nhà', 'View house')} ${ICON.arrow}</span></div>
  </a>`;
}

function initHouseGrid() {
  const grid = $('#houseGrid');
  if (!grid) return;
  let filter = 'all';
  const draw = () => {
    grid.innerHTML = HOUSES.map(houseCard).join('');
    $$('.hcard2', grid).forEach(c => c.classList.toggle('is-dim', filter !== 'all' && !c.dataset.tags.split(' ').includes(filter)));
  };
  $$('#finder [data-filter]').forEach(b => b.addEventListener('click', () => {
    filter = b.dataset.filter;
    $$('#finder [data-filter]').forEach(x => x.classList.toggle('is-active', x === b));
    draw();
  }));
  live(draw);
}

function initReviews() {
  const box = $('#reviewGrid');
  if (!box) return;
  const flag = $('#sampleFlag');
  if (flag && !SAMPLE_REVIEWS) flag.remove();
  live(() => {
    box.innerHTML = REVIEWS.map(r => {
      const h = HOUSES.find(x => x.id === r.house);
      return `<figure class="review">
        <div class="review__stars" aria-label="5/5">★★★★★</div>
        <blockquote>“${L(r.text)}”</blockquote>
        <figcaption><b>${r.who}</b><span>${L(r.from)} · <a href="${h.page}">${houseName(h)}</a></span></figcaption>
      </figure>`;
    }).join('');
  });
}

/* ---------- Slider hero ---------- */
function initHero() {
  const hero = $('.hero--slides');
  if (!hero) return;
  const slides = $$('.hero__slide', hero);
  const dots = $('.hero__dots', hero);
  let i = 0, timer;
  if (slides.length < 2) { dots && dots.remove(); return; }
  dots.innerHTML = slides.map((_, k) => `<button aria-label="Slide ${k + 1}"></button>`).join('');
  const go = n => {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => s.classList.toggle('is-active', k === i));
    $$('button', dots).forEach((d, k) => { d.classList.remove('is-active'); if (k === i) { void d.offsetWidth; d.classList.add('is-active'); } });
    clearTimeout(timer);
    timer = setTimeout(() => go(i + 1), 5000);
  };
  $$('button', dots).forEach((d, k) => d.addEventListener('click', () => go(k)));
  go(0);
}

/* ---------- Bộ xem ảnh ---------- */
function openLightbox(list, start = 0) {
  let i = start;
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.innerHTML = `
    <button class="lightbox__close" aria-label="${t('Đóng', 'Close')}">${ICON.close}</button>
    <button class="lightbox__nav lightbox__prev" aria-label="${t('Ảnh trước', 'Previous')}">${ICON.left}</button>
    <figure><img alt=""><figcaption></figcaption></figure>
    <button class="lightbox__nav lightbox__next" aria-label="${t('Ảnh sau', 'Next')}">${ICON.right}</button>`;
  document.body.appendChild(box);
  document.body.style.overflow = 'hidden';
  const im = $('img', box), cap = $('figcaption', box);
  const show = n => { i = (n + list.length) % list.length; im.src = list[i]; cap.textContent = `${i + 1} / ${list.length}`; };
  const close = () => { box.remove(); document.body.style.overflow = ''; removeEventListener('keydown', key); };
  const key = e => { if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') show(i - 1); if (e.key === 'ArrowRight') show(i + 1); };
  $('.lightbox__close', box).onclick = close;
  $('.lightbox__prev', box).onclick = () => show(i - 1);
  $('.lightbox__next', box).onclick = () => show(i + 1);
  box.addEventListener('click', e => { if (e.target === box) close(); });
  let x0 = null;
  box.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(i + (dx < 0 ? 1 : -1)); x0 = null; });
  addEventListener('keydown', key);
  show(i);
}

/* ---------- Tin nhắn đặt phòng ---------- */
function nightsBetween(a, b) {
  if (!a || !b) return 0;
  const n = Math.round((new Date(b) - new Date(a)) / 864e5);
  return n > 0 ? n : 0;
}
const fmtDate = d => (d ? d.split('-').reverse().join('/') : '');

function bookingMessage(f) {
  const n = nightsBetween(f.checkin, f.checkout);
  const kind = n >= 28 ? t('Dài ngày (theo tháng)', 'Long stay (monthly)') : n ? t('Ngắn ngày', 'Short stay') : '';
  const lines = [
    t('Chào Mô Đi Phê House, mình muốn hỏi đặt phòng:', 'Hello Mô Đi Phê House, I would like to request a booking:'),
    `• ${t('Nhà', 'House')}: ${f.house}${f.unit ? ' — ' + f.unit : ''}`,
    f.checkin ? `• ${t('Nhận phòng', 'Check-in')}: ${fmtDate(f.checkin)} · ${t('Trả phòng', 'Check-out')}: ${fmtDate(f.checkout) || '?'}${n ? ` (${n} ${t('đêm', 'nights')})` : ''}` : `• ${t('Ngày', 'Dates')}: ${t('chưa chốt', 'flexible')}`,
    kind ? `• ${t('Hình thức', 'Stay type')}: ${kind}` : '',
    `• ${t('Số khách', 'Guests')}: ${f.adults || 1} ${t('người lớn', 'adults')}${+f.kids ? `, ${f.kids} ${t('trẻ em', 'children')}` : ''}`,
    f.name ? `• ${t('Tên', 'Name')}: ${f.name}` : '',
    f.phone ? `• ${t('Điện thoại', 'Phone')}: ${f.phone}` : '',
    f.note ? `• ${t('Ghi chú', 'Note')}: ${f.note}` : '',
  ];
  return lines.filter(Boolean).join('\n');
}

function sendLead(f, msg, channel) {
  if (!LEAD_ENDPOINT) return;
  try {
    fetch(LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ ...f, channel, message: msg, lang: LANG, page: location.pathname, time: new Date().toISOString() }) });
  } catch {}
}

async function copyText(s) {
  try { await navigator.clipboard.writeText(s); return true; } catch {
    const ta = document.createElement('textarea'); ta.value = s; document.body.appendChild(ta); ta.select();
    let ok = false; try { ok = document.execCommand('copy'); } catch {} ta.remove(); return ok;
  }
}

/* Gắn form đặt phòng: dùng chung cho ô đặt phòng trên trang nhà và trang Liên hệ */
function bindBookingForm(form, getHouse) {
  const read = () => {
    const d = Object.fromEntries(new FormData(form));
    const h = getHouse ? getHouse() : HOUSES.find(x => x.id === d.house);
    const u = h && d.unit !== '' && d.unit !== undefined ? h.units[+d.unit] : null;
    return { ...d, house: h ? houseName(h) : t('Chưa chọn — nhờ tư vấn', 'Not sure yet — please advise'), unit: u ? L(u.name) : '' };
  };
  const nightsEl = $('[data-nights]', form);
  const syncNights = () => {
    if (!nightsEl) return;
    const n = nightsBetween(form.checkin.value, form.checkout.value);
    nightsEl.textContent = n ? (n >= 28 ? t(`${n} đêm · lưu trú dài ngày`, `${n} nights · long stay`) : t(`${n} đêm`, `${n} nights`)) : '';
  };
  const today = new Date().toISOString().slice(0, 10);
  form.checkin.min = today;
  form.checkin.addEventListener('change', () => { form.checkout.min = form.checkin.value; if (form.checkout.value && form.checkout.value <= form.checkin.value) form.checkout.value = ''; syncNights(); });
  form.checkout.addEventListener('change', syncNights);
  document.addEventListener('langchange', syncNights);

  form.addEventListener('submit', e => e.preventDefault());
  $$('[data-send]', form).forEach(btn => btn.addEventListener('click', async () => {
    if (form.phone && form.phone.hasAttribute('required') && !form.reportValidity()) return;
    const f = read();
    const msg = bookingMessage(f);
    const ch = btn.dataset.send;
    sendLead(f, msg, ch);
    if (ch === 'whatsapp') {
      window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    } else {
      const ok = await copyText(msg);
      toast(ok ? t('Đã chép tin nhắn — dán vào khung chat Zalo là xong.', 'Message copied — just paste it into the Zalo chat.') : t('Mở Zalo để nhắn cho chúng tôi.', 'Opening Zalo so you can message us.'));
      setTimeout(() => window.open(CONTACT.zalo, '_blank', 'noopener'), 500);
    }
  }));
}

const bookingFields = (withHouse, h) => `
  ${withHouse ? `<label class="field field--full"><span>${t('Chọn nhà', 'House')}</span>
    <select name="house" id="fHouse"><option value="">${t('Chưa rõ — nhờ tư vấn giúp', 'Not sure — please advise')}</option>${HOUSES.map(x => `<option value="${x.id}">${houseName(x)}</option>`).join('')}</select></label>` : ''}
  <label class="field field--full" ${!h || h.units.length < 2 ? 'hidden' : ''}><span>${t('Căn / hạng phòng', 'Unit')}</span>
    <select name="unit" id="fUnit">${h ? unitOptions(h) : ''}</select></label>
  <label class="field"><span>${t('Nhận phòng', 'Check-in')}</span><input type="date" name="checkin"></label>
  <label class="field"><span>${t('Trả phòng', 'Check-out')}</span><input type="date" name="checkout"></label>
  <p class="field--full nights" data-nights></p>
  <label class="field"><span>${t('Người lớn', 'Adults')}</span><input type="number" name="adults" min="1" max="12" value="2"></label>
  <label class="field"><span>${t('Trẻ em', 'Children')}</span><input type="number" name="kids" min="0" max="8" value="0"></label>`;

const unitOptions = h => h.units.length < 2 ? `<option value="0">${L(h.units[0].name)}</option>`
  : `<option value="">${t('Chưa chọn', 'Any')}</option>` + h.units.map((u, k) => `<option value="${k}">${L(u.name)}</option>`).join('');

const sendButtons = () => `
  <div class="send-btns">
    <button type="button" class="btn btn--solid" data-send="zalo">${ICON.chat} ${t('Gửi qua Zalo', 'Send via Zalo')}</button>
    <button type="button" class="btn" data-send="whatsapp">${t('Gửi qua WhatsApp', 'Send via WhatsApp')}</button>
  </div>`;

/* ---------- Trang từng nhà ---------- */
function initHousePage() {
  const root = $('#house');
  if (!root) return;
  const h = HOUSES.find(x => x.id === document.body.dataset.house);
  const others = HOUSES.filter(x => x !== h);

  const draw = () => {
    const P = h.photos;
    const rules = [...POLICY.rules, ...h.extraRules];
    root.innerHTML = `
    <section class="gallery wrap" aria-label="${t('Ảnh', 'Photos')}">
      <button class="gallery__big" data-photo="0"><img src="${P[0]}" alt="${houseName(h)}"></button>
      ${[1, 2, 3, 4].map(k => `<button class="gallery__sm" data-photo="${k}"><img src="${P[k]}" alt="" loading="lazy"></button>`).join('')}
      <button class="btn gallery__all" data-photo="0">${ICON.camera} ${t(`Xem tất cả ${P.length} ảnh`, `See all ${P.length} photos`)}</button>
    </section>

    <div class="wrap house">
      <div class="house__main">
        <header class="house__head">
          <p class="sec-kicker">${L(h.area)}</p>
          <h1 class="sec-title">${houseName(h)}</h1>
          <p class="house__addr">${ICON.pin}<span>${L(h.addr)} · ${L(h.type)}</span></p>
          <ul class="stats stats--lg">
            <li>${ICON.guests}<span>${h.stats.guests} ${t('khách', 'guests')}</span></li>
            <li>${ICON.bed}<span>${h.stats.beds} ${t('phòng ngủ', 'bedrooms')}</span></li>
            ${h.stats.pool ? `<li>${ICON.pool}<span>${t('Hồ bơi riêng', 'Private pool')}</span></li>` : ''}
            <li>${ICON.sun}<span>${t(`Tối thiểu ${h.minNights} đêm`, `Min. ${h.minNights} night${h.minNights > 1 ? 's' : ''}`)}</span></li>
          </ul>
          <p class="house__lead">${L(h.lead)}</p>
        </header>

        <section class="block">
          <h2 class="block__title">${t('Điểm nổi bật', 'Highlights')}</h2>
          <ul class="ticks">${h.highlights.map(x => `<li>${L(x)}</li>`).join('')}</ul>
        </section>

        <section class="block" id="cac-can">
          <h2 class="block__title">${h.units.length > 1 ? t(`Các căn trong nhà (${h.units.length})`, `The apartments (${h.units.length})`) : t('Căn nhà', 'The house')}</h2>
          <div class="units">${h.units.map((u, k) => `
            <article class="unit">
              <button class="unit__img" data-src="${u.img}"><img src="${u.img}" alt="${L(u.name)}" loading="lazy"></button>
              <div class="unit__body">
                <h3>${L(u.name)}</h3>
                <p class="unit__meta">${L(u.meta)}</p>
                <p>${L(u.desc)}</p>
                <div class="unit__foot">
                  <span class="price">${t('Giá: Liên hệ', 'Rate: on request')}</span>
                  ${u.airbnb ? `<a class="link-line" href="${u.airbnb}" target="_blank" rel="noopener">${t('Xem giá trên Airbnb', 'See rates on Airbnb')} ${ICON.arrow}</a>` : ''}
                  <button class="link-line" data-pick="${k}">${t('Hỏi căn này', 'Ask about this unit')} ${ICON.arrow}</button>
                </div>
              </div>
            </article>`).join('')}</div>
        </section>

        <section class="block">
          <h2 class="block__title">${t('Tiện nghi', 'Amenities')}</h2>
          <ul class="amen">${h.amenities.map(a => { const [vi, en, ic] = AMENITIES[a]; return `<li>${ICON[ic]}<span>${t(vi, en)}</span></li>`; }).join('')}</ul>
        </section>

        <section class="block">
          <h2 class="block__title">${t('Vị trí', 'Location')}</h2>
          <ul class="dist">${h.distances.map(([vi, en, d]) => `<li><span>${t(vi, en)}</span><b>${L(d)}</b></li>`).join('')}</ul>
          <a class="btn" href="${h.map}" target="_blank" rel="noopener">${ICON.pin} ${t('Xem trên Google Maps', 'Open in Google Maps')}</a>
        </section>

        <section class="block">
          <h2 class="block__title">${t('Chính sách & nội quy', 'Policies & house rules')}</h2>
          <div class="pol">
            <div>
              <h3>${t('Nhận & trả phòng', 'Check-in & check-out')}</h3>
              <ul class="plain">
                <li>${t('Nhận phòng sau 14:00 · trả phòng trước 12:00', 'Check-in after 14:00 · check-out before 12:00')}</li>
                <li>${t(`Tối thiểu ${h.minNights} đêm`, `Minimum ${h.minNights} night${h.minNights > 1 ? 's' : ''}`)}</li>
                ${h.kidsFree ? `<li>${t('Trẻ dưới 6 tuổi ở kèm miễn phí', 'Children under 6 stay free')}</li>` : ''}
                <li>${t('Xuất trình hộ chiếu / CCCD khi nhận phòng', 'Passport or ID required at check-in')}</li>
              </ul>
            </div>
            <div>
              <h3>${t('Chính sách hủy', 'Cancellation')}</h3>
              <ul class="plain">${POLICY.cancel.map(x => `<li>${L(x)}</li>`).join('')}</ul>
            </div>
            <div>
              <h3>${t('Quy định lưu trú', 'House rules')}</h3>
              <ul class="plain">${rules.map(x => `<li>${L(x)}</li>`).join('')}</ul>
            </div>
          </div>
        </section>
      </div>

      <aside class="book" id="dat-phong">
        <div class="book__box">
          <p class="book__price">${t('Giá: <b>Liên hệ</b>', 'Rate: <b>on request</b>')}</p>
          <p class="book__note">${t('Ngắn ngày theo đêm hoặc dài ngày theo tháng — chúng tôi báo giá trong vài phút.', 'Nightly or monthly — we reply with a quote within minutes.')}</p>
          <form class="bform" id="bookForm" novalidate>
            ${bookingFields(false, h)}
            <label class="field field--full"><span>${t('Ghi chú (không bắt buộc)', 'Note (optional)')}</span><input name="note" placeholder="${t('VD: đi cùng bé 3 tuổi, cần đón sân bay…', 'e.g. travelling with a toddler, need airport pickup…')}"></label>
            ${sendButtons()}
          </form>
          <p class="book__help">${t('Hỗ trợ 24/7', '24/7 support')} · <a href="tel:${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phoneDisplay}</a></p>
        </div>
      </aside>
    </div>

    <section class="section section--alt">
      <div class="wrap">
        <div class="head-row">
          <div>
            <p class="sec-kicker">${t('Mô Đi Phê House', 'Mô Đi Phê House')}</p>
            <h2 class="sec-title">${t('Những nhà khác', 'Other houses')}</h2>
          </div>
          <a class="btn" href="index.html#nha">${t('Xem tất cả', 'See all')}</a>
        </div>
        <div class="house-grid house-grid--3">${others.map(houseCard).join('')}</div>
      </div>
    </section>`;

    $$('[data-photo]', root).forEach(b => b.addEventListener('click', () => openLightbox(P, +b.dataset.photo)));
    $$('.unit__img', root).forEach(b => b.addEventListener('click', () => openLightbox(P, Math.max(0, P.indexOf(b.dataset.src)))));
    const form = $('#bookForm', root);
    bindBookingForm(form, () => h);
    $$('[data-pick]', root).forEach(b => b.addEventListener('click', () => {
      form.unit.value = b.dataset.pick;
      $('#dat-phong').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  };
  live(draw);
}

/* ---------- Trang Liên hệ ---------- */
function initContactPage() {
  const host = $('#contactForm');
  if (!host) return;
  const draw = () => {
    host.innerHTML = `
      <form class="bform bform--wide" id="cForm" novalidate>
        ${bookingFields(true, null)}
        <label class="field"><span>${t('Tên của bạn', 'Your name')}</span><input name="name" autocomplete="name"></label>
        <label class="field"><span>${t('Số điện thoại / Zalo', 'Phone / WhatsApp')}</span><input name="phone" type="tel" autocomplete="tel"></label>
        <label class="field field--full"><span>${t('Ghi chú', 'Note')}</span><textarea name="note" rows="3" placeholder="${t('Bạn đi mấy người, cần gì thêm (đón sân bay, thuê xe máy, nôi em bé…)?', 'Who is coming, anything else you need (airport pickup, motorbike, baby cot…)?')}"></textarea></label>
        ${sendButtons()}
        <p class="bform__hint">${t('Bấm Zalo: tin nhắn được chép sẵn, bạn chỉ cần dán vào khung chat. Bấm WhatsApp: tin nhắn được điền sẵn.', 'Zalo: your message is copied, just paste it into the chat. WhatsApp: your message is pre-filled.')}</p>
      </form>`;
    const form = $('#cForm', host);
    const pre = new URLSearchParams(location.search).get('house');
    const fillUnits = () => {
      const h = HOUSES.find(x => x.id === form.house.value);
      const wrap = form.unit.closest('.field');
      wrap.hidden = !h || h.units.length < 2;
      form.unit.innerHTML = h ? unitOptions(h) : '';
    };
    if (pre) form.house.value = pre;
    form.house.addEventListener('change', fillUnits);
    fillUnits();
    bindBookingForm(form, null);
  };
  live(draw);
}

/* ---------- Trang sales (nội bộ) ---------- */
function initSalesPage() {
  const host = $('#salesKit');
  if (!host) return;
  const base = location.href.replace(/[^/]*$/, '');
  live(() => {
    host.innerHTML = HOUSES.map(h => {
      const link = base + h.page;
      const pitch = t(
        `${houseName(h)} — ${L(h.type)}, ${L(h.addr)}.\n${L(h.lead)}\nXem ảnh và thông tin: ${link}\nĐặt phòng: ${CONTACT.phoneDisplay} (Zalo/WhatsApp)`,
        `${houseName(h)} — ${L(h.type)}, ${L(h.addr)}.\n${L(h.lead)}\nPhotos & details: ${link}\nBookings: ${CONTACT.phoneDisplay} (Zalo/WhatsApp)`);
      return `
      <article class="kit">
        <img src="${h.cover}" alt="" loading="lazy" style="object-position:${h.coverPos}">
        <div class="kit__body">
          <p class="sec-kicker">${L(h.area)}</p>
          <h2>${houseName(h)}</h2>
          <p class="kit__type">${L(h.type)} · ${t('tối thiểu', 'min.')} ${h.minNights} ${t('đêm', 'night(s)')}</p>
          <table class="kit__units">${h.units.map(u => `<tr><th>${L(u.name)}</th><td>${L(u.meta)}</td></tr>`).join('')}</table>
          <ul class="ticks">${h.highlights.map(x => `<li>${L(x)}</li>`).join('')}</ul>
          <div class="kit__links">
            <a class="btn" href="${h.page}" target="_blank">${t('Trang giới thiệu', 'Public page')}</a>
            <a class="btn" href="${h.album}" target="_blank" rel="noopener">${t('Album ảnh gốc', 'Full photo album')}</a>
            <a class="btn" href="${h.map}" target="_blank" rel="noopener">Google Maps</a>
            <button class="btn btn--solid" data-copy="${encodeURIComponent(pitch)}">${t('Chép tin nhắn gửi khách', 'Copy pitch message')}</button>
          </div>
        </div>
      </article>`;
    }).join('');
    $$('[data-copy]', host).forEach(b => b.addEventListener('click', async () => {
      const ok = await copyText(decodeURIComponent(b.dataset.copy));
      toast(ok ? t('Đã chép — dán vào Zalo/Messenger gửi khách.', 'Copied — paste it to your guest.') : t('Trình duyệt chặn chép, hãy chép tay.', 'Copy blocked by the browser.'));
    }));
  });
}

/* ---------- Hiệu ứng cuộn ---------- */
function initReveal() {
  const check = () => {
    const limit = innerHeight * 0.9;
    $$('.reveal, .reveal-stagger, .img-reveal').forEach(el => { if (!el.classList.contains('in') && el.getBoundingClientRect().top < limit) el.classList.add('in'); });
  };
  addEventListener('scroll', check, { passive: true });
  addEventListener('resize', check);
  document.addEventListener('langchange', () => requestAnimationFrame(check));
  check();
}

/* ---------- Khởi chạy ---------- */
function initChrome() {
  const header = $('#header');
  addEventListener('scroll', () => header && header.classList.toggle('is-scrolled', scrollY > 10), { passive: true });
  const drawer = $('#drawer');
  $('#burger').addEventListener('click', () => drawer.classList.add('open'));
  $$('[data-close]', drawer).forEach(el => el.addEventListener('click', () => drawer.classList.remove('open')));
  addEventListener('keydown', e => { if (e.key === 'Escape') drawer.classList.remove('open'); });
  $$('[data-lang]').forEach(b => b.addEventListener('click', () => applyLang(b.dataset.lang)));
}

renderHeader();
renderFooter();
initChrome();
initHero();
initHouseGrid();
initReviews();
initHousePage();
initContactPage();
initSalesPage();
applyLang(LANG);
initReveal();
