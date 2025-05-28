import autoGroup from "./smart-tab-groups.js";

const handler = autoGroup.bind(this, {
  api: browser,
  internalTab: "about:",
});

browser.tabs.onCreated.addListener(handler);
