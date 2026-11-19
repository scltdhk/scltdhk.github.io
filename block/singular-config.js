/* PUBLIC browser configuration. Never place admin/reporting API credentials here.
   Enable only after Singular provisions Web Attribution and a Mobile Web-to-App baselink.
   These SDK values are necessarily visible to visitors; obtain approved Web SDK values. */
window.BLOCK_SINGULAR_CONFIG = Object.freeze({
  enabled: false,
  sdkKey: '',
  sdkSecret: '',
  productId: 'com.scltdhk.block.web', // Proposed Web App bundle ID; must match Singular Apps.
  iosBaseLink: '', // Provisioned https://<actual-domain>.sng.link/<actual-path>
  androidBaseLink: '', // Leave empty until Android is configured.
  iosStoreUrl: '', // Verified App Store URL; blank retains the current temporary Google link.
  androidStoreUrl: ''
});
