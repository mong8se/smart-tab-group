// tabGroups is only firefox 139 and newer
const TAB_GROUP_ID_NONE = -1;

export async function smartGroup(
  { api: { sessions, tabs, tabGroups }, internalTab },
  newTab,
) {
  // if the new tab already has a groupId or doesn't have an opener, do nothing
  switch (true) {
    case newTab.groupId !== TAB_GROUP_ID_NONE:
    case !newTab.openerTabId:
      return;
  }

  const openerTab = await tabs.get(newTab.openerTabId);

  // if the opener already has a groupId or is pinned, do nothing
  switch (true) {
    // due to this issue in Chrome: https://issues.chromium.org/issues/406427231
    case openerTab.url.startsWith(internalTab):
    case openerTab.groupId !== TAB_GROUP_ID_NONE:
    case openerTab.pinned:
      return;
  }

  const groupId = await tabs.group({
    tabIds: [openerTab.id, newTab.id],
  });

  const groupList =
    (await sessions.getWindowValue(openerTab.windowId, "smart-tab-groups")) ||
    [];
  groupList.push(groupId);
  await sessions.setWindowValue(
    openerTab.windowId,
    "smart-tab-groups",
    groupList,
  );

  // tabGroups is only firefox 139 and newer
  if (!tabGroups) return;

  let title = openerTab.title;

  if (!title) {
    title = new URL(openerTab.url).hostname;

    if (title.startsWith("www.")) {
      title = title.slice(4);
    }
  }

  await tabGroups.update(groupId, {
    title,
  });
}

export async function smartUnGroup(
  { api: { sessions, tabs } },
  _tabId,
  removeInfo,
) {
  if (removeInfo.isWindowClosing) return;

  const groupList = await sessions.getWindowValue(
    removeInfo.windowId,
    "smart-tab-groups",
  );

  if (!groupList || groupList.length === 0) return;

  const [newGroupList, ungroupList] = await Promise.all(
    groupList.map((groupId) => tabs.query({ groupId })),
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

  if (ungroupList.length > 0) {
    await tabs.ungroup(ungroupList);
  }

  await sessions.setWindowValue(
    removeInfo.windowId,
    "smart-tab-groups",
    newGroupList,
  );
}
