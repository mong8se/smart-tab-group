import { smartGroup } from "./smart-group.js";
import { smartUnGroup } from "./smart-ungroup.js";

const api = typeof browser === "undefined" ? chrome : browser;
const internalTab = typeof browser === "undefined" ? "about:" : "chrome:";

const handler = smartGroup.bind(this, {
  api,
  internalTab,
});

api.tabs.onCreated.addListener(handler);

const unHandler = smartUnGroup.bind(this, {
  api,
});

api.tabs.onRemoved.addListener(unHandler);
