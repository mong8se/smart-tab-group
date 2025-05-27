import autoGroup from "./smart-tab-groups.js";

const handler = autoGroup.bind(this, {
  api: browser,
  blankTab: "about:newtab",
});

browser.tabs.onCreated.addListener(handler);
