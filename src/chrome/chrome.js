import smartGroup from "./smart-tab-groups.js";

const handler = smartGroup.bind(this, {
  api: chrome,
  internalTab: "chrome:",
});

chrome.tabs.onCreated.addListener(handler);
