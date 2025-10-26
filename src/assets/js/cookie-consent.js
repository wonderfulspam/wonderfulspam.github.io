(function() {
  'use strict';

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    const secure = window.location.protocol === 'https:' ? ';Secure' : '';
    document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax' + secure;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function deleteCookie(name) {
    const domains = [window.location.hostname, '.' + window.location.hostname];
    const paths = ['/', ''];

    domains.forEach(domain => {
      paths.forEach(path => {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=' + path + ';domain=' + domain;
      });
    });

    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
  }

  function deleteTrackingCookies() {
    const config = window.trackingConfig || {};
    const allCookies = document.cookie.split(';');

    allCookies.forEach(cookie => {
      const cookieName = cookie.split('=')[0].trim();

      const shouldDelete =
        (config.ga4_id && (cookieName.startsWith('_ga') || cookieName.startsWith('_gid') || cookieName.startsWith('_gat'))) ||
        (config.meta_pixel_id && (cookieName.startsWith('_fb')));

      if (shouldDelete) {
        deleteCookie(cookieName);
      }
    });

    try {
      if (config.ga4_id) {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('_ga')) {
            localStorage.removeItem(key);
          }
        });
      }
    } catch (e) {
      // Storage access may be restricted
    }
  }

  function hideBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  function handleConsent(accepted) {
    setCookie('cookie_consent', accepted ? 'accepted' : 'rejected', 365);

    if (!accepted) {
      deleteTrackingCookies();
    }

    hideBanner();

    if (accepted) {
      location.reload();
    }
  }

  function toggleDetails() {
    const details = document.getElementById('cookie-details');
    const toggle = document.getElementById('cookie-details-toggle');
    if (details && toggle) {
      const isHidden = details.style.display === 'none' || !details.style.display;
      details.style.display = isHidden ? 'block' : 'none';
      toggle.textContent = isHidden ? '▼ Cookie details' : '▶ Cookie details';
      toggle.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    }
  }

  function initCookieBanner() {
    const consent = getCookie('cookie_consent');

    if (!consent) {
      const banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.style.display = 'block';
      }
    }

    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const toggleBtn = document.getElementById('cookie-details-toggle');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', function() {
        handleConsent(true);
      });
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', function() {
        handleConsent(false);
      });
    }

    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleDetails);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieBanner);
  } else {
    initCookieBanner();
  }
})();
