(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var $ = function (selector, scope) {
    return (scope || doc).querySelector(selector);
  };
  var $$ = function (selector, scope) {
    return Array.prototype.slice.call((scope || doc).querySelectorAll(selector));
  };

  var themeButton = $('[data-theme-toggle]');
  var themeMeta = $('meta[name="theme-color"]');
  var schemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme, persist) {
    root.setAttribute('data-theme', theme);

    if (themeButton) {
      var nextLabel = theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему';
      themeButton.setAttribute('aria-label', nextLabel);
      themeButton.setAttribute('title', nextLabel);
    }

    if (themeMeta) {
      themeMeta.setAttribute('content', theme === 'dark' ? '#000000' : '#ffffff');
    }

    if (persist) {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {}
    }
  }

  function hasSavedTheme() {
    try {
      var value = localStorage.getItem('theme');
      return value === 'light' || value === 'dark';
    } catch (error) {
      return false;
    }
  }

  applyTheme(currentTheme(), false);

  if (themeButton) {
    themeButton.addEventListener('click', function () {
      applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', true);
    });
  }

  if (typeof schemeQuery.addEventListener === 'function') {
    schemeQuery.addEventListener('change', function (event) {
      if (!hasSavedTheme()) {
        applyTheme(event.matches ? 'dark' : 'light', false);
      }
    });
  }

  var header = $('[data-header]');
  var menuButton = $('[data-menu-toggle]');
  var mobileMenu = $('#mobile-menu');

  function setMenu(open) {
    if (!menuButton || !mobileMenu) return;

    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    mobileMenu.classList.toggle('is-open', open);

    if (open) {
      mobileMenu.removeAttribute('inert');
    } else {
      mobileMenu.setAttribute('inert', '');
    }

    if (header) {
      header.classList.toggle('menu-open', open);
    }
  }

  if (menuButton) {
    menuButton.addEventListener('click', function () {
      setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
    });
  }

  if (mobileMenu) {
    $$('a', mobileMenu).forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });
  }

  var menuScrim = $('[data-menu-close]');

  if (menuScrim) {
    menuScrim.addEventListener('click', function () {
      setMenu(false);
    });
  }

  doc.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;

    var menuWasOpen = menuButton && menuButton.getAttribute('aria-expanded') === 'true';
    setMenu(false);

    if (menuWasOpen && menuButton) {
      menuButton.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) {
      setMenu(false);
    }
  });

  var heroFigure = $('.hero-figure');
  var stickyCta = $('#sticky-cta');
  var heroSection = $('#top');
  var contactSection = $('#contact');
  var footer = $('.site-footer');
  var scrollFrame = 0;

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  function updateParallax() {
    if (!heroFigure || reduceMotion.matches) return;

    var rect = heroFigure.getBoundingClientRect();
    if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;

    var offset = Math.min(18, Math.max(0, window.scrollY) * 0.03);
    heroFigure.style.setProperty('--parallax-y', (-offset).toFixed(2) + 'px');
  }

  function updateStickyCta() {
    if (!stickyCta || !heroSection || !contactSection || !footer) return;

    var pastHero = heroSection.getBoundingClientRect().bottom < 80;
    var contactVisible = contactSection.getBoundingClientRect().top < window.innerHeight * 0.9;
    var footerVisible = footer.getBoundingClientRect().top < window.innerHeight;
    var visible = pastHero && !contactVisible && !footerVisible;

    stickyCta.classList.toggle('is-visible', visible);
    stickyCta.setAttribute('aria-hidden', String(!visible));

    if (visible) {
      stickyCta.removeAttribute('inert');
    } else {
      stickyCta.setAttribute('inert', '');
    }
  }

  function onScroll() {
    if (scrollFrame) return;

    scrollFrame = window.requestAnimationFrame(function () {
      scrollFrame = 0;
      updateHeader();
      updateParallax();
      updateStickyCta();
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);

  updateHeader();
  updateParallax();
  updateStickyCta();

  var navLinks = $$('.nav-link');
  var allNavLinks = $$('.nav-link, .mobile-link');
  var spySections = navLinks
    .map(function (link) {
      return doc.getElementById(link.getAttribute('href').slice(1));
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && spySections.length) {
    var spyActive = [];

    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var index = spyActive.indexOf(entry.target.id);

          if (entry.isIntersecting && index === -1) {
            spyActive.push(entry.target.id);
          } else if (!entry.isIntersecting && index !== -1) {
            spyActive.splice(index, 1);
          }
        });

        var activeId = null;

        spySections.forEach(function (section) {
          if (!activeId && spyActive.indexOf(section.id) !== -1) {
            activeId = section.id;
          }
        });

        allNavLinks.forEach(function (link) {
          var active = !!activeId && link.getAttribute('href') === '#' + activeId;
          link.classList.toggle('is-active', active);

          if (active) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-42% 0px -52% 0px' }
    );

    spySections.forEach(function (section) {
      spyObserver.observe(section);
    });
  }

  var revealElements = $$('[data-reveal]');

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealElements.forEach(function (element) {
      element.classList.add('is-visible');
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  var faqItems = $$('[data-faq]');

  faqItems.forEach(function (item) {
    var trigger = $('.faq-trigger', item);
    var panel = $('.faq-panel', item);
    if (!trigger || !panel) return;

    trigger.addEventListener('click', function () {
      var open = trigger.getAttribute('aria-expanded') === 'true';

      faqItems.forEach(function (other) {
        if (other === item) return;

        var otherTrigger = $('.faq-trigger', other);
        var otherPanel = $('.faq-panel', other);
        if (!otherTrigger || !otherPanel) return;

        otherTrigger.setAttribute('aria-expanded', 'false');
        otherPanel.setAttribute('inert', '');
        other.classList.remove('is-open');
      });

      trigger.setAttribute('aria-expanded', String(!open));
      item.classList.toggle('is-open', !open);

      if (open) {
        panel.setAttribute('inert', '');
      } else {
        panel.removeAttribute('inert');
      }
    });
  });

  var clockNode = $('[data-moscow-time]');
  var clockStatus = $('[data-moscow-status]');
  var clockChip = $('.local-time');

  if (clockNode) {
    var timeFormatter = new Intl.DateTimeFormat('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Moscow'
    });
    var hourFormatter = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      hour12: false,
      timeZone: 'Europe/Moscow'
    });

    var renderClock = function () {
      var now = new Date();
      clockNode.textContent = timeFormatter.format(now);

      if (clockStatus) {
        var hour = Number(hourFormatter.format(now)) % 24;
        var online = hour >= 10 && hour < 22;
        clockStatus.textContent = online ? 'на связи' : 'ночью — отвечу утром';
        clockStatus.classList.toggle('is-online', online);
      }

      if (clockChip) {
        var onlineNow = Number(hourFormatter.format(now)) % 24;
        clockChip.classList.toggle('is-offline', !(onlineNow >= 10 && onlineNow < 22));
      }
    };

    renderClock();
    window.setInterval(renderClock, 30000);
  }

  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text).then(
        function () { return true; },
        function () { return legacyCopy(text); }
      );
    }

    return Promise.resolve(legacyCopy(text));
  }

  function legacyCopy(text) {
    try {
      var area = doc.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.top = '-200px';
      area.style.left = '-200px';
      doc.body.appendChild(area);
      area.select();
      var copied = doc.execCommand('copy');
      doc.body.removeChild(area);
      return copied;
    } catch (error) {
      return false;
    }
  }

  var calculator = $('[data-calculator]');

  if (calculator) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var projects = {
      landing: { label: 'Лендинг', base: 25000, days: 5 },
      multipage: { label: 'Многостраничный сайт', base: 50000, days: 10 },
      webapp: { label: 'Веб-сервис', base: 100000, days: 21 },
      bot: { label: 'ИИ / автоматизация', base: 20000, days: 3 }
    };

    var extras = {
      design: { label: 'Уникальный дизайн', price: 12000, days: 3 },
      admin: { label: 'Админ-панель', price: 15000, days: 4 },
      payments: { label: 'Приём оплат', price: 12000, days: 3 },
      seo: { label: 'SEO-настройка', price: 8000, days: 2 },
      content: { label: 'Контент-наполнение', price: 6000, days: 2 },
      support: { label: 'Поддержка — 1 мес.', price: 8000, days: 0 }
    };

    var RUSH_MULT = 1.3;
    var amountFormatter = new Intl.NumberFormat('ru-RU');
    var priceNode = $('[data-calc-price]', calculator);
    var daysNode = $('[data-calc-days]', calculator);
    var rushNode = $('[data-calc-rush]', calculator);
    var liveNode = $('[data-calc-live]', calculator);
    var statusNode = $('[data-calc-status]', calculator);
    var rushInput = $('[data-rush]', calculator);
    var projectButtons = $$('[data-project]', calculator);
    var extraButtons = $$('[data-extra]', calculator);
    var resetButton = $('[data-calc-reset]', calculator);
    var copyButton = $('[data-calc-copy]', calculator);

    var state = {
      project: 'multipage',
      extras: ['admin'],
      rush: false
    };

    function pluralDays(value) {
      var mod10 = value % 10;
      var mod100 = value % 100;
      if (mod10 === 1 && mod100 !== 11) return value + ' день';
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return value + ' дня';
      return value + ' дней';
    }

    function encodeState() {
      return [state.project].concat(state.extras, state.rush ? ['r'] : []).join('.');
    }

    function syncUrl() {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set('calc', encodeState());
        window.history.replaceState(null, '', url.toString());
      } catch (error) {}
    }

    function clearUrl() {
      try {
        var url = new URL(window.location.href);
        url.searchParams.delete('calc');
        window.history.replaceState(null, '', url.toString());
      } catch (error) {}
    }

    function restoreFromUrl() {
      try {
        var raw = new URL(window.location.href).searchParams.get('calc');
        if (!raw) return;

        var parts = raw.split('.');
        if (!hasOwn.call(projects, parts[0])) return;

        state.project = parts[0];
        state.extras = [];
        state.rush = false;

        parts.slice(1).forEach(function (part) {
          if (part === 'r') {
            state.rush = true;
          } else if (hasOwn.call(extras, part) && state.extras.indexOf(part) === -1) {
            state.extras.push(part);
          }
        });
      } catch (error) {}
    }

    function result() {
      var project = projects[state.project] || projects.multipage;
      var price = project.base;
      var days = project.days;

      state.extras.forEach(function (key) {
        var extra = extras[key];
        if (!extra) return;
        price += extra.price;
        days += extra.days;
      });

      if (state.rush) {
        price = Math.round((price * RUSH_MULT) / 1000) * 1000;
        days = Math.max(3, Math.ceil(days * 0.7));
      }

      return { price: price, days: days };
    }

    function animatePrice(to, animate) {
      if (!priceNode) return;

      if (!animate || reduceMotion.matches) {
        priceNode.textContent = amountFormatter.format(to) + ' ₽';
        priceNode.setAttribute('data-value', String(to));
        return;
      }

      var from = Number(priceNode.getAttribute('data-value') || 0);
      priceNode.setAttribute('data-value', String(to));

      if (from === to) {
        priceNode.textContent = amountFormatter.format(to) + ' ₽';
        return;
      }

      if (priceNode._frame) {
        window.cancelAnimationFrame(priceNode._frame);
      }

      var started = performance.now();
      var duration = 420;

      var step = function (now) {
        var progress = Math.min(1, (now - started) / duration);
        var eased = 1 - Math.pow(1 - progress, 3);
        var value = Math.round(from + (to - from) * eased);
        priceNode.textContent = amountFormatter.format(value) + ' ₽';

        if (progress < 1) {
          priceNode._frame = window.requestAnimationFrame(step);
        } else {
          priceNode.textContent = amountFormatter.format(to) + ' ₽';
          priceNode._frame = 0;
        }
      };

      priceNode._frame = window.requestAnimationFrame(step);
    }

    function render(animate, sync) {
      var total = result();

      animatePrice(total.price, animate);

      if (daysNode) {
        daysNode.textContent = pluralDays(total.days);
      }

      if (rushNode) {
        rushNode.hidden = !state.rush;
      }

      if (rushInput) {
        rushInput.checked = state.rush;
      }

      projectButtons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.getAttribute('data-project') === state.project));
      });

      extraButtons.forEach(function (button) {
        var key = button.getAttribute('data-extra');
        button.setAttribute('aria-pressed', String(state.extras.indexOf(key) !== -1));
      });

      if (liveNode) {
        liveNode.textContent = 'Предварительная стоимость: ' +
          amountFormatter.format(total.price) + ' рублей, срок ' + pluralDays(total.days) + '.';
      }

      if (sync) {
        syncUrl();
      }
    }

    function showStatus(message) {
      if (!statusNode) return;
      statusNode.textContent = message;
      window.clearTimeout(showStatus._timer);
      showStatus._timer = window.setTimeout(function () {
        statusNode.textContent = '';
      }, 2600);
    }

    restoreFromUrl();

    projectButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var key = button.getAttribute('data-project');
        if (!hasOwn.call(projects, key)) return;
        state.project = key;
        render(true, true);
      });
    });

    extraButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        var key = button.getAttribute('data-extra');
        if (!hasOwn.call(extras, key)) return;

        var index = state.extras.indexOf(key);
        if (index === -1) {
          state.extras.push(key);
        } else {
          state.extras.splice(index, 1);
        }

        render(true, true);
      });
    });

    if (rushInput) {
      rushInput.addEventListener('change', function () {
        state.rush = rushInput.checked;
        render(true, true);
      });
    }

    if (resetButton) {
      resetButton.addEventListener('click', function () {
        state.project = 'multipage';
        state.extras = ['admin'];
        state.rush = false;
        render(false, false);
        clearUrl();
        showStatus('Настройки сброшены');
      });
    }

    if (copyButton) {
      copyButton.addEventListener('click', function () {
        var url;
        try {
          url = new URL(window.location.href);
          url.searchParams.set('calc', encodeState());
        } catch (error) {
          url = null;
        }

        copyText(url ? url.toString() : encodeState()).then(function (copied) {
          showStatus(copied ? 'Ссылка на расчёт скопирована' : 'Не удалось скопировать ссылку');
        });
      });
    }

    render(false, false);
  }

  var stickyTitle = $('[data-sticky-title]');
  var stickySub = $('[data-sticky-sub]');
  var stickyLink = $('[data-sticky-link]');
  var stickyHire = $('[data-sticky-hire]');
  var stickyInner = $('.sticky-cta-inner');
  var stickySlides = [
    { title: 'Есть задача?', sub: 'Отвечу в течение дня', action: 'contact' },
    { title: 'Ищете разработчика?', sub: 'Резюме, стек и опыт', action: 'resume' }
  ];
  var stickyIndex = 0;
  var stickyTimer = null;
  var stickyPaused = false;

  function renderStickySlide() {
    var slide = stickySlides[stickyIndex];

    if (stickyTitle) stickyTitle.textContent = slide.title;
    if (stickySub) stickySub.textContent = slide.sub;
    if (stickyLink) stickyLink.hidden = slide.action !== 'contact';
    if (stickyHire) stickyHire.hidden = slide.action !== 'resume';
  }

  function stopStickyTimer() {
    if (!stickyTimer) return;
    window.clearInterval(stickyTimer);
    stickyTimer = null;
  }

  function startStickyTimer() {
    stopStickyTimer();
    if (reduceMotion.matches || !stickyLink || !stickyHire) return;

    stickyTimer = window.setInterval(function () {
      if (stickyPaused) return;
      stickyIndex = (stickyIndex + 1) % stickySlides.length;
      renderStickySlide();
    }, 10000);
  }

  if (stickyTitle) {
    renderStickySlide();
    startStickyTimer();

    if (stickyInner) {
      stickyInner.addEventListener('pointerenter', function () {
        stickyPaused = true;
      });
      stickyInner.addEventListener('pointerleave', function () {
        stickyPaused = false;
      });
      stickyInner.addEventListener('focusin', function () {
        stickyPaused = true;
      });
      stickyInner.addEventListener('focusout', function () {
        stickyPaused = false;
      });
    }
  }

  var resumeModal = $('#resume-modal');
  var resumeOpeners = $$('[data-resume-open]');
  var resumeLastFocus = null;

  function setResume(open) {
    if (!resumeModal) return;

    if (open && menuButton && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
    }

    resumeModal.classList.toggle('is-open', open);
    resumeModal.setAttribute('aria-hidden', String(!open));

    if (open) {
      resumeLastFocus = doc.activeElement;
      resumeModal.removeAttribute('inert');
      root.classList.add('is-locked');

      window.requestAnimationFrame(function () {
        var closeButton = $('.resume-close', resumeModal);
        if (closeButton) closeButton.focus();
      });
    } else {
      resumeModal.setAttribute('inert', '');
      root.classList.remove('is-locked');

      if (resumeLastFocus && typeof resumeLastFocus.focus === 'function') {
        resumeLastFocus.focus();
      }
      resumeLastFocus = null;
    }
  }

  resumeOpeners.forEach(function (button) {
    button.addEventListener('click', function () {
      setResume(true);
    });
  });

  if (resumeModal) {
    $$('[data-resume-close]', resumeModal).forEach(function (target) {
      target.addEventListener('click', function () {
        setResume(false);
      });
    });

    doc.addEventListener('keydown', function (event) {
      if (!resumeModal.classList.contains('is-open')) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        setResume(false);
        return;
      }

      if (event.key !== 'Tab') return;

      var focusable = $$(
        'a[href], button:not([disabled]), iframe, object, [tabindex]:not([tabindex="-1"])',
        resumeModal
      ).filter(function (element) {
        return element.offsetParent !== null;
      });

      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && doc.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && doc.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  var yearNode = $('[data-year]');
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }
})();
