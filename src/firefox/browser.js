import autoGroup from './smart-tab-groups.js';

const handler = autoGroup.bind(this, browser);

browser.tabs.onCreated.addListener(handler);
