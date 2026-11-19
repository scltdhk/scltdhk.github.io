/* Singular WebSDK 1.4.8. No custom clipboard payloads, clipboard reads or revenue events.
   Official SDK only writes during the visitor's download click. Its return value does
   not confirm clipboard permission or attribution success; those require device tests. */
(function () {
  'use strict';
  const c = window.BLOCK_SINGULAR_CONFIG || {};
  const entries = Object.freeze({
    'one-clipboard': {policy:'first_ad_1', clipboard:true},
    'two-clipboard': {policy:'first_ad_2', clipboard:true},
    'one-ordinary': {policy:'first_ad_1', clipboard:false},
    'two-ordinary': {policy:'first_ad_2', clipboard:false}
  });
  const requested = new URL(location.href).searchParams.getAll('entry');
  // Fixed reviewed choices only. Missing, duplicated or unknown inputs keep baseline policy.
  const entry = requested.length === 1 && Object.hasOwn(entries, requested[0]) ? entries[requested[0]] : null;
  let ready = false;
  const setState = state => { document.documentElement.dataset.singularState = state; };
  const validHttps = value => {try {const u = new URL(value);return u.protocol === 'https:' && !u.username && !u.password;} catch {return false;}};
  const validBase = value => {if (!validHttps(value)) return false;const u = new URL(value);return u.hostname.endsWith('.sng.link') && u.pathname !== '/' && !u.hash;};
  const buttons = [...document.querySelectorAll('.store')];
  buttons.forEach((button, index) => {
    const store = index === 0 ? c.androidStoreUrl : c.iosStoreUrl;
    const expected = index === 0 ? 'play.google.com' : 'apps.apple.com';
    if (validHttps(store) && new URL(store).hostname === expected) button.href = store;
  });
  if (c.enabled !== true) {setState('disabled');return;}
  if (!c.sdkKey || !c.sdkSecret || !c.productId || !validBase(c.iosBaseLink)) {setState('configuration_missing');return;}
  setState('loading');
  // Script is async: neither hero painting nor download links wait for the SDK/network.
  const script = document.createElement('script');
  script.src = 'https://web-sdk-cdn.singular.net/singular-sdk/1.4.8/singular-sdk.js';
  script.async = true;
  script.onerror = () => setState('sdk_load_failed');
  script.onload = () => {
    try {
      const config = new window.SingularConfig(c.sdkKey, c.sdkSecret, c.productId)
        .withInitFinishedCallback(() => {ready = true;setState('ready');});
      window.singularSdk.init(config);
    } catch {setState('initialization_failed');}
  };
  document.head.appendChild(script);
  const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const notice = document.querySelector('#clipboard-notice');
  // Do not copy a desktop clipboard in an iPhone installation test. Plain mode remains available.
  if (entry && entry.clipboard && isIos && notice) notice.hidden = false;
  buttons.forEach((button, index) => {
    const base = index === 0 ? c.androidBaseLink : c.iosBaseLink;
    button.addEventListener('click', event => {
      // Existing anchor stays usable during loading, SDK failures or incomplete configuration.
      if (!ready || !validBase(base)) return;
      const sdk = window.singularSdk;
      const clipboard = !!(entry && entry.clipboard && isIos && index === 1 &&
        document.querySelector('#clipboard-use')?.checked && window.isSecureContext);
      try {
        const target = entry ? 'blockdoku-bdki://startup?policy=' + entry.policy + '&v=1' : undefined;
        const marker = entry ? 'block_startup_v1:' + (clipboard ? 'clipboard' : 'ordinary') : undefined;
        let link = sdk.buildWebToAppLink(base, target, marker, target);
        if (!validHttps(link) || new URL(link).hostname !== new URL(base).hostname) return;
        if (clipboard) {
          // Synchronous user activation: never await before this SDK call.
          const enriched = sdk.enrichUrlWithClipboardDdlFlow(link);
          if (validHttps(enriched) && new URL(enriched).hostname === new URL(base).hostname) link = enriched;
        }
        // Keep target=_blank and normal browser navigation. No popup created after a promise.
        button.href = link;
        document.documentElement.dataset.singularLastAction = clipboard ? 'clipboard_requested' : 'ordinary_link';
      } catch {
        // Reset a previously enriched href; do not reuse an old token after a later failure.
        const store = index === 0 ? c.androidStoreUrl : c.iosStoreUrl;
        button.href = validHttps(store) && new URL(store).hostname === (index === 0 ? 'play.google.com' : 'apps.apple.com') ? store : 'https://www.google.com/';
        document.documentElement.dataset.singularLastAction = 'fallback';
      }
    });
  });
})();
