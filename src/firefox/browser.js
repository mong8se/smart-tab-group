import { smartGroup, smartUnGroup } from "./smart-tab-groups.js";

const handler = smartGroup.bind(this, {
  api: browser,
  internalTab: "about:",
});

browser.tabs.onCreated.addListener(handler);

const unHandler = smartUnGroup.bind(this, {
  api: browser,
});

browser.tabs.onRemoved.addListener(unHandler);
