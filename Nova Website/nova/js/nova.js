/* ==========================================================================
   Nova Online Academy — Interactions (vanilla, built from scratch)
   ========================================================================== */
(function () {
  'use strict';

  var mqHover = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- SVG icon set ---------- */
  var ICONS = {
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.6a16 16 0 006 6l1.2-1.1a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    lang: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h7M9 3v2c0 4-2 7-6 8M5 9c0 3 3 5 6 6"/><path d="M14 19l4-9 4 9M15.5 16h5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.6.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.8-2.5-1.4-3.5-3.1-.3-.5.3-.5.8-1.5.1-.2 0-.4 0-.5-.1-.1-.6-1.5-.9-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.9.9-1.1 2-.8 3.2.5 1.9 1.7 3.4 3.4 4.8 2.4 1.9 4.2 2 5.1 1.8.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.5A10 10 0 1012 2z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 00-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.6A3 3 0 002 8.2 31 31 0 002 12a31 31 0 00.1 3.8 3 3 0 002.1 2.1c1.9.6 7.8.6 7.8.6s6 0 7.9-.6a3 3 0 002.1-2.1A31 31 0 0022 12a31 31 0 00-.1-3.8zM10 15V9l5 3z"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19a2 2 0 012-2h13"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0112 0M16 6a3 3 0 010 6M21 20a5 5 0 00-4-5"/></svg>',
    award: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="6"/><path d="M9 14l-2 7 5-3 5 3-2-7"/></svg>'
  };

  function injectNamedIcons() {
    document.querySelectorAll('[data-icon]').forEach(function (el) {
      var name = el.getAttribute('data-icon');
      if (ICONS[name]) el.innerHTML = ICONS[name];
    });
  }

  /* ---------- Ambient background + grain + progress ---------- */
  function injectChrome() {
    if (!document.querySelector('.nv-ambient')) {
      var amb = document.createElement('div');
      amb.className = 'nv-ambient';
      amb.setAttribute('aria-hidden', 'true');
      amb.innerHTML = '<span class="nv-blob b1"></span><span class="nv-blob b2"></span>' +
        '<span class="nv-blob b3"></span><span class="nv-blob b4"></span><span class="nv-blob b5"></span>' +
        '<span class="nv-blob b6"></span><span class="nv-blob b7"></span>';
      document.body.prepend(amb);
    }
    if (!document.querySelector('.nv-grain')) {
      var g = document.createElement('div');
      g.className = 'nv-grain'; g.setAttribute('aria-hidden', 'true');
      document.body.appendChild(g);
    }
    if (!document.querySelector('.nv-progress')) {
      var p = document.createElement('div');
      p.className = 'nv-progress'; p.setAttribute('aria-hidden', 'true');
      document.body.appendChild(p);
    }
  }

  function initProgress() {
    var bar = document.querySelector('.nv-progress');
    if (!bar) return;
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
        tick = false;
      });
    }, { passive: true });
  }

  /* ---------- Navbar ---------- */
  function initNav() {
    var nav = document.querySelector('.nv-nav');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });

    var path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('.nv-links a, .nv-drawer-panel a.dl').forEach(function (a) {
      var href = (a.getAttribute('href') || '').split('/').pop().toLowerCase();
      if (href === path || (path === '' && href === 'index.html')) a.classList.add('active');
    });

    var drawer = document.querySelector('.nv-drawer');
    var burger = document.querySelector('.nv-burger');
    if (drawer && burger) {
      var open = function () { drawer.classList.add('open'); document.body.style.overflow = 'hidden'; };
      var close = function () { drawer.classList.remove('open'); document.body.style.overflow = ''; };
      burger.addEventListener('click', open);
      drawer.querySelector('.nv-drawer-scrim').addEventListener('click', close);
      drawer.querySelector('.nv-drawer-close').addEventListener('click', close);
      drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
    }
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    var els = document.querySelectorAll('.nv-reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Counters ---------- */
  function initCounters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length) return;
    var run = function (el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var suffix = el.getAttribute('data-suffix') || '';
      if (isNaN(target)) return;
      var dur = 1800, start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(step); else el.textContent = target.toLocaleString() + suffix;
      };
      requestAnimationFrame(step);
    };
    if (!('IntersectionObserver' in window)) { els.forEach(run); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic() {
    if (!mqHover.matches) return;
    document.querySelectorAll('.nv-btn[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + x * 0.18 + 'px,' + y * 0.28 + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  }

  /* ---------- Card spotlight ---------- */
  function initSpotlight() {
    if (!mqHover.matches) return;
    document.querySelectorAll('.nv-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      }, { passive: true });
    });
  }

  /* ---------- Hero slideshow ---------- */
  function initHero() {
    var slides = document.querySelectorAll('.nv-hero-slides img');
    var dots = document.querySelectorAll('.nv-hero-dots button');
    if (!slides.length) return;
    var i = 0, timer;
    var go = function (n) {
      slides[i].classList.remove('on'); if (dots[i]) dots[i].classList.remove('on');
      i = (n + slides.length) % slides.length;
      slides[i].classList.add('on'); if (dots[i]) dots[i].classList.add('on');
    };
    var start = function () { if (!reduce) timer = setInterval(function () { go(i + 1); }, 4200); };
    dots.forEach(function (d, n) { d.addEventListener('click', function () { clearInterval(timer); go(n); start(); }); });
    slides[0].classList.add('on'); if (dots[0]) dots[0].classList.add('on');
    start();
  }

  /* ---------- To-top ---------- */
  function initToTop() {
    var btn = document.querySelector('.nv-totop');
    if (!btn) return;
    window.addEventListener('scroll', function () { btn.classList.toggle('show', window.scrollY > 600); }, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }); });
  }

  /* ---------- Page transitions ---------- */
  function initTransitions() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href]');
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href[0] === '#' || href.indexOf('javascript:') === 0) return;
      if (a.target && a.target !== '_self') return;
      if (a.hasAttribute('download') || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      var url;
      try { url = new URL(href, location.href); } catch (err) { return; }
      if (url.origin !== location.origin) return;
      if (!/\.html($|\?|#)/.test(url.pathname)) return;
      e.preventDefault();
      document.body.classList.add('nv-exit');
      setTimeout(function () { location.href = href; }, 220);
    });
  }

  /* ---------- Courses grid + search (courses.html) ---------- */
  function courseCard(c) {
    return '' +
      '<article class="nv-card nv-course nv-reveal">' +
        '<div class="thumb"><img src="' + c.image + '" alt="' + c.name + '" loading="lazy"></div>' +
        '<div class="body">' +
          '<span class="nv-tag">' + ICONS.book + ' Course</span>' +
          '<h3>' + c.name + '</h3>' +
          '<div class="meta">' +
            '<span>' + ICONS.clock + ' Duration: ' + c.duration + '</span>' +
            '<span>' + ICONS.play + ' Class: ' + c.classDuration + '</span>' +
            '<span>' + ICONS.lang + ' ' + c.languages + '</span>' +
          '</div>' +
          '<a href="coursepage.html?slug=' + c.slug + '" class="nv-btn nv-btn-dark">More Detail ' + ICONS.arrow + '</a>' +
        '</div>' +
      '</article>';
  }

  function initCoursesGrid() {
    var grid = document.getElementById('nv-courses-grid');
    if (!grid || typeof courses === 'undefined') return;

    var limit = parseInt(grid.getAttribute('data-limit'), 10);
    var base = (!isNaN(limit) && limit > 0) ? courses.slice(0, limit) : courses;

    var render = function (list) {
      if (!list.length) { grid.innerHTML = '<div class="nv-empty">No courses match your search.</div>'; return; }
      grid.innerHTML = list.map(courseCard).join('');
      initReveal(); initSpotlight();
      grid.querySelectorAll('.nv-reveal').forEach(function (e) { e.classList.add('in'); });
    };
    render(base);

    var search = document.getElementById('nv-course-search');
    if (search) {
      search.addEventListener('input', function () {
        var q = search.value.trim().toLowerCase();
        render(!q ? base : courses.filter(function (c) {
          return c.name.toLowerCase().indexOf(q) > -1 || (c.overview || '').toLowerCase().indexOf(q) > -1;
        }));
      });
    }
  }

  /* ---------- Course detail (coursepage.html) ---------- */
  function initCourseDetail() {
    var root = document.getElementById('nv-course-detail');
    if (!root || typeof courses === 'undefined') return;
    var slug = new URLSearchParams(location.search).get('slug');
    var c = courses.find(function (x) { return x.slug === slug; });

    if (!c) {
      root.innerHTML = '<div class="nv-empty"><h2 class="nv-h2">Course not found</h2>' +
        '<p class="nv-lead mt-s">The course you are looking for is unavailable.</p>' +
        '<a href="courses.html" class="nv-btn nv-btn-primary mt-m">' + ICONS.arrow + ' Browse all courses</a></div>';
      return;
    }
    document.title = c.name + ' | Nova Online Academy';

    var topics = (c.topics || []).map(function (t) {
      return '<li>' + ICONS.check + '<span>' + t + '</span></li>';
    }).join('');

    root.innerHTML = '' +
      '<div class="nv-detail-grid">' +
        '<div class="nv-reveal">' +
          '<span class="nv-eyebrow">Online Course</span>' +
          '<h1 class="nv-h1" style="margin:16px 0 14px">' + c.name + '</h1>' +
          '<p class="nv-lead">' + (c.overview || '') + '</p>' +
          '<div class="nv-info-row">' +
            '<span class="nv-tag">' + ICONS.clock + ' ' + c.duration + '</span>' +
            '<span class="nv-tag">' + ICONS.play + ' ' + c.classDuration + '</span>' +
            '<span class="nv-tag">' + ICONS.lang + ' ' + c.languages + '</span>' +
          '</div>' +
          '<div class="nv-hero-actions" style="margin-top:26px">' +
            '<a href="' + (c.demoLink || '#') + '" target="_blank" rel="noopener" class="nv-btn nv-btn-primary" data-magnetic>' + ICONS.play + ' Free Demo Class</a>' +
            '<a href="register.html" class="nv-btn nv-btn-glass">Enroll Now ' + ICONS.arrow + '</a>' +
          '</div>' +
        '</div>' +
        '<div class="nv-detail-img nv-reveal d1"><img src="' + c.image + '" alt="' + c.name + '"></div>' +
      '</div>' +
      '<div class="nv-card nv-topics nv-reveal" style="margin-top:44px">' +
        '<h2 class="nv-h3" style="margin-bottom:8px">What you will learn</h2>' +
        '<ul>' + topics + '</ul>' +
      '</div>';

    initReveal(); initMagnetic(); initSpotlight();
  }

  /* ---------- Register (register.html) ---------- */
  function initRegister() {
    var form = document.getElementById('nv-register-form');
    if (!form) return;

    var courseSel = document.getElementById('course');
    if (courseSel && typeof courses !== 'undefined') {
      courses.forEach(function (c) {
        var o = document.createElement('option');
        o.value = c.name; o.textContent = c.name; courseSel.appendChild(o);
      });
    }

    var alertBox = document.getElementById('nv-register-alert');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var invalid = false;
      form.querySelectorAll('[required]').forEach(function (f) {
        var bad = !f.value || (f.value === '');
        f.classList.toggle('invalid', bad);
        if (bad && !invalid) { invalid = true; f.focus(); }
      });
      if (invalid) {
        if (alertBox) { alertBox.textContent = 'Please fill in all required fields.'; alertBox.style.display = 'block'; alertBox.style.borderColor = 'rgba(220,38,38,0.3)'; alertBox.style.background = 'rgba(220,38,38,0.08)'; alertBox.style.color = '#b91c1c'; }
        return;
      }

      var v = function (id) { var el = document.getElementById(id); return el ? el.value : ''; };
      var now = new Date();
      var msg = '🎓 *NEW COURSE REGISTRATION - Nova Online Academy* 🎓\n\n' +
        '👤 *STUDENT INFORMATION*\n━━━━━━━━━━━━━━━━━━━━\n' +
        '• 👨‍🎓 *Full Name:* ' + v('firstName') + ' ' + v('lastName') + '\n' +
        "• 👨‍👦 *Father's Name:* " + v('fatherName') + '\n' +
        '• ⚧ *Gender:* ' + v('gender') + '\n' +
        '• 📅 *Date of Birth:* ' + v('dob') + '\n\n' +
        '📍 *LOCATION DETAILS*\n━━━━━━━━━━━━━━━━━━━━\n' +
        '• 🌍 *Country:* ' + v('country') + '\n' +
        '• 🏙️ *State/Province:* ' + (v('state') || 'Not specified') + '\n' +
        '• 🏘️ *City:* ' + v('city') + '\n' +
        '• 📱 *WhatsApp:* ' + v('whatsapp') + '\n\n' +
        '📚 *COURSE DETAILS*\n━━━━━━━━━━━━━━━━━━━━\n' +
        '• 📖 *Selected Course:* ' + v('course') + '\n' +
        '• 💼 *Profession:* ' + v('profession') + '\n' +
        '• ⏰ *Preferred Time:* ' + v('preferredTime') + '\n' +
        '• 📅 *Preferred Days:* ' + v('days') + '\n\n' +
        '⏱️ *REGISTRATION TIMESTAMP*\n━━━━━━━━━━━━━━━━━━━━\n' +
        '📅 *Date:* ' + now.toLocaleDateString() + '\n' +
        '🕒 *Time:* ' + now.toLocaleTimeString() + '\n\n' +
        '────────────────────\n' +
        '✅ *Submitted via Nova Online Academy website*\n' +
        '📧 novaonlinequran01@gmail.com\n📞 +92 339 683 6121';

      var url = 'https://wa.me/923396836121?text=' + encodeURIComponent(msg);
      if (alertBox) { alertBox.textContent = '✅ Registration ready! Opening WhatsApp to send your details…'; alertBox.style.display = 'block'; alertBox.style.borderColor = 'rgba(5,150,105,0.25)'; alertBox.style.background = 'rgba(5,150,105,0.1)'; alertBox.style.color = '#065F46'; }
      window.open(url, '_blank');
    });

    form.querySelectorAll('[required]').forEach(function (f) {
      f.addEventListener('input', function () { f.classList.remove('invalid'); });
      f.addEventListener('change', function () { f.classList.remove('invalid'); });
    });
  }

  /* ---------- Init ---------- */
  function init() {
    injectChrome();
    injectNamedIcons();
    initProgress();
    initNav();
    initReveal();
    initCounters();
    initMagnetic();
    initSpotlight();
    initHero();
    initToTop();
    initCoursesGrid();
    initCourseDetail();
    initRegister();
    initTransitions();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
