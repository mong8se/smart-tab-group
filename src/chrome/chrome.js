import autoGroup from './smart-tab-group.js';

const handler = autoGroup.bind(this, chrome);

chrome.tabs.onCreated.addListener(handler);
