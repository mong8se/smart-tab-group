import autoGroup from "./smart-tab-groups.js";

const handler = autoGroup.bind(this, {
  api: chrome,
  blankTab: "chrome://newtab/",
});

chrome.tabs.onCreated.addListener(handler);
