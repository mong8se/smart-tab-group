export async function smartUnGroup(
  { api: { sessions, tabs } },
  windowId,
  goneTabIds = [],
) {
  const groupList = await sessions.getWindowValue(windowId, "smart-tab-groups");

  if (!groupList || groupList.length === 0) return;

  // closing tabs are still returned by tabs.query until their close animation ends
  const [newGroupList, ungroupList] = await Promise.all(
    groupList.map((groupId) =>
      tabs
        .query({ groupId })
        .then((tabList) =>
          tabList.filter((tab) => !goneTabIds.includes(tab.id)),
        ),
    ),
  ).then((tabLists) =>
    tabLists.reduce(
      (result, tabList) => {
        if (tabList.length === 1) {
          result[1].push(tabList[0].id);
        } else if (tabList.length > 1) {
          result[0].push(tabList[0].groupId);
        }
        return result;
      },
      [[], []],
    ),
  );

  const { shouldUngroup } = await browser.storage.sync.get("shouldUngroup");
  if (
    (shouldUngroup || typeof shouldUngroup === "undefined") &&
    ungroupList.length > 0
  ) {
    await tabs.ungroup(ungroupList);
  }

  if (newGroupList.length !== groupList.length) {
    await sessions.setWindowValue(windowId, "smart-tab-groups", newGroupList);
  }
}
