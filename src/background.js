import { smartGroup, smartUnGroup } from "./smart-tab-groups.js";

const api = typeof browser === "undefined" ? chrome : browser;

const handler = smartGroup.bind(this, {
  api,
  internalTab: "about:",
});

api.tabs.onCreated.addListener(handler);

const unHandler = smartUnGroup.bind(this, {
  api,
});

api.tabs.onRemoved.addListener(unHandler);
