import autoGroup from './smart-tab-group.js';

const handler = autoGroup.bind(this, browser);

browser.tabs.onCreated.addListener(handler);
