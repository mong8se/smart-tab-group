import autoGroup from "./smart-tab-groups.js";

const handler = autoGroup.bind(this, {
  api: chrome,
  internalTab: "chrome:",
});

chrome.tabs.onCreated.addListener(handler);
