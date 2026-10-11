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

const closedTabIds = [];

api.tabs.onRemoved.addListener((tabId, { windowId, isWindowClosing }) => {
  closedTabIds.push(tabId);
  if (!isWindowClosing) unHandler(windowId, closedTabIds);
});

api.tabs.onUpdated.addListener((_tabId, { groupId }, { windowId }) => {
  if (groupId !== undefined) unHandler(windowId);
});

api.tabs.onDetached.addListener((tabId, { oldWindowId }) =>
  unHandler(oldWindowId, [tabId]),
);
