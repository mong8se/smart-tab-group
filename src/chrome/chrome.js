import autoGroup from './smart-tab-groups.js';

const handler = autoGroup.bind(this, chrome);

chrome.tabs.onCreated.addListener(handler);
