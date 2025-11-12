import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    options_ui: {
      page: 'options/index.html',
      open_in_tab: true,
    },
    permissions: [
      'storage',
      'activeTab',
      'scripting',
      'tabs',
      'sidePanel',
      'identity',
      'declarativeNetRequest',
      'debugger',
    ],
    host_permissions: [
      "<all_urls>",
      "https://*/*",
      "http://*/*"
    ]
  },
});
